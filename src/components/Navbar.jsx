import { useState } from 'react';
import { BookOpen, Menu, PenTool, QrCode, X } from 'lucide-react';

const NAV_LINKS = [
  { id: 'thu-12a2', label: 'Thư Gửi Cô 12A2' },
  { id: 'ky-uc', label: 'Hành Trình Tri Ân' },
  { id: 'luu-but', label: 'Bức Tường Lưu Bút' },
  { id: 'danh-ngon', label: 'Lời Vàng Ý Ngọc' },
];

export default function Navbar({ activePage, onNavigate, onOpenQr }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (sectionId) => {
    setMobileOpen(false);
    onNavigate('home', sectionId);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E1D1B]/10 bg-[#FAF6EE]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-2.5 text-left"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1B3B2B] text-[#FAF6EE] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <BookOpen className="h-4 w-4 text-[#E8C57B]" />
          </span>
          <div className="leading-tight">
            <span className="block font-serif text-base font-bold tracking-tight text-[#1E1D1B]">
              Tri Ân 20/11
            </span>
            <span className="block text-[11px] font-medium tracking-wider text-[#66615B] uppercase">
              Ngày Nhà Giáo Việt Nam
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleLinkClick(item.id)}
              className="text-sm font-medium text-[#4A4640] transition-colors hover:text-[#C85A32]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenQr}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#1E1D1B]/15 bg-[#FAF6EE] px-3.5 py-2 text-sm font-medium text-[#1E1D1B] transition hover:border-[#C85A32]/50 hover:bg-[#F3ECE0]"
            title="Tạo mã QR chia sẻ"
          >
            <QrCode className="h-4 w-4 text-[#C85A32]" />
            <span className="hidden sm:inline">Mã QR</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onNavigate(activePage === 'studio' ? 'home' : 'studio');
            }}
            className="hidden items-center gap-2 rounded-full bg-[#1B3B2B] px-4 py-2 text-sm font-medium text-[#FAF6EE] shadow-sm transition-all hover:bg-[#26503B] hover:shadow-md sm:inline-flex"
          >
            <PenTool className="h-3.5 w-3.5 text-[#E8C57B]" />
            {activePage === 'studio' ? 'Về Trang Chủ' : 'Tạo Thiệp Riêng'}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#1E1D1B]/15 text-[#1E1D1B] md:hidden"
            aria-label="Mở menu điều hướng"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="border-t border-[#1E1D1B]/10 bg-[#FAF6EE] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                className="rounded-lg px-3 py-2 text-left text-sm font-medium text-[#1E1D1B] hover:bg-[#F3ECE0]"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onNavigate('studio');
              }}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#1B3B2B] px-4 py-2.5 text-sm font-medium text-[#FAF6EE]"
            >
              <PenTool className="h-4 w-4 text-[#E8C57B]" />
              Tạo Thiệp Riêng
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
