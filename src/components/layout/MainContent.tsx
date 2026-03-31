'use client';

import { HeroForm } from '../sections/HeroForm';

export function MainContent() {
  return (
    <div className="relative m-auto w-full lg:max-w-[1920px] lg:h-[870px] lg:min-h-[870px] lg:max-h-[1080px] flex flex-col h-auto lg:overflow-hidden lg:min-h-0">
      {/* Background videos */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/bg-mb.webp"
          className="h-[740px] w-full object-cover lg:hidden"
        >
          <source src="/images/body/background-mb.mp4" type="video/mp4" />
        </video>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/body/background.png"
          className="hidden h-full w-full object-cover lg:block"
        >
          <source src="/images/body/background.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 flex flex-col justify-start lg:justify-center pt-3 pb-12 md:pt-12 lg:pb-0">
        <div className="w-full max-w-[1600px] mx-auto lg:px-10 mt-0 lg:mt-0">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0 xl:gap-16 2xl:gap-32">
            <div
              className="w-full px-4 lg:px-0 lg:w-1/2 flex justify-center  lg:scale-110 xl:scale-120 2xl:scale-[1.16] transition-transform duration-300 transform-gpu lg:-translate-x-20 xl:-translate-x-20 2xl:-translate-x-16"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <HeroForm />
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:scale-125 xl:scale-[1.45] 2xl:scale-155 transition-all duration-300 lg:translate-y-8 transform-gpu">
              <img
                src="/images/body/intro.png"
                alt="Introduction"
                className="w-full h-auto object-contain [image-rendering:-webkit-optimize-contrast] transform-gpu"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
