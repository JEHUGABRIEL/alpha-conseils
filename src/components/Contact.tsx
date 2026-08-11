import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Contact() {
  const { t } = useTranslation();
  const serviceOptions = t('contact.form.serviceOptions', { returnObjects: true }) as string[];
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors bg-white';

  const infoItems = [
    {
      icon: MapPin,
      title: t('contact.office.title'),
      lines: [t('contact.office.address'), t('contact.office.city')],
    },
    {
      icon: Phone,
      title: t('contact.phone.title'),
      lines: [t('contact.phone.number')],
    },
    {
      icon: Mail,
      title: t('contact.email.title'),
      lines: [t('contact.email.address1'), t('contact.email.address2')],
    },
  ];

  return (
    <section id="contact" className="pt-16 pb-24 bg-white overflow-hidden">
      {/* Bande bleue pleine largeur — touche les bords de l'écran */}
      <div className="relative bg-blue-900 pt-12 sm:pt-16 pb-64 sm:pb-72 text-white overflow-hidden">
        {/* Image de fond */}
        <img
          src="/images/contact-bg.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/85" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-transparent to-blue-950/50" aria-hidden="true" />

        {/* Décor */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-800/40 rounded-full blur-2xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
              <h2 className="text-amber-400 font-semibold tracking-wide uppercase text-sm mb-3">
                {t('contact.badge')}
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
                {t('contact.title')}
              </h3>
              <p className="text-lg text-blue-200">
                {t('contact.description')}
              </p>
            </div>

            {/* Infos de contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {infoItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="bg-blue-800/50 p-3 rounded-lg shrink-0">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-semibold text-lg mb-1">{item.title}</h5>
                      {item.lines.map((line) => (
                        <p key={line} className="text-blue-200 leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Horaires */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-800/50 p-3 rounded-lg shrink-0">
                  <Clock className="w-6 h-6 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <h5 className="font-semibold text-lg mb-2">{t('contact.hours.title')}</h5>
                  <div className="space-y-1.5 text-sm text-blue-200">
                    <div className="flex justify-between gap-4">
                      <span>{t('contact.hours.weekdays')}</span>
                      <span className="text-white font-medium">{t('contact.hours.weekdaysHours')}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>{t('contact.hours.saturday')}</span>
                      <span className="text-white font-medium">{t('contact.hours.saturdayHours')}</span>
                    </div>
                    <div className="flex justify-between gap-4 text-blue-400">
                      <span>{t('contact.hours.sunday')}</span>
                      <span>{t('contact.hours.sundayHours')}</span>
                    </div>
                  </div>
                </div>
              </div>            </div>
          </div>
      </div>

      {/* Formulaire superposé — moitié haute sur la bande, moitié basse déborde */}
      <div className="relative -mt-56 sm:-mt-64 z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-2xl shadow-blue-950/10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                  {t('contact.form.firstName')}
                </label>
                <input type="text" id="firstName" required className={inputClass} placeholder={t('contact.form.firstNamePlaceholder')} />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                  {t('contact.form.lastName')}
                </label>
                <input type="text" id="lastName" required className={inputClass} placeholder={t('contact.form.lastNamePlaceholder')} />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                {t('contact.form.email')}
              </label>
              <input type="email" id="email" required className={inputClass} placeholder={t('contact.form.emailPlaceholder')} />
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
                {t('contact.form.service')}
              </label>
              <select id="service" className={`${inputClass} cursor-pointer`}>
                {serviceOptions.map((option, i) => (
                  <option key={i}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                {t('contact.form.message')}
              </label>
              <textarea id="message" rows={4} required className={`${inputClass} resize-none`} placeholder={t('contact.form.messagePlaceholder')} />
            </div>
            <button
              type="submit"
              disabled={formStatus !== 'idle'}
              className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-all disabled:opacity-70"
            >
              {formStatus === 'submitting' ? (
                <span className="flex items-center">{t('contact.form.sending')}</span>
              ) : formStatus === 'success' ? (
                <span className="flex items-center text-green-400">{t('contact.form.success')}</span>
              ) : (
                <span className="flex items-center">
                  {t('contact.form.submit')}
                  <Send className="ml-2 w-4 h-4" />
                </span>
              )}
            </button>
        </motion.form>
      </div>
    </section>
  );
}
