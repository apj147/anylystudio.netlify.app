import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const serviceOptions = [
  { value: 'portrait',   label: 'Custom Portrait — from $500' },
  { value: 'abstract',   label: 'Abstract Commission — from $750' },
  { value: 'landscape',  label: 'Landscape Painting — from $650' },
  { value: 'botanical',  label: 'Botanical Study — from $425' },
  { value: 'liveedge',   label: 'Live-Edge Wood Slab — $600–$875' },
  { value: 'pet',        label: 'Pet Portrait — from $350' },
  { value: 'gift',       label: 'Gift Commission — from $400' },
  { value: 'large',      label: 'Large Scale Artwork — from $2,000' },
  { value: 'commercial', label: 'Commercial Project — Contact for Quote' },
]

interface Props {
  defaultType?: string
}

const inputClass =
  'w-full bg-white border border-[#E8D5A3] rounded-lg px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#bbb] focus:outline-none focus:border-[#C9A959] transition-colors'
const labelClass = 'text-xs tracking-widest uppercase text-[#999] block mb-2'

export default function ContactForm({ defaultType }: Props) {
  return (
    <form action="/api/contact" method="POST" className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>Name</label>
          <input
            type="text"
            name="name"
            required
            className={inputClass}
            placeholder="Your name"
            style={{ fontFamily: 'DM Sans' }}
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>Email</label>
          <input
            type="email"
            name="email"
            required
            className={inputClass}
            placeholder="your@email.com"
            style={{ fontFamily: 'DM Sans' }}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>Commission Type</label>
        <select
          name="type"
          defaultValue={defaultType ?? ''}
          className={inputClass}
          style={{ fontFamily: 'DM Sans' }}
        >
          <option value="">Select a service...</option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>Tell Me About Your Vision</label>
        <textarea
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-none`}
          placeholder="Describe your vision, size preferences, timeline, and any reference images or inspiration you have..."
          style={{ fontFamily: 'DM Sans' }}
        />
      </div>

      <Button type="submit" variant="default" size="lg" className="w-full">
        Send Commission Request
        <ArrowRight size={16} />
      </Button>

      <p className="text-xs text-center text-[#bbb]" style={{ fontFamily: 'DM Sans' }}>
        I respond within 24–48 hours · No obligation consultation
      </p>
    </form>
  )
}
