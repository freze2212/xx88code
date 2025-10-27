import { link } from 'fs';
import Image from 'next/image';
import Link from 'next/link';
export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between sm:h-20">
          {/* Logo - To hơn */}
          <div className="flex-shrink-0">
            <Image
              src="/images/logos/logo-xx88-kjc.png"
              alt="XX88 Logo"
              width={200}
              height={80}
              className="h-12 w-auto sm:h-16"
            />
          </div>

          {/* Desktop Navigation - 5 items */}
          <nav className="hidden space-x-6 md:flex">
            {[
              {
                name: 'Liên Hệ',
                icon: '/images/lien-he.png',
                bgColor: 'bg-green-500',
                linkTo: 'https://xx88cskh.pages.dev/',
              },
              {
                name: 'Telegram',
                icon: '/images/telegram.png',
                bgColor: 'bg-blue-400',
                linkTo: 'https://t.me/GIAITRIXX88_official',
              },
              {
                name: 'Fanpage',
                icon: '/images/fanpage.png',
                bgColor: 'bg-blue-600',
                linkTo: 'https://www.facebook.com/XX88official.com.vn/',
              },
              {
                name: 'Trang Chủ',
                icon: '/images/home.png',
                bgColor: 'bg-blue-400',
                linkTo: 'https://5333.com/',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex cursor-pointer flex-col items-center space-y-1 transition-opacity duration-200 hover:opacity-80"
              >
                <Link href={item.linkTo || '#'}>
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </Link>
                <span className="whitespace-nowrap text-xs font-medium text-gray-700 transition-colors duration-200 hover:text-[#00AEEE]">
                  {item.name}
                </span>
              </div>
            ))}
          </nav>

          {/* Right side buttons - Full width/height */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="cursor-pointer transition-opacity duration-200 hover:opacity-80">
              <Image
                src="/images/calendar.png"
                alt="Calendar"
                width={40}
                height={40}
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
