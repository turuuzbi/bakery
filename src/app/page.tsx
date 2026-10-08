import { BasketBar } from "@/components/BasketBar";
import { BasketSheet } from "@/components/BasketSheet";
import { Featured } from "@/components/Featured";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { Menu } from "@/components/Menu";
import { Steps } from "@/components/Steps";
import { StructuredData } from "@/components/StructuredData";
import { Toaster } from "@/components/Toaster";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Featured />
        <Steps />
        <Menu />
        <Info />
      </main>
      <Footer />
      <BasketBar />
      <BasketSheet />
      <Toaster scope="page" />
      <StructuredData />
    </>
  );
}
