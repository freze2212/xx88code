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
      className="fixed inset-0 z-[2147483647] flex items-start justify-center pt-20 md:items-center md:pt-0"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative z-10 w-[100%] max-w-[500px] scale-[1.1] md:scale-100 md:w-[60vw] md:max-w-none transition-transform duration-300 md:-translate-y-10">
        <Image
          src="/images/body/background-modal.png"
          alt="Popup Background"
          width={1000}
          height={600}
          className="h-auto w-full"
          priority
        />
        {/* Content Container (Overlay) */}
        <div className="absolute inset-0 flex flex-col items-center justify-between pl-[25px] pb-[1%] pt-[20%] md:pb-[13px] md:pt-[20%] md:pl-[80px]">
          {/* Icon Section */}
          <div className="relative flex-shrink-0">
            {isError ? (
              <div className="relative h-[45px] w-[45px] md:h-[160px] md:w-[160px]">
                <Image
                  src="/images/body/popup-warning.png"
                  alt="Warning Icon"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="relative h-[45px] w-[45px] md:h-[180px] md:w-[180px]">
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
              className={`text-[11px] font-bold leading-tight md:text-3xl lg:text-3xl ${isError ? 'text-[#070E23]' : 'text-[#070E23]'
                }`}
              style={!isError ? {
                textTransform: 'uppercase',
              } : {}}
            >
              {children}
            </div>
          </div>

          {/* Button Section */}
          <div className="flex-shrink-0 ml-0.4 min-[430px]:mb-0.5 min-[430px]:ml-1 md:mb-0">
            <button
              type="button"
              onClick={onClose}
              className="flex h-[25px] w-[125px] min-[430px]:w-[135px] items-center justify-center rounded-full text-xs md:text-2xl font-bold uppercase text-white transition hover:brightness-110 md:h-[72px] md:w-[370px] md:text-2xl"
              style={{
                background: 'linear-gradient(180deg, #00B1FF 0%, #007AFF 100%)',
                boxShadow: 'inset 0px 2px 6px rgba(255, 255, 255, 0.4), 0px 4px 10px rgba(0, 0, 0, 0.4)',
                textShadow: '0px 2px 2px rgba(0, 0, 0, 0.5)',
              }}
              aria-label="Xác nhận"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>,
    document.body
  );
}
