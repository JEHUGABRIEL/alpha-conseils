import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Formalisation',
    subtitle: "Création d'entreprise",
    price: '250 000',
    unit: 'FCFA',
    description:
      "Pack complet pour créer et enregistrer votre entreprise en RCA.",
    popular: false,
    features: [
      'Rédaction des statuts',
      'Dépôt du RCCM',
      'Immatriculation fiscale',
      'Ouverture de compte banque conseillée',
      'Assistance administrative complète',
      'Suivi jusqu\'à l\'obtention des documents',
    ],
  },
  {
    name: 'Business Plan',
    subtitle: 'Stratégie & Financement',
    price: '350 000',
    unit: 'FCFA',
    description:
      'Un business plan solide pour convaincre investisseurs et banques.',
    popular: true,
    features: [
      'Analyse de marché détaillée',
      'Prévisions financières sur 3 ans',
      'Stratégie commerciale',
      'Présentation investisseurs',
      'Accompagnement bancaire',
      'Révisions illimitées pendant 1 mois',
    ],
  },
  {
    name: 'Conseil Juridique',
    subtitle: 'Sécurisation & Conformité',
    price: '200 000',
    unit: 'FCFA',
    description:
      'Audit et conseil juridique pour sécuriser vos activités.',
    popular: false,
    features: [
      "Audit juridique complet",
      "Rédaction et révision de contrats",
      'Conseil en droit du travail',
      'Assistance fiscale',
      'Conformité réglementaire',
      'Suivi personnalisé',
    ],
  },
];

export function Pricing() {
  return (
    <section id="tarifs" className="py-24 bg-slate-50 overflow-hidden">
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
            Nos Tarifs
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Des prestations adaptées à chaque projet
          </h3>
          <p className="text-lg text-slate-600">
            Tous nos packs incluent un accompagnement personnalisé et un suivi
            dédié jusqu'à la complète satisfaction de nos clients.
          </p>
        </motion.div>

        {/* Grille des offres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex flex-col rounded-2xl border-2 p-8 transition-all duration-300 ${
                plan.popular
                  ? 'border-blue-900 bg-white shadow-xl scale-[1.02] md:scale-105'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              {/* Badge "Populaire" */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  LE PLUS POPULAIRE
                </div>
              )}

              {/* En-tête de l'offre */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-1">
                  {plan.name}
                </h4>
                <p className="text-slate-500 text-sm mb-4">{plan.subtitle}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-500 font-medium">
                    {plan.unit}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Liste des features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        plan.popular ? 'text-amber-500' : 'text-blue-900'
                      }`}
                    />
                    <span className="text-slate-600 text-[0.92rem]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`w-full text-center py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  plan.popular
                    ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md'
                    : 'bg-slate-100 text-blue-900 hover:bg-blue-900 hover:text-white'
                }`}
              >
                Demander un devis
              </a>
            </motion.div>
          ))}
        </div>

        {/* Note de bas de page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm">
            Tarifs indicatifs — un devis personnalisé vous sera établi après
            étude de votre projet.{' '}
            <a
              href="#contact"
              className="text-blue-900 font-semibold underline underline-offset-2 hover:text-amber-600 transition-colors"
            >
              Contactez-nous
            </a>{' '}
            pour une estimation gratuite.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
