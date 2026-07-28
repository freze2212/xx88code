'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  autoCloseMs?: number;
  // 'success' = dấu tích, 'error' = dấu chấm than / thất bại
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
      className="fixed inset-0 z-[2147483647] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Card Popup Aquarium */}
      <div className="relative z-10 flex w-[330px] h-[317px] sm:w-[450px] sm:h-[432px] md:w-[560px] md:h-[538px] items-center justify-center select-none">
        {/* Background Image (Shark Frame) */}
        <img
          src="/images/ui-aquarium/bg-popup.png"
          alt="Popup Background"
          className="absolute inset-0 h-full w-full object-contain filter drop-shadow-2xl"
        />

        {/* Close Button X (Top-Right) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[6.5%] right-[6.5%] sm:top-[7%] sm:right-[7%] z-20 flex h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/30 active:scale-90 transition-all"
          aria-label="Đóng"
        >
          <span className="sr-only">Close</span>
        </button>

        {/* Popup Inner Content Container (Pushed down ~20% lower, evenly spaced and centered vertically) */}
        <div className="absolute top-[28%] sm:top-[30%] md:top-[31%] bottom-[21%] sm:bottom-[22%] md:bottom-[23%] inset-x-[8%] flex flex-col items-center justify-center space-y-2 sm:space-y-3 md:space-y-3.5 text-center z-10">
          
          {/* 1. Header Title Image: text-nhapcode.png */}
          <div className="flex justify-center w-full">
            <img
              src="/images/ui-aquarium/text-nhapcode.png"
              alt="NHẬP MÃ CODE"
              className="h-auto w-[115px] sm:w-[150px] md:w-[185px] object-contain filter drop-shadow-md"
            />
          </div>

          {/* 2. Subtitle Image: text-done.png / text-retry.png */}
          <div className="flex justify-center w-full">
            <img
              src={isError ? '/images/ui-aquarium/text-retry.png' : '/images/ui-aquarium/text-done.png'}
              alt={isError ? 'THẤT BẠI!' : 'THÀNH CÔNG!'}
              className="h-auto w-[100px] sm:w-[135px] md:w-[165px] object-contain filter drop-shadow-md"
            />
          </div>

          {/* 3. Status Icon: icon-done.png / icon-failed.png */}
          <div className="flex items-center justify-center w-full">
            <img
              src={isError ? '/images/ui-aquarium/icon-failed.png' : '/images/ui-aquarium/icon-done.png'}
              alt={isError ? 'Icon Thất bại' : 'Icon Thành công'}
              className="h-auto w-[90px] sm:w-[122px] md:w-[150px] object-contain filter drop-shadow-lg"
            />
          </div>

          {/* 4. Message Text Content */}
          <div className="w-full px-2">
            <div className="text-xs sm:text-sm md:text-base font-bold text-[#FFE875] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-tight">
              {children}
            </div>
          </div>
        </div>

        {/* Action Button at Bottom (XÁC NHẬN / THỬ LẠI) */}
        <div className="absolute bottom-[6.5%] sm:bottom-[7%] left-1/2 -translate-x-1/2 z-20">
          <button
            type="button"
            onClick={onClose}
            className="transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer block"
            aria-label={isError ? 'Thử lại' : 'Xác nhận'}
          >
            <img
              src={isError ? '/images/ui-aquarium/btn-retry.png' : '/images/ui-aquarium/btn-accept.png'}
              alt={isError ? 'Nút Thử lại' : 'Nút Xác nhận'}
              className="h-auto w-[130px] sm:w-[175px] md:w-[215px] object-contain filter drop-shadow-lg"
            />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
