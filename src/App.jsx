import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import GiftCard from './components/GiftCard'
import HowItWorks from './components/HowItWorks'
import PurchaseModal from './components/PurchaseModal'

function App() {
  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/gifts`)
        const data = await res.json()
        setGifts(data)
      } catch (e) {
        setGifts([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const explore = () => {
    const el = document.getElementById('catalog')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(40rem_30rem_at_20%_10%,rgba(236,72,153,.15),transparent),radial-gradient(30rem_20rem_at_80%_0%,rgba(99,102,241,.15),transparent)] pointer-events-none" />
      <div className="relative">
        <Hero onExplore={explore} />

        <section id="catalog" className="relative py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Выбор подарков</h2>
              <p className="text-blue-100/80 text-sm">Premium-каталог цифровых сюрпризов</p>
            </div>

            {loading ? (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_,i)=> (
                  <div key={i} className="h-72 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
                ))}
              </div>
            ) : (
              <motion.div layout className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gifts.map(g => (
                  <GiftCard key={g.id} gift={g} onBuy={setSelected} />
                ))}
              </motion.div>
            )}

            {!loading && gifts.length === 0 && (
              <div className="mt-8 text-center text-blue-100/80">Пока пусто. Обновите страницу — мы добавим демо-подарки.</div>
            )}
          </div>
        </section>

        <HowItWorks />

        <footer className="py-12 text-center text-blue-100/60">
          Сделано с теплом • E-Gifts Premium
        </footer>
      </div>

      <PurchaseModal open={!!selected} onClose={() => setSelected(null)} gift={selected} />
    </div>
  )
}

export default App
