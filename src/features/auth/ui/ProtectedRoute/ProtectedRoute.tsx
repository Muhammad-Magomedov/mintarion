'use client'

import React from 'react'
import { useAuthStatus } from '@/shared/hooks/auth'
import { useSignInStore } from '@/features/auth/sign-in/model'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectToLogin?: boolean
}

export function ProtectedRoute({ 
  children, 
  fallback,
  redirectToLogin = true 
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuthStatus()
  const { updateValue: updateSignInState } = useSignInStore()

  React.useEffect(() => {
    if (!loading && !isAuthenticated && redirectToLogin) {
      updateSignInState('modal', { isOpen: true })
    }
  }, [isAuthenticated, loading, redirectToLogin, updateSignInState])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="text-center p-8">
        <p className="text-gray-600">Please sign in to access this content.</p>
      </div>
    )
  }

  return <>{children}</>
}