'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  autoCloseMs?: number;
  children?: React.ReactNode;
};

export default function PopUpSuggest({
  open,
  onClose,
  title = 'Thông báo',
  autoCloseMs,
  children,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open || !autoCloseMs) return;
    const t = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(t);
  }, [open, autoCloseMs, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Card nền ảnh */}
      <div className="relative z-10 w-[92%] max-w-[399px] overflow-hidden rounded-2xl shadow-2xl">
        {/* Giữ đúng tỉ lệ ảnh (4:3) */}
        <div className="relative w-full pt-[75%]">
          {/* nền ảnh hiển thị full, không cắt */}
          <Image
            src="/images/popupSuggest.png"
            alt=""
            fill
            sizes="(max-width: 768px) 92vw, 399px"
            className="pointer-events-none select-none object-contain"
            priority
          />

          {/* Nội dung phủ lên ảnh: căn giữa, text-center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
            <div className="w-full">
              {' '}
              <span className="text-[#00AEEF]">{children}</span>
            </div>

            {/* Nút xác nhận */}
            <button
              type="button"
              onClick={onClose}
              className="absolute bottom-[21px] mt-5 inline-flex items-center justify-center rounded-md outline-none focus-visible:ring focus-visible:ring-[#00AEEF]"
              aria-label="Xác nhận"
            >
              <Image
                src="/images/btnXacNhan.png"
                alt="Xác nhận"
                width={220}
                height={56}
                className="h-auto w-[150px] transition hover:scale-95 hover:brightness-110 active:scale-95 md:w-[200px]"
                priority
              />
              <span className="sr-only">Xác nhận</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
