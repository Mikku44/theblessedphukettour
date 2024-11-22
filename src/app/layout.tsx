import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "./components/Navbar";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { Inter, Chakra_Petch, Noto_Kufi_Arabic, Montserrat } from 'next/font/google'
import Footer from "./components/Footer";
import FloatingChat from "./components/FloatingChat";
import Head from 'next/head';
import { CartProvider } from "./components/cartContext";




const fluttericon = localFont({
  src: './fonts/MyFlutterApp.ttf',
  display: 'swap',
  variable: "--icon"
})

const inter = Inter({
  subsets: ['latin'],
  display: "swap",
  variable: "--font-inter"
})

const chakra = Inter({
  subsets: ['latin'],
  display: "swap",
  variable: "--font-Chakra-Petch"
})

const noto = Noto_Kufi_Arabic({
  subsets: ['latin'],
  display: "swap",
  variable: "--font-noto"
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: "swap",
  variable: "--font-montserrat"
})

export const metadata: Metadata = {
  title: "The Blessed Phuket Tour",

  description: "จองทัวร์ที่สะดวกและครบครันในภูเก็ต ค้นหาและจองทัวร์ที่เหมาะกับสไตล์การท่องเที่ยวของคุณ ไม่ว่าจะเป็นการเดินทางสุดหรู พักผ่อนบนชายหาด หรือผจญภัยในธรรมชาติ พร้อมข้อเสนอพิเศษและบริการที่น่าเชื่อถือ ให้คุณสัมผัสประสบการณ์การท่องเที่ยวที่น่าจดจำในภูเก็ตอย่างสมบูรณ์แบบ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Head>
        <meta name="agd-partner-manual-verification" content="" />
      </Head>
      <body
        className={`${montserrat.className} ${montserrat.variable} ${noto.className} ${inter.className} ${chakra.className} ${fluttericon.variable} antialiased`}
      >
        <CartProvider >
          <NextIntlClientProvider messages={messages}>
            <Navigation />
            {children}
            <FloatingChat />
            <Footer />
          </NextIntlClientProvider>
        </CartProvider >
      </body>
    </html>
  );
}
