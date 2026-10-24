import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const VIDEO_URL = `${import.meta.env.BASE_URL}videos/birthday-video.mp4`;
const HAS_VIDEO = true;

export function VideoSection() {
  return (
    <SectionWrapper
      id="video"
      title="A Sweet Message For You"
      subtitle="Press play and let this little surprise wrap you in warmth and love."
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto glass-gold rounded-2xl overflow-hidden p-2 shadow-luxury"
      >
        <div className="relative mx-auto aspect-[9/16] w-full max-w-sm rounded-xl overflow-hidden bg-black/50">
          {HAS_VIDEO ? (
            <video
              src={VIDEO_URL}
              className="h-full w-full object-cover"
              controls
              playsInline
              muted={false}
              preload="metadata"
              controlsList="nodownload"
              onLoadedMetadata={(event) => {
                event.currentTarget.muted = false;
                event.currentTarget.volume = 1;
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-luxury-white/80">
              Add a video file to the cutey folder or public/videos folder to play it here.
            </div>
          )}
        </div>
        <p className="text-center font-body italic opacity-60 mt-4 text-sm">
          {HAS_VIDEO ? 'A little birthday surprise, made just for you.' : 'No video is available yet.'}
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
