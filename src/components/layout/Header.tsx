/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm border-b border-[#FFFFFF38] h-[57px] md:h-[80px] flex items-center header-bg">
      <div className="container mx-auto px-2 py-2 md:px-4 md:py-3">
        {/* MOBILE VERSION */}
        <div className="flex lg:hidden items-center justify-between gap-4 w-full">
          <Link href="https://53333.COM" className="flex items-center gap-2">
            <img
              src="/images/header/logo.png"
              alt="Logo"
              className="h-[28px] md:h-[30px] w-auto object-contain"
              draggable={false}
            />
            {/* Main Logo GIF */}
            <img
              src="/images/header/main-logo.gif"
              alt="Main Logo"
              className="h-[30px] md:h-[36px] w-auto object-contain"
              draggable={false}
            />
          </Link>
          {/* Home Button */}
          <Link
            href="https://www.xx88live.me/"
            className="flex items-center"
          >
            <img
              src="/images/header/button.png"
              alt="Home"
              className="h-[30px] min-[430px]:h-[35px] w-auto object-contain"
            />
          </Link>
        </div>

        {/* DESKTOP VERSION */}
        <div className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center px-2 md:px-0">
          {/* LEFT: desktop logos */}
          <div className="flex items-center gap-2">
            <Link href="https://XX88A1.COM" className="flex items-center gap-3">
              <img
                src="/images/header/logo.png"
                alt="Logo"
                className="h-[45px] w-auto object-contain"
                draggable={false}
                style={{ transform: "translate(4px , 4px)" }}
              />
              {/* Main Logo GIF */}
              <img
                src="/images/header/main-logo.gif"
                alt="Main Logo"
                className="h-[60px] w-auto object-contain"
                draggable={false}
                style={{ transform: "translate(4px , 4px)" }}
              />
            </Link>
          </div>

          {/* CENTER: empty space */}
          <div className="flex items-center justify-center"></div>

          {/* RIGHT: Home Button */}
          <div className="flex items-center justify-end min-w-[140px] md:min-w-[200px]">
            <Link
              href="https://www.xx88live.me/"
              className="hover:brightness-110 active:scale-95 transition-all"
            >
              <img
                src="/images/header/button-main.png"
                alt="Trang Chủ"
                className="h-[70px] w-auto object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

