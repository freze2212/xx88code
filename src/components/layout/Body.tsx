'use client';

import { useState } from 'react';
import Image from 'next/image';

export function Body() {
  const [code, setCode] = useState('');
  const [account, setAccount] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [codeError, setCodeError] = useState('');
  const [accountError, setAccountError] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setCodeError('');
    setAccountError('');
    setCaptchaError('');
    
    // Validate code
    if (!code.trim()) {
      setCodeError('Điền mã code nhận thưởng');
    }
    
    // Validate account
    if (!account.trim()) {
      setAccountError('Nhập tên tài khoản');
    }
    
    // Validate captcha
    if (!captcha.trim()) {
      setCaptchaError('Nhập mã xác nhận');
    }
    
    // If no errors, proceed with submission
    if (code.trim() && account.trim() && captcha.trim()) {
      console.log('Code submitted:', code, 'Account:', account, 'Captcha:', captcha);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Images */}
      <div className="absolute inset-0">
        {/* Desktop Background */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/bg-pc-xx88.webp"
            alt="Desktop Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Mobile Background */}
        <div className="md:hidden absolute inset-0">
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
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        {/* Container 90% width, centered */}
        <div className="w-[90%] mx-auto py-1 lg:py-12">
          {/* Two equal columns on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Left side - Code Input */}
            <div className="text-center lg:text-left flex justify-center lg:-mt-48">
              {/* Card centered and responsive inside its half */}
              <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-[564px] transition-all duration-300 ${
                codeError || accountError || captchaError 
                  ? 'min-h-[500px] md:min-h-[550px]' 
                  : 'h-[400px] md:h-[470px]'
              }`}>
                {/* Header */}
                <div className="bg-[#00aeef] text-white px-4 sm:px-6 py-3 sm:py-4">
                  <h2 className="text-lg sm:text-xl font-bold text-center tracking-wide" style={{ wordSpacing: '0.1em' }}>
                    NHẬP CODE KHUYẾN MÃI
                  </h2>
                </div>
                
                {/* Body */}
                <div className="p-4 sm:p-6">
                  {/* Branding Section */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-black mb-1">
                        Juventus FC & KJC
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Đối Tác Chính Thức</p>
                      <p className="text-xs sm:text-sm text-gray-600">Năm 2025-2026</p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src="/images/juve-kjc.png"
                        alt="Juventus & KJC"
                        width={200}
                        height={100}
                        className="w-40 sm:w-50 h-20 sm:h-25"
                      />
                    </div>
                  </div>
                  
                  {/* Input Fields */}
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    {/* Code Input Container */}
                    <div className="space-y-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Image
                            src="/images/icons/code-icon.png"
                            alt="Ticket Icon"
                            width={28}
                            height={28}
                            className="w-6 h-6 text-gray-400"
                          />
                        </div>
                        <input
                          type="text"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Mã code"
                          className={`w-full pl-12 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg text-base sm:text-lg focus:outline-none focus:border focus:border-[#00AEEE] ${
                            codeError ? 'border border-red-500' : 'border-0'
                          }`}
                          style={{ backgroundColor: 'rgba(241, 241, 241, 1)' }}
                          required
                          onInvalid={(e) => {
                            e.preventDefault();
                            setCodeError('Điền mã code nhận thưởng');
                          }}
                        />
                      </div>
                      {codeError && (
                        <p className="text-red-500 text-sm">{codeError}</p>
                      )}
                    </div>
                    
                    {/* Account Input Container */}
                    <div className="space-y-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Image
                            src="/images/icons/user-icon-xx88.png"
                            alt="User Icon"
                            width={28}
                            height={28}
                            className="w-6 h-6 text-gray-400"
                          />
                        </div>
                        <input
                          type="text"
                          value={account}
                          onChange={(e) => setAccount(e.target.value)}
                          placeholder="Nhập tài khoản"
                          className={`w-full pl-12 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-base sm:text-lg rounded-lg focus:outline-none focus:border focus:border-[#00AEEE] ${
                            accountError ? 'border border-red-500' : 'border-0'
                          }`}
                          style={{ backgroundColor: 'rgba(241, 241, 241, 1)' }}
                          required
                          onInvalid={(e) => {
                            e.preventDefault();
                            setAccountError('Nhập tên tài khoản');
                          }}
                        />
                      </div>
                      {accountError && (
                        <p className="text-red-500 text-sm">{accountError}</p>
                      )}
                    </div>
                    
                    {/* Captcha Input Container */}
                    <div className="space-y-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Image
                            src="/images/icons/code-icon.png"
                            alt="Captcha Icon"
                            width={28}
                            height={28}
                            className="w-6 h-6 text-gray-400"
                          />
                        </div>
                        <input
                          type="text"
                          value={captcha}
                          onChange={(e) => setCaptcha(e.target.value)}
                          placeholder="Mã xác nhận"
                          className={`w-full pl-12 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg text-base sm:text-lg focus:outline-none focus:border focus:border-[#00AEEE] ${
                            captchaError ? 'border border-red-500' : 'border-0'
                          }`}
                          style={{ backgroundColor: 'rgba(241, 241, 241, 1)' }}
                          required
                          onInvalid={(e) => {
                            e.preventDefault();
                            setCaptchaError('Nhập mã xác nhận');
                          }}
                        />
                      </div>
                      {captchaError && (
                        <p className="text-red-500 text-sm">{captchaError}</p>
                      )}
                    </div>
                    
                    {/* Check Now Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#00AEEF] text-white font-bold py-2 sm:py-3 px-0 rounded-full hover:opacity-90 transition-opacity duration-200 text-base sm:text-lg tracking-wide"
                        style={{ wordSpacing: '0.03em' }}
                      >
                        KIỂM TRA NGAY
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Right side - Banner Image */}
            <div className="flex justify-center lg:justify-center">
              <div className="relative w-full flex justify-center">
                <Image
                  src="/images/banner.png"
                  alt="XX88 Banner"
                  width={852}
                  height={698}
                  className="w-full max-w-[852px] h-auto"
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
