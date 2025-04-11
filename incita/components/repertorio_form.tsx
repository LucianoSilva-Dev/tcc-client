"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Save, Eye, EyeOff, X, Check, AlertCircle } from "lucide-react"

type RepertorioFormProps = {
  onSubmit: (data: RepertorioData) => Promise<void>
  onCancel: () => void
  initialData?: RepertorioData
}

export type RepertorioData = {
  titulo: string
  conteudo: string
  fonte: string
  categoria: string
  tags: string[]
  isPublico: boolean
}

const categorias = [
  "Filosofia",
  "Sociologia",
  "História",
  "Literatura",
  "Ciência",
  "Tecnologia",
  "Atualidades",
  "Outro",
]

export default function RepertorioForm({ onSubmit, onCancel, initialData }: RepertorioFormProps) {
  const [formData, setFormData] = useState<RepertorioData>(
    initialData || {
      titulo: "",
      conteudo: "",
      fonte: "",
      categoria: "",
      tags: [],
      isPublico: true,
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [tagInput, setTagInput] = useState("")
  const tagInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro quando o campo é editado
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
      tagInputRef.current?.focus()
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.titulo.trim()) {
      newErrors.titulo = "O título é obrigatório"
    }

    if (!formData.conteudo.trim()) {
      newErrors.conteudo = "O conteúdo é obrigatório"
    }

    if (!formData.fonte.trim()) {
      newErrors.fonte = "A fonte é obrigatória"
    }

    if (!formData.categoria) {
      newErrors.categoria = "Selecione uma categoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Erro ao salvar repertório:", error)
      setErrors({
        form: "Ocorreu um erro ao salvar o repertório. Tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{initialData ? "Editar Repertório" : "Novo Repertório"}</h2>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors"
        >
          {showPreview ? (
            <>
              <EyeOff size={16} className="mr-2" />
              Ocultar Pré-visualização
            </>
          ) : (
            <>
              <Eye size={16} className="mr-2" />
              Pré-visualizar
            </>
          )}
        </button>
      </div>

      <div className={`${showPreview ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "block"} p-6`}>
        {/* Formulário */}
        <form onSubmit={handleSubmit} className={showPreview ? "" : "max-w-3xl mx-auto"}>
          {errors.form && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-md flex items-start">
              <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>{errors.form}</span>
            </div>
          )}

          <div className="mb-5">
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.titulo ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              placeholder="Digite um título claro e conciso"
            />
            {errors.titulo && <p className="mt-1 text-sm text-red-500">{errors.titulo}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria <span className="text-red-500">*</span>
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.categoria ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 bg-white`}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.categoria && <p className="mt-1 text-sm text-red-500">{errors.categoria}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="tags"
                ref={tagInputRef}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Adicione tags relevantes e pressione Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r-md border border-gray-300 border-l-0"
              >
                Adicionar
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1.5 text-teal-600 hover:text-teal-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700 mb-1">
              Conteúdo <span className="text-red-500">*</span>
            </label>
            <textarea
              id="conteudo"
              name="conteudo"
              value={formData.conteudo}
              onChange={handleChange}
              rows={8}
              className={`w-full px-3 py-2 border ${
                errors.conteudo ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              placeholder="Digite o conteúdo do repertório. Seja claro e objetivo."
            />
            {errors.conteudo && <p className="mt-1 text-sm text-red-500">{errors.conteudo}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="fonte" className="block text-sm font-medium text-gray-700 mb-1">
              Fonte <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fonte"
              name="fonte"
              value={formData.fonte}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.fonte ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              placeholder="Ex: Livro, Artigo, Site (inclua autor e ano se possível)"
            />
            {errors.fonte && <p className="mt-1 text-sm text-red-500">{errors.fonte}</p>}
          </div>

          <div className="mb-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublico"
                name="isPublico"
                checked={formData.isPublico}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublico" className="ml-2 block text-sm text-gray-700">
                Tornar este repertório público
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Repertórios públicos podem ser vistos e utilizados por todos os usuários da plataforma.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <X size={18} className="mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-teal-800 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
            >
              <Save size={18} className="mr-2" />
              {isSubmitting ? "Salvando..." : "Salvar Repertório"}
            </button>
          </div>
        </form>

        {/* Pré-visualização */}
        {showPreview && (
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pré-visualização</h3>

            <div className="bg-gray-600 rounded-lg overflow-hidden text-white p-4">
              {/* Cabeçalho do card */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <Check size={18} className="text-gray-600" />
                  </div>
                  <span className="ml-2">{formData.isPublico ? "Público" : "Privado"}</span>
                </div>
                <div className="text-xs bg-teal-600 px-2 py-1 rounded-full">
                  {formData.categoria || "Sem categoria"}
                </div>
              </div>

              {/* Título */}
              <div className="bg-gray-500/50 rounded p-2 mb-3 text-center">{formData.titulo || "Título"}</div>

              {/* Conteúdo */}
              <div className="bg-gray-500/30 rounded p-3 mb-3 min-h-32 max-h-60 overflow-y-auto">
                {formData.conteudo ? (
                  <p className="whitespace-pre-line">{formData.conteudo}</p>
                ) : (
                  <>
                    <div className="border-b border-gray-400 my-2"></div>
                    <div className="border-b border-gray-400 my-2"></div>
                    <div className="border-b border-gray-400 my-2"></div>
                    <div className="border-b border-gray-400 my-2"></div>
                  </>
                )}
              </div>

              {/* Fonte */}
              <div className="bg-gray-500/50 rounded p-2 mb-3 text-center">{formData.fonte || "Fonte"}</div>

              {/* Tags */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
