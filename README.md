# XX88 - Next.js Professional Base

Dự án Next.js chuyên nghiệp với cấu trúc chuẩn và các best practices.

## 🚀 Tính năng

- ⚡ **Next.js 14** với App Router
- 🎨 **Tailwind CSS** cho styling
- 📝 **TypeScript** cho type safety
- 🔧 **ESLint & Prettier** cho code quality
- 📱 **Responsive Design** 
- 🎯 **SEO Optimized**
- 🔒 **Security Best Practices**

## 🛠️ Cài đặt

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### Cấu hình môi trường

```bash
cp env.example .env.local
```

Chỉnh sửa file `.env.local` với các giá trị phù hợp:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
API_KEY="your-api-key-here"
NODE_ENV="development"
```

## 🚀 Chạy dự án

### Development

```bash
npm run dev
# hoặc
yarn dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Production

```bash
npm run build
npm run start
# hoặc
yarn build
yarn start
```

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── hooks/                # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## 🎨 Styling

Dự án sử dụng **Tailwind CSS** với cấu hình tùy chỉnh:

- Custom color palette
- Responsive breakpoints
- Component classes
- Dark mode support (có thể mở rộng)

## 🔧 Scripts

```bash
npm run dev          # Chạy development server
npm run build        # Build cho production
npm run start        # Chạy production server
npm run lint         # Kiểm tra code với ESLint
npm run lint:fix     # Tự động fix ESLint errors
npm run type-check   # Kiểm tra TypeScript types
npm run format       # Format code với Prettier
npm run format:check # Kiểm tra code formatting
```

## 📝 Code Style

Dự án tuân theo các quy tắc:

- **ESLint**: Cấu hình strict với TypeScript
- **Prettier**: Code formatting nhất quán
- **TypeScript**: Strict mode enabled
- **Import sorting**: Tự động sắp xếp imports

## 🚀 Deployment

### Vercel (Recommended)

1. Push code lên GitHub
2. Kết nối repository với Vercel
3. Cấu hình environment variables
4. Deploy tự động

### Docker

```bash
docker build -t xx88-app .
docker run -p 3000:3000 xx88-app
```

## 📚 Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [React](https://react.dev)

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

- Email: contact@xx88.com
- Website: [https://xx88.com](https://xx88.com)

---

Made with ❤️ by XX88 Team
