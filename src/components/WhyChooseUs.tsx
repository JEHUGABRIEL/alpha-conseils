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
import { useTranslation } from 'react-i18next';

const reasonIcons = [Award, Users, Clock, ShieldCheck, TrendingUp, MessageCircle];
const reasonColors = [
  'bg-amber-100 text-amber-700',
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-purple-100 text-purple-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
];

const headerVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

function cardVariants(index: number) {
  const direction = index % 2 === 0 ? -60 : 60;
  return {
    hidden: { opacity: 0, x: direction, y: 30, scale: 0.92 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 14, delay: 0.2 },
  },
};

const bannerVariants = {
  hidden: { opacity: 0, scale: 0.85, clipPath: 'inset(10% 10% 10% 10% round 24px)' },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0% round 24px)',
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function WhyChooseUs() {
  const { t } = useTranslation();
  const reasons = t('whyChooseUs.reasons', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-blue-900 font-semibold tracking-wide uppercase text-sm mb-3">
            {t('whyChooseUs.badge')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {t('whyChooseUs.title')}
          </h3>
          <p className="text-lg text-slate-600">
            {t('whyChooseUs.description')}
          </p>
        </motion.div>

        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {reasons.map((reason, index) => {
            const Icon = reasonIcons[index];
            const color = reasonColors[index];
            return (
              <motion.div
                key={index}
                variants={cardVariants(index)}
                className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <motion.div
                  variants={iconVariants}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">
                  {reason.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={bannerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="bg-blue-900 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800/30 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse delay-500" />

          <div className="relative z-10">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              {t('whyChooseUs.banner.title')}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-blue-200 text-lg max-w-2xl mx-auto mb-8"
            >
              {t('whyChooseUs.banner.description')}
            </motion.p>

            <motion.div
              variants={buttonContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
            >
              <motion.a
                variants={buttonVariants}
                href="tel:+23672153255"
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {t('whyChooseUs.banner.phone')}
              </motion.a>
              <motion.a
                variants={buttonVariants}
                href="https://wa.me/23672153255"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                {t('whyChooseUs.banner.whatsapp')}
              </motion.a>
              <motion.a
                variants={buttonVariants}
                href="mailto:contact@alphaconseil-rca.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-lg transition-all duration-200 border border-white/20"
              >
                <Mail className="w-5 h-5" />
                {t('whyChooseUs.banner.writeUs')}
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-blue-300 text-sm"
            >
              {t('whyChooseUs.banner.footer')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
