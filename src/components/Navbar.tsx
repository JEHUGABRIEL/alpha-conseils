import { useEffect, useState } from 'react';
import { Menu, X, Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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

  const navLinks = [
    { name: t('nav.home'), href: '#accueil' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.about'), href: '#apropos' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale
              className={`h-8 w-8 ${isScrolled ? 'text-blue-900' : 'text-white'}`} />
            
            <span
              className={`text-2xl font-bold font-serif ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
              
              {t('nav.companyName')}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-amber-500 ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}>
              
                {link.name}
              </a>
            )}
            <LanguageSwitcher />
            <a
              href="#contact"
              className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all ${isScrolled ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-white text-blue-900 hover:bg-slate-100'}`}>
              
              {t('nav.bookAppointment')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isScrolled ? 'text-slate-900' : 'text-white'}>
              
              {isMobileMenuOpen ?
              <X className="h-6 w-6" /> :

              <Menu className="h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="md:hidden bg-white fixed inset-0 z-40 h-[100dvh] overflow-y-auto shadow-lg" style={{ paddingTop: isScrolled ? '72px' : '88px' }}>
            {/* Close button */}
            <div className="flex justify-end px-4 pt-4 pb-2">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-all duration-200"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-4 pb-10 space-y-1">
            {navLinks.map((link) =>
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-blue-900 hover:bg-slate-50 rounded-md">
            
                {link.name}
              </a>
          )}
            <div className="pt-4">
              <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center px-5 py-3 rounded-md text-base font-medium bg-blue-900 text-white hover:bg-blue-800">
              
                {t('nav.bookAppointment')}
              </a>
            </div>
          </div>
        </div>
        </>
      )}
    </nav>);
}
