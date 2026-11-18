import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Check, Copy, Download, Link2, QrCode, X } from 'lucide-react';

export default function QrShareModal({ isOpen, onClose, targetUrl, title }) {
  const [url, setUrl] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      setUrl(targetUrl || window.location.href);
    }
  }, [isOpen, targetUrl]);

  useEffect(() => {
    if (!isOpen || !url.trim()) {
      setQrDataUrl('');
      return;
    }

    let cancelled = false;
    QRCode.toDataURL(url.trim(), {
      width: 520,
      margin: 2,
      color: {
        dark: '#1B3B2B',
        light: '#FAF6EE',
      },
      errorCorrectionLevel: 'M',
    })
      .then((dataUrl) => {
        if (!cancelled) setQrDataUrl(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl('');
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, url]);

  if (!isOpen) return null;

  const isLocalhost = url.includes('localhost') || url.includes('127.0.0.1');

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard errors
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = 'ma-qr-tri-an-20-11.png';
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#12281D]/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
    >
      <div className="relative w-full max-w-md rounded-3xl border border-[#1E1D1B]/15 bg-[#FFFDF9] p-6 shadow-2xl sm:p-7 animate-fade-in-up">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng hộp thoại mã QR"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-[#66615B] transition hover:bg-[#F3ECE0] hover:text-[#1E1D1B]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 text-[#C85A32]">
          <QrCode className="h-5 w-5" />
          <span className="text-xs font-semibold tracking-widest uppercase">
            Chia Sẻ Qua Mã QR
          </span>
        </div>

        <h3 id="qr-modal-title" className="mt-2 font-serif text-2xl font-bold text-[#1E1D1B]">
          {title || 'Quét Mã Để Mở Trang 20/11'}
        </h3>
        <p className="mt-1 text-sm text-[#57524C]">
          Dán link GitHub Pages / Vercel của bạn hoặc dùng link hiện tại để tạo mã QR cho bạn bè
          quét.
        </p>

        {/* QR Code Display */}
        <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-[#1E1D1B]/10 bg-[#FAF6EE] p-5">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Mã QR dẫn tới trang web Tri Ân 20/11"
              className="h-52 w-52 rounded-xl border border-[#1B3B2B]/15 shadow-sm"
            />
          ) : (
            <div className="flex h-52 w-52 items-center justify-center rounded-xl border border-dashed border-[#1E1D1B]/20 text-xs text-[#66615B]">
              Nhập đường dẫn để tạo mã QR
            </div>
          )}
          <span className="mt-3 font-serif text-sm italic text-[#1B3B2B]">
            “Tri Ân Ngày Nhà Giáo Việt Nam 20/11”
          </span>
        </div>

        {/* URL Input */}
        <div className="mt-5">
          <label
            htmlFor="qr-url-input"
            className="block text-xs font-semibold tracking-wider text-[#66615B] uppercase"
          >
            Đường dẫn trang web
          </label>
          <div className="relative mt-1.5">
            <Link2 className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#66615B]" />
            <input
              id="qr-url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ten-ban.github.io/chuc-mung-20-11/"
              className="w-full rounded-xl border border-[#1E1D1B]/15 bg-[#FAF6EE] py-2.5 pr-3.5 pl-10 text-sm text-[#1E1D1B] outline-none transition focus:border-[#1B3B2B]"
            />
          </div>
          {isLocalhost && (
            <p className="mt-2 text-xs text-[#C85A32]">
              Đang dùng link localhost (chỉ xem trên máy bạn). Khi up lên GitHub Pages, hãy dán
              link công khai vào đây để bạn bè quét được nhé!
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={handleDownloadQr}
            disabled={!qrDataUrl}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1B3B2B] px-4 py-2.5 text-sm font-semibold text-[#FAF6EE] transition hover:bg-[#254E39] disabled:opacity-50"
          >
            <Download className="h-4 w-4 text-[#E8C57B]" />
            Tải Mã QR (PNG)
          </button>

          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#1E1D1B]/15 bg-[#FAF6EE] px-4 py-2.5 text-sm font-medium text-[#1E1D1B] transition hover:bg-[#F3ECE0]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[#1B3B2B]" />
                Đã chép
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Chép link
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
