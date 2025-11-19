import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Hero({ onExplore }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-200 text-sm backdrop-blur">
            <Sparkles className="w-4 h-4" />
            Premium e-Gifts Boutique
          </div>
        </motion.div>

        <motion.h1
          className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Электронные подарки, которые дарят эмоции
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-2xl text-blue-100/90 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          От романтичных телеграм-напоминаний до мини-игр и утренних голосовых — всё, чтобы сказать ей, какая она замечательная.
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <button onClick={onExplore} className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Смотреть подарки
          </button>
          <a href="#how" className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors">
            Как это работает
          </a>
        </motion.div>
      </div>
    </section>
  )
}
