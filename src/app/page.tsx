'use client';

import { useEffect, useState } from "react";
import Header from '@/components/layout/Header';
import { MainContent } from '@/components/layout/MainContent';
import Footer from '@/components/layout/Footer';

const CRITICAL_ASSETS = [
  // Header
  "/images/header/logo.png",
  "/images/header/main-logo.gif",
  "/images/header/button.png",
  "/images/header/button-main.png",

  // Body and common (Above the fold)
  "/images/body/background.png",
  "/images/bg-mb.webp",
  "/images/body/intro.png",
  "/images/body/form.png",
  "/images/body/form-mb.png",
  "/images/body/icon-user.png",
  "/images/body/icon-code.png",

  // Gifs / Banners
  "/images/banner-gif-new.gif",
  "/images/banner-gif-update.gif",
  "/images/banner-gif-update-2.gif",
  "/images/xx88-gif.gif",

  // Footer (Important ones)
  "/images/footer/bg.png",
  "/images/footer/xx88-kjc.png",
  "/images/footer/kjc-juventus.png",
  "/images/footer/news-title.png",

  // Popups
  "/images/body/background-modal.png",
  "/images/popup-warning.png",
  "/images/popup-v-tick.png",
  "/images/popup-btn.png",
];

const CRITICAL_VIDEOS: string[] = [
  "/images/body/background.mp4",
  "/images/body/background-mb.mp4",
];

export default function Home() {
  const [zoom, setZoom] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [forceDesktop, setForceDesktop] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    // 1. Handle Resize/Zoom logic
    const handleResize = () => {
      const width = window.innerWidth;
      const screenWidth = window.screen.width;
      const isTabletOrAbove = screenWidth >= 768;
      const BASE_WIDTH = 1920;

      if (isTabletOrAbove) {
        setForceDesktop(true);
        setZoom(width < BASE_WIDTH ? width / BASE_WIDTH : 1);
      } else {
        setForceDesktop(false);
        setZoom(1);
      }
    };

    handleResize();
    setIsReady(true);
    window.addEventListener("resize", handleResize);

    // 2. Preload Critical Assets
    const preloadAssets = async () => {
      try {
        const imagePromises = CRITICAL_ASSETS.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve; // Continue even if one fails
          });
        });

        const videoPromises = CRITICAL_VIDEOS.map((src) => {
          return new Promise((resolve) => {
            const video = document.createElement("video");
            video.src = src;
            video.preload = "auto";
            video.oncanplaythrough = resolve;
            video.onerror = resolve;
            setTimeout(resolve, 1000);
          });
        });

        await Promise.race([
          Promise.all([
            Promise.all(imagePromises),
            Promise.all(videoPromises),
          ]),
          new Promise((resolve) => setTimeout(resolve, 800)),
        ]);

        setAssetsLoaded(true);
      } catch (e) {
        setAssetsLoaded(true);
      }
    };

    preloadAssets();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!assetsLoaded) {
    return (
      <div className="fixed inset-0 bg-[#050B21] flex flex-col items-center justify-center z-[9999]">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-[#00E5FF]/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-[#00E5FF] rounded-full animate-spin" />
        </div>
        <p className="mt-8 text-[#00E5FF] font-bold text-lg animate-pulse uppercase tracking-[2px]">
          Đang tải...
        </p>
      </div>
    );
  }

  return (
    <main className={`min-h-screen flex flex-col items-center bg-[#050B21] overflow-x-hidden ${forceDesktop ? 'force-desktop' : ''}`}>
      <div
        className="flex-1 flex flex-col origin-top flex-shrink-0"
        style={{
          transform: isReady && forceDesktop ? `scale(${zoom})` : 'none',
          transformOrigin: 'top center',
          width: isReady && forceDesktop ? '1920px' : '100%',
          minHeight: isReady && forceDesktop ? `${100 / zoom}vh` : '100vh',
          display: 'flex',
          flexDirection: 'column'
        } as any}
      >
        <Header />
        <MainContent />
        <Footer />
      </div>
    </main>
  );
}

