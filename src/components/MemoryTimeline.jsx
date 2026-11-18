import { useState } from 'react';
import { BookMarked, Quote } from 'lucide-react';
import { MEMORY_CHAPTERS } from '../data/wishesData';

export default function MemoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = MEMORY_CHAPTERS[activeIndex];

  return (
    <section id="ky-uc" className="border-b border-[#1E1D1B]/10 bg-[#F3ECE0]/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C85A32] uppercase">
            <BookMarked className="h-3.5 w-3.5" />
            Hành Trình Tri Ân
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1E1D1B] sm:text-4xl">
            Những Khoảnh Khắc Không Bao Giờ Cũ
          </h2>
          <p className="mt-3 text-base text-[#57524C]">
            Lật lại từng trang ký ức dưới mái trường — nơi có tiếng giảng bài, phấn trắng và
            những bài học theo ta suốt cả cuộc đời.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Chapter Steps */}
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {MEMORY_CHAPTERS.map((chapter, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={chapter.step}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isActive
                      ? 'border-[#1B3B2B] bg-[#1B3B2B] text-[#FAF6EE] shadow-md'
                      : 'border-[#1E1D1B]/10 bg-[#FAF6EE] text-[#1E1D1B] hover:border-[#C85A32]/40 hover:bg-[#FFFDF9]'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold ${
                      isActive
                        ? 'bg-[#E8C57B] text-[#1B3B2B]'
                        : 'bg-[#F3ECE0] text-[#66615B] group-hover:text-[#C85A32]'
                    }`}
                  >
                    {chapter.step}
                  </span>
                  <div>
                    <span
                      className={`block text-[11px] font-semibold tracking-wider uppercase ${
                        isActive ? 'text-[#E8C57B]' : 'text-[#C85A32]'
                      }`}
                    >
                      {chapter.era}
                    </span>
                    <span className="mt-0.5 block font-serif text-base font-semibold">
                      {chapter.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Chapter Detail */}
          <div className="lg:col-span-7">
            <div
              key={current.step}
              className="rounded-3xl border border-[#1E1D1B]/10 bg-[#FFFDF9] p-7 shadow-sm sm:p-10 animate-fade-in-up"
            >
              <div className="flex items-center justify-between border-b border-[#1E1D1B]/10 pb-5">
                <span className="text-xs font-semibold tracking-widest text-[#C85A32] uppercase">
                  Chương {current.step} • {current.era}
                </span>
                <span className="font-serif text-sm italic text-[#66615B]">
                  Ký ức học trò
                </span>
              </div>

              <h3 className="mt-6 font-serif text-2xl font-bold leading-snug text-[#1E1D1B] sm:text-3xl">
                {current.title}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#4A4640]">
                {current.description}
              </p>

              <div className="mt-8 rounded-2xl border-l-4 border-[#C6933A] bg-[#FAF6EE] p-5">
                <Quote className="mb-2 h-5 w-5 text-[#C6933A]" />
                <p className="font-serif text-lg italic text-[#1B3B2B]">{current.quote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
