import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Sparkles,
  Rocket,
  Table,
  LayoutGrid,
  Minus,
  X,
  Clock,
  Users,
  FileText,
  Shield,
  Target,
  ArrowRight,
} from 'lucide-react';

// ── Données des plans ──

interface PlanDetail {
  icon: React.ElementType;
  title: string;
  items: string[];
}

interface Plan {
  name: string;
  subtitle: string;
  price: string | null;
  unit: string | null;
  description: string;
  badge: string | null;
  features: string[];
  details: PlanDetail[];
  forWho: string;
}

const plans: Plan[] = [
  {
    name: 'Formalisation',
    subtitle: "Création d'entreprise",
    price: '250 000',
    unit: 'FCFA',
    description:
      "Pack complet pour créer et enregistrer votre entreprise en RCA.",
    badge: null,
    features: [
      'Rédaction des statuts',
      'Dépôt du RCCM',
      'Immatriculation fiscale',
      'Ouverture de compte banque conseillée',
      'Assistance administrative complète',
      "Suivi jusqu'à l'obtention des documents",
    ],
    forWho:
      'Entrepreneurs individuels, auto-entrepreneurs et PME souhaitant créer ou régulariser leur entreprise en RCA.',
    details: [
      {
        icon: FileText,
        title: 'Documents fournis',
        items: [
          'Statuts notariés',
          'Registre du Commerce (RCCM)',
          "Carte d'Immatriculation Fiscale",
          "Dossier d'ouverture de compte",
        ],
      },
      {
        icon: Clock,
        title: 'Délais de traitement',
        items: [
          'Phase administrative : 3 à 5 jours',
          'Obtention des documents : 1 à 2 semaines',
          "Suivi prioritaire possible sur demande",
        ],
      },
      {
        icon: Users,
        title: 'Accompagnement',
        items: [
          'Interlocuteur dédié',
          'Suivi WhatsApp disponible',
          'Relance automatique des administrations',
        ],
      },
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
    forWho:
      "Porteurs de projet, start-ups et PME à la recherche de financements ou d'investisseurs.",
    details: [
      {
        icon: Target,
        title: 'Études & Analyses',
        items: [
          'Analyse approfondie du marché centrafricain',
          'Étude de la concurrence',
          'Analyse SWOT détaillée',
          "Positionnement stratégique",
        ],
      },
      {
        icon: FileText,
        title: 'Livrables',
        items: [
          'Business Plan complet (30-50 pages)',
          'Prévisions financières sur 3 ans',
          'Pitch deck investisseurs',
          'Executive summary',
        ],
      },
      {
        icon: Shield,
        title: 'Garanties',
        items: [
          'Révisions illimitées pendant 1 mois',
          'Accompagnement bancaire inclus',
          "Simulation d'obtention de prêt",
          'Support post-financement',
        ],
      },
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
    forWho:
      'Entreprises, ONG et investisseurs ayant besoin de sécuriser leurs activités juridiques en RCA.',
    details: [
      {
        icon: Shield,
        title: 'Périmètre couvert',
        items: [
          "Droit des affaires (OHADA)",
          'Droit du travail centrafricain',
          'Droit fiscal et douanier',
          'Droit des contrats',
        ],
      },
      {
        icon: FileText,
        title: 'Prestations incluses',
        items: [
          'Audit juridique complet de votre structure',
          'Rédaction et révision de contrats',
          'Assistance contentieux',
          "Veille réglementaire trimestrielle",
        ],
      },
      {
        icon: Clock,
        title: 'Délais & Urgences',
        items: [
          'Prise en charge sous 24h',
          'Traitement des urgences en 48h',
          'Suivi mensuel pour les abonnés',
        ],
      },
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
    forWho:
      'Grands comptes, investisseurs internationaux et projets transverses nécessitant une expertise pluridisciplinaire.',
    details: [
      {
        icon: Users,
        title: 'Prestations à la carte',
        items: [
          'Audit global de votre projet',
          'Stratégie de développement',
          'Accompagnement réglementaire complet',
          'Gestion de projet externalisée',
        ],
      },
      {
        icon: Target,
        title: 'Secteurs couverts',
        items: [
          'Agro-industrie',
          'Immobilier et construction',
          'Commerce et distribution',
          'Services et technologies',
        ],
      },
      {
        icon: Shield,
        title: 'Engagements',
        items: [
          'Interlocuteur unique dédié',
          'Disponibilité 7j/7',
          'Reporting hebdomadaire',
          'Confidentialité totale',
        ],
      },
    ],
  },
];

// ── Données de comparaison ──

interface ComparisonRow {
  label: string;
  values: (boolean | string)[];
}

const comparisonSections: { category: string; rows: ComparisonRow[] }[] = [
  {
    category: '💰 Prix & Délais',
    rows: [
      { label: 'Prix', values: ['250 000 FCFA', '350 000 FCFA', '200 000 FCFA', 'Sur devis'] },
      { label: "Délais d'exécution", values: ['1 à 2 sem.', '2 à 3 sem.', '48h à 1 sem.', 'Selon projet'] },
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

// ── Modale de détails ──

function PlanModal({
  plan,
  onClose,
}: {
  plan: Plan;
  onClose: () => void;
}) {
  // Verrouille le scroll + fermeture avec Échap
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Détails du pack ${plan.name}`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Contenu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
      >
        {/* En-tête avec bandeau */}
        <div
          className={`p-6 sm:p-8 ${
            plan.badge === 'popular'
              ? 'bg-blue-900'
              : plan.badge === 'custom'
              ? 'bg-emerald-600'
              : 'bg-slate-800'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <span
                className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${
                  plan.badge === 'popular'
                    ? 'bg-amber-500 text-white'
                    : plan.badge === 'custom'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/20 text-white'
                }`}
              >
                {plan.badge === 'popular'
                  ? '⭐ Le plus populaire'
                  : plan.badge === 'custom'
                  ? '🚀 Sur devis'
                  : plan.name}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {plan.name}
              </h3>
              <p className="text-white/80 text-sm">{plan.subtitle}</p>
              {plan.price ? (
                <p className="text-2xl font-bold text-white mt-3">
                  {plan.price}{' '}
                  <span className="text-base font-medium text-white/70">
                    {plan.unit}
                  </span>
                </p>
              ) : (
                <p className="text-xl font-bold text-white mt-3">Sur devis</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-all"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Pour qui */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              À qui s'adresse ce pack ?
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {plan.forWho}
            </p>
          </div>

          {/* Sections de détails */}
          {plan.details.map((section, i) => {
            const Icon = section.icon;
            return (
              <div key={i}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {section.title}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-slate-600"
                    >
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.badge === 'popular'
                            ? 'text-amber-500'
                            : plan.badge === 'custom'
                            ? 'text-emerald-500'
                            : 'text-blue-900'
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <a
              href="#contact"
              onClick={onClose}
              className={`flex-1 text-center py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                plan.badge === 'popular'
                  ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md'
                  : plan.badge === 'custom'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
                  : 'bg-blue-900 text-white hover:bg-blue-800'
              }`}
            >
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Composant principal ──

export function Pricing() {
  const [view, setView] = useState<'cards' | 'compare'>('cards');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

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
                    transition={{ duration: 0.6, delay: index * 0.25 }}
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
                      <p className="text-slate-500 text-sm mb-4">
                        {plan.subtitle}
                      </p>
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
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check
                            className={`w-5 h-5 shrink-0 mt-0.5 ${
                              plan.badge === 'popular'
                                ? 'text-amber-500'
                                : 'text-blue-900'
                            }`}
                          />
                          <span className="text-slate-600 text-[0.92rem]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Bouton Voir les détails */}
                    <button
                      onClick={() => setSelectedPlan(plan)}
                      className="w-full text-center py-2.5 rounded-lg font-medium text-xs transition-all duration-200 mb-2 border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-900 hover:bg-blue-50"
                    >
                      Voir les détails →
                    </button>

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

                  <tbody>
                    {comparisonSections.map((section, si) => (
                      <React.Fragment key={si}>
                        <tr className="bg-slate-50">
                          <td
                            colSpan={5}
                            className="p-3 pl-5 text-sm font-bold text-slate-700"
                          >
                            {section.category}
                          </td>
                        </tr>
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

      {/* Modale */}
      <AnimatePresence>
        {selectedPlan && (
          <PlanModal
            plan={selectedPlan}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
