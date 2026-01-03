import { link } from 'fs';
import Link from 'next/link';
import React from 'react';

const footerIcon = [
  { src: '/images/footer/icon1.png', alt: 'icon1', link: '#' },
  { src: '/images/footer/icon2.png', alt: 'icon2', link: '#' },
  { src: '/images/footer/icon3.png', alt: 'icon3', link: '#' },
  { src: '/images/footer/icon4.png', alt: 'icon4', link: '#' },
  { src: '/images/footer/icon5.png', alt: 'icon5', link: '#' },
  { src: '/images/footer/icon6.png', alt: 'icon6', link: '#' },
  { src: '/images/footer/icon7.png', alt: 'icon7', link: '#' },
  { src: '/images/footer/icon8.png', alt: 'icon8', link: '#' },
  { src: '/images/footer/icon9.png', alt: 'icon9', link: '#' },
  {
    src: '/images/footer/icon10.png',
    alt: 'icon10',
    link: 'https://www.facebook.com/XX88OfficialVN/',
  },
  {
    src: '/images/footer/icon11.png',
    alt: 'icon11',
    link: 'https://www.youtube.com/@xxtam_tam_official',
  },
  {
    src: '/images/footer/icon12.png',
    alt: 'icon12',
    link: 'https://t.me/addlist/99-lKL2uuPhlYzY8',
  },
];

const footerText = [
  {
    text: 'Giới thiệu về XX88',
    href: '#',
  },
  {
    text: 'Điều khoản',
    href: '#',
  },
  {
    text: 'Chơi có trách nhiệm',
    href: '#',
  },
  {
    text: 'Miễn trách nhiệm',
    href: '#',
  },
  {
    text: 'Quyền riêng tư',
    href: '#',
  },
  {
    text: 'Hướng dẫn nạp rút',
    href: '#',
  },
  {
    text: 'Câu hỏi thường gặp',
    href: '#',
  },
  {
    text: 'Liên hệ',
    href: '#',
  },
];

function FooterTet() {
  return (
    <footer className="bg-[#3C4C52] px-5 py-5 md:py-9">
      <img className="mx-auto" src="/images/footer/logo.png" alt="Logo" />
      <div className="hidden flex-row items-center justify-between gap-1 md:mx-auto md:mb-5 md:mt-[20px] md:flex md:w-[80%] md:px-2">
        {footerText.map((txt, index) => {
          const isLast = index === footerText.length - 1;
          return (
            <div
              key={txt.href}
              className={`${isLast ? '' : 'border-r-2 border-[#A2B5BD]'} pr-2`}
            >
              <a
                href={txt.href}
                className="text-center text-[12px] font-normal text-[#A2B5BD] md:text-base"
              >
                {txt.text}
              </a>
            </div>
          );
        })}
      </div>

      <div className="grid-flow-row-3 mt-3 grid items-center justify-center gap-1 md:hidden ">
        <div className="flex items-center justify-evenly">
          {footerText.slice(0, 3).map((txt) => {
            // const isLast = index === footerText.length - 1;
            return (
              <div
                key={txt.href}
                // className={`${isLast ? '' : 'border-r-2 border-[#A2B5BD]'} pr-2`}
                className="border-r-2 border-[#A2B5BD] px-2 pr-2"
              >
                <a
                  href={txt.href}
                  className="text-center text-[12px] font-normal text-[#A2B5BD] md:text-base"
                >
                  {txt.text}
                </a>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-evenly">
          {footerText.slice(3, 6).map((txt) => {
            // const isLast = index === footerText.length - 1;
            return (
              <div
                key={txt.href}
                // className={`${isLast ? '' : 'border-r-2 border-[#A2B5BD]'} pr-2`}
                className="border-r-2 border-[#A2B5BD] px-2 pr-2"
              >
                <a
                  href={txt.href}
                  className="text-center text-[12px] font-normal text-[#A2B5BD] md:text-base"
                >
                  {txt.text}
                </a>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-evenly">
          {footerText.slice(6, 8).map((txt, index, arr) => {
            const isLast = index === arr.length - 1;

            return (
              <div
                key={txt.href}
                className={`${isLast ? '' : 'border-r-2 border-[#A2B5BD]'} pr-10`}
              >
                <a
                  href={txt.href}
                  className="text-center text-[12px] font-normal text-[#A2B5BD] md:text-base"
                >
                  {txt.text}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto hidden flex-row items-center justify-center gap-x-[25px] md:flex md:gap-[87px]">
        {footerIcon.map((icon) => {
          return (
            <Link
              key={icon.alt}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icon.src} alt={icon.alt} />
            </Link>
          );
        })}
      </div>
      <div className="pt-[18px] md:hidden">
        <div className="mb-[18px] flex flex-row items-center justify-center gap-x-[20px]">
          {footerIcon.slice(0, 6).map((icon) => {
            return (
              <Link
                key={icon.alt}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={icon.src} alt={icon.alt} />
              </Link>
            );
          })}
        </div>
        <div className=" mt-[9px] flex flex-row items-center justify-center gap-x-[30px]">
          {footerIcon.slice(6, 12).map((icon) => {
            return (
              <Link
                key={icon.alt}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={icon.src} alt={icon.alt} />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default FooterTet;
