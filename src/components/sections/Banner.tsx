import Image from 'next/image';

export function Banner() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/images/body/banner.png"
        alt="Banner"
        width={1045}
        height={177}
      />
    </div>
  );
}
