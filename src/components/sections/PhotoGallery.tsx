import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiX, HiDownload } from 'react-icons/hi';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GALLERY_IMAGES } from '@/config/site';
import { downloadTextAsFile } from '@/utils';

export function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightboxIndex === null) return;
      setLightboxIndex((lightboxIndex + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    },
    [lightboxIndex]
  );

  const handleDownloadMemories = () => {
    const content = GALLERY_IMAGES.map(
      (img, i) => `Memory ${i + 1}: ${img.caption}\n${img.src}`
    ).join('\n\n');
    downloadTextAsFile(content, 'karthi-memories.txt');
  };

  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  };

  return (
    <SectionWrapper
      id="gallery"
      title="Precious Memories"
      subtitle="Every photograph holds a piece of our story — golden moments frozen in time."
    >
      <div className="flex justify-end max-w-6xl mx-auto mb-6">
        <button
          onClick={handleDownloadMemories}
          className="flex items-center gap-2 text-sm font-sans text-luxury-gold hover:text-luxury-gold-light transition-colors"
        >
          <HiDownload size={16} /> Download Memories
        </button>
      </div>

      {/* Memory line-by-line story rows */}
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {GALLERY_IMAGES.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className={`flex flex-col lg:flex-row items-center gap-4 lg:gap-6 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
          >
            <button
              onClick={() => openLightbox(index)}
              className="group relative w-full lg:w-[58%] overflow-hidden rounded-[28px] border border-luxury-gold/30 bg-black/20 shadow-[0_0_30px_rgba(210,170,90,0.18)] focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              aria-label={`View ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-[260px] sm:h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />
              <span className="absolute top-4 right-4 text-xl text-luxury-pink">♥</span>
            </button>

            <div className="w-full lg:w-[42%] rounded-[28px] border border-luxury-gold/20 bg-white/5 backdrop-blur-sm p-5 sm:p-6 text-center lg:text-left">
              <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-luxury-gold/80 mb-3">
                Memory {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl text-luxury-gold-light mb-3">{img.caption}</h3>
              <p className="font-body text-sm sm:text-base text-luxury-white/80 leading-relaxed">
                {index === 0 && 'A moment so beautiful, it feels like the universe paused just to let us keep it.'}
                {index === 1 && 'Every hand in hand step, every smile, every glance — all of it became part of our story.'}
                {index === 2 && 'A tiny little promise of love, wrapped in joy, warmth, and the dream of forever.'}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Carousel */}
      <div className="max-w-3xl mx-auto mt-16">
        <h3 className="font-display text-2xl text-center text-luxury-gold mb-6">Highlights Carousel</h3>
        <div className="relative glass-gold rounded-2xl overflow-hidden aspect-video">
          <img
            src={GALLERY_IMAGES[carouselIndex].src}
            alt={GALLERY_IMAGES[carouselIndex].alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80">
            <p className="font-body text-center">{GALLERY_IMAGES[carouselIndex].caption}</p>
          </div>
          <button
            onClick={() => setCarouselIndex((carouselIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass"
            aria-label="Previous image"
          >
            <HiChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCarouselIndex((carouselIndex + 1) % GALLERY_IMAGES.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass"
            aria-label="Next image"
          >
            <HiChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-label="Image lightbox"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full glass z-10"
              aria-label="Close lightbox"
            >
              <HiX size={24} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass"
              aria-label="Previous"
            >
              <HiChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass"
              aria-label="Next"
            >
              <HiChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
