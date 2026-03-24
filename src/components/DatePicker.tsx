import { useState, useRef, useEffect } from 'react'
import { useTranslation } from '../i18n'

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  label: string
  minDate?: string
}

export default function DatePicker({ value, onChange, label, minDate }: DatePickerProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    if (value) return new Date(value)
    return new Date()
  })
  const ref = useRef<HTMLDivElement>(null)

  const months = Array.from({ length: 12 }, (_, i) => t(`datepicker.months.${i}`))
  const days = Array.from({ length: 7 }, (_, i) => t(`datepicker.days.${i}`))

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstDay = new Date(year, month, 1)
  let startDay = firstDay.getDay() - 1
  if (startDay < 0) startDay = 6

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calDays: (number | null)[] = []
  for (let i = 0; i < startDay; i++) calDays.push(null)
  for (let i = 1; i <= daysInMonth; i++) calDays.push(i)

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const selectDay = (day: number) => {
    const d = new Date(year, month, day)
    const str = d.toISOString().split('T')[0]
    if (minDate && str < minDate) return
    onChange(str)
    setOpen(false)
  }

  const isSelected = (day: number) => {
    if (!value) return false
    const d = new Date(year, month, day).toISOString().split('T')[0]
    return d === value
  }

  const isDisabled = (day: number) => {
    if (!minDate) return false
    const d = new Date(year, month, day).toISOString().split('T')[0]
    return d < minDate
  }

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  const formatDisplay = (val: string) => {
    if (!val) return ''
    const d = new Date(val)
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`
  }

  return (
    <div ref={ref} className="relative">
      <label className="block text-white/60 text-[11px] font-medium tracking-[0.15em] uppercase mb-2 text-left">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white text-charcoal px-4 py-3 text-sm rounded-sm text-left flex items-center justify-between focus:ring-2 focus:ring-sage/50 transition-shadow"
      >
        <span className={value ? 'text-charcoal' : 'text-charcoal/40'}>
          {value ? formatDisplay(value) : t('hero.datePlaceholder')}
        </span>
        <svg className="w-4 h-4 text-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-bg-secondary rounded-sm shadow-2xl border border-charcoal/10 dark:border-white/10 p-4 w-[280px] animate-[fadeIn_0.15s_ease]">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center text-charcoal/60 dark:text-text-secondary hover:text-charcoal dark:hover:text-text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-serif text-sm text-charcoal dark:text-text-primary">
              {months[month]} {year}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center text-charcoal/60 dark:text-text-secondary hover:text-charcoal dark:hover:text-text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 mb-2">
            {days.map((d) => (
              <div key={d} className="text-center text-[10px] font-medium tracking-wider text-charcoal/40 dark:text-text-tertiary py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {calDays.map((day, i) => (
              <div key={i} className="aspect-square flex items-center justify-center">
                {day && (
                  <button
                    type="button"
                    onClick={() => selectDay(day)}
                    disabled={isDisabled(day)}
                    className={`w-full h-full flex items-center justify-center text-xs rounded-sm transition-all
                      ${isSelected(day)
                        ? 'bg-forest dark:bg-accent text-white dark:text-bg-primary font-medium'
                        : isToday(day)
                          ? 'text-forest dark:text-accent font-medium'
                          : isDisabled(day)
                            ? 'text-charcoal/20 dark:text-text-tertiary/40 cursor-not-allowed'
                            : 'text-charcoal dark:text-text-primary hover:bg-forest/10 dark:hover:bg-accent/10'
                      }`}
                  >
                    {day}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
