'use client'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("userToken")
    setIsLoggedIn(!!token)
  }, [])

  const login = (token: string) => {
    localStorage.setItem("userToken", token)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem("userToken")
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)