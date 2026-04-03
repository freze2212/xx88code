# Hướng dẫn sử dụng ảnh trong dự án

## 📁 Cấu trúc thư mục ảnh

```
src/app/images/
├── logos/              # Logo, brand images
├── icons/              # Icons, SVG files
├── hero/               # Hero section images
├── features/           # Feature images
├── gallery/            # Gallery, portfolio images
├── avatars/            # User avatars
└── backgrounds/        # Background images
```

## 🎯 Cách sử dụng ảnh

### 1. Static Images (Next.js Image Component)
```tsx
import Image from 'next/image';

<Image
  src="/images/hero/banner.jpg"
  alt="Hero banner"
  width={1200}
  height={600}
  priority
/>
```

### 2. Dynamic Images
```tsx
<Image
  src={`/images/avatars/${user.id}.jpg`}
  alt={user.name}
  width={100}
  height={100}
/>
```

### 3. External Images
Cấu hình trong `next.config.js`:
```js
images: {
  domains: ['example.com', 'cdn.example.com'],
}
```

## 📏 Kích thước ảnh khuyến nghị

- **Hero images**: 1200x600px
- **Feature images**: 400x300px
- **Avatar images**: 200x200px
- **Logo**: 200x80px
- **Icons**: 24x24px, 32x32px

## 🚀 Tối ưu hóa

- Sử dụng WebP format khi có thể
- Compress ảnh trước khi upload
- Sử dụng `priority` cho ảnh above-the-fold
- Sử dụng `placeholder="blur"` cho UX tốt hơn
