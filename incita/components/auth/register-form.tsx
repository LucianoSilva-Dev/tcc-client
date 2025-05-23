"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import  FormAluno  from "./register-aluno"
import  FormProfessor  from "./register-professor"
import type { UserType, UserRegistration } from "@/../types/user"

export function RegisterForm() {
  const [userType, setUserType] = useState<UserType>("aluno")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (userData: UserRegistration) => {
    setIsSubmitting(true)

    try {
      // Aqui você faria a chamada à API para registrar o usuário
      console.log("Dados do usuário:", userData)

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirecionar ou mostrar sucesso
      alert("Conta criada com sucesso!")
    } catch (error) {
      console.error("Erro ao criar conta:", error)
      alert("Erro ao criar conta. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <div className="bg-white rounded-lg shadow-md p-8 w-full">
        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="text-3xl font-bold text-teal-600 mb-2">INCITA</div>
        </div>

        {/* Pergunta e seleção de tipo */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-800 text-center mb-4">Quem é você?</h2>

          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setUserType("aluno")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === "aluno"
                  ? "bg-amber-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Sou Aluno
            </button>
            <button
              type="button"
              onClick={() => setUserType("professor")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === "professor"
                  ? "bg-amber-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Sou professor
            </button>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-200 mb-6"></div>

        {/* Botão Google */}
        <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-3 px-4 mb-6 hover:bg-gray-50 transition-colors">
          <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
          <span className="text-gray-700">Continuar com o Google</span>
        </button>

        {/* Formulário específico do tipo de usuário */}
        {userType === "aluno" ? (
          <FormAluno
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        ) : (
          <FormProfessor
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}

        {/* Link para login */}
        <div className="text-center text-sm text-gray-600 mt-4">
          Já possui uma conta?{" "}
          <Link href="/login" className="text-teal-600 hover:text-teal-700">
            Faça login
          </Link>
        </div>
      </div>
    </div>
  )
}