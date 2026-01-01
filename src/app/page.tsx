import { Body } from '@/components/layout/Body';
import FooterTet from '@/components/layout/FooterTet';
import PopUpSuggest from '@/components/popUp/PopUpSuggest';

export default function Home() {
  return (
    <main className="relative w-full md:min-h-screen">
      <Body />
      <FooterTet />
    </main>
  );
}
