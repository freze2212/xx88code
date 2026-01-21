import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <header className="mb-10px relative z-40 pt-[14px] md:flex md:flex-col md:items-center md:justify-center lg:pt-[42px]">
      <div className="flex justify-center">
        <Link
          href="https://pc-xx88-link.rr88tino.workers.dev/"
          className="btn-hover mb-3 lg:absolute lg:right-[30px] lg:top-[42px]"
        >
          <Image
            src="/images/btn-home.png"
            alt="Trang Chủ"
            width={201}
            height={41}
            className="rounded-md"
          />
        </Link>
      </div>

      {/* Logo */}
      <picture className="flex items-center justify-center">
        <source srcSet="/images/xx88.png" media="(min-width: 1024px)" />
        <Image
          src="/images/mb-xx88.png"
          alt="Logo XX88"
          width="300"
          height="120"
        />
      </picture>
    </header>
  );
}

export default Header;
