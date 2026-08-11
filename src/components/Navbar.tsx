import { useEffect, useRef, useState } from 'react';
import { Menu, X, Scale, Home, Briefcase, Users, Mail, Phone, CalendarCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_SECTIONS = [
  { id: 'accueil', labelKey: 'nav.home', icon: Home },
  { id: 'services', labelKey: 'nav.services', icon: Briefcase },
  { id: 'apropos', labelKey: 'nav.about', icon: Users },
  { id: 'contact', labelKey: 'nav.contact', icon: Mail },
] as const;

export function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setActiveSection(getActiveSection());
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close the mobile menu when crossing the desktop breakpoint to avoid a locked page
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMobileMenuOpen(false);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getActiveSection = (): string => {
    const scrollPosition = window.scrollY + window.innerHeight * 0.35;
    let current = 'accueil';
    for (const section of NAV_SECTIONS) {
      const el = document.getElementById(section.id);
      if (el && el.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
        current = section.id;
      }
    }
    return current;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setTimeout(() => menuToggleRef.current?.focus(), 300);
  };

  const isSolid = isScrolled || isMobileMenuOpen;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, x: 24, transition: { duration: 0.15 } },
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a
            href="#accueil"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 group"
            aria-label={t('nav.companyName')}
          >
            <span className="relative">
              <Scale
                className={`h-8 w-8 transition-colors duration-300 ${isSolid ? 'text-blue-900' : 'text-white'}`}
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-300 ${
                  isSolid ? 'bg-amber-500 border-white' : 'bg-amber-400 border-transparent'
                }`}
              />
            </span>
            <span
              className={`text-xl sm:text-2xl font-bold font-serif transition-colors duration-300 ${isSolid ? 'text-blue-900' : 'text-white'}`}
            >
              {t('nav.companyName')}
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="relative group"
                  onClick={() => setActiveSection(section.id)}
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-200 group-hover:text-amber-500 ${
                      isSolid
                        ? isActive
                          ? 'text-blue-900'
                          : 'text-slate-600'
                        : isActive
                          ? 'text-amber-400'
                          : 'text-slate-200'
                    }`}
                  >
                    {t(section.labelKey)}
                  </span>
                  <span
                    className={`absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-amber-500 transition-all duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    } group-hover:scale-x-100`}
                  />
                </a>
              );
            })}
            <LanguageSwitcher dark={isSolid} />
            <a
              href="#contact"
              className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-95 ${
                isSolid
                  ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md shadow-blue-900/20'
                  : 'bg-white text-blue-900 hover:bg-slate-100'
              }`}
            >
              {t('nav.bookAppointment')}
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher dark={isSolid} />
            <button
              ref={menuToggleRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className={`p-2 rounded-lg transition-colors duration-200 hover:bg-black/5 ${
                isSolid ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />
            <motion.div
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.menuLabel')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="md:hidden fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Scale className="h-7 w-7 text-blue-900" />
                  <span className="text-xl font-bold font-serif text-blue-900">
                    {t('nav.companyName')}
                  </span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-all duration-200"
                  aria-label={t('nav.closeMenu')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation */}
              <motion.nav
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex-1 overflow-y-auto px-4 py-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-3">
                  {t('nav.menuLabel')}
                </p>
                {NAV_SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <motion.a
                      key={section.id}
                      variants={itemVariants}
                      href={`#${section.id}`}
                      onClick={() => {
                        setActiveSection(section.id);
                        closeMobileMenu();
                      }}
                      className={`flex items-center gap-3.5 px-3 py-3.5 rounded-xl mb-1.5 transition-all duration-200 group ${
                        isActive
                          ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/25'
                          : 'text-slate-700 hover:bg-slate-50 hover:pl-5'
                      }`}
                    >
                      <span
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                          isActive
                            ? 'bg-white/15 text-amber-400'
                            : 'bg-slate-100 text-blue-900 group-hover:bg-blue-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="flex-1 text-[15px] font-medium">{t(section.labelKey)}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                      )}
                    </motion.a>
                  );
                })}
              </motion.nav>

              {/* Drawer Footer */}
              <div className="px-5 py-5 border-t border-slate-100 space-y-4 bg-slate-50/50">
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-base font-semibold bg-blue-900 text-white hover:bg-blue-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-900/25"
                >
                  <CalendarCheck className="w-5 h-5" />
                  {t('nav.bookAppointment')}
                </a>
                <div className="flex items-center justify-center gap-3">
                  <LanguageSwitcher dark />
                  <span className="w-px h-5 bg-slate-200" aria-hidden="true" />
                  <a
                    href={`tel:${t('contact.phone.number').replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-900 transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    {t('contact.phone.number')}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
