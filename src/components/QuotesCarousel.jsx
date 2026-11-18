import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { FAMOUS_QUOTES } from '../data/wishesData';

export default function QuotesCarousel() {
  const [index, setIndex] = useState(0);
  const current = FAMOUS_QUOTES[index];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + FAMOUS_QUOTES.length) % FAMOUS_QUOTES.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % FAMOUS_QUOTES.length);
  };

  return (
    <section id="danh-ngon" className="py-16 sm:py-24 paper-grain">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border-4 border-[#6B4B2A] p-8 text-[#FAF6EE] chalkboard-surface sm:p-14">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#E8C57B] uppercase">
              <Quote className="h-4 w-4" />
              Lời Vàng Ý Ngọc
            </span>
            <span className="text-xs font-medium text-[#D3DDD6]/80">
              {index + 1} / {FAMOUS_QUOTES.length}
            </span>
          </div>

          <div className="my-10 min-h-[140px]">
            <blockquote className="font-serif text-2xl leading-relaxed italic text-[#FAF6EE] sm:text-3xl">
              {current.quote}
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="font-semibold text-[#E8C57B]">— {current.author}</span>
              <span className="text-xs text-[#D3DDD6]/75">• {current.note}</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#FAF6EE]/15 pt-6">
            <div className="flex gap-2">
              {FAMOUS_QUOTES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setIndex(idx)}
                  aria-label={`Chuyển đến danh ngôn ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === index ? 'w-7 bg-[#E8C57B]' : 'w-2 bg-[#FAF6EE]/30 hover:bg-[#FAF6EE]/50'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Danh ngôn trước"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FAF6EE]/20 bg-[#FAF6EE]/5 text-[#FAF6EE] transition hover:bg-[#FAF6EE]/15"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Danh ngôn tiếp theo"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FAF6EE]/20 bg-[#FAF6EE]/5 text-[#FAF6EE] transition hover:bg-[#FAF6EE]/15"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
