import { HiMail, HiHeart } from 'react-icons/hi';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { SITE_CONFIG } from '@/config/site';

export function ContactSection() {
  return (
    <SectionWrapper
      id="contact"
      title="Stay Connected"
      subtitle="This celebration was made with love. Reach out anytime — you are never alone."
    >
      <div className="max-w-lg mx-auto">
        <GlassCard gold className="text-center">
          <HiHeart className="mx-auto text-4xl text-luxury-pink mb-4" />
          <p className="font-body text-lg opacity-80 mb-6 leading-relaxed">
            If this surprise brought a smile to your face, know that making you happy is my greatest joy.
            Every day with you is worth celebrating.
          </p>
          <a
            href={`mailto:${SITE_CONFIG.contactEmail}?subject=Happy Birthday!`}
            className="inline-flex items-center gap-2 font-sans text-luxury-gold hover:text-luxury-gold-light transition-colors"
          >
            <HiMail size={20} />
            Send a message back
          </a>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}
