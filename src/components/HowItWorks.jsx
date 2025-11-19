import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const steps = [
  {
    title: 'Выбираете подарок',
    desc: 'Мини-игра, телеграм-бот с напоминаниями, плейлист заботы — мы подготовили лучшие варианты.',
  },
  {
    title: 'Персонализируете',
    desc: 'Добавьте имя получательницы и тёплое послание — мы аккуратно вплетём его в подарок.',
  },
  {
    title: 'Мгновенная доставка',
    desc: 'Сразу после оплаты вы получаете ссылку и инструкцию. Удобно отправить в один клик.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-center text-3xl md:text-4xl font-extrabold text-white"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Как это работает
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.6 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
              <CheckCircle2 className="w-6 h-6 text-teal-400" />
              <h3 className="text-white font-semibold mt-3">{s.title}</h3>
              <p className="text-blue-100/80 text-sm mt-2">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
