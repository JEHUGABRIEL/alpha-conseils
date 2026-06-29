import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
export function Contact() {
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success'>(
    'idle');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-900 font-semibold tracking-wide uppercase text-sm mb-3">
            Contactez-nous
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-serif">
            Prêt à démarrer votre projet ?
          </h3>
          <p className="text-lg text-slate-600">
            Notre équipe est à votre disposition pour répondre à vos questions
            et vous accompagner dans vos démarches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
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
              duration: 0.5
            }}
            className="bg-blue-900 rounded-3xl p-10 text-white">
            
            <h4 className="text-2xl font-bold mb-8 font-serif">
              Informations de contact
            </h4>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-800/50 p-3 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-lg mb-1">Notre Bureau</h5>
                  <p className="text-blue-200 leading-relaxed">
                    Centre-ville, Avenue Boganda
                    <br />
                    Bangui, République Centrafricaine
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-800/50 p-3 rounded-lg mr-4">
                  <Phone className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-lg mb-1">Téléphone</h5>
                  <p className="text-blue-200">
                    +236 70 00 00 00
                    <br />
                    +236 75 00 00 00
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-800/50 p-3 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-lg mb-1">Email</h5>
                  <p className="text-blue-200">
                    contact@alphaconseil-rca.com
                    <br />
                    direction@alphaconseil-rca.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-blue-800">
              <h5 className="font-semibold text-lg mb-4">Heures d'ouverture</h5>
              <div className="space-y-2 text-blue-200">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span>08:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>09:00 - 13:00</span>
                </div>
                <div className="flex justify-between text-blue-400">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
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
              delay: 0.2
            }}>
            
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-100">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-700 mb-2">
                    
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors"
                    placeholder="Jean" />
                  
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-slate-700 mb-2">
                    
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors"
                    placeholder="Dupont" />
                  
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2">
                  
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors"
                  placeholder="jean.dupont@exemple.com" />
                
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-slate-700 mb-2">
                  
                  Service souhaité
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors bg-white">
                  
                  <option>Formalisation d'entreprise</option>
                  <option>Business Plan</option>
                  <option>Conseil Juridique</option>
                  <option>Autre demande</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-2">
                  
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors resize-none"
                  placeholder="Décrivez brièvement votre projet ou votre besoin...">
                </textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus !== 'idle'}
                className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-all disabled:opacity-70">
                
                {formStatus === 'submitting' ?
                <span className="flex items-center">Envoi en cours...</span> :
                formStatus === 'success' ?
                <span className="flex items-center text-green-400">
                    Message envoyé !
                  </span> :

                <span className="flex items-center">
                    Envoyer le message
                    <Send className="ml-2 w-4 h-4" />
                  </span>
                }
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>);

}