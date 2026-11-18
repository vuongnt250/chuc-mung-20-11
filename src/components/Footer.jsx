import { BookOpen, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1E1D1B]/10 bg-[#1B3B2B] py-12 text-[#FAF6EE]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF6EE]/10">
            <BookOpen className="h-5 w-5 text-[#E8C57B]" />
          </span>
          <div>
            <p className="font-serif text-lg font-bold">Tri Ân Ngày Nhà Giáo Việt Nam 20/11</p>
            <p className="text-xs text-[#D3DDD6]">
              Kính tặng Quý Thầy Cô — Những người thắp sáng tương lai.
            </p>
          </div>
        </div>

        <p className="inline-flex items-center gap-1.5 text-xs text-[#D3DDD6]">
          Thiết kế với lòng biết ơn sâu sắc
          <Heart className="h-3.5 w-3.5 fill-[#C85A32] text-[#C85A32]" />
          20/11
        </p>
      </div>
    </footer>
  );
}
