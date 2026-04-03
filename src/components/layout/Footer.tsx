"use client";

import React, { useState } from "react";

const Footer: React.FC = () => {
  const [showExpand, setShowExpand] = useState(false);
  const links = [
    { label: "Giới thiệu về XX88", url: "https://www.xx88live.me/help#aboutus" },
    { label: "Điều khoản & điều kiện", url: "https://www.xx88live.me/help#deposit" },
    { label: "Chơi có trách nhiệm", url: "https://www.xx88live.me/help#responsibility" },
    { label: "Miễn trách nhiệm", url: "https://www.xx88live.me/help#disclaimer" },
    { label: "Quyền riêng tư", url: "https://www.xx88live.me/help#privacy" },
    { label: "Hướng dẫn nạp rút", url: "https://www.xx88live.me/help#deposit" },
    { label: "Câu hỏi thường gặp", url: "https://www.xx88live.me/help#contact" },
    { label: "Liên hệ", url: "https://www.xx88live.me/help" },
  ];

  const socialLinks = {
    facebook: process.env.VITE_FACEBOOK_URL || "https://facebook.com",
    youtube: process.env.VITE_YOUTUBE_URL || "https://youtube.com",
    telegram: process.env.VITE_TELEGRAM_URL || "https://t.me",
  } as const;

  type SocialKey = keyof typeof socialLinks;
  const isExternal = (url?: string) => !!url && url.startsWith("http");

  return (
    <>
      {/* Desktop & Tablet Footer */}
      <footer className="hidden md:block md:-mt-[120px] bg-[url('/images/footer/bg.png')] bg-cover bg-center bg-no-repeat py-6 md:py-8 lg:py-10 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-[350px] relative z-20">
        <div className="relative max-w-6xl mx-auto">
          {/* Tablet: xếp dọc; Desktop rộng (xl+): xếp ngang để tránh bóp hình */}
          <div className="flex flex-col items-center gap-6 xl:flex-row xl:items-start xl:justify-between">
            <img
              src="/images/footer/xx88-kjc.png"
              width={618}
              height={174}
              alt="Footer Banner"
              className="w-full max-w-[618px] h-auto"
            />

            <div className="relative w-fit h-fit">
              {showExpand ? (
                <img
                  src="/images/footer/kjc-juventus-active.png"
                  width={541}
                  height={154}
                  alt="Footer Banner"
                  className="w-full max-w-[620px] xl:max-w-[680px] 2xl:max-w-[720px] h-auto"
                />
              ) : (
                <img
                  src="/images/footer/kjc-juventus.png"
                  width={541}
                  height={200}
                  alt="Footer Banner"
                  className="w-full max-w-[620px] xl:max-w-[680px] 2xl:max-w-[720px] h-auto"
                />
              )}

              <div
                onClick={() => setShowExpand(!showExpand)}
                className="absolute bottom-0 left-0 w-[60px] h-[20px] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="py-6">
          <div className="mx-auto max-w-6xl">
            <div
              className="w-full flex flex-wrap xl:flex-nowrap items-center justify-center xl:justify-between gap-x-2 gap-y-2 mb-6 text-white"
              style={{
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "15px",
                lineHeight: "131%",
                letterSpacing: "0%",
                textAlign: "center",
              }}
            >
              {links.map((link, index) => (
                <React.Fragment key={index}>
                  <a
                    className="font-sfpro"
                    href={link.url || "#"}
                    style={{
                      fontFamily: "SF Pro Display,system-ui,sans-serif",
                    }}
                  >
                    {link.label}
                  </a>
                  {index < links.length - 1 && <span>|</span>}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <img
                  key={i}
                  src={`/images/footer/${i + 1}.png`}
                  width={100}
                  height={100}
                  alt={`${i + 1}`}
                  className="h-8 w-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </footer>

      <footer className="md:hidden block -mt-10 relative">
        <img
          src="/images/footer/background-mb.png"
          alt="Footer"
          className="w-full h-auto"
        />
        {/* Clickable links overlay for mobile */}
        <div 
          className="absolute bottom-[10%] left-0 w-full bg-white flex flex-col items-center justify-center gap-y-3.5 py-1"
          style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}
        >
          {/* Row 1 */}
          <div className="flex items-center justify-center gap-x-2 whitespace-nowrap text-[11px] font-medium text-[#1A1A1A]">
            <a href={links[0].url} className="px-0.5">{links[0].label}</a>
            <span className="text-[#D0D0D0] scale-y-125">|</span>
            <a href={links[1].url} className="px-0.5">{links[1].label}</a>
            <span className="text-[#D0D0D0] scale-y-125">|</span>
            <a href={links[2].url} className="px-0.5">{links[2].label}</a>
          </div>
          {/* Row 2 */}
          <div className="flex items-center justify-center gap-x-2 whitespace-nowrap text-[11px] font-medium text-[#1A1A1A]">
            <a href={links[3].url} className="px-0.5">{links[3].label}</a>
            <span className="text-[#D0D0D0] scale-y-125">|</span>
            <a href={links[4].url} className="px-0.5">{links[4].label}</a>
            <span className="text-[#D0D0D0] scale-y-125">|</span>
            <a href={links[5].url} className="px-0.5">{links[5].label}</a>
          </div>
          {/* Row 3 */}
          <div className="flex items-center justify-center gap-x-2 whitespace-nowrap text-[11px] font-medium text-[#1A1A1A]">
            <a href={links[6].url} className="px-0.5">{links[6].label}</a>
            <span className="text-[#D0D0D0] scale-y-125">|</span>
            <a href={links[7].url} className="px-0.5">{links[7].label}</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;