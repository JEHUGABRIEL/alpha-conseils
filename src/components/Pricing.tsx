import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Rocket, Table, LayoutGrid, Minus } from 'lucide-react';

const plans = [
  {
    name: 'Formalisation',
    subtitle: "Création d'entreprise",
    price: '250 000',
    unit: 'FCFA',
    description:
      "Pack complet pour créer et enregistrer votre entreprise en RCA.",
    badge: null as string | null,
    features: [
      'Rédaction des statuts',
      'Dépôt du RCCM',
      'Immatriculation fiscale',
      'Ouverture de compte banque conseillée',
      'Assistance administrative complète',
      "Suivi jusqu'à l'obtention des documents",
    ],
  },
  {
    name: 'Business Plan',
    subtitle: 'Stratégie & Financement',
    price: '350 000',
    unit: 'FCFA',
    description:
      'Un business plan solide pour convaincre investisseurs et banques.',
    badge: 'popular',
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
    badge: null,
    features: [
      'Audit juridique complet',
      'Rédaction et révision de contrats',
      'Conseil en droit du travail',
      'Assistance fiscale',
      'Conformité réglementaire',
      'Suivi personnalisé',
    ],
  },
  {
    name: 'Sur Mesure',
    subtitle: 'Projet personnalisé',
    price: null,
    unit: null,
    description:
      'Une solution entièrement personnalisée pour les projets complexes ou de grande envergure.',
    badge: 'custom',
    features: [
      'Audit complet de vos besoins',
      'Stratégie sur-mesure',
      'Accompagnement dédié 7j/7',
      'Gestion de A à Z',
      'Suivi prioritaire',
      'Support illimité pendant le projet',
    ],
  },
];

interface ComparisonRow {
  label: string;
  values: (boolean | string)[];
}

const comparisonSections: { category: string; rows: ComparisonRow[] }[] = [
  {
    category: '💰 Prix & Délais',
    rows: [
      { label: 'Prix', values: ['250 000 FCFA', '350 000 FCFA', '200 000 FCFA', 'Sur devis'] },
      { label: 'Délais d\'exécution', values: ['1 à 2 sem.', '2 à 3 sem.', '48h à 1 sem.', 'Selon projet'] },
      { label: 'Devis gratuit', values: [true, true, true, true] },
    ],
  },
  {
    category: '📋 Formalités administratives',
    rows: [
      { label: 'Rédaction des statuts', values: [true, false, true, true] },
      { label: 'Dépôt du RCCM', values: [true, false, false, true] },
      { label: 'Immatriculation fiscale', values: [true, false, false, true] },
      { label: 'Ouverture de compte conseillée', values: [true, false, false, true] },
    ],
  },
  {
    category: '📊 Stratégie & Finance',
    rows: [
      { label: 'Analyse de marché', values: [false, true, false, true] },
      { label: 'Prévisions financières 3 ans', values: [false, true, false, true] },
      { label: 'Stratégie commerciale', values: [false, true, false, true] },
      { label: 'Présentation investisseurs', values: [false, true, false, true] },
      { label: 'Accompagnement bancaire', values: [true, true, false, true] },
    ],
  },
  {
    category: '⚖️ Conseil Juridique',
    rows: [
      { label: 'Audit juridique complet', values: [false, false, true, true] },
      { label: 'Rédaction & révision de contrats', values: [false, false, true, true] },
      { label: 'Conseil en droit du travail', values: [false, false, true, true] },
      { label: 'Assistance fiscale', values: [false, false, true, true] },
      { label: 'Conformité réglementaire', values: [true, false, true, true] },
    ],
  },
  {
    category: '🛎️ Accompagnement',
    rows: [
      { label: 'Suivi personnalisé', values: [true, true, true, true] },
      { label: 'Support après projet', values: ['1 mois', '1 mois', '1 mois', 'Illimité'] },
      { label: 'Accompagnement dédié 7j/7', values: [false, false, false, true] },
      { label: 'Révisions illimitées', values: [false, true, false, true] },
    ],
  },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-5 h-5 text-emerald-500 mx-auto" />
    ) : (
      <Minus className="w-4 h-4 text-slate-300 mx-auto" />
    );
  }
  return <span className="text-sm text-slate-700 font-medium">{value}</span>;
}

