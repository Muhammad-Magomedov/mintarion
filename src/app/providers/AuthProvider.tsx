'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import camelcaseKeys from 'camelcase-keys'
import { User, Session } from '@supabase/supabase-js'
import { AuthContext } from '@/shared/context/auth'
import { IUserProfile } from '@/shared/types/entities/user'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [syncingSession, setSyncingSession] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  
  // NextAuth session
  const { data: nextAuthSession, status: nextAuthStatus } = useSession()

  const getUserProfile = useCallback(async () => {
    const { data, error } = await supabase.rpc('get_user_profile')
    return { data: data?.[0], error }
  }, [supabase])

  // Синхронизация Google сессии с Supabase
  useEffect(() => {
    const syncGoogleSession = async () => {
      if (nextAuthSession?.user && !session && !syncingSession && nextAuthStatus === 'authenticated') {
        setSyncingSession(true)
        setLoading(true)
        
        try {
          // @ts-ignore
          const userId = nextAuthSession.user.id
          
          if (!userId) {
            console.error('No user ID in NextAuth session')
            setLoading(false)
            return
          }

          // Синхронизируем сессию с Supabase через API
          const response = await fetch('/api/auth/sync-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          })

          if (response.ok) {
            // Небольшая задержка для обеспечения синхронизации cookies
            await new Promise(resolve => setTimeout(resolve, 100))
            
            // После синхронизации получаем сессию из Supabase
            const { data: { session: supabaseSession }, error } = await supabase.auth.getSession()
            
            if (!error && supabaseSession) {
              setSession(supabaseSession)
              setUser(supabaseSession.user)
              
              // Получаем профиль пользователя
              const { data } = await getUserProfile()
              if (data) {
                setUserProfile(camelcaseKeys(data))
              }
              
              // Используем router.refresh() вместо полной перезагрузки
              router.refresh()
            }
          }
        } catch (error) {
          console.error('Error syncing Google session:', error)
        } finally {
          setLoading(false)
          setSyncingSession(false)
        }
      }
    }

    syncGoogleSession()
  }, [nextAuthSession, session, syncingSession, nextAuthStatus, supabase, getUserProfile, router])

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error getting session:', error)
      } else {
        setSession(session)
        setUser(session?.user ?? null)
      }
      
      setLoading(false)
    }

    getInitialSession()
    getUserProfile()
      .then((res) => res.data && setUserProfile(camelcaseKeys(res.data)));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        if (event === 'SIGNED_IN') {
          const { data } = await getUserProfile()
          if (data) {
            setUserProfile(camelcaseKeys(data))
          }
        }
        
        if (event === 'SIGNED_OUT') {
          setUserProfile(null)
          // Также выходим из NextAuth если выходим из Supabase
          if (nextAuthSession) {
            await nextAuthSignOut({ redirect: false })
          }
        }
      }
    )

    const channel = supabase
      .channel('user_profile_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: user ? `id=eq.${user.id}` : undefined
        },
        async (payload) => {
          console.log('User profile updated via realtime:', payload)
          const { data } = await getUserProfile()
          if (data) {
            setUserProfile(camelcaseKeys(data))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
      supabase.removeChannel(channel)
    }
  }, [supabase, user?.id, getUserProfile, nextAuthSession])

  const refreshUserProfile = useCallback(async () => {
    const { data, error } = await getUserProfile()
    if (data && !error) {
      setUserProfile(camelcaseKeys(data))
    }
    return { data, error }
  }, [getUserProfile])

  const updateUserProfileOptimistic = useCallback((updates: Partial<IUserProfile>) => {
    setUserProfile(prev => {
      if (!prev) return null;
      
      // Создаем новый объект с обновлениями
      const updated = { ...prev, ...updates };
      
      console.log('Optimistic update:', {
        previous: prev,
        updates,
        result: updated
      });
      
      return updated;
    });
  }, [])

  const signOut = async () => {
    try {
      setLoading(true)
      
      // Выходим из обеих систем
      await fetch('/api/auth/sign-out', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      await supabase.auth.signOut()
      
      // Также выходим из NextAuth
      if (nextAuthSession) {
        await nextAuthSignOut({ redirect: false })
      }
      
      setUser(null)
      setUserProfile(null)
      setSession(null)
      
      // Используем router.push вместо window.location.href
      router.push('/articles')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    loading: loading || nextAuthStatus === 'loading' || syncingSession,
    user,
    userProfile,
    session,
    getUserProfile,
    refreshUserProfile,
    updateUserProfileOptimistic,
    signOut,
    supabase,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}