import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'XX88 - Nhập Code Khuyến Mãi',
  description: 'Nhập code khuyến mãi XX88 - Đối tác chính thức Juventus FC & KJC',
  keywords: ['xx88', 'khuyến mãi', 'juventus', 'kjc', 'code'],
  authors: [{ name: 'XX88 Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: 'images/fav-xx88.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
