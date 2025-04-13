"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { EyeOff, Eye } from "lucide-react"
import axios from 'axios'
import { API_BASE_URL } from "@/app/constants"
import { toast } from "react-toastify"
import { handleAxiosError } from "@/app/utils"
import { useRouter } from "next/navigation"

export default function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validação de senha
    if (name === "password") {
      if (value.length < 8) {
        setErrors((prev) => ({ ...prev, password: "A senha deve ter pelo menos 8 caracteres" }))
      } else {
        setErrors((prev) => ({ ...prev, password: "" }))
      }
    }

    // Validação de confirmação de senha
    if (name === "confirmPassword" || name === "password") {
      if (name === "confirmPassword" && value !== formData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: "As senhas não coincidem" }))
      } else if (name === "password" && value !== formData.confirmPassword && formData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "As senhas não coincidem" }))
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Verificar se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "As senhas não coincidem" }))
      return
    }

    try {
      const { name, email, password } = formData
      const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password })
      toast.success(response.data.message as string)
      router.push("/login")
    } catch (e) {
      handleAxiosError(e)
    }

  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      {/* Logo */}
      <div className="mb-6">
        <Image src="/favicon_2d.png" alt="Incita Logo" width={180} height={120} priority />
      </div>

      {/* Título */}
      <h1 className="text-2xl font-medium text-gray-800 mb-8">Crie sua conta</h1>

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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
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
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          <p className="mt-1 text-xs text-gray-500">A senha deve ter pelo menos 8 caracteres</p>
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar senha
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-3 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-800 hover:bg-teal-700 text-white py-3 px-4 rounded-md transition-colors mb-4"
        >
          Criar conta
        </button>

        <div className="text-center text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link href="/" className="text-teal-600 hover:text-teal-700">
            Faça login
          </Link>
        </div>
      </form>
    </div>
  )
}
