import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function GiftCard({ gift, onBuy }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
    >
      <div className="relative">
        <img src={gift.cover_image} alt={gift.title} className="h-56 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <div className="absolute bottom-4 left-4 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: (gift.accent_color||'#0ea5e9')+'33', color: gift.accent_color||'#0ea5e9' }}>
          {gift.category}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-white font-semibold text-lg">{gift.title}</h3>
        <p className="text-blue-100/80 text-sm mt-1">{gift.tagline}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {gift.features?.slice(0,3).map((f, i) => (
            <span key={i} className="text-xs text-blue-100/80 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">{f}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-white font-bold text-xl">${gift.price.toFixed(2)}</div>
          <button onClick={() => onBuy(gift)} className="inline-flex items-center gap-2 text-white/90 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition-colors">
            Купить <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
