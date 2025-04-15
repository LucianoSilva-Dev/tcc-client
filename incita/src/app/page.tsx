"use client"

import type React from "react"
import Link from "next/link"

export default function Home() {
  return (
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-center space-x-4 mb-6">
                <Link
                  href="/citar"
                  className="flex items-center px-8 py-2 bg-teal-700 text-white rounded-full hover:bg-teal-800 transition-colors"
                >
                Ver citações
                </Link>
              </div>
              </div>
  )
          {/* Linha divisória */}
          <div className="border-t border-gray-300 mb-10">
          </div>
          
}
