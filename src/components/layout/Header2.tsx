import Image from 'next/image';
import Link from 'next/link';

export function Header2() {
  return (
    <header className="mb-10px relative pt-[14px] md:flex md:flex-col md:items-center md:justify-center lg:pt-[42px]">
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
        <img
          src="/images/mb-xx88.png"
          alt="Logo XX88"
          width="300"
          height="120"
        />
      </picture>
    </header>
  );
}

// <Link href= '#'}>
//   <Image
//     src={item.icon}
//     alt={item.name}
//     width={40}
//     height={40}
//     className="h-10 w-10"
//   />
// </Link>
