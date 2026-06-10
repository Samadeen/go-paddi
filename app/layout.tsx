import type { Metadata } from 'next';
import { Poppins, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import QueryProvider from '@/src/providers/query-provider';

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Go Paddi',
  description: 'Go Paddi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", poppins.variable, "font-mono", jetbrainsMono.variable)}>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
