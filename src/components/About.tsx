import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
export function About() {
  const benefits = [
  'Expertise locale approfondie du marché centrafricain',
  'Accompagnement personnalisé et sur-mesure',
  'Réseau de partenaires solides à Bangui',
  'Confidentialité et rigueur professionnelle'];

  return (
    <section id="apropos" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{
              opacity: 0,
              x: -30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}
            className="lg:w-1/2">
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
                alt="Équipe en réunion"
                className="rounded-2xl shadow-2xl object-cover h-[500px] w-full" />
              
              <div className="absolute -bottom-6 -right-6 bg-blue-900 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <div className="text-4xl font-bold font-serif mb-1 text-amber-500">
                  10+
                </div>
                <div className="text-sm font-medium">
                  Années d'expérience
                  <br />
                  cumulée
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}
            className="lg:w-1/2">
            
            <h2 className="text-blue-900 font-semibold tracking-wide uppercase text-sm mb-3">
              À Propos de Nous
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-serif">
              L'excellence au service de votre ambition
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Basé à Bangui, Alpha Conseil est né de la volonté d'offrir aux
              entrepreneurs et investisseurs en République Centrafricaine un
              accompagnement de standard international. Nous comprenons les
              défis locaux et vous apportons des solutions concrètes pour
              sécuriser et pérenniser vos investissements.
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) =>
              <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </li>
              )}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-900 hover:bg-blue-800 transition-colors">
              
              Discuter de votre projet
            </a>
          </motion.div>
        </div>
      </div>
    </section>);

}