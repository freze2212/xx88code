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

export default function PopUpSuggest({
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
      <div className="relative z-10 w-[92%] max-w-[380px] border-[10px] border-solid border-[#02ABED] rounded-[32px] bg-gradient-to-b from-[#E6F6FF] to-[#FFFFFF] p-[3px] shadow-2xl">
        <div className="rounded-[28px] gap-3 bg-white px-6 pt-4 pb-3 md:px-8 md:pt-7 md:pb-8 flex flex-col items-center text-center">
          {/* Icon trạng thái (✓ hoặc !) */}
          <div className="mb-4 flex justify-center">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full ${
                isError ? 'bg-red-500' : 'bg-[#00AEEF]'
              }`}
            >
              <span className="text-5xl font-bold text-white leading-none">
                {isError ? '!' : '✓'}
              </span>
            </div>
          </div>

          {/* Nội dung */}
          <div className="mb-6 px-1">
            <p
              className={`text-sm md:text-base font-semibold leading-relaxed ${
                isError ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {children}
            </p>
          </div>

          {/* Nút xác nhận */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-w-[180px] items-center justify-center rounded-full px-8 py-2.5 text-sm md:text-base font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110 active:scale-95"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #33C6FA 0%, #02abed 70%)'
            }}
            aria-label="Xác nhận"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
