import { Scale } from 'lucide-react';
import { FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FaXTwitter, href: '#', label: 'Twitter / X' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
];

export function Footer() {
  const { t } = useTranslation();
  const serviceItems = t('footer.serviceItems', { returnObjects: true }) as string[];

  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-8 w-8 text-amber-500" />
              <span className="text-2xl font-bold font-serif text-white">
                Alpha Conseil
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-10 w-10 rounded-full bg-slate-800 hover:bg-amber-500 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#accueil" className="hover:text-amber-500 transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-500 transition-colors">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#apropos" className="hover:text-amber-500 transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-500 transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {serviceItems.map((item, i) => (
                <li key={i} className="text-slate-400">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              {t('footer.legal.notice')}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t('footer.legal.privacy')}
            </a>
          </div>
        </div>
      </div>
    </footer>);
}
