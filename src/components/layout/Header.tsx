import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const navItems = [
  {
    name: 'Trang Chủ',
    icon: '/images/home.png',
    linkTo: 'https://53333.com/',
  },
  {
    name: 'Liên Hệ',
    icon: '/images/lien-he.png',
    linkTo: 'https://xx88cskh.pages.dev/',
  },
  {
    name: 'Telegram',
    icon: '/images/telegram.png',
    linkTo: 'https://t.me/GIAITRIXX88_official',
  },
  {
    name: 'Fanpage',
    icon: '/images/fanpage.png',
    linkTo: 'https://www.facebook.com/XX88OfficialVN',
  },
];

export function Header() {
  return (
    <header className="absolute top-0 inset-x-0 z-50 md:relative w-full border-b border-gray-200 bg-white shadow-sm">
      {/* Mobile Layout: 2 Rows */}
      <div className="block md:hidden w-full">
        {/* Row 1: Logo Left & Calendar Button Right */}
        <div className="flex h-11 w-full items-center justify-between px-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logos/logo-xx88-kjc.png"
              alt="XX88 - KJC Logo"
              width={116}
              height={34}
              className="w-[116px] h-[34px] object-contain"
              priority
            />
          </Link>
          <button
            type="button"
            className="cursor-pointer active:scale-95 transition-transform"
            aria-label="Calendar"
          >
            <Image
              src="/images/calendar.png"
              alt="Calendar"
              width={26}
              height={26}
              className="h-6 w-6 object-contain"
            />
          </button>
        </div>

        {/* Row 2: 4 Navigation Items Centered (52x52px Icons & Increased Height) */}
        <div className="flex h-[100px] w-full items-center justify-evenly px-2 bg-white">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.linkTo || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center space-y-1 active:scale-95 transition-transform"
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={52}
                height={52}
                className="w-[52px] h-[52px] object-contain"
              />
              <span className="whitespace-nowrap text-xs font-bold text-gray-800">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Layout: 1 Row with 3 Equal Columns */}
      <div className="hidden md:grid h-20 w-full max-w-7xl grid-cols-3 items-center px-6 mx-auto">
        {/* Column 1 (Left): Logo */}
        <div className="flex items-center justify-start flex-shrink-0">
          <Link href="/">
            <Image
              src="/images/logos/logo-xx88-kjc.png"
              alt="XX88 - KJC Logo"
              width={200}
              height={80}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Column 2 (Center): 4 Navigation Icons */}
        <div className="flex items-center justify-center flex-1 mx-4">
          <nav className="flex items-center space-x-6 md:space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.linkTo || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer flex-col items-center space-y-1 transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="h-9 w-9 md:h-10 md:w-10 object-contain"
                />
                <span className="whitespace-nowrap text-xs font-medium text-gray-700 hover:text-[#00AEEE]">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 3 (Right - End Button): Calendar Icon */}
        <div className="flex items-center justify-end flex-shrink-0">
          <button
            type="button"
            className="cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            aria-label="Calendar"
          >
            <Image
              src="/images/calendar.png"
              alt="Calendar"
              width={40}
              height={40}
              className="h-9 w-9 md:h-10 md:w-10 object-contain"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
