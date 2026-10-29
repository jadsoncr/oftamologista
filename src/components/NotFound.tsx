import React from 'react';

export const NotFound: React.FC = () => {
  return (
    <section className="bg-[#F8F7F3] py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <p className="text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#58656A] mb-4">
          Página não encontrada
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#173B43] tracking-tight leading-[1.15]">
          Este endereço não faz parte do site.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-[#58656A] leading-relaxed max-w-xl">
          A consulta, o exame de vista e as informações do consultório estão na página inicial.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center px-7 py-3.5 text-xs font-semibold tracking-wide text-white bg-[#173B43] hover:bg-[#112C32] rounded-md transition-colors"
        >
          Voltar à página inicial
        </a>
      </div>
    </section>
  );
};
