import Link from 'next/link';

import Footer from '@/ui/Footer';
import Header from '@/ui/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <div>home page</div>

      <Link
        href="/market/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
        className="inline-flex text-red-700 underline"
      >
        go to market page
      </Link>

      <Footer />
    </div>
  );
}
