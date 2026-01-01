'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Turnstile } from '@marsidev/react-turnstile';
import PopUpSuggest from '../popUp/PopUpSuggest';
import Link from 'next/link';
import PopUpSuggestTet from '../popUp/PopUpSuggestTet';
// import SnowEffect from '../ui/SnowEffect';

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
          username: account.trim(),
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
      resetCaptcha('Vui lòng xác minh Captcha lại');
    } finally {
      setLoading(false);
    }
  };

  const hasError = !!(codeError || accountError || captchaError || serverMsg);

  return (
    <>
      {/* <SnowEffect /> */}
      {/*  */}
      <div className="md:h-min-screen relative w-full">
        {/* HEADER START */}
        <div className="mb-10px relative z-40 pt-[14px] md:flex md:flex-col md:items-center md:justify-center lg:pt-[42px]">
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
        </div>
        <img
          className="absolute inset-0 h-full w-full md:hidden"
          src="/images/bg-mb-new.png"
          alt="Background"
        />
        <div
          className="absolute inset-0 hidden bg-cover bg-center md:block"
          style={{ backgroundImage: 'url(/images/bg-new.png)' }}
        />
        {/* FORM START */}
        <div className="relative z-10 mt-8 min-h-screen md:pt-4">
          <div className="relative z-20 mx-auto flex h-[330px] w-[419px] items-center justify-center md:h-[561px] md:w-[714px]">
            {/* modal background*/}
            <img
              src="/images/modal-code-mb-new.png"
              alt="Modal Background Mobile"
              className="block h-full w-full object-cover md:hidden"
            />
            <img
              src="/images/modal-code-bg-new.png"
              alt="Modal Background"
              className="hidden h-auto w-full object-cover md:block"
            />
            {/* Left Horse Decoration */}
            <img
              src="/images/left-horse.png"
              alt="Horse Left"
              className="absolute right-[600px] top-1/2 z-[-1] hidden -translate-y-1/2 md:block"
            />
            {/* Right Horse Decoration */}
            <img
              src="/images/right-horse.png"
              alt="Horse Left"
              className="absolute left-[400px] top-1/2 z-[-1] hidden -translate-y-1/2 md:block"
            />
            {/* FORM */}
            <div className="md:top-4/3 absolute inset-0 left-1/2 top-[40%] mt-2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:p-6 md:p-5">
              <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-[85%] md:max-w-[60%]"
                noValidate
              >
                {/* code */}
                <div className="mb-1 flex items-center justify-center space-y-1 md:mb-2">
                  <div className="relative">
                    <div className="flex flex-col items-center justify-center">
                      <p className="bg-gradient-to-t from-[#FF6A00] to-[#F4DB8D] bg-clip-text text-center text-[16px] font-bold text-[#FF6A00] text-transparent md:text-[23px] ">
                        Mã code:
                      </p>

                      <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                          setCodeError('');
                        }}
                        placeholder="Nhập mã code"
                        className={` h-[28px] w-[292px] rounded-[38.06px] py-2.5 text-center text-sm focus:border focus:border-[#00AEEE] focus:outline-none sm:text-xl md:h-[48px] md:w-[498px] md:rounded-[64px]  md:text-lg ${
                          codeError
                            ? 'border border-red-500'
                            : 'border border-gray-200'
                        }`}
                        style={{ backgroundColor: 'rgba(241, 241, 241, 1)' }}
                        autoComplete="one-time-code"
                      />
                    </div>
                    {codeError && (
                      <p className="mt-1 text-sm text-white md:text-base">
                        {codeError}
                      </p>
                    )}
                  </div>
                </div>
                {/* account */}
                <div className="flex items-center justify-center space-y-1 md:mb-5">
                  <div className="relative">
                    <div className="flex flex-col items-center justify-center">
                      <p className="bg-gradient-to-t from-[#FF6A00] to-[#F4DB8D] bg-clip-text text-center text-[16px] font-bold text-[#FF6A00] text-transparent md:text-[23px]">
                        Tên tài khoản:
                      </p>
                      <input
                        type="text"
                        value={account}
                        onChange={(e) => {
                          setAccount(e.target.value);
                          setAccountError('');
                        }}
                        placeholder="Nhập tên người dùng"
                        className={`h-[28px] w-[292px] rounded-[38.06px] py-2.5 text-center text-sm focus:border focus:border-[#00AEEE] focus:outline-none sm:text-xl md:h-[48px] md:w-[498px] md:rounded-[64px]  md:text-lg ${
                          codeError
                            ? 'border border-red-500'
                            : 'border border-gray-200'
                        }`}
                        style={{ backgroundColor: 'rgba(241, 241, 241, 1)' }}
                        autoComplete="username"
                      />
                    </div>
                    {accountError && (
                      <p className="mt-1 text-sm text-white md:text-base">
                        {accountError}
                      </p>
                    )}
                  </div>
                </div>
                {/* CATPCHA */}
                <div
                  className={`relative z-[2147483647] flex h-[70px] w-full flex-col items-center justify-center overflow-visible md:h-[78px] ${captchaError ? 'mb-4 md:mb-5' : 'mb-0 md:mb-5'}`}
                >
                  {mounted && siteKey && (
                    <div
                      className="my-2 scale-[0.70]  md:mt-5 md:origin-top-left md:scale-100"
                      style={{ width: 304, height: 78 }}
                    >
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
                          // không reset ngay để tránh vòng lặp remount
                          setCaptchaError('Không tải được Captcha');
                        }}
                        // options={{ size: 'normal' }}
                      />
                    </div>
                  )}

                  {/* {captchaError && (
                    <p className="-mt-4 text-sm text-white md:mt-0 md:text-base">
                      {captchaError}{' '}
                      <button
                        type="button"
                        className="text-red-500 underline"
                        onClick={() => resetCaptcha()}
                      >
                        Thử lại
                      </button>
                    </p>
                  )} */}
                </div>

                {/* BUTTON */}
                <div
                  className={`md:top-5/4 absolute left-1/2 top-[115%] z-10 flex -translate-x-1/2 justify-center ${captchaError ? '' : '-mt-[10px] md:mt-0'}`}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className=" h-[103px] w-[244px]  bg-cover bg-center text-sm font-bold  transition  hover:brightness-110 active:scale-95 md:h-[177px] md:w-[416px] md:pt-4 md:text-2xl"
                    style={{
                      backgroundImage: 'url(/images/btn-check-new.png)',
                    }}
                    aria-label="Kiểm tra ngay"
                  ></button>
                </div>
              </form>
            </div>
          </div>
          {/* PopUp */}
          <PopUpSuggestTet
            open={popupOpen}
            onClose={() => setPopupOpen(false)}
            title="Thông báo"
            variant={popupVariant}
          >
            <p className="text-center">{popupMsg}</p>
          </PopUpSuggestTet>
          {/*************/}
        </div>
      </div>
      {/* BANNER */}
      <section>
        {/* HORSE DECORATION MOBILE */}
        <img
          src="/images/mb-horse-2.png"
          alt="Horse Left"
          className="absolute left-1/2 top-1/2 h-[322px] w-[326.5px] -translate-x-1/2 -translate-y-1/2 opacity-100 md:hidden"
        />
        {/* BANNER*/}
        <img
          src="/images/banner-tet.png"
          alt="XX88 Banner"
          className="absolute left-1/2 top-[65%] max-w-full -translate-x-1/2 -translate-y-1/2 md:top-[70%]"
        />
      </section>
    </>
  );
}
