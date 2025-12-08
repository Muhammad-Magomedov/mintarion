import { useContext } from "react"
import { useSession } from "next-auth/react"
import { AuthContext } from "../context/auth"

// export function useAuth() {
//   const context = useContext(AuthContext)
//   const { data: nextAuthSession } = useSession()
  
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }

//   const authProvider = context.session 
//     ? 'supabase' 
//     : nextAuthSession 
//     ? 'nextauth' 
//     : null

//   const isAuthenticated = !!(context.user || nextAuthSession?.user)

//   const userData = context.user || (nextAuthSession?.user ? {
//     // @ts-ignore
//     id: nextAuthSession.user.id,
//     email: nextAuthSession.user.email,
//     user_metadata: {
//       name: nextAuthSession.user.name,
//       avatar_url: nextAuthSession.user.image,
//     }
//   } : null)

//   return {
//     ...context,
//     authProvider,
//     isAuthenticated,
//     userData,
//     nextAuthSession,
//     isSupabaseAuth: authProvider === 'supabase',
//     isGoogleAuth: authProvider === 'nextauth',
//   }
// }

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useAuthStatus() {
  const { user, loading, session } = useAuth()
  
  return {
    isAuthenticated: !!user && !!session,
    user,
    loading,
    isLoading: loading,
  }
}