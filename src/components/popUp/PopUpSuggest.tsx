'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

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
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

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
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative z-10 w-[95%] -translate-x-4 md:translate-x-0 md:w-[60vw]">
        <Image
          src="/images/body/background-modal.png"
          alt="Popup Background"
          width={1000}
          height={600}
          className="h-auto w-full"
          priority
        />
        {/* Content Container (Overlay) */}
        <div className="absolute inset-0 flex flex-col items-center justify-between pb-[4%] pt-[8%] md:pb-[13px] md:pt-[20%]">
          {/* Icon Section */}
          <div className="relative flex-shrink-0">
            {isError ? (
              <div className="relative h-[80px] w-[80px] md:h-[160px] md:w-[160px]">
                <Image
                  src="/images/body/popup-warning.png"
                  alt="Warning Icon"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="relative h-[90px] w-[90px] md:h-[180px] md:w-[180px]">
                <Image
                  src="/images/body/popup-v-tick.png"
                  alt="V-Tick Icon"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Text Section */}
          <div className="flex flex-grow items-center justify-center px-6 text-center md:px-12 md:-mt-10">
            <div
              className={`text-lg font-bold leading-tight md:text-3xl lg:text-3xl ${isError ? 'text-[#070E23]' : 'text-[#070E23]'
                }`}
              style={!isError ? {
                textTransform: 'uppercase',
              } : {}}
            >
              {children}
            </div>
          </div>

          {/* Button Section */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex h-[40px] w-[200px] items-center justify-center rounded-full text-sm font-bold uppercase text-white transition hover:brightness-110 active:scale-95 md:h-[70px] md:w-[370px] md:text-2xl"
              style={{
                background: 'linear-gradient(180deg, #00B1FF 0%, #007AFF 100%)',
                border: '3.5px solid #B0853D',
                boxShadow: '0px 0px 0px 1.5px #F4CF86, inset 0px 2px 6px rgba(255, 255, 255, 0.4), 0px 4px 10px rgba(0, 0, 0, 0.4)',
                textShadow: '0px 2px 2px rgba(0, 0, 0, 0.5)',
              }}
              aria-label="Xác nhận"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
