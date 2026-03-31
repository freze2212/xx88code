'use client';

import { useEffect, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import PopUpSuggestTet from '../popUp/PopUpSuggestTet';

export function HeroForm() {
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
      const successMessage = (
        <div className="flex flex-col items-center text-center">
          <p className="text-[#070E23] text-[10px] md:text-3xl font-black mb-0 md:mb-1 flex items-baseline items-center justify-center gap-1 md:gap-2">
            CHÚC MỪNG <span className="font-normal normal-case text-[8px] md:text-2xl opacity-90">bạn đã nhận được</span>
          </p>
          <p
            className="uppercase pt-1 md:pt-3 tracking-normal"
            style={{
              fontFamily: "'SF Pro Display Bold', sans-serif",
              fontWeight: 800,
              lineHeight: '100%',
              background: 'linear-gradient(180deg, #FFFCD7 0%, #FFA200 87.5%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: '1px #7F0000',
              textAlign: 'center',
              letterSpacing: '0%',
              display: 'inline-block',
              transform: 'scale(1.1)',
              transformOrigin: 'center'
            } as any}
          >
            <span style={{ fontSize: 'min(4vw, 40px)' }}>{points.toLocaleString()}K</span>
            <span style={{ fontSize: 'min(3vw, 28px)' }}> TIỀN THƯỞNG</span>
          </p>
        </div>
      );

      setServerMsg('');
      setPopupMsg(successMessage as any);
      setPopupVariant('success');
      setPopupOpen(true);
    } catch {
      setServerMsg('Không thể kết nối máy chủ');
      resetCaptcha('Vui lòng xác minh Captcha lại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative z-10">
        <div className="relative z-20 mx-auto flex h-[341px] w-[419px] items-center justify-center md:h-[680px] md:w-[840px] scale-[0.9] min-[390px]:scale-[0.98] min-[430px]:scale-[1.08] md:scale-100 transform-gpu -translate-x-1.5 md:translate-x-0">
          {/* modal background*/}
          <img
            src="/images/body/form-mb.png"
            alt="Modal Background Mobile"
            className="block h-full w-full object-cover md:hidden [image-rendering:-webkit-optimize-contrast] transform-gpu"
          />
          <img
            src="/images/body/form.png"
            alt="Modal Background"
            className="hidden h-auto w-full object-cover md:block [image-rendering:-webkit-optimize-contrast] transform-gpu md:-translate-y-5"
          />
          {/* FORM */}
          <div className="md:top-4/3 absolute inset-0 left-1/2 top-[62%] mt-2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:p-6 md:p-5 z-30">
            <form
              onSubmit={handleSubmit}
              className="relative mx-auto w-full"
              noValidate
            >
              {/* account */}
              <div className="flex items-center justify-center space-y-1">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[#070E23] text-center text-[12px] font-bold md:text-[20px]">
                      Tên tài khoản:
                    </p>
                    <div className="relative flex items-center justify-center">
                      {/* Icon User */}
                      <div className="absolute left-[-2px] z-10 flex h-[35px] w-[35px] items-center justify-center md:h-[70px] md:w-[70px]">
                        <img
                          src="/images/body/icon-user.png"
                          alt="User Icon"
                          className="h-full w-full object-contain [image-rendering:-webkit-optimize-contrast] transform-gpu"
                        />
                      </div>
                      <input
                        type="text"
                        value={account}
                        onChange={(e) => {
                          setAccount(e.target.value);
                          setAccountError('');
                        }}
                        placeholder={accountError || "Nhập tên người dùng"}
                        className={`h-[25px] w-[280px] py-1 text-center text-sm focus:border-b-[#0077C8] focus:outline-none sm:text-lg rounded-full md:h-[50px] md:w-[450px] md:text-lg md:rounded-full ${accountError ? 'placeholder:text-red-600 placeholder:font-bold' : ''
                          }`}
                        style={{
                          backgroundImage: 'linear-gradient(rgba(241, 241, 241, 1), rgba(241, 241, 241, 1)), linear-gradient(90deg, #FFBB00 0.3%, #FFFB88 26.26%, #8D5C11 53.66%, #FFFBEA 78.9%, #8D5C11 101.25%, #FFFB88 124.32%, #FFBB00 150.28%)',
                          backgroundOrigin: 'border-box',
                          backgroundClip: 'padding-box, border-box',
                          borderBottom: '2.14px solid transparent',
                          borderRadius: '50px',
                          boxShadow: '0px 4.27px 3.42px 0px #FFFFFF inset, 0px -4.27px 1.14px 0px #FFFFFF inset, 0px 0px 5.41px 0px #4579BC40'
                        }}
                        autoComplete="username"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* code */}
              <div className="mb-0 flex md:mb-1 items-center justify-center space-y-1">
                <div className="relative">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[#070E23] text-center text-[12px] font-bold md:text-[20px] ">
                      Mã code:
                    </p>

                    <div className="relative flex items-center justify-center">
                      {/* Icon Code */}
                      <div className="absolute left-[-2px] z-10 flex h-[35px] w-[35px] items-center justify-center md:h-[70px] md:w-[70px]">
                        <img
                          src="/images/body/icon-code.png"
                          alt="Code Icon"
                          className="h-full w-full object-contain [image-rendering:-webkit-optimize-contrast] transform-gpu"
                        />
                      </div>
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                          setCodeError('');
                        }}
                        placeholder={codeError || "Nhập mã code"}
                        className={` h-[25px] w-[280px] py-1 text-center text-sm focus:border-b-[#0077C8] focus:outline-none sm:text-lg rounded-full md:h-[50px] md:w-[450px] md:text-lg md:rounded-full ${codeError ? 'placeholder:text-red-600 placeholder:font-bold' : ''
                          }`}
                        style={{
                          backgroundImage: 'linear-gradient(rgba(241, 241, 241, 1), rgba(241, 241, 241, 1)), linear-gradient(90deg, #FFBB00 0.3%, #FFFB88 26.26%, #8D5C11 53.66%, #FFFBEA 78.9%, #8D5C11 101.25%, #FFFB88 124.32%, #FFBB00 150.28%)',
                          backgroundOrigin: 'border-box',
                          backgroundClip: 'padding-box, border-box',
                          borderBottom: '2.14px solid transparent',
                          borderRadius: '50px',
                          boxShadow: '0px 4.27px 3.42px 0px #FFFFFF inset, 0px -4.27px 1.14px 0px #FFFFFF inset, 0px 0px 5.41px 0px #4579BC40'
                        }}
                        autoComplete="one-time-code"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* CATPCHA */}
              <div
                className="relative z-[2147483647] flex h-[60px] md:h-[60px] w-full flex-col items-center justify-center overflow-visible -mt-2 mb-0 md:mt-0 md:mb-5"
              >
                {mounted && siteKey && (
                  <div
                    className="md:my-2 scale-[0.5] transform-gpu md:scale-90"
                    style={{
                      width: 300,
                      height: 50,
                      backfaceVisibility: 'hidden',
                      transformOrigin: 'center'
                    }}
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
                        setCaptchaError('Không tải được Captcha');
                      }}
                    />
                  </div>
                )}

                {captchaError && (
                  <p className="absolute top-[100%] -mt-3 md:mt-1 text-xs text-black whitespace-nowrap">
                    {captchaError}{' '}
                    <button
                      type="button"
                      className="text-red-500 underline"
                      onClick={() => resetCaptcha()}
                    >
                      Thử lại
                    </button>
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <div
                className="absolute left-[111px] md:left-[178px] top-[155px] z-10 flex -translate-x-1/2 justify-center md:top-[240px] -mt-[10px] md:mt-2"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-[38px] w-[200px] items-center justify-center rounded-full text-base font-bold uppercase text-white transition hover:brightness-110 active:scale-95 md:h-[64px] md:w-[310px] md:text-2xl"
                  style={{
                    background: 'linear-gradient(180deg, #00B1FF 0%, #007AFF 100%)',
                    border: '3.5px solid #B0853D',
                    boxShadow: '0px 0px 0px 1.5px #F4CF86, inset 0px 2px 6px rgba(255, 255, 255, 0.4), 0px 4px 10px rgba(0, 0, 0, 0.4)',
                    textShadow: '0px 2px 2px rgba(0, 0, 0, 0.5)',
                  }}
                  aria-label="Nhận code"
                >
                  {loading ? 'Đang xử lý...' : 'Nhận code'}
                </button>
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
          {popupMsg as any}
        </PopUpSuggestTet>
      </div>
    </>
  );
}
