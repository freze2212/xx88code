'use client';

import { useEffect, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import Link from 'next/link';
import PopUpSuggestTet from '../popUp/PopUpSuggestTet';
import Header from './Header';

export function Body() {
  const [code, setCode] = useState('');
  const [account, setAccount] = useState('');
  const [codeError, setCodeError] = useState('');
  const [accountError, setAccountError] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  const [captchaKey, setCaptchaKey] = useState(0);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMsg, setPopupMsg] = useState<string | null>(null);
  const [popupVariant, setPopupVariant] = useState<'success' | 'error'>(
    'success'
  );

  const siteKey =
    (process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY as string) || '';
  const apiUrl = (process.env.NEXT_PUBLIC_URL as string) || '';

  const resetCaptcha = (msg?: string) => {
    setCaptchaKey((k) => k + 1);
    setCaptchaToken(null);
    if (msg) setCaptchaError(msg);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setCodeError('');
    setAccountError('');
    setCaptchaError('');
    setServerMsg(null);

    let hasLocalError = false;
    if (!code.trim()) {
      setCodeError('Điền mã code nhận thưởng');
      hasLocalError = true;
    }
    if (!account.trim()) {
      setAccountError('Nhập tên tài khoản');
      hasLocalError = true;
    }
    if (!captchaToken) {
      setCaptchaError('Vui lòng xác minh Captcha');
      hasLocalError = true;
    }

    if (hasLocalError) {
      if (captchaToken) resetCaptcha('Vui lòng xác minh Captcha lại');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/codes/use-code-public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          username: account.trim().toLowerCase(),
          code: code.trim(),
          captchaToken: captchaToken,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const apiError = data?.message || data?.error || 'Có lỗi xảy ra';
        setServerMsg(apiError);
        setPopupMsg(apiError);
        setPopupVariant('error');
        setPopupOpen(true);
        resetCaptcha('Vui lòng xác minh Captcha lại');
        return;
      }

      const points = data?.data?.pointsAdded || 0;
      const successMessage = `Đã sử dụng code thành công! Đã cộng ${points} điểm`;

      setServerMsg(successMessage);
      setPopupMsg(successMessage);
      setPopupVariant('success');
      setPopupOpen(true);
    } catch {
      setServerMsg('Không thể kết nối máy chủ');
      setPopupMsg('Không thể kết nối máy chủ');
      setPopupVariant('error');
      setPopupOpen(true);
      resetCaptcha('Vui lòng xác minh Captcha lại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen w-full flex flex-col bg-[#021D38] overflow-x-hidden">
        {/* 1. Header occupies normal layout position at top */}
        <Header />

        {/* 2. Main Body Section below Header */}
        <div className="relative flex-1 w-full flex flex-col items-center justify-center min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-80px)]">
          {/* Background Images for Body section */}
          <img
            className="absolute inset-0 h-full w-full object-cover object-top md:hidden"
            src="/images/ui-aquarium/bg-mb.png"
            alt="Aquarium Mobile Background"
          />
          <div
            className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
            style={{ backgroundImage: 'url(/images/ui-aquarium/bg-pc.png)' }}
          />

          {/* Main Content Container inside Body */}
          <main className="relative z-10 flex flex-1 w-full items-center justify-center px-3 pt-12 sm:pt-16 md:pt-28 pb-8 sm:pb-12 md:pb-16">
            <div className="relative mx-auto flex flex-col lg:flex-row items-center justify-center w-full max-w-[350px] sm:max-w-[480px] md:max-w-[760px]">
              
              {/* Modal Frame Container */}
              <div className="relative flex w-full items-center justify-center">
                {/* Modal Frame Image Mobile (bg-modal-mb.png) */}
                <img
                  src="/images/ui-aquarium/bg-modal-mb.png"
                  alt="Aquarium Modal Frame Mobile"
                  className="block h-auto w-full select-none object-contain drop-shadow-2xl md:hidden"
                />

                {/* Modal Frame Image Desktop (bg-modal.png) */}
                <img
                  src="/images/ui-aquarium/bg-modal.png"
                  alt="Aquarium Modal Frame PC"
                  className="hidden h-auto w-full select-none object-contain drop-shadow-2xl md:block"
                />

                {/* Shark Graphic Image on Top-Left of Title Code (Mobile Only - Hidden on PC) */}
                <div className="absolute -top-[30%] sm:-top-[32%] left-[5%] sm:left-[7%] z-10 pointer-events-none md:hidden">
                  <img
                    src="/images/ui-aquarium/shark.png"
                    alt="Shark"
                    className="h-auto w-[58px] sm:w-[75px] object-contain select-none filter drop-shadow-lg"
                  />
                </div>

                {/* Title Header Image (title-code.png) with z-20 overlapping shark */}
                <div className="absolute -top-[25%] sm:-top-[28%] md:-top-[17%] left-1/2 -translate-x-1/2 flex justify-center w-[72%] sm:w-[68%] md:w-[68%] z-20 pointer-events-none">
                  <img
                    src="/images/ui-aquarium/title-code.png"
                    alt="Nhập Code Title"
                    className="h-auto w-full object-contain select-none filter drop-shadow-2xl"
                  />
                </div>

                {/* Form Content Overlay inside Modal */}
                <div className="absolute top-[23%] sm:top-[26%] md:top-[28%] inset-x-0 bottom-[4%] flex flex-col items-center justify-between px-4 sm:px-8 md:px-14 z-10">
                  <form
                    onSubmit={handleSubmit}
                    className="flex h-full w-full max-w-[320px] sm:max-w-[400px] md:max-w-[430px] flex-col items-center justify-between"
                    noValidate
                  >
                    {/* Inputs Section */}
                    <div className="flex w-full flex-col items-center space-y-1 sm:space-y-1.5 md:space-y-2 pt-1 sm:pt-2 md:pt-4">
                      {/* Input 1: Account (Tài khoản) */}
                      <div className="flex w-full flex-col items-start px-1 sm:px-3 md:px-6">
                        <div className="relative w-full">
                          <div className="pointer-events-none absolute inset-y-0 left-3 sm:left-4 flex items-center">
                            <img
                              src="/images/icons/user-icon-xx88.png"
                              alt="User Icon"
                              className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 object-contain"
                            />
                          </div>
                          <input
                            type="text"
                            value={account}
                            onChange={(e) => {
                              setAccount(e.target.value);
                              setAccountError('');
                            }}
                            placeholder="Nhập tài khoản"
                            className={`h-[35px] sm:h-[40px] md:h-[48px] w-full rounded-[10px] sm:rounded-[14px] md:rounded-[18px] bg-gradient-to-b from-[#F0F8FF] to-[#E1F3FE] pl-9 sm:pl-12 pr-3 text-xs sm:text-sm md:text-base font-semibold text-[#0F4C75] placeholder-[#4C9FD6] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border-2 ${
                              accountError ? 'border-red-400' : 'border-white/80'
                            } focus:border-[#00AEEE] focus:outline-none`}
                            autoComplete="username"
                          />
                        </div>
                        <p className="mt-0.5 pl-1.5 text-[10px] sm:text-xs font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                          {accountError || 'Nhập tên tài khoản'}
                        </p>
                      </div>

                      {/* Input 2: Code (Mã code) */}
                      <div className="flex w-full flex-col items-start px-1 sm:px-3 md:px-6">
                        <div className="relative w-full">
                          <div className="pointer-events-none absolute inset-y-0 left-3 sm:left-4 flex items-center">
                            <img
                              src="/images/icons/code-icon.png"
                              alt="Code Icon"
                              className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 object-contain"
                            />
                          </div>
                          <input
                            type="text"
                            value={code}
                            onChange={(e) => {
                              setCode(e.target.value);
                              setCodeError('');
                            }}
                            placeholder="Mã code"
                            className={`h-[35px] sm:h-[40px] md:h-[48px] w-full rounded-[10px] sm:rounded-[14px] md:rounded-[18px] bg-gradient-to-b from-[#F0F8FF] to-[#E1F3FE] pl-9 sm:pl-12 pr-3 text-xs sm:text-sm md:text-base font-semibold text-[#0F4C75] placeholder-[#4C9FD6] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border-2 ${
                              codeError ? 'border-red-400' : 'border-white/80'
                            } focus:border-[#00AEEE] focus:outline-none`}
                            autoComplete="one-time-code"
                          />
                        </div>
                        <p className="mt-0.5 pl-1.5 text-[10px] sm:text-xs font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                          {codeError || 'Điền mã code nhận thưởng'}
                        </p>
                      </div>

                      {/* Turnstile Captcha */}
                      <div className="flex flex-col items-center justify-center min-h-[52px] sm:min-h-[66px] md:min-h-[78px] w-full">
                        {mounted && siteKey && (
                          <div className="scale-[0.62] sm:scale-[0.78] md:scale-[0.95] origin-center flex justify-center my-0">
                            <Turnstile
                              options={{
                                theme: 'light',
                                size: 'normal',
                              }}
                              key={captchaKey}
                              siteKey={siteKey}
                              onSuccess={(token: string) => {
                                setCaptchaToken(token);
                                setCaptchaError('');
                              }}
                              onExpire={() => resetCaptcha('Captcha đã hết hạn')}
                              onError={() => {
                                setCaptchaError('Không tải được Captcha');
                              }}
                            />
                          </div>
                        )}

                        {captchaError && (
                          <p className="text-[10px] font-bold text-red-300 drop-shadow sm:text-xs text-center">
                            {captchaError}{' '}
                            <button
                              type="button"
                              className="text-yellow-300 underline hover:text-white"
                              onClick={() => resetCaptcha()}
                            >
                              Thử lại
                            </button>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Submit Button (btn-check.png) */}
                    <div className="mb-1 sm:mb-2 md:mb-3 flex justify-center w-full">
                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
                        aria-label="Kiểm tra ngay"
                      >
                        <img
                          src="/images/ui-aquarium/btn-check.png"
                          alt="Kiểm tra ngay"
                          className="w-[165px] sm:w-[230px] md:w-[330px] h-auto object-contain select-none filter drop-shadow-lg"
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* btn-introduce.png (Mobile Only - Hidden on Desktop/PC) */}
              <div className="mt-5 sm:mt-7 flex justify-center z-20 lg:hidden">
                <Link
                  href="https://xx88cskh.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer block"
                >
                  <img
                    src="/images/ui-aquarium/btn-introduce.png"
                    alt="Hướng dẫn"
                    className="w-[130px] sm:w-[170px] h-auto object-contain filter drop-shadow-2xl select-none"
                  />
                </Link>
              </div>

            </div>

            {/* Notification PopUp */}
            <PopUpSuggestTet
              open={popupOpen}
              onClose={() => setPopupOpen(false)}
              title="Thông báo"
              variant={popupVariant}
            >
              <p className="text-center">{popupMsg}</p>
            </PopUpSuggestTet>
          </main>
        </div>
      </div>
    </>
  );
}
