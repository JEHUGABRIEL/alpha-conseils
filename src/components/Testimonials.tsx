import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Christiane M.',
    role: 'Cadre de retour à Bangui depuis Paris',
    quote:
      "Alpha Conseil m'a accompagnée dans la création de mon cabinet conseil à Bangui. Leur connaissance du tissu administratif local m'a fait gagner un temps précieux. En deux semaines, j'avais mon RCCM et tous mes documents en règle.",
    rating: 5,
    initials: 'CM',
  },
  {
    name: 'Arsène B.',
    role: 'Propriétaire, Bangui',
    quote:
      "J'ai confié à Alpha Conseil la rédaction de mon business plan pour un projet de parc agro-pastoral. Le document était si solide qu'il a convaincu ma banque dès la première présentation. Un professionnalisme rare à Bangui.",
    rating: 5,
    initials: 'AB',
  },
  {
    name: 'Famille Nguéssé',
    role: 'Investisseurs, Bangui',
    quote:
      "Nous avions des inquiétudes sur les aspects juridiques de notre investissement immobilier. Alpha Conseil a sécurisé chaque contrat et nous a évité des pièges que nous n'aurions pas vus seuls. Un accompagnement indispensable.",
    rating: 5,
    initials: 'FN',
  },
  {
    name: 'Olivier M.',
    role: 'Primo-accédant, Bangui',
    quote:
      "Première création d'entreprise pour moi. L'équipe d'Alpha Conseil a été d'une patience et d'une clarté remarquables. Chaque étape a été expliquée, chaque document rédigé avec soin. Je recommande vivement.",
    rating: 5,
    initials: 'OM',
  },
  {
    name: 'Sophie K.',
    role: 'Directrice d\'ONG, Bangui',
    quote:
      "Alpha Conseil nous aide pour la conformité juridique de notre ONG depuis deux ans. Leur réactivité et leur expertise en droit centrafricain sont irréprochables. Un partenaire fiable sur lequel on peut compter.",
    rating: 4,
    initials: 'SK',
  },
  {
    name: 'Jean-Pierre L.',
    role: 'Entrepreneur, Bangui',
    quote:
      "J'avais un contentieux fiscal qui traînait depuis des mois. Alpha Conseil a pris le dossier en main et a trouvé une solution négociée en moins d'un mois. Leur réseau local et leur approche pragmatique font la différence.",
    rating: 5,
    initials: 'JL',
  },
];

export function Testimonials() {
  return (
    <section id="temoignages" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-blue-900 font-semibold tracking-wide uppercase text-sm mb-3">
            Témoignages
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ce que disent nos clients
          </h3>
          <p className="text-lg text-slate-600">
            La satisfaction de nos clients est notre meilleure fierté.
            Découvrez leurs retours d'expérience.
          </p>
        </motion.div>

        {/* Grille de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Icône guillemet décoratif */}
              <Quote className="absolute top-5 right-5 w-8 h-8 text-blue-900/5 group-hover:text-blue-900/10 transition-colors duration-300" />

              {/* Étoiles */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Citation */}
              <blockquote className="text-slate-600 leading-relaxed mb-6 text-[0.95rem] relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Auteur */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {testimonial.initials}
                </div>
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
        </div>

        {/* Appel à l'action bas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-slate-500 mb-5">
            Rejoignez nos clients satisfaits et donnez vie à vos projets.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-900 hover:bg-blue-800 transition-colors"
          >
            Contactez-nous
          </a>
        </motion.div>
      </div>
    </section>
  );
}
