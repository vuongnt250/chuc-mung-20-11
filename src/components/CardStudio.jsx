import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Check, Copy, Download, Palette, Send, Sparkles } from 'lucide-react';
import { CARD_THEMES, SUGGESTED_WISHES, WISH_CATEGORIES } from '../data/wishesData';
import { exportCardAsPng } from '../utils/cardExporter';
import { getCardDraft, saveCardDraft } from '../services/databaseService';

export default function CardStudio({ onPinToWall, onBackHome, onViewWall }) {
  const initialDraft = getCardDraft();
  const [selectedThemeId, setSelectedThemeId] = useState(
    initialDraft?.selectedThemeId || CARD_THEMES[0].id
  );
  const [category, setCategory] = useState(initialDraft?.category || 'chu-nhiem');
  const [teacherName, setTeacherName] = useState(
    initialDraft?.teacherName ?? 'Cô Giáo Chủ Nhiệm 12A2'
  );
  const [senderName, setSenderName] = useState(initialDraft?.senderName ?? 'Thành viên 12A2');
  const [message, setMessage] = useState(
    initialDraft?.message ?? SUGGESTED_WISHES[0].text
  );

  useEffect(() => {
    saveCardDraft({ selectedThemeId, category, teacherName, senderName, message });
  }, [selectedThemeId, category, teacherName, senderName, message]);
  const [copied, setCopied] = useState(false);
  const [pinnedToast, setPinnedToast] = useState(false);
  const [exporting, setExporting] = useState(false);

  const activeTheme = CARD_THEMES.find((t) => t.id === selectedThemeId) || CARD_THEMES[0];

  const handleSelectWish = (wish) => {
    setCategory(wish.category);
    setMessage(wish.text);
  };

  const handleCopy = async () => {
    const fullText = `Kính gửi ${teacherName || 'Thầy/Cô'},\n\n${message}\n\nTrân trọng,\n${senderName || 'Học trò'}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const handleDownload = async () => {
    setExporting(true);
    try {
      await exportCardAsPng({
        theme: activeTheme,
        teacherName,
        senderName,
        message,
      });
    } finally {
      setExporting(false);
    }
  };

  const handlePin = () => {
    if (!message.trim()) return;
    onPinToWall({
      id: `user-${Date.now()}`,
      teacherName: teacherName.trim() || 'Quý Thầy Cô',
      senderName: senderName.trim() || 'Một người học trò',
      category,
      themeId: selectedThemeId,
      message: message.trim(),
      likes: 1,
      date: '20/11',
    });

    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#C85A32', '#C6933A', '#1B3B2B', '#FAF6EE'],
    });

    setPinnedToast(true);
    setTimeout(() => setPinnedToast(false), 3000);
  };

  return (
    <section id="tao-thiep" className="min-h-[82vh] py-12 sm:py-16 paper-grain">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 rounded-full border border-[#1E1D1B]/15 bg-[#FFFDF9] px-4 py-2 text-xs font-semibold text-[#1E1D1B] transition hover:border-[#C85A32]/50 hover:text-[#C85A32]"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Trang Chủ 20/11
          </button>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C85A32] uppercase">
              <Palette className="h-3.5 w-3.5" />
              Xưởng Thiệp 20/11
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1E1D1B] sm:text-4xl">
              Tự Tay Thiết Kế Tấm Thiệp Tri Ân
            </h2>
            <p className="mt-2 text-base text-[#57524C]">
              Chọn mẫu giấy, viết lời chúc chân thành, tải về làm ảnh kỷ niệm hoặc ghim lên Bức
              Tường Lưu Bút.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Form Controls */}
          <div className="space-y-6 rounded-3xl border border-[#1E1D1B]/10 bg-[#FFFDF9] p-6 shadow-sm lg:col-span-5 sm:p-7">
            {/* Theme Picker */}
            <div>
              <label className="block text-xs font-semibold tracking-wider text-[#66615B] uppercase">
                1. Chọn chất liệu thiệp
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                {CARD_THEMES.map((theme) => {
                  const selected = theme.id === selectedThemeId;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedThemeId(theme.id)}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        selected
                          ? 'border-[#C85A32] bg-[#C85A32]/8 ring-1 ring-[#C85A32]'
                          : 'border-[#1E1D1B]/10 bg-[#FAF6EE]/60 hover:border-[#1E1D1B]/30'
                      }`}
                    >
                      <span className="block text-xs font-semibold text-[#1E1D1B]">
                        {theme.name}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-[#66615B]">
                        {theme.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recipient & Sender */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="teacher-name"
                  className="block text-xs font-semibold tracking-wider text-[#66615B] uppercase"
                >
                  Kính gửi Thầy / Cô
                </label>
                <input
                  id="teacher-name"
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="VD: Cô Lan Anh"
                  className="mt-1.5 w-full rounded-xl border border-[#1E1D1B]/15 bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#1E1D1B] outline-none transition focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/15"
                />
              </div>
              <div>
                <label
                  htmlFor="sender-name"
                  className="block text-xs font-semibold tracking-wider text-[#66615B] uppercase"
                >
                  Người gửi
                </label>
                <input
                  id="sender-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="VD: Tập thể 12A1"
                  className="mt-1.5 w-full rounded-xl border border-[#1E1D1B]/15 bg-[#FAF6EE] px-3.5 py-2.5 text-sm text-[#1E1D1B] outline-none transition focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/15"
                />
              </div>
            </div>

            {/* Quick Suggested Wishes */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold tracking-wider text-[#66615B] uppercase">
                  2. Gợi ý lời chúc hay
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Phân loại người nhận"
                  className="rounded-lg border border-[#1E1D1B]/15 bg-[#FAF6EE] px-2.5 py-1 text-xs font-medium text-[#1E1D1B] outline-none"
                >
                  {WISH_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {SUGGESTED_WISHES.map((wish) => (
                  <button
                    key={wish.id}
                    type="button"
                    onClick={() => handleSelectWish(wish)}
                    className="inline-flex items-center gap-1 rounded-full border border-[#1E1D1B]/12 bg-[#FAF6EE] px-3 py-1 text-xs font-medium text-[#4A4640] transition hover:border-[#C85A32]/50 hover:text-[#C85A32]"
                  >
                    <Sparkles className="h-3 w-3 text-[#C6933A]" />
                    {wish.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message */}
            <div>
              <label
                htmlFor="wish-message"
                className="block text-xs font-semibold tracking-wider text-[#66615B] uppercase"
              >
                3. Lời nhắn gửi của bạn
              </label>
              <textarea
                id="wish-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Viết những điều bạn muốn gửi gắm đến Thầy Cô..."
                className="mt-1.5 w-full resize-none rounded-xl border border-[#1E1D1B]/15 bg-[#FAF6EE] p-3.5 text-sm leading-relaxed text-[#1E1D1B] outline-none transition focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/15"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={handlePin}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C85A32] px-5 py-3 text-sm font-semibold text-[#FAF6EE] shadow-sm transition hover:bg-[#B24B26]"
              >
                <Send className="h-4 w-4" />
                Ghim Lên Lưu Bút
              </button>

              <button
                type="button"
                onClick={handleDownload}
                disabled={exporting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1B3B2B] px-5 py-3 text-sm font-semibold text-[#FAF6EE] shadow-sm transition hover:bg-[#254E39] disabled:opacity-60"
              >
                <Download className="h-4 w-4 text-[#E8C57B]" />
                {exporting ? 'Đang xuất...' : 'Tải Ảnh PNG'}
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#1E1D1B]/15 bg-[#FAF6EE] px-4 py-3 text-sm font-medium text-[#1E1D1B] transition hover:bg-[#F3ECE0]"
                title="Sao chép lời chúc"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[#1B3B2B]" />
                    Đã chép
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Sao chép
                  </>
                )}
              </button>
            </div>

            {pinnedToast && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#1B3B2B]/10 px-4 py-2.5 text-xs font-medium text-[#1B3B2B]">
                <span>Lời chúc đã được ghim lên Bức Tường Lưu Bút!</span>
                <button
                  type="button"
                  onClick={onViewWall}
                  className="font-semibold underline hover:text-[#C85A32]"
                >
                  Xem ngay →
                </button>
              </div>
            )}
          </div>

          {/* Right Live Card Preview */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div
                className={`relative overflow-hidden rounded-3xl border-2 p-8 shadow-xl transition-all duration-300 sm:p-12 ${activeTheme.bgClass} ${activeTheme.borderClass}`}
              >
                {/* Inner hairline frame */}
                <div
                  className="pointer-events-none absolute inset-4 rounded-2xl border opacity-30"
                  style={{ borderColor: activeTheme.accentColor }}
                />

                <div className="relative z-10 flex min-h-[380px] flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-widest uppercase ${activeTheme.badgeClass}`}
                    >
                      Ngày Nhà Giáo Việt Nam • 20/11
                    </span>
                    <span
                      className="font-serif text-sm italic opacity-80"
                      style={{ color: activeTheme.accentColor }}
                    >
                      Tri Ân
                    </span>
                  </div>

                  <div className="my-8 space-y-5 text-center sm:px-4">
                    <h3 className="font-serif text-2xl font-bold sm:text-3xl">
                      Kính gửi {teacherName || 'Thầy / Cô kính mến'},
                    </h3>
                    <p className="text-base leading-relaxed opacity-90 sm:text-lg">
                      {message || 'Hãy nhập lời chúc của bạn ở khung bên trái...'}
                    </p>
                  </div>

                  <div className="flex items-end justify-between border-t border-current/15 pt-6">
                    <div>
                      <span className="block text-xs opacity-75">Trân trọng & Tri ân,</span>
                      <span className="mt-1 block font-script text-3xl font-bold">
                        {senderName || 'Học trò của Thầy/Cô'}
                      </span>
                    </div>

                    <div
                      className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 font-serif"
                      style={{
                        borderColor: activeTheme.accentColor,
                        color: activeTheme.accentColor,
                      }}
                    >
                      <span className="text-xs font-bold leading-none">20.11</span>
                      <span className="mt-0.5 text-[9px] tracking-wider uppercase">VN</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-[#66615B]">
                Xem trước trực tiếp • Nhấn “Tải Ảnh PNG” để lưu thiệp chất lượng cao 1200×800px
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
