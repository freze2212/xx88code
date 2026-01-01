'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  autoCloseMs?: number;
  // 'success' = dấu tích, 'error' = dấu chấm than
  variant?: 'success' | 'error';
  children?: React.ReactNode;
};

export default function PopUpSuggestTet({
  open,
  onClose,
  title = 'Thông báo',
  autoCloseMs,
  variant = 'success',
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

  const isError = variant === 'error';

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Card */}
      <div className="relative z-10">
        <img
          src="/images/popup-bg.png"
          alt="Popup Background"
          className="relative h-[305px] w-[325px] md:h-[578px] md:w-[618px]"
        />
        {/* <div className="absolute left-1/2 top-[29%] -translate-x-1/2 md:top-[29%]"> */}
        {/* Icon trạng thái (✓ hoặc !) */}
        <div className="mb-2 flex justify-center">
          {isError ? (
            <img
              src="/images/popup-warning.png"
              alt="Warning Icon"
              className="absolute left-1/2 top-[25%] h-[70px] w-[70px] -translate-x-1/2 md:top-[25%] md:h-[162px] md:w-[162px]"
            />
          ) : (
            <img
              src="/images/popup-v-tick.png"
              alt="V-Tick Icon"
              className="absolute left-1/2 top-[25%] h-[85px] w-[85px] -translate-x-1/2 md:top-[25%] md:h-[162px] md:w-[162px]"
            />
          )}
        </div>

        {/* Nội dung */}
        <div className="absolute left-1/2 top-[50%] mb-1 -translate-x-1/2 px-1 md:top-[55%] md:mb-6">
          <p
            className={`text-sm font-semibold leading-relaxed md:text-base ${
              isError ? 'text-white' : 'text-[#FFA100]'
            }`}
          >
            {children}
          </p>
        </div>

        {/* Nút xác nhận */}
        <button
          type="button"
          onClick={onClose}
          className="absolute left-1/2 top-[65%] h-[86px] w-[203px] -translate-x-1/2 transition hover:brightness-110 active:scale-95 md:top-[65%] md:h-[163px] md:w-[385px]"
          aria-label="Xác nhận"
        >
          <img
            className="h-auto w-full"
            src="/images/popup-btn.png"
            alt="Nút xác nhận"
          />
        </button>
      </div>
      {/* </div> */}
    </div>,
    document.body
  );
}
