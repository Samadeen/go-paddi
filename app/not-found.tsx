import Image from 'next/image';
import Link from 'next/link';

import NotFoundContent from '@/src/components/not-found-content';
import logo from '@/public/assets/logo.svg';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F0F2F5]">
      <header className="border-b border-neutral-300 bg-white px-10 py-4">
        <Link
          href="/"
          className="inline-flex rounded-lg transition-opacity hover:opacity-80"
        >
          <Image src={logo} alt="Go Paddi" width={48} height={45} priority />
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <NotFoundContent />
      </main>
    </div>
  );
}
