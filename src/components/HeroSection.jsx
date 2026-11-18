import { useEffect, useMemo, useRef } from 'react';
import { ArrowDownRight, CalendarHeart, Feather, Sparkles } from 'lucide-react';

function getCelebrationStatus() {
  const now = new Date();
  const year = now.getFullYear();
  const target = new Date(year, 10, 20); // Nov 20 (month is 0-indexed)
  const todayStart = new Date(year, now.getMonth(), now.getDate());
  const diffDays = Math.round((target - todayStart) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return {
      label: 'Hôm nay là Ngày Nhà giáo Việt Nam 20/11',
      highlight: 'Chúc mừng 20/11',
    };
  }
  if (diffDays > 0) {
    return {
      label: `Còn ${diffDays} ngày nữa đến Lễ Tri Ân 20/11/${year}`,
      highlight: `Hướng về 20/11`,
    };
  }
  return {
    label: `Kỷ niệm Ngày Nhà giáo Việt Nam 20/11/${year}`,
    highlight: 'Mùa Tri Ân',
  };
}

export default function HeroSection({ onOpenStudio }) {
  const canvasRef = useRef(null);
  const status = useMemo(() => getCelebrationStatus(), []);

  // Gentle falling autumn leaves / petals on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petals = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 4 + Math.random() * 6,
      speedY: 0.35 + Math.random() * 0.55,
      speedX: -0.25 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.015,
      color: Math.random() > 0.45 ? 'rgba(200, 90, 50, 0.22)' : 'rgba(198, 147, 58, 0.24)',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of petals) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.25;
        p.angle += p.spin;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-[#1E1D1B]/10 paper-grain">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        {/* Left Editorial Column */}
        <div className="lg:col-span-7 animate-fade-in-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C85A32]/25 bg-[#C85A32]/8 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#C85A32]">
            <CalendarHeart className="h-3.5 w-3.5" />
            <span>{status.label}</span>
          </div>

          <h1 className="font-serif text-4xl leading-[1.12] font-bold tracking-tight text-[#1E1D1B] sm:text-5xl lg:text-6xl">
            Tri Ân Những{' '}
            <span className="relative inline-block italic text-[#C85A32]">
              Người Lái Đò
              <svg
                className="absolute -bottom-1.5 left-0 w-full text-[#C6933A]/60"
                viewBox="0 0 220 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7C58 2 145 2 218 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            Thầm Lặng
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#57524C] sm:text-lg">
            Có những bài học không nằm trong trang sách, mà nằm trong ánh mắt kiên nhẫn,
            giọng nói ấm áp và những mùa phấn trắng thầy cô dành trọn cho biết bao thế hệ học trò.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenStudio}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#1B3B2B] px-6 py-3.5 text-sm font-semibold text-[#FAF6EE] shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#244E39] hover:shadow-lg"
            >
              <Feather className="h-4 w-4 text-[#E8C57B]" />
              Thiết Kế Thiệp Tri Ân
            </button>

            <a
              href="#luu-but"
              className="inline-flex items-center gap-2 rounded-full border border-[#1E1D1B]/20 bg-[#FAF6EE]/80 px-6 py-3.5 text-sm font-semibold text-[#1E1D1B] transition-all hover:border-[#C85A32]/50 hover:bg-[#F3ECE0]"
            >
              Xem Bức Tường Lưu Bút
              <ArrowDownRight className="h-4 w-4 text-[#C85A32]" />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-8 border-t border-[#1E1D1B]/10 pt-6 text-sm text-[#66615B]">
            <div>
              <span className="block font-serif text-2xl font-bold text-[#1B3B2B]">20 / 11</span>
              <span>Ngày Hiến Chương Nhà Giáo</span>
            </div>
            <div className="h-8 w-px bg-[#1E1D1B]/15" />
            <div>
              <span className="block font-serif text-2xl font-bold text-[#C85A32]">1982 – 2026</span>
              <span>44 năm truyền thống Tôn sư trọng đạo</span>
            </div>
          </div>
        </div>

        {/* Right Editorial Chalkboard Preview */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md animate-float-slow">
            {/* Decorative Gold Accent Frame */}
            <div className="absolute -inset-3 rounded-3xl border border-[#C6933A]/30 bg-[#F3ECE0]/60 -rotate-2" />

            <div className="relative rounded-2xl border-4 border-[#6B4B2A] p-7 text-[#FAF6EE] chalkboard-surface sm:p-9">
              <div className="flex items-center justify-between border-b border-[#FAF6EE]/15 pb-4">
                <span className="text-xs font-medium tracking-widest text-[#E8C57B] uppercase">
                  Chào mừng 20/11
                </span>
                <Sparkles className="h-4 w-4 text-[#E8C57B]" />
              </div>

              <div className="my-7 space-y-4">
                <p className="font-serif text-2xl leading-snug italic text-[#FAF6EE] sm:text-3xl">
                  “Một chữ cũng là thầy, nửa chữ cũng là thầy.”
                </p>
                <p className="text-sm leading-relaxed text-[#D3DDD6]">
                  Kính chúc Quý Thầy Cô luôn dồi dào sức khỏe, giữ mãi ngọn lửa yêu nghề và
                  niềm hạnh phúc khi nhìn học trò trưởng thành từng ngày.
                </p>
              </div>

              <div className="flex items-end justify-between border-t border-[#FAF6EE]/15 pt-4">
                <div>
                  <span className="block text-[11px] tracking-wider text-[#D3DDD6]/80 uppercase">
                    Từ những học trò
                  </span>
                  <span className="font-script text-2xl text-[#E8C57B]">
                    Luôn nhớ ơn Thầy Cô
                  </span>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8C57B]/50 font-serif text-xs font-bold text-[#E8C57B]">
                  20.11
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
