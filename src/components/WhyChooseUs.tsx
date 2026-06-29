import { motion } from 'framer-motion';
import {
  Award,
  Users,
  Clock,
  ShieldCheck,
  MessageCircle,
  TrendingUp,
  Phone,
  Mail,
} from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Expertise locale reconnue',
    description:
      "Une connaissance approfondie du tissu administratif, juridique et économique centrafricain, acquise auprès de centaines de clients accompagnés avec succès.",
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Users,
    title: 'Accompagnement personnalisé',
    description:
      'Chaque projet est unique. Nous vous offrons un suivi sur-mesure avec un interlocuteur dédié tout au long de votre accompagnement.',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Clock,
    title: 'Rapidité d\'exécution',
    description:
      "Nous respectons vos délais. Grâce à notre maîtrise des processus administratifs, nous traitons vos dossiers en un temps record sans compromis sur la qualité.",
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: ShieldCheck,
    title: 'Confidentialité & Sérieux',
    description:
      "La discrétion et la rigueur sont au cœur de notre métier. Vos informations sensibles sont traitées avec la plus stricte confidentialité.",
    color: 'bg-purple-100 text-purple-700',
  },
  {
    icon: TrendingUp,
    title: 'Réseau & Partenaires',
    description:
      "Nous disposons d'un solide réseau de partenaires (banques, notaires, avocats, administrations) pour vous ouvrir les bonnes portes rapidement.",
    color: 'bg-rose-100 text-rose-700',
  },
  {
    icon: MessageCircle,
    title: 'Support WhatsApp prioritaire',
    description:
      'Nos clients bénéficient d\'un accès direct à leur conseiller via WhatsApp pour un suivi réactif et des réponses rapides à toutes vos questions.',
    color: 'bg-sky-100 text-sky-700',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white overflow-hidden">
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
            Pourquoi nous choisir
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            La confiance de nos clients, notre meilleure référence
          </h3>
          <p className="text-lg text-slate-600">
            Découvrez ce qui fait d'Alpha Conseil le partenaire privilégié des
            entrepreneurs et investisseurs en République Centrafricaine.
          </p>
        </motion.div>

        {/* Grille des raisons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${reason.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">
                  {reason.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bandeau de contact direct */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-blue-900 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden"
        >
          {/* Éléments décoratifs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800/30 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Prêt à travailler avec nous ?
            </h3>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-8">
              Contactez-nous dès maintenant pour discuter de votre projet sans
              aucun engagement. Notre équipe vous répond sous 24h.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <a
                href="tel:+23672153255"
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                +236 72 15 32 55
              </a>
              <a
                href="https://wa.me/23672153255"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="mailto:contact@alphaconseil-rca.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-lg transition-all duration-200 border border-white/20"
              >
                <Mail className="w-5 h-5" />
                Nous écrire
              </a>
            </div>

            <p className="text-blue-300 text-sm">
              Disponible 7j/7 • Réponse garantie sous 24h • Premier échange gratuit
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
