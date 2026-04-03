import Link from 'next/link';
import { CustomImage } from '@/components/ui/Image';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <CustomImage
          src="/images/hero/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover opacity-20"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Chào mừng đến với{' '}
              <span className="text-yellow-300">XX88</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl">
              Chúng tôi cung cấp các giải pháp công nghệ hiện đại và chuyên nghiệp 
              để giúp doanh nghiệp của bạn phát triển bền vững.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Liên hệ ngay
              </Link>
              <Link
                href="/services"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Xem dịch vụ
              </Link>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <CustomImage
              src="/images/hero/hero-main.jpg"
              alt="XX88 Services"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
