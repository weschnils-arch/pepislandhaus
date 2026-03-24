import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { useTranslation } from '../i18n'

interface Message {
  id: number
  type: 'bot' | 'user'
  text: string
}

const FAQ_COUNT = 8

export default function ChatWidget() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [showFaqs, setShowFaqs] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const idCounter = useRef(0)

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`chat.faq${i + 1}.q`),
    a: t(`chat.faq${i + 1}.a`),
  }))

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: idCounter.current++,
        type: 'bot',
        text: t('chat.greeting'),
      }])
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = isOpen ? '' : ''
    }
  }, [isOpen])

  const addBotMessage = (text: string) => {
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: idCounter.current++,
        type: 'bot',
        text,
      }])
    }, 400)
  }

  const handleFaqClick = (faq: { q: string; a: string }) => {
    setMessages(prev => [...prev, {
      id: idCounter.current++,
      type: 'user',
      text: faq.q,
    }])
    setShowFaqs(false)
    addBotMessage(faq.a)

    setTimeout(() => setShowFaqs(true), 1200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = input.trim()
    setMessages(prev => [...prev, {
      id: idCounter.current++,
      type: 'user',
      text: userMsg,
    }])
    setInput('')
    setShowFaqs(false)

    const lower = userMsg.toLowerCase()
    const matched = faqs.find(faq => {
      const keywords = faq.q.toLowerCase().split(/\s+/)
      return keywords.some(word => word.length > 3 && lower.includes(word))
    })

    if (matched) {
      addBotMessage(matched.a)
    } else {
      addBotMessage(t('chat.noMatch'))
    }

    setTimeout(() => setShowFaqs(true), 1200)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[360px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl shadow-2xl border border-charcoal/10 dark:border-white/10 bg-warmwhite dark:bg-bg-secondary"
          >
            {/* Header */}
            <div className="relative bg-forest dark:bg-bg-primary p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center font-serif text-white text-sm font-light">
                    PL
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">{t('chat.title')}</h3>
                    <p className="text-white/50 text-[11px] tracking-wide">{t('chat.subtitle')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div data-lenis-prevent className="h-[340px] overflow-y-auto overflow-x-hidden p-4 space-y-3 bg-cream/50 dark:bg-bg-primary/50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className={clsx(
                    'flex',
                    msg.type === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div className={clsx(
                    'max-w-[85%] px-4 py-2.5 text-sm leading-relaxed',
                    msg.type === 'user'
                      ? 'bg-forest dark:bg-accent text-white dark:text-bg-primary rounded-2xl rounded-br-sm'
                      : 'bg-white dark:bg-bg-secondary text-charcoal dark:text-text-primary rounded-2xl rounded-bl-sm shadow-sm border border-charcoal/5 dark:border-white/5'
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* FAQ Quick Replies */}
              <AnimatePresence>
                {showFaqs && messages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-1.5 pt-2"
                  >
                    {faqs.map((faq, i) => (
                      <button
                        key={i}
                        onClick={() => handleFaqClick(faq)}
                        className="text-[11px] leading-snug text-left px-3 py-1.5 rounded-full border border-forest/20 dark:border-accent/20 text-forest dark:text-accent hover:bg-forest/5 dark:hover:bg-accent/5 transition-colors"
                      >
                        {faq.q}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-charcoal/10 dark:border-white/10 p-3 bg-warmwhite dark:bg-bg-secondary">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 bg-cream dark:bg-bg-primary text-charcoal dark:text-text-primary text-sm rounded-full px-4 py-2.5 outline-none border border-charcoal/10 dark:border-white/10 focus:border-forest dark:focus:border-accent transition-colors placeholder:text-charcoal/30 dark:placeholder:text-text-tertiary"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className={clsx(
                    'w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-200',
                    input.trim()
                      ? 'bg-forest dark:bg-accent text-white dark:text-bg-primary shadow-md hover:shadow-lg'
                      : 'bg-charcoal/10 dark:bg-white/10 text-charcoal/30 dark:text-text-tertiary cursor-not-allowed'
                  )}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'group relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300',
          isOpen
            ? 'bg-charcoal/80 dark:bg-white/20'
            : 'bg-forest dark:bg-accent hover:shadow-forest/30 dark:hover:shadow-accent/30'
        )}
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-inherit opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white dark:text-bg-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>
    </div>
  )
}
