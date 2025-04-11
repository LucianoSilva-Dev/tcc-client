"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { EyeOff, Eye } from "lucide-react"
import axios from 'axios'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // TODO: centralizar urls e endpoints em um único lugar
    const response = await axios.post('http://localhost:3001/auth/login', { email, password })
    localStorage.setItem('userToken', response.data.token as string)
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      {/* Logo */}
      <div className="mb-6">
        <Image src="/favicon_2d.png" alt="Incita Logo" width={180} height={120} priority />
      </div>

      {/* Título */}
      <h1 className="text-2xl font-medium text-gray-800 mb-8">Faça seu login</h1>

      {/* Botão Google */}
      <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-3 px-4 mb-8 hover:bg-gray-50 transition-colors">
        <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
        <span className="text-gray-700">Continuar com o Google</span>
      </button>

      {/* Divisor */}
      <div className="w-full flex items-center mb-8">
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
            required
          />
        </div>

        <div className="mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-teal-600">
            Esqueceu a senha?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-800 hover:bg-teal-700 text-white py-3 px-4 rounded-md transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
