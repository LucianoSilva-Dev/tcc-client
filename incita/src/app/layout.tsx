import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/../components/header"
import { RepertorioProvider } from "@/../contexts/repertorio-context"
import { CitacaoProvider } from "@/../contexts/citacao-context"
import { ToastContainer } from "react-toastify"
import "./globals.css"
import { AuthProvider } from "../../contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Incita - Turbine suas redações",
  description: "Plataforma para praticar e melhorar suas redações",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <RepertorioProvider>
            <CitacaoProvider>
              <Header />
              {children}
              <ToastContainer theme="light" autoClose={5000} />
            </CitacaoProvider>
          </RepertorioProvider>
        </AuthProvider>

      </body>
    </html>
  )
}
