import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const aboutImages = [
  {
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
    alt: 'Équipe en réunion',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
    alt: 'Collaboration en équipe',
  },
  {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
    alt: 'Consultation professionnelle',
  },
];

export function About() {
  const { t } = useTranslation();
  const benefits = t('about.benefits', { returnObjects: true }) as string[];
  const [currentImage, setCurrentImage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % aboutImages.length);
    }, 4000);
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section id="apropos" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              {/* Images en crossfade */}
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={currentImage}
                    src={aboutImages[currentImage].src}
                    alt={aboutImages[currentImage].alt}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                </AnimatePresence>
              </div>

              {/* Indicateurs */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                {aboutImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentImage
                        ? 'w-6 h-2 bg-amber-500'
                        : 'w-2 h-2 bg-white/60 hover:bg-white/90'
                    }`}
                    aria-label={`Image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Badge d'expérience */}
              <div className="absolute -bottom-6 -right-6 bg-blue-900 text-white p-8 rounded-2xl shadow-xl hidden md:block z-10">
                <div className="text-4xl font-bold font-serif mb-1 text-amber-500">
                  10+
                </div>
                <div className="text-sm font-medium">
                  {t('about.experience.label')}
                  <br />
                  {t('about.experience.extra')}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="text-blue-900 font-semibold tracking-wide uppercase text-sm mb-3">
              {t('about.badge')}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-serif">
              {t('about.title')}
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t('about.description')}
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-900 hover:bg-blue-800 transition-colors"
            >
              {t('about.cta')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
