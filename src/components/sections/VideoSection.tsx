import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const VIDEOS = [
  {
    src: `${import.meta.env.BASE_URL}videos/birthday-video.mp4`,
    title: 'A Sweet Message For You',
    caption: 'A little birthday surprise, made just for you.',
  },
  {
    src: `${import.meta.env.BASE_URL}videos/birthday-video-2.mp4`,
    title: 'Another Birthday Surprise',
    caption: 'One more special video, just for you.',
  },
];

export function VideoSection() {
  return (
    <SectionWrapper
      id="video"
      title="Birthday Videos"
      subtitle="Press play and let these special surprises wrap you in warmth and love."
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {VIDEOS.map((video, index) => (
          <motion.div
            key={video.src}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="w-full glass-gold rounded-2xl overflow-hidden p-2 shadow-luxury"
          >
            <h3 className="font-display text-xl text-center text-luxury-gold-light py-3">
              {video.title}
            </h3>
            <div className="relative mx-auto aspect-[9/16] w-full max-w-sm rounded-xl overflow-hidden bg-black/50">
              <video
                src={video.src}
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
            </div>
            <p className="text-center font-body italic opacity-60 mt-4 mb-2 text-sm">
              {video.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
