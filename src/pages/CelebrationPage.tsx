import { Navbar, Footer } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { PhotoGallery } from '@/components/sections/PhotoGallery';
import { MemoryTimeline } from '@/components/sections/MemoryTimeline';
import { LoveLetter } from '@/components/sections/LoveLetter';
import { ReasonsSection } from '@/components/sections/ReasonsSection';
import { GiftBoxSection } from '@/components/sections/GiftBoxSection';
import { CakeCeremony } from '@/components/sections/CakeCeremony';
import { FireworksSection } from '@/components/sections/FireworksSection';
import { CountdownSection } from '@/components/sections/CountdownSection';
import { VideoSection } from '@/components/sections/VideoSection';
import { VoiceMessage } from '@/components/sections/VoiceMessage';
import { FinalMessage } from '@/components/sections/FinalMessage';
import { LastSurprise } from '@/components/sections/LastSurprise';
import { ContactSection } from '@/components/sections/ContactSection';

export function CelebrationPage() {
  return (
    <div className="relative min-h-screen bg-luxury-gradient">
      <Navbar />
      <main>
        <HeroSection />
        <PhotoGallery />
        <MemoryTimeline />
        <LoveLetter />
        <ReasonsSection />
        <GiftBoxSection />
        <CakeCeremony />
        <FireworksSection />
        <CountdownSection />
        <VideoSection />
        <VoiceMessage />
        <FinalMessage />
        <LastSurprise />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
