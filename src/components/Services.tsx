import React from 'react';
import { motion } from 'framer-motion';
import { Building2, LineChart, Scale } from 'lucide-react';
const services = [
{
  title: "Formalisation d'Entreprises",
  description:
  "Nous vous accompagnons dans toutes les démarches administratives pour créer et enregistrer légalement votre entreprise en République Centrafricaine. De la rédaction des statuts à l'obtention du RCCM.",
  icon: Building2,
  color: 'bg-blue-100 text-blue-700'
},
{
  title: 'Business Plan',
  description:
  "Élaboration de plans d'affaires solides et réalistes pour structurer votre projet, convaincre les investisseurs et obtenir des financements auprès des banques et institutions financières.",
  icon: LineChart,
  color: 'bg-amber-100 text-amber-700'
},
{
  title: 'Conseil Juridique',
  description:
  "Assistance et conseils en droit des affaires, droit du travail et fiscalité. Nous sécurisons vos contrats et vous aidons à naviguer dans l'environnement juridique centrafricain en toute sérénité.",
  icon: Scale,
  color: 'bg-emerald-100 text-emerald-700'
}];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-900 font-semibold tracking-wide uppercase text-sm mb-3">
            Nos Domaines d'Expertise
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Des solutions adaptées à vos besoins
          </h3>
          <p className="text-lg text-slate-600">
            Alpha Conseil met à votre disposition une équipe d'experts dédiés
            pour vous accompagner à chaque étape du développement de votre
            activité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2
                }}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300 group">
                
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                  
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">
                  {service.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>);

          })}
        </div>
      </div>
    </section>);

}