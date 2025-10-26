import Image from 'next/image';

export function Header() {

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-20">
          {/* Logo - To hơn */}
          <div className="flex-shrink-0">
            <Image
              src="/images/logos/logo-xx88-kjc.png"
              alt="XX88 Logo"
              width={200}
              height={80}
              className="h-12 sm:h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation - 5 items */}
          <nav className="hidden md:flex space-x-6">
            {[
              { name: 'Nhập Code', icon: '/images/nhap-code.png', bgColor: 'bg-orange-500' },
              { name: 'Liên Hệ', icon: '/images/lien-he.png', bgColor: 'bg-green-500' },
              { name: 'Telegram', icon: '/images/telegram.png', bgColor: 'bg-blue-400' },
              { name: 'Fanpage', icon: '/images/fanpage.png', bgColor: 'bg-blue-600' },
              { name: 'Trang Chủ', icon: '/images/home.png', bgColor: 'bg-blue-400' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-xs font-medium text-gray-700 hover:text-[#00AEEE] whitespace-nowrap transition-colors duration-200">{item.name}</span>
              </div>
            ))}
          </nav>

          {/* Right side buttons - Full width/height */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="bg-[#00AEEF] text-white font-bold rounded-3xl w-[100px] sm:w-[130px] h-[32px] sm:h-[40px] hover:opacity-80 transition-opacity duration-200 flex items-center justify-center">
              <span className="text-xs sm:text-sm">ĐĂNG NHẬP</span>
            </button>
            <button className="hover:opacity-80 transition-opacity duration-200 cursor-pointer">
              <Image
                src="/images/calendar.png"
                alt="Calendar"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