export function Pricing() {
  const [view, setView] = useState<'cards' | 'compare'>('cards');

  return (
    <section id="tarifs" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
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

        {/* Toggle Cartes / Comparateur */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
            <button
              onClick={() => setView('cards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                view === 'cards'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Cartes
            </button>
            <button
              onClick={() => setView('compare')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                view === 'compare'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Table className="w-4 h-4" />
              Comparateur
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Vue Cartes */}
          {view === 'cards' && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className={`relative flex flex-col rounded-2xl border-2 p-8 transition-all duration-300 ${
                      plan.badge === 'popular'
                        ? 'border-blue-900 bg-white shadow-xl scale-[1.02] md:scale-105'
                        : plan.badge === 'custom'
                        ? 'border-emerald-500 bg-white shadow-lg'
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg'
                    }`}
                  >
                    {/* Badges */}
                    {plan.badge === 'popular' && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg z-10">
                        <Sparkles className="w-3.5 h-3.5" />
                        LE PLUS POPULAIRE
                      </div>
                    )}
                    {plan.badge === 'custom' && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg z-10">
                        <Rocket className="w-3.5 h-3.5" />
                        SUR DEVIS
                      </div>
                    )}

                    {/* En-tête */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-1">
                        {plan.name}
                      </h4>
                      <p className="text-slate-500 text-sm mb-4">{plan.subtitle}</p>
                      {plan.price ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-slate-900">
                            {plan.price}
                          </span>
                          <span className="text-sm text-slate-500 font-medium">
                            {plan.unit}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-emerald-600">
                            Sur devis
                          </span>
                        </div>
                      )}
                      <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check
                            className={`w-5 h-5 shrink-0 mt-0.5 ${
                              plan.badge === 'popular' ? 'text-amber-500' : 'text-blue-900'
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
                        plan.badge === 'popular'
                          ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md'
                          : plan.badge === 'custom'
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
                          : 'bg-slate-100 text-blue-900 hover:bg-blue-900 hover:text-white'
                      }`}
                    >
                      Demander un devis
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Vue Comparateur */}
          {view === 'compare' && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="max-w-6xl mx-auto overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-2xl shadow-sm overflow-hidden">
                  {/* En-tête du tableau */}
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-5 min-w-[200px]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Critères
                        </span>
                      </th>
                      {plans.map((plan, i) => (
                        <th key={i} className="p-5 text-center min-w-[150px]">
                          <div className="inline-flex flex-col items-center gap-1">
                            <span
                              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                plan.badge === 'popular'
                                  ? 'bg-amber-100 text-amber-800'
                                  : plan.badge === 'custom'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {plan.name}
                            </span>
                            {plan.price ? (
                              <span className="text-lg font-bold text-slate-900">
                                {plan.price}{' '}
                                <span className="text-xs font-medium text-slate-500">
                                  {plan.unit}
                                </span>
                              </span>
                            ) : (
                              <span className="text-sm font-bold text-emerald-600">
                                Sur devis
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Corps du tableau */}
                  <tbody>
                    {comparisonSections.map((section, si) => (
                      <React.Fragment key={si}>
                        {/* Ligne catégorie */}
                        <tr className="bg-slate-50">
                          <td
                            colSpan={5}
                            className="p-3 pl-5 text-sm font-bold text-slate-700"
                          >
                            {section.category}
                          </td>
                        </tr>
                        {/* Lignes de critères */}
                        {section.rows.map((row, ri) => (
                          <tr
                            key={ri}
                            className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="p-4 pl-5 text-sm text-slate-600">
                              {row.label}
                            </td>
                            {row.values.map((value, vi) => (
                              <td key={vi} className="p-4 text-center">
                                <CellValue value={value} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>

                  {/* Pied : CTA */}
                  <tfoot>
                    <tr className="border-t border-slate-200">
                      <td className="p-4 pl-5" />
                      {plans.map((plan, i) => (
                        <td key={i} className="p-4 text-center">
                          <a
                            href="#contact"
                            className={`inline-block w-full max-w-[140px] py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                              plan.badge === 'popular'
                                ? 'bg-blue-900 text-white hover:bg-blue-800'
                                : plan.badge === 'custom'
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-slate-100 text-blue-900 hover:bg-blue-900 hover:text-white'
                            }`}
                          >
                            Demander un devis
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
