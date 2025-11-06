'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

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
      <div className="relative z-10 w-[92%] max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full px-2 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-100"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>
        <div className="text-gray-800">{children}</div>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="rounded-full bg-[#00AEEF] px-4 py-2 font-bold text-white hover:opacity-90"
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
