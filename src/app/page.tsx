import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Body } from '@/components/layout/Body';
import { Header2 } from '@/components/layout/Header2';

export default function Home() {
  return (
    <main className="relative max-h-screen min-h-screen w-full md:min-h-screen">
      {/* <Sidebar /> */}
      {/* <Sidebar /> */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: 'url(/images/bg-new.png)' }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-center md:block"
        style={{ backgroundImage: 'url(/images/bg-new.png)' }}
      />
      <div />

      <Header2 />
      <Body />
    </main>
  );
}
