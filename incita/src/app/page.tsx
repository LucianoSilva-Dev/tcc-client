// app/page.tsx
import { Search, User, Star, MessageCircle } from "lucide-react";

export default function Home() {
  const examples = [
    {
      title: "Título da Citação",
      source: "Fonte da Citação",
      comments: 12,
    },
    {
      title: "CItação 2",
      source: "Fonte 2",
      comments: 8,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F3F4F6]">

      {/* Conteúdo */}
      <section className="flex flex-col items-center justify-center px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#1E2C30] mb-6">
          Display de Citações
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {examples.map((example, index) => (
            <div
              key={index}
              className="bg-[#475A5C] rounded-xl p-4 text-white shadow-lg"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#C1C7C8] w-8 h-8 rounded-full flex items-center justify-center">
                    <User className="text-[#475A5C]" size={18} />
                  </div>
                  <span className="italic text-sm">Exemplo</span>
                </div>

                <Star className="text-[#C1C7C8] cursor-pointer" size={18} />
              </div> 

              <div className="bg-[#475A5C]/50 rounded p-2 text-center text-white mb-2">
                {example.title}
              </div>

              <div className="flex flex-col gap-2 mb-2">
                <div className="bg-[#475A5C]/50 rounded p-2 text-center text-white">
                  <span className="italic">“</span>
                  Citação
                  <span className="italic">”</span>
                </div>
              </div>

              <div className="bg-[#475A5C]/50 rounded p-2 text-center text-white mb-2">
                {example.source}
              </div>

            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
