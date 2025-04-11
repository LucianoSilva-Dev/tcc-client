"use client"

import { useRouter } from "next/navigation"
import CitacaoForm from "@/../components/cita-form"
import { useCitacao } from "@/../contexts/citacao-context"
import type { CitacaoData } from "@/../contexts/citacao-context"

export default function AdicionarCitacao() {
  const router = useRouter()
  const { adicionarCitacao } = useCitacao()

  const handleSubmit = async (data: CitacaoData) => {
    await adicionarCitacao(data)
    router.push("/citar")
  }

  const handleCancel = () => {
    router.push("/citar")
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <CitacaoForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </main>
  )
}
