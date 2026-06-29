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
import { useTranslation } from 'react-i18next';

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

const detailIconMap: Record<string, React.ElementType> = {
  'Documents fournis': FileText,
  'Documents Provided': FileText,
  'Délais de traitement': Clock,
  'Processing Times': Clock,
  'Accompagnement': Users,
  'Support': Users,
  'Études & Analyses': Target,
  'Studies & Analyses': Target,
  'Livrables': FileText,
  'Deliverables': FileText,
  'Garanties': Shield,
  'Guarantees': Shield,
  'Périmètre couvert': Shield,
  'Scope Covered': Shield,
  'Prestations incluses': FileText,
  'Included Services': FileText,
  'Délais & Urgences': Clock,
  'Deadlines & Emergencies': Clock,
  'Prestations à la carte': Users,
  'À la carte Services': Users,
  'Secteurs couverts': Target,
  'Sectors Covered': Target,
  'Engagements': Shield,
  'Commitments': Shield,
};

function ComparisonTable({ plans, comparisonSections, t }: { plans: Plan[]; comparisonSections: any; t: any }) {
  return (
    <div className="max-w-6xl mx-auto overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-2xl shadow-sm overflow-hidden">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left p-5 min-w-[200px]">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t('pricing.compare.criteria')}
              </span>
            </th>
            {plans.map((plan, i) => (
              <th key={i} className="p-5 text-center min-w-[150px]">
                <div className="inline-flex flex-col items-center gap-1">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${plan.badge === 'popular' ? 'bg-amber-100 text-amber-800' : plan.badge === 'custom' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                    {plan.name}
                  </span>
                  {plan.price ? (
                    <span className="text-lg font-bold text-slate-900">
                      {plan.price} <span className="text-xs font-medium text-slate-500">{plan.unit}</span>
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-emerald-600">{t('pricing.freeQuote')}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonSections.map((section: any, si: number) => (
            <React.Fragment key={si}>
              <tr className="bg-slate-50">
                <td colSpan={5} className="p-3 pl-5 text-sm font-bold text-slate-700">
                  {section.category}
                </td>
              </tr>
              {section.rows.map((row: any, ri: number) => (
                <tr key={ri} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 pl-5 text-sm text-slate-600">{row.label}</td>
                  {row.values.map((value: any, vi: number) => (
                    <td key={vi} className="p-4 text-center">
                      {typeof value === 'boolean' ? (
                        value ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <Minus className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        <span className="text-sm text-slate-700 font-medium">{value}</span>
                      )}
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
                <a href="#contact" className={`inline-block w-full max-w-[140px] py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${plan.badge === 'popular' ? 'bg-blue-900 text-white hover:bg-blue-800' : plan.badge === 'custom' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-100 text-blue-900 hover:bg-blue-900 hover:text-white'}`}>
                  {t('pricing.cta')}
                </a>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function PlanModal({ plan, onClose, t }: { plan: Plan; onClose: () => void; t: any }) {
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
      >
        <div className={`p-6 sm:p-8 ${plan.badge === 'popular' ? 'bg-blue-900' : plan.badge === 'custom' ? 'bg-emerald-600' : 'bg-slate-800'}`}>
          <div className="flex items-start justify-between">
            <div>
              <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${plan.badge === 'popular' ? 'bg-amber-500 text-white' : plan.badge === 'custom' ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white'}`}>
                {plan.badge === 'popular' ? t('pricing.badgeLabels.popular') : plan.badge === 'custom' ? t('pricing.badgeLabels.custom') : plan.name}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-white/80 text-sm">{plan.subtitle}</p>
              {plan.price ? (
                <p className="text-2xl font-bold text-white mt-3">
                  {plan.price} <span className="text-base font-medium text-white/70">{plan.unit}</span>
                </p>
              ) : (
                <p className="text-xl font-bold text-white mt-3">{t('pricing.freeQuote')}</p>
              )}
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-all" aria-label={t('pricing.modal.close')}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 sm:p-8 space-y-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              {t('pricing.modal.forWho')}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">{plan.forWho}</p>
          </div>
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
                    <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.badge === 'popular' ? 'text-amber-500' : plan.badge === 'custom' ? 'text-emerald-500' : 'text-blue-900'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <a href="#contact" onClick={onClose} className={`flex-1 text-center py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${plan.badge === 'popular' ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md' : plan.badge === 'custom' ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md' : 'bg-blue-900 text-white hover:bg-blue-800'}`}>
              {t('pricing.modal.requestQuote')}
              <ArrowRight className="w-4 h-4" />
            </a>
            <button onClick={onClose} className="px-6 py-3 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all">
              {t('pricing.modal.close')}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Pricing() {
  const { t } = useTranslation();
  const plansData = t('pricing.plans', { returnObjects: true }) as any[];
  const comparisonSections = t('pricing.compare.sections', { returnObjects: true }) as any[];

  const badgeMap: Record<string, string | null> = {};
  plansData.forEach((plan: any) => {
    if (plan.name === 'Formalisation' || plan.name === 'Formalization') badgeMap[plan.name] = null;
    else if (plan.name === 'Business Plan') badgeMap[plan.name] = 'popular';
    else if (plan.name === 'Conseil Juridique' || plan.name === 'Legal Advice') badgeMap[plan.name] = null;
    else if (plan.name === 'Sur Mesure' || plan.name === 'Custom') badgeMap[plan.name] = 'custom';
  });

  const priceData: Record<string, { price: string | null; unit: string | null }> = {
    'Formalisation': { price: '250 000', unit: 'FCFA' },
    'Formalization': { price: '250 000', unit: 'FCFA' },
    'Business Plan': { price: '350 000', unit: 'FCFA' },
    'Conseil Juridique': { price: '200 000', unit: 'FCFA' },
    'Legal Advice': { price: '200 000', unit: 'FCFA' },
    'Sur Mesure': { price: null, unit: null },
    'Custom': { price: null, unit: null },
  };

  const plans: Plan[] = plansData.map((plan: any) => {
    const pd = priceData[plan.name] || { price: null, unit: null };
    const details: PlanDetail[] = plan.details.map((d: any) => ({
      icon: detailIconMap[d.title] || FileText,
      title: d.title,
      items: d.items,
    }));
    return {
      ...plan,
      price: pd.price,
      unit: pd.unit,
      badge: badgeMap[plan.name] || null,
      details,
    };
  });

  const [view, setView] = useState<'cards' | 'compare'>('cards');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <section id="tarifs" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-blue-900 font-semibold tracking-wide uppercase text-sm mb-3">
            {t('pricing.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {t('pricing.title')}
          </h3>
          <p className="text-lg text-slate-600">
            {t('pricing.description')}
          </p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
            <button onClick={() => setView('cards')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${view === 'cards' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
              <LayoutGrid className="w-4 h-4" />
              {t('pricing.viewCards')}
            </button>
            <button onClick={() => setView('compare')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${view === 'compare' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
              <Table className="w-4 h-4" />
              {t('pricing.viewCompare')}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
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
                      plan.badge === 'popular' ? 'border-blue-900 bg-white shadow-xl scale-[1.02] md:scale-105' :
                      plan.badge === 'custom' ? 'border-emerald-500 bg-white shadow-lg' :
                      'border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg'
                    }`}
                  >
                    {plan.badge === 'popular' && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg z-10">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t('pricing.badgeLabels.popular').toUpperCase()}
                      </div>
                    )}
                    {plan.badge === 'custom' && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg z-10">
                        <Rocket className="w-3.5 h-3.5" />
                        {t('pricing.badgeLabels.custom').toUpperCase()}
                      </div>
                    )}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-1">{plan.name}</h4>
                      <p className="text-slate-500 text-sm mb-4">{plan.subtitle}</p>
                      {plan.price ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                          <span className="text-sm text-slate-500 font-medium">{plan.unit}</span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-emerald-600">{t('pricing.freeQuote')}</span>
                        </div>
                      )}
                      <p className="text-slate-500 text-sm mt-3 leading-relaxed">{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.badge === 'popular' ? 'text-amber-500' : 'text-blue-900'}`} />
                          <span className="text-slate-600 text-[0.92rem]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setSelectedPlan(plan)} className="w-full text-center py-2.5 rounded-lg font-medium text-xs transition-all duration-200 mb-2 border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-900 hover:bg-blue-50">
                      {t('pricing.modal.viewDetails')}
                    </button>
                    <a href="#contact" className={`w-full text-center py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${plan.badge === 'popular' ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md' : plan.badge === 'custom' ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md' : 'bg-slate-100 text-blue-900 hover:bg-blue-900 hover:text-white'}`}>
                      {t('pricing.cta')}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {view === 'compare' && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ComparisonTable plans={plans} comparisonSections={comparisonSections} t={t} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm">
            {t('pricing.footer.text')}{' '}
            <a href="#contact" className="text-blue-900 font-semibold underline underline-offset-2 hover:text-amber-600 transition-colors">
              {t('pricing.footer.link')}
            </a>{' '}
            {t('pricing.footer.forEstimate')}
          </p>
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedPlan && <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} t={t} />}
      </AnimatePresence>
    </section>
  );
}
