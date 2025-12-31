'use client';

import { useIsDesktop } from '@/hooks/useIsDesktop';
import Image from 'next/image';

export function InputBg() {
  const isDesktop = useIsDesktop(1024);
  const handleImageClick = () => {
    alert('Bạn đã click vào ảnh!');
  };
  return (
    <>
      {isDesktop ? (
        <section>
          {/* PC */}
          <div className="relative mb-12 flex items-center justify-center">
            <Image
              src="/images/body/pc-input.png"
              alt="XX88 Logo"
              width={1384}
              height={644}
            />

            <button
              onClick={handleImageClick}
              className="btn-hover absolute left-1/2 top-[500px] z-10 -translate-x-1/2"
            >
              <Image
                src="/images/body/pc-button.png"
                alt="XX88 Logo"
                width={416}
                height={177}
              />
            </button>
            {/* code */}
            <form className="absolute left-1/2 top-[155px] z-10 w-full max-w-sm -translate-x-1/2 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Tên tài khoản
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên tài khoản"
                  className="
        w-full rounded-md border border-gray-300
        px-4 py-3 text-sm
        focus:border-yellow-400 focus:outline-none
        focus:ring-2 focus:ring-yellow-300
      "
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Mã code
                </label>
                <input
                  type="text"
                  placeholder="Nhập mã code"
                  className="
        w-full rounded-md border border-gray-300
        px-4 py-3 text-sm
        focus:border-yellow-400 focus:outline-none
        focus:ring-2 focus:ring-yellow-300
      "
                />
              </div>
            </form>
          </div>
        </section>
      ) : (
        <section>
          {/* MOBILE */}
          <div className="relative flex flex-col items-center justify-center">
            <Image
              src="/images/body/mb-input.png"
              alt="XX88 Logo"
              width={418.96}
              height={341}
            />

            <button
              onClick={handleImageClick}
              className="absolute left-1/2 top-[242px] z-10 -translate-x-1/2"
            >
              <Image
                src="/images/body/mb-button.png"
                alt="XX88 Logo"
                width={244.24}
                height={103.97}
              />
            </button>

            <Image
              src="/images/body/mb-horse.png"
              alt="XX88 Logo"
              width={310.47}
              height={316.44}
              className="absolute top-[297px]"
            />
          </div>
        </section>
      )}
    </>
  );
}
