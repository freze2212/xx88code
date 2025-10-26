import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Body } from '@/components/layout/Body';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Sidebar />
      <Body />
    </main>
  );
}
