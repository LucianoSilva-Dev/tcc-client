"use client"

import { useRouter } from "next/navigation"
import RepertorioForm, { RepertorioData } from "../../../components/repertorio/repertorio_form"

export default function AdicionarRepertorio() {
  const router = useRouter()

  const handleSubmit = async (data: RepertorioData) => {
    // Simulando uma chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Aqui você implementaria a lógica real para salvar os dados
    console.log("Dados enviados:", data)

    // Redirecionar após o envio bem-sucedido
    router.push("/")
  }

  const handleCancel = () => {
    router.push("/")
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <RepertorioForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </main>
  )
}
