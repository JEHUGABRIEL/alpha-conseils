import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
}

interface QAPair {
  question: string;
  answer: string;
}

const faqs: QAPair[] = [
  {
    question: 'Quels sont vos services ?',
    answer:
      "Alpha Conseil propose trois principaux services :\n\n1️⃣ **Formalisation d'Entreprises** — Création et enregistrement légal de votre entreprise en RCA (RCCM, statuts, immatriculation fiscale).\n\n2️⃣ **Business Plan** — Élaboration de plans d'affaires solides pour convaincre investisseurs et banques.\n\n3️⃣ **Conseil Juridique** — Assistance en droit des affaires, contrats, fiscalité et droit du travail.\n\nSouhaitez-vous plus de détails sur l'un de ces services ?",
  },
  {
    question: 'Combien coûtent vos prestations ?',
    answer:
      "Nos tarifs varient selon le service :\n\n• **Formalisation** : à partir de 250 000 FCFA\n• **Business Plan** : à partir de 350 000 FCFA\n• **Conseil Juridique** : à partir de 200 000 FCFA\n\nCe sont des tarifs indicatifs. Un devis personnalisé gratuit vous sera établi après étude de votre projet. Contactez-nous pour en discuter !",
  },
  {
    question: 'Où êtes-vous situés ?',
    answer:
      "Nous sommes basés à **Bangui**, en République Centrafricaine. Nous accompagnons aussi bien les clients locaux que les investisseurs internationaux souhaitant s'implanter en RCA.",
  },
  {
    question: 'Comment vous contacter ?',
    answer:
      "Vous pouvez nous contacter par :\n\n📞 **Téléphone** : (+236) 75 29 89 84 / 72 35 66 76\n📧 **Email** : contact@alphaconseil.com\n💬 **WhatsApp** : +236 75 29 89 84\n\nOu remplir le formulaire de contact sur notre site — nous vous répondons sous 24h.",
  },
  {
    question: 'Quels sont les délais ?',
    answer:
      "Les délais varient selon le service :\n\n• **Formalisation d'entreprise** : 1 à 2 semaines en moyenne\n• **Business Plan** : 2 à 3 semaines selon la complexité\n• **Conseil Juridique** : sous 48h pour les urgences\n\nNous nous engageons à vous tenir informé à chaque étape.",
  },
  {
    question: 'Qui est Alpha Conseil ?',
    answer:
      "Alpha Conseil est un cabinet de conseil basé à Bangui, né de la volonté d'offrir aux entrepreneurs et investisseurs en RCA un accompagnement de standard international.\n\nNotre équipe cumule plus de 10 ans d'expérience dans l'accompagnement d'entreprises en Centrafrique. Nous allions expertise locale et rigueur professionnelle pour sécuriser et pérenniser vos projets.",
  },
];

const quickReplies = [
  'Quels sont vos services ?',
  'Combien coûtent vos prestations ?',
  'Où êtes-vous situés ?',
  'Comment vous contacter ?',
];

const welcomeMessage: Message = {
  text: "👋 Bonjour ! Je suis l'assistant virtuel d'Alpha Conseil. Comment puis-je vous aider ? Posez-moi une question ou choisissez parmi les suggestions ci-dessous.",
  isUser: false,
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findAnswer = (question: string): string | undefined => {
    const normalized = question.toLowerCase().trim();

    // D'abord, recherche par correspondance exacte (quick replies)
    for (const faq of faqs) {
      if (normalized === faq.question.toLowerCase()) {
        return faq.answer;
      }
    }

    // Ensuite, recherche floue par mots-clefs
    for (const faq of faqs) {
      const faqNormalized = faq.question.toLowerCase().replace(/[?]/g, '');
      const keywords = faqNormalized.split(' ').filter((w) => w.length > 3);
      let matchCount = 0;
      for (const word of keywords) {
        // Vérifie si le mot-clef est contenu dans la question OU vice-versa (contient)
        if (normalized.includes(word) || word.includes(normalized)) {
          matchCount++;
        }
      }
      if (matchCount >= 2) {
        return faq.answer;
      }
    }

    // Dictionnaire de mots-clés vers FAQ
    const keywordMap: Record<string, number> = {
      service: 0,
      formalisation: 0,
      'business plan': 1,
      juridique: 2,
      tarif: 1,
      coût: 1,
      prix: 1,
      paye: 1,
      contact: 3,
      téléphone: 3,
      email: 3,
      whatsapp: 3,
      adresse: 2,
      situé: 2,
      délai: 4,
      temps: 4,
      semaine: 4,
      jour: 4,
      qui: 5,
      cabinet: 5,
      équipe: 5,
      histoire: 5,
      expérience: 5,
    };

    for (const [keyword, faqIndex] of Object.entries(keywordMap)) {
      if (normalized.includes(keyword)) {
        return faqs[faqIndex].answer;
      }
    }

    return undefined;
  };

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setShowSuggestions(false);
    setMessages((prev) => [...prev, { text: trimmed, isUser: true }]);
    setInput('');

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(trimmed);
      if (answer) {
        setMessages((prev) => [...prev, { text: answer, isUser: false }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "Je n'ai pas trouvé de réponse à votre question. Voici ce que je vous propose :\n\n1️⃣ Essayez l'une des suggestions ci-dessous\n2️⃣ Contactez-nous directement par téléphone au **(+236) 75 29 89 84**\n3️⃣ Remplissez le formulaire de contact sur notre site\n\nNotre équipe vous répondra rapidement !",
            isUser: false,
          },
        ]);
      }
      setShowSuggestions(true);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-blue-900 text-white shadow-lg hover:bg-blue-800 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
        aria-label="Ouvrir le chatbot"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-40 w-[360px] max-[400px]:right-3 max-[400px]:w-[calc(100%-24px)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            {/* En-tête */}
            <div className="bg-blue-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-blue-900 font-bold text-sm">
                  A
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Alpha Conseil
                  </p>
                  <p className="text-blue-200 text-xs">Assistant virtuel</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Fermer le chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[380px] overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.9rem] leading-relaxed whitespace-pre-line ${
                      msg.isUser
                        ? 'bg-blue-900 text-white rounded-br-md'
                        : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Suggestions (quick replies) */}
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={messages.length === 1 ? { delay: 0.3 } : undefined}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className="text-xs bg-white border border-slate-200 text-slate-600 rounded-full px-3.5 py-1.5 hover:border-blue-300 hover:text-blue-900 hover:bg-blue-50 transition-all duration-200 flex items-center gap-1"
                    >
                      {messages.length === 1 && (
                        <ChevronRight className="w-3 h-3 shrink-0" />
                      )}
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-slate-200 p-3 flex items-center gap-2 bg-white"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 border border-slate-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                aria-label="Envoyer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
