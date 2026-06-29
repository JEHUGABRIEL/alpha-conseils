import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Christiane M.',
    role: 'Cadre de retour à Bangui depuis Paris',
    quote:
      "Alpha Conseil m'a accompagnée dans la création de mon cabinet conseil à Bangui. Leur connaissance du tissu administratif local m'a fait gagner un temps précieux. En deux semaines, j'avais mon RCCM et tous mes documents en règle.",
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Arsène B.',
    role: 'Propriétaire, Bangui',
    quote:
      "J'ai confié à Alpha Conseil la rédaction de mon business plan pour un projet de parc agro-pastoral. Le document était si solide qu'il a convaincu ma banque dès la première présentation. Un professionnalisme rare à Bangui.",
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Famille Nguéssé',
    role: 'Investisseurs, Bangui',
    quote:
      "Nous avions des inquiétudes sur les aspects juridiques de notre investissement immobilier. Alpha Conseil a sécurisé chaque contrat et nous a évité des pièges que nous n'aurions pas vus seuls. Un accompagnement indispensable.",
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Olivier M.',
    role: 'Primo-accédant, Bangui',
    quote:
      "Première création d'entreprise pour moi. L'équipe d'Alpha Conseil a été d'une patience et d'une clarté remarquables. Chaque étape a été expliquée, chaque document rédigé avec soin. Je recommande vivement.",
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Sophie K.',
    role: "Directrice d'ONG, Bangui",
    quote:
      "Alpha Conseil nous aide pour la conformité juridique de notre ONG depuis deux ans. Leur réactivité et leur expertise en droit centrafricain sont irréprochables. Un partenaire fiable sur lequel on peut compter.",
    rating: 4,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Jean-Pierre L.',
    role: 'Entrepreneur, Bangui',
    quote:
      "J'avais un contentieux fiscal qui traînait depuis des mois. Alpha Conseil a pris le dossier en main et a trouvé une solution négociée en moins d'un mois. Leur réseau local et leur approche pragmatique font la différence.",
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
];

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setItemsPerPage(1);
      else if (w < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return itemsPerPage;
}

// ── Variants d'animation ──

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const headerSubVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const testimonialCardVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0.45,
      delay: 0.1 + i * 0.12,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const quoteVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 180, damping: 12, delay: 0.2 },
  },
};

const starVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 10,
      delay: 0.25 + i * 0.08,
    },
  }),
};

const dotVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const ctaVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function Testimonials() {
  const itemsPerPage = useItemsPerPage();
  const pages = chunkArray(testimonials, itemsPerPage);
  const totalPages = pages.length;

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalPagesRef = useRef(totalPages);
  totalPagesRef.current = totalPages;

  useEffect(() => {
    if (page >= totalPages) setPage(0);
  }, [totalPages, page]);

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setPage((p) => (p + 1) % totalPagesRef.current);
    }, 5000);
  }, []);

  const goTo = useCallback((index: number) => {
    setDirection((prev) => (index > prev ? 1 : -1));
    setPage(index);
    startAutoPlay();
  }, [startAutoPlay]);

  const next = useCallback(() => {
    setDirection(1);
    setPage((prev) => (prev + 1) % totalPagesRef.current);
    startAutoPlay();
  }, [startAutoPlay]);

  const prev = useCallback(() => {
    setDirection(-1);
    setPage((prev) => (prev - 1 + totalPagesRef.current) % totalPagesRef.current);
    startAutoPlay();
  }, [startAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoPlay]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section id="temoignages" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            custom={0}
            variants={headerSubVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-block text-blue-900 font-semibold tracking-wide uppercase text-sm mb-3"
          >
            Témoignages
          </motion.span>
          <motion.h3
            custom={1}
            variants={headerSubVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
          >
            Ce que disent nos clients
          </motion.h3>
          <motion.p
            custom={2}
            variants={headerSubVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-slate-600"
          >
            La satisfaction de nos clients est notre meilleure fierté.
            Découvrez leurs retours d'expérience.
          </motion.p>
        </motion.div>

        {/* Carrousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Flèches */}
          <button
            onClick={prev}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 text-slate-500 hover:text-blue-900 hover:border-blue-300 flex items-center justify-center transition-all duration-200 hidden sm:flex"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 text-slate-500 hover:text-blue-900 hover:border-blue-300 flex items-center justify-center transition-all duration-200 hidden sm:flex"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slides */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {pages[page]?.map((testimonial, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={testimonialCardVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Guillemet décoratif */}
                  <motion.div
                    variants={quoteVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Quote className="absolute top-5 right-5 w-8 h-8 text-blue-900/5 group-hover:text-blue-900/10 transition-colors duration-300" />
                  </motion.div>

                  {/* Étoiles */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={starVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-slate-200'
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Citation */}
                  <blockquote className="text-slate-600 leading-relaxed mb-6 text-[0.95rem] relative z-10">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Auteur */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200">
                    <motion.img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                      whileHover={{ scale: 1.2, borderColor: '#1e3a5f' }}
                      style={{ border: '2px solid transparent' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                    />
                    <div className="min-w-0">
                      <strong className="block text-[0.9rem] text-slate-900 truncate">
                        {testimonial.name}
                      </strong>
                      <span className="text-[0.8rem] text-slate-500 block truncate">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots de pagination */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="flex items-center justify-center gap-2.5 mt-10"
        >
          {pages.map((_, i) => (
            <motion.button
              key={i}
              custom={i}
              variants={dotVariants}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === page
                  ? 'w-8 h-2.5 bg-amber-500'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Aller au slide ${i + 1}`}
            />
          ))}
        </motion.div>

        {/* Appel à l'action bas */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="text-center mt-14"
        >
          <p className="text-slate-500 mb-5">
            Rejoignez nos clients satisfaits et donnez vie à vos projets.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-900 hover:bg-blue-800 transition-colors"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px rgba(30, 58, 95, 0.4)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            Contactez-nous
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
