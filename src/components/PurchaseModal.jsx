import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PurchaseModal({ open, onClose, gift }) {
  const [form, setForm] = useState({ buyer_name: '', buyer_email: '', recipient_name: '', recipient_telegram: '', personal_message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(null)

  useEffect(() => {
    if (!open) {
      setForm({ buyer_name: '', buyer_email: '', recipient_name: '', recipient_telegram: '', personal_message: '' })
      setDone(null)
    }
  }, [open])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, gift_id: gift?.id || gift?._id || 'demo' })
      })
      const data = await res.json()
      setDone(data)
    } catch (e) {
      setDone({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur" onClick={onClose} />
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-white text-xl font-semibold">Оформление: {gift?.title}</h3>
            <p className="text-blue-100/70 text-sm mt-1">${gift?.price?.toFixed?.(2)} • {gift?.tagline}</p>
            <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-3">
              <input required placeholder="Ваше имя" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-blue-100/50" value={form.buyer_name} onChange={(e)=>setForm(f=>({...f,buyer_name:e.target.value}))} />
              <input required type="email" placeholder="Email для получения" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-blue-100/50" value={form.buyer_email} onChange={(e)=>setForm(f=>({...f,buyer_email:e.target.value}))} />
              <input placeholder="Имя получательницы (опционально)" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-blue-100/50" value={form.recipient_name} onChange={(e)=>setForm(f=>({...f,recipient_name:e.target.value}))} />
              <input placeholder="Telegram получательницы (опционально)" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-blue-100/50" value={form.recipient_telegram} onChange={(e)=>setForm(f=>({...f,recipient_telegram:e.target.value}))} />
              <textarea placeholder="Личное послание" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-blue-100/50" rows={3} value={form.personal_message} onChange={(e)=>setForm(f=>({...f,personal_message:e.target.value}))} />
              <button disabled={loading} className="mt-2 px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold disabled:opacity-60">{loading ? 'Оформляем...' : 'Оплатить и получить'}</button>
            </form>
            {done && (
              <div className="mt-4 text-blue-100">
                {done.error ? (
                  <p className="text-red-400">Ошибка: {done.error}</p>
                ) : (
                  <div>
                    <p className="font-semibold text-white">Готово! Номер заказа: {done.id}</p>
                    <p className="text-sm mt-1">Статус: {done.status}. Письмо с инструкцией придёт на email.</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
