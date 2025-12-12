'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Turnstile } from '@marsidev/react-turnstile';
import PopUpSuggest from '../popUp/PopUpSuggest';

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
        setServerMsg(data?.message || data?.error || 'Có lỗi xảy ra');
        resetCaptcha('Vui lòng xác minh Captcha lại');
        return;
      }

      const reSultPointer = data?.message
        ? `${data.data?.message || data.message} `
        : data?.data?.message || 'Xác nhận thành công!';

      setServerMsg(reSultPointer);

      //  mở popup và truyền nội dung
      setPopupMsg(reSultPointer);
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
    <div className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: 'url(/images/bg-mb.webp)' }}
      />
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/bg-pc.webp)' }}
      />
      {/* Santa decorations for mobile only */}
      <div className="absolute inset-0 z-[5] md:hidden pointer-events-none">
        <img
          src="/images/santa-left.webp"
          alt="Santa Left"
          className="absolute left-0 top-0 w-[140px] h-[179px]"
        />
        <img
          src="/images/santa-right.webp"
          alt="Santa Right"
          className="absolute right-0 top-0 w-[140px] h-[179px]"
        />
      </div>
      <div className="relative z-10 flex min-h-screen items-start justify-center px-2 pt-24">
        <div className="relative z-20 w-[394px] h-[450px] md:w-[828px] md:h-[768px]">
          <img
            src="/images/modal-code-mb.webp"
            alt="Modal Background Mobile"
            className="block w-full h-full object-cover md:hidden"
          />
          <img
            src="/images/modal-code.webp"
            alt="Modal Background"
            className="hidden w-full h-full object-cover md:block"
          />
          <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-6 ">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-[85%] md:max-w-[60%] pt-[86px]"
              noValidate
            >
              {/* Code */}
              <div className="space-y-1 mb-4 md:mb-5">
                <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 md:pl-3">
                    <Image
                      src="/images/icons/code-icon.png"
                      alt="Ticket Icon"
                      width={32}
                      height={32}
                      className="h-5 w-5 md:h-7 md:w-7 text-gray-400"
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
            className={`w-full rounded-lg py-2.5 md:py-4 pl-10 md:pl-14 pr-3 text-base md:text-lg focus:border focus:border-[#00AEEE] focus:outline-none sm:text-xl ${
                      codeError
                        ? 'border border-red-500'
                        : 'border border-gray-200'
                    }`}
                    style={{ backgroundColor: 'rgba(241, 241, 241, 1)' }}
                    autoComplete="one-time-code"
                  />
                </div>
                {codeError && (
                  <p className="text-sm md:text-base text-white">{codeError}</p>
                )}
              </div>

              {/* Account */}
              <div className="space-y-1 mb-4 md:mb-5">
                <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 md:pl-3">
                    <Image
                      src="/images/icons/user-icon-xx88.png"
                      alt="User Icon"
              width={32}
              height={32}
              className="h-5 w-5 md:h-7 md:w-7 text-gray-400"
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
            className={`w-full rounded-lg py-2.5 md:py-4 pl-10 md:pl-14 pr-3 text-base md:text-lg focus:border focus:border-[#00AEEE] focus:outline-none sm:text-xl ${
                      accountError
                        ? 'border border-red-500'
                        : 'border border-gray-200'
                    }`}
                    style={{ backgroundColor: 'rgba(241, 241, 241, 1)' }}
                    autoComplete="username"
                  />
                </div>
                {accountError && (
                  <p className="text-sm md:text-base text-white">{accountError}</p>
                )}
              </div>

              <div className={`relative z-[2147483647] h-[70px] md:h-[78px] w-full overflow-visible ${captchaError ? 'mb-4 md:mb-5' : 'mb-0 md:mb-5'}`}>
                {mounted && siteKey && (
                  <div
                    className="origin-top-left scale-[0.75] md:scale-100"
                    style={{ width: 304, height: 78 }}
                  >
                    <Turnstile
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
                      options={{ size: 'normal' }}
                    />
                  </div>
                )}

                {captchaError && (
                  <p className="-mt-4 md:mt-0 text-sm md:text-base text-white">
                    {captchaError}{' '}
                    <button
                      type="button"
                      className="underline text-red-500"
                      onClick={() => resetCaptcha()}
                    >
                      Thử lại
                    </button>
                  </p>
                )}
              </div>

              <div className={`flex justify-center ${captchaError ? '' : '-mt-[10px] md:mt-0'}`}>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center bg-cover bg-center text-white text-sm md:text-2xl font-bold transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 pt-4 w-[240px] h-[55px] md:w-[456px] md:h-[86px]"
                  style={{
                    backgroundImage: 'url(/images/btn-check.webp)',
                  }}
                  aria-label="Kiểm tra ngay"
                >
                  KIỂM TRA NGAY
                </button>
              </div>

              {!popupOpen && serverMsg && (
                <p className="text-center text-base text-white">{serverMsg}</p>
              )}
            </form>
          </div>
        </div>

        <PopUpSuggest
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          title="Thông báo"
        >
          <p className="text-center">{popupMsg}</p>
        </PopUpSuggest>
      </div>
    </div>
  );
}
