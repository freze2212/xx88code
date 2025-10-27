'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ReCAPTCHA: any = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
});

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
  const recaptchaRef = useRef<any>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const siteKey = (process.env.GOOGLE_RECAPTCHA_SITE_KEY as string) || '';
  const apiUrl = (process.env.URL as string) || '';

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

      setServerMsg(data?.message || 'Xác nhận thành công!');
    } catch {
      setServerMsg('Không thể kết nối máy chủ');
      resetCaptcha('Vui lòng xác minh Captcha lại');
    } finally {
      setLoading(false);
    }
  };

  const hasError = !!(codeError || accountError || captchaError || serverMsg);

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/bg-pc-xx88.webp"
            alt="Desktop Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/bg-mb-xx88.png"
            alt="Mobile Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="mx-auto w-[90%] py-1 lg:py-12">
          <div className="grid grid-cols-1 items-center lg:grid-cols-2">
            {/* Left */}
            <div className="flex justify-center text-center lg:-mt-48 lg:text-left">
              <div
                className={`w-full max-w-[564px] rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
                  hasError
                    ? 'min-h-[468px] md:min-h-[507px]'
                    : 'h-[420px] md:h-[507px]'
                }`}
              >
                <div className="bg-[#00aeef] px-4 py-3 text-white sm:px-6 sm:py-4">
                  <h2
                    className="text-center text-lg font-bold tracking-wide sm:text-xl"
                    style={{ wordSpacing: '0.1em' }}
                  >
                    NHẬP CODE KHUYẾN MÃI
                  </h2>
                </div>

                <div className="p-4 sm:p-6">
                  {/* Branding */}
                  <div className="mb-4 flex items-center justify-between sm:mb-6">
                    <div className="text-left">
                      <h3 className="mb-1 text-xl font-bold text-black sm:text-2xl">
                        Juventus FC &amp; KJC
                      </h3>
                      <p className="mb-1 text-xs text-gray-600 sm:text-sm">
                        Đối Tác Chính Thức
                      </p>
                      <p className="text-xs text-gray-600 sm:text-sm">
                        Năm 2025-2026
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src="/images/juve-kjc.png"
                        alt="Juventus & KJC"
                        width={230}
                        height={81}
                      />
                    </div>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3 sm:space-y-4"
                    noValidate
                  >
                    {/* Code */}
                    <div className="space-y-1">
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Image
                            src="/images/icons/code-icon.png"
                            alt="Ticket Icon"
                            width={28}
                            height={28}
                            className="h-6 w-6 text-gray-400"
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
                          className={`w-full rounded-lg py-2 pl-12 pr-3 text-base focus:border focus:border-[#00AEEE] focus:outline-none sm:py-3 sm:text-lg ${
                            codeError ? 'border border-red-500' : 'border-0'
                          }`}
                          style={{ backgroundColor: 'rgba(241, 241, 241, 1)' }}
                          autoComplete="one-time-code"
                        />
                      </div>
                      {codeError && (
                        <p className="text-sm text-red-500">{codeError}</p>
                      )}
                    </div>

                    {/* Account */}
                    <div className="!mt-[8px]">
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Image
                            src="/images/icons/user-icon-xx88.png"
                            alt="User Icon"
                            width={28}
                            height={28}
                            className="h-6 w-6 text-gray-400"
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
                          className={`w-full rounded-lg py-2 pl-12 pr-3 text-base focus:border focus:border-[#00AEEE] focus:outline-none sm:py-3 sm:text-lg ${
                            accountError ? 'border border-red-500' : 'border-0'
                          }`}
                          style={{ backgroundColor: 'rgba(241, 241, 241, 1)' }}
                          autoComplete="username"
                        />
                      </div>
                      {accountError && (
                        <p className="text-sm text-red-500">{accountError}</p>
                      )}
                    </div>

                    {/* reCAPTCHA */}
                    <div className="relative z-[2147483647] !mt-[10px] h-[78px] w-full overflow-visible max-[344px]:h-[70px] max-[320px]:h-[62px]">
                      {mounted && siteKey && (
                        <div
                          className="origin-top-left scale-100 max-[344px]:scale-[0.9] max-[320px]:scale-[0.8]"
                          style={{ width: 304, height: 78 }}
                        >
                          <ReCAPTCHA
                            key={captchaKey}
                            ref={recaptchaRef}
                            sitekey={siteKey}
                            onChange={(token: string | null) => {
                              setCaptchaToken(token);
                              setCaptchaError('');
                            }}
                            onExpired={() => resetCaptcha('Captcha đã hết hạn')}
                            onErrored={() =>
                              resetCaptcha('Không tải được Captcha')
                            }
                          />
                        </div>
                      )}

                      {captchaError && (
                        <p className="mt-0 text-sm text-red-500">
                          {captchaError}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="!mt-[27px] w-full rounded-full bg-[#00AEEF] py-[5px] text-base font-bold text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 sm:py-4 sm:text-lg"
                    >
                      {loading ? 'ĐANG KIỂM TRA…' : 'KIỂM TRA NGAY'}
                    </button>

                    {serverMsg && (
                      <p className="mt-2 text-center text-sm">{serverMsg}</p>
                    )}
                  </form>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex justify-center lg:justify-center">
              <div className="relative flex w-full justify-center">
                <Image
                  src="/images/banner.png"
                  alt="XX88 Banner"
                  width={852}
                  height={698}
                  className="h-auto w-full max-w-[852px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
