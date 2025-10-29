import Image from 'next/image';
import Link from 'next/link';
export function Sidebar() {
  const menuItems = [
    {
      name: 'Liên Hệ',
      icon: '/images/lien-he.png',
      bgColor: 'bg-green-500',
      linkTo: 'https://xx88cskh.pages.dev/',
    },
    {
      name: 'Telegram',
      icon: '/images/telegram.png',
      bgColor: 'bg-blue-400',
      linkTo: 'https://t.me/GIAITRIXX88_official',
    },
    {
      name: 'Fanpage',
      icon: '/images/fanpage.png',
      bgColor: 'bg-blue-600',
      linkTo: 'https://www.facebook.com/XX88official.com.vn/',
    },
    {
      name: 'Trang Chủ',
      icon: '/images/home.png',
      bgColor: 'bg-blue-400',
      linkTo: 'https://53333.com/',
    },
  ];

  return (
    <div className="border-b border-gray-100 bg-white py-2 md:hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-4 sm:space-x-6 lg:space-x-8">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <Link href={item.linkTo || '#'}>
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </Link>
              <span className="whitespace-nowrap text-xs font-medium text-gray-700">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
