import { useEffect, useState } from 'react';
import { Menu, X, Scale } from 'lucide-react';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
  {
    name: 'Accueil',
    href: '#accueil'
  },
  {
    name: 'Services',
    href: '#services'
  },
  {
    name: 'À Propos',
    href: '#apropos'
  },
  {
    name: 'Contact',
    href: '#contact'
  }];

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
              
              Alpha Conseil
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
            <a
              href="#contact"
              className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all ${isScrolled ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-white text-blue-900 hover:bg-slate-100'}`}>
              
              Prendre Rendez-vous
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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
      {isMobileMenuOpen &&
      <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg border-t border-slate-100">
          <div className="px-4 pt-2 pb-6 space-y-1">
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
              
                Prendre Rendez-vous
              </a>
            </div>
          </div>
        </div>
      }
    </nav>);

}