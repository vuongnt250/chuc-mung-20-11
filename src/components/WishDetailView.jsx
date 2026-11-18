import { useState } from 'react';
import { ArrowLeft, Download, Heart, QrCode } from 'lucide-react';
import { CARD_THEMES, WISH_CATEGORIES } from '../data/wishesData';
import { exportCardAsPng } from '../utils/cardExporter';

export default function WishDetailView({
  post,
  isLiked,
  onToggleLike,
  onOpenQr,
  onBackHome,
}) {
  const [exporting, setExporting] = useState(false);

  if (!post) {
    return (
      <section className="min-h-[75vh] py-20 paper-grain">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#1E1D1B]">
            Không tìm thấy tấm thiệp này
          </h2>
          <p className="mt-3 text-sm text-[#57524C]">
            Có thể thiệp chưa được đồng bộ lên cloud hoặc đường dẫn không chính xác.
          </p>
          <button
            type="button"
            onClick={onBackHome}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1B3B2B] px-6 py-3 text-sm font-semibold text-[#FAF6EE]"
          >
            <ArrowLeft className="h-4 w-4" />
            Về Trang Chủ 20/11
          </button>
        </div>
      </section>
    );
  }

  const theme = CARD_THEMES.find((t) => t.id === post.themeId) || CARD_THEMES[0];
  const catLabel =
    WISH_CATEGORIES.find((c) => c.id === post.category)?.label || 'Tri Ân 20/11';

  const handleDownload = async () => {
    setExporting(true);
    try {
      await exportCardAsPng({
        theme,
        teacherName: post.teacherName,
        senderName: post.senderName,
        message: post.message,
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <section className="min-h-[82vh] py-12 sm:py-16 paper-grain">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 rounded-full border border-[#1E1D1B]/15 bg-[#FFFDF9] px-4 py-2 text-xs font-semibold text-[#1E1D1B] transition hover:border-[#C85A32]/50 hover:text-[#C85A32]"
          >
            <ArrowLeft className="h-4 w-4" />
            Xem toàn bộ trang 20/11
          </button>

          <span className="rounded-full border border-[#1E1D1B]/12 bg-[#FFFDF9] px-3 py-1 text-xs font-mono text-[#66615B]">
            ID: {post.id}
          </span>
        </div>

        {/* Dedicated Card Display */}
        <div
          className={`relative overflow-hidden rounded-3xl border-2 p-8 shadow-xl sm:p-12 ${theme.bgClass} ${theme.borderClass}`}
        >
          <div
            className="pointer-events-none absolute inset-4 rounded-2xl border opacity-30"
            style={{ borderColor: theme.accentColor }}
          />

          <div className="relative z-10 flex min-h-[360px] flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-widest uppercase ${theme.badgeClass}`}
              >
                {catLabel} • 20/11
              </span>
              <span className="text-xs opacity-75">{post.date}</span>
            </div>

            <div className="my-8 space-y-5 text-center sm:px-4">
              <h1 className="font-serif text-2xl font-bold sm:text-4xl">
                Kính gửi {post.teacherName},
              </h1>
              <p className="text-base leading-relaxed opacity-95 sm:text-lg">
                “{post.message}”
              </p>
            </div>

            <div className="flex items-end justify-between border-t border-current/15 pt-6">
              <div>
                <span className="block text-xs opacity-75">Trân trọng & Tri ân,</span>
                <span className="mt-1 block font-script text-3xl font-bold">
                  {post.senderName}
                </span>
              </div>

              <div
                className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 font-serif"
                style={{
                  borderColor: theme.accentColor,
                  color: theme.accentColor,
                }}
              >
                <span className="text-xs font-bold leading-none">20.11</span>
                <span className="mt-0.5 text-[9px] tracking-wider uppercase">VN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onToggleLike(post.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
              isLiked
                ? 'border-[#C85A32]/40 bg-[#C85A32]/10 text-[#C85A32]'
                : 'border-[#1E1D1B]/15 bg-[#FFFDF9] text-[#1E1D1B] hover:border-[#C85A32]/40'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-[#C85A32] text-[#C85A32]' : ''}`} />
            Thả tim ({post.likes})
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={exporting}
            className="inline-flex items-center gap-2 rounded-full bg-[#1B3B2B] px-5 py-2.5 text-sm font-semibold text-[#FAF6EE] transition hover:bg-[#254E39]"
          >
            <Download className="h-4 w-4 text-[#E8C57B]" />
            {exporting ? 'Đang xuất...' : 'Tải Ảnh PNG'}
          </button>

          <button
            type="button"
            onClick={() => onOpenQr(post)}
            className="inline-flex items-center gap-2 rounded-full border border-[#1E1D1B]/15 bg-[#FFFDF9] px-5 py-2.5 text-sm font-semibold text-[#1E1D1B] transition hover:border-[#C85A32]/50"
          >
            <QrCode className="h-4 w-4 text-[#C85A32]" />
            Mã QR của thiệp này
          </button>
        </div>
      </div>
    </section>
  );
}
