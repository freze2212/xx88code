import Image from 'next/image';

export function Sidebar() {
  const menuItems = [
    { name: 'Nhập Code', icon: '/images/nhap-code.png', bgColor: 'bg-orange-500' },
    { name: 'Liên Hệ', icon: '/images/lien-he.png', bgColor: 'bg-green-500' },
    { name: 'Telegram', icon: '/images/telegram.png', bgColor: 'bg-blue-400' },
    { name: 'Fanpage', icon: '/images/fanpage.png', bgColor: 'bg-blue-600' },
    { name: 'Trang Chủ', icon: '/images/home.png', bgColor: 'bg-blue-400' },
  ];

  return (
    <div className="bg-white py-2 border-b border-gray-100 md:hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-4 sm:space-x-6 lg:space-x-8">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <Image
                src={item.icon}
                alt={item.name}
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
