import React from 'react';
import { Scale } from 'lucide-react';
export function Footer() {
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
            <p className="text-slate-400 max-w-sm">
              Votre partenaire de confiance pour la création d'entreprise, le
              conseil juridique et l'élaboration de business plans à Bangui,
              RCA.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#accueil"
                  className="hover:text-amber-500 transition-colors">
                  
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-amber-500 transition-colors">
                  
                  Nos Services
                </a>
              </li>
              <li>
                <a
                  href="#apropos"
                  className="hover:text-amber-500 transition-colors">
                  
                  À Propos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-amber-500 transition-colors">
                  
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-slate-400">Formalisation</li>
              <li className="text-slate-400">Business Plan</li>
              <li className="text-slate-400">Conseil Juridique</li>
              <li className="text-slate-400">Accompagnement</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} Alpha Conseil RCA. Tous droits
            réservés.
          </p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>);

}