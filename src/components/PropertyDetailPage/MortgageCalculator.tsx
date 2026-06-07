'use client'
import React from 'react'
import { Calculator, Percent } from 'lucide-react'
import { MortgageCTA } from '@/components/LeadForm/MortgageCTA'

interface Props {
  price: number
  /** Header label override. Default: «Ипотечный калькулятор» */
  label?: string
  /**
   * Если переданы — под результатом появится CTA «Получить одобрение».
   * Без этих props компонент работает в standalone-режиме (как раньше).
   */
  property?: {
    collection: string
    id: string | number
    title: string
  }
}

const formatPrice = (n: number) =>
  Math.round(n).toLocaleString('ru-RU') + ' ₽'

/**
 * Annuity payment formula:
 *   P = S * (i * (1+i)^n) / ((1+i)^n - 1)
 *
 * where S = loan principal, i = monthly rate (annualRate / 12 / 100),
 * n = number of months. Falls back to S/n when i=0.
 */
const monthlyPayment = (S: number, annualRate: number, months: number): number => {
  if (S <= 0 || months <= 0) return 0
  if (annualRate <= 0) return S / months
  const i = annualRate / 12 / 100
  const pow = Math.pow(1 + i, months)
  return (S * (i * pow)) / (pow - 1)
}

export const MortgageCalculator: React.FC<Props> = ({ price, label, property }) => {
  const safePrice = price > 0 ? price : 5_000_000
  const [downPct, setDownPct] = React.useState(20)
  const [years, setYears] = React.useState(20)
  const [rate, setRate] = React.useState(16)

  const downPayment = Math.round(safePrice * (downPct / 100))
  const principal = safePrice - downPayment
  const months = years * 12
  const monthly = monthlyPayment(principal, rate, months)
  const totalPaid = monthly * months + downPayment
  const overpay = totalPaid - safePrice

  return (
    <section className="bg-card rounded-md shadow-e1 p-6 space-y-5">
      <h2 className="text-title-lg text-on-surface flex items-center gap-2">
        <Calculator className="w-5 h-5 text-primary" />
        {label ?? 'Ипотечный калькулятор'}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-start">
        {/* Inputs */}
        <div className="space-y-5">
          <RangeRow
            label="Первоначальный взнос"
            value={`${downPct}% · ${formatPrice(downPayment)}`}
            min={10}
            max={90}
            step={5}
            current={downPct}
            onChange={setDownPct}
          />
          <RangeRow
            label="Срок кредита"
            value={`${years} ${declension(years, ['год', 'года', 'лет'])}`}
            min={1}
            max={30}
            step={1}
            current={years}
            onChange={setYears}
          />
          <RangeRow
            label="Процентная ставка"
            value={`${rate.toFixed(1)}% годовых`}
            min={5}
            max={30}
            step={0.5}
            current={rate}
            onChange={(v) => setRate(Number(v))}
          />
        </div>

        <div className="hidden lg:block w-px bg-border self-stretch" />

        {/* Output */}
        <div className="bg-surface-container rounded-md p-5 space-y-3 self-start">
          <div>
            <div className="text-label text-on-surface-variant uppercase">
              Ежемесячный платёж
            </div>
            <div className="text-display text-primary mt-1">
              {formatPrice(monthly)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
            <div>
              <div className="text-label text-on-surface-variant">Сумма кредита</div>
              <div className="text-body text-on-surface font-medium">
                {formatPrice(principal)}
              </div>
            </div>
            <div>
              <div className="text-label text-on-surface-variant">Переплата</div>
              <div className="text-body text-rose-700 font-medium">
                {formatPrice(overpay)}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-label text-on-surface-variant">Итого выплат</div>
              <div className="text-body text-on-surface font-medium">
                {formatPrice(totalPaid)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-label text-on-surface-variant flex items-start gap-1.5">
        <Percent className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        Расчёт ориентировочный (аннуитетная схема). Условия конкретной программы уточняйте
        в банке.
      </p>

      {/* CTA «Получить одобрение» — отправляет посчитанные параметры
          в /api/leads, дальше менеджер банка-партнёра. Появляется
          только когда property передан с детальной — на других
          местах калькулятор остаётся «чистый». */}
      {property ? (
        <MortgageCTA
          propertyCollection={property.collection}
          propertyId={property.id}
          propertyTitle={property.title}
          calc={{
            price: safePrice,
            downPayment,
            years,
            monthly,
            rate,
          }}
        />
      ) : null}
    </section>
  )
}

const RangeRow: React.FC<{
  label: string
  value: string
  min: number
  max: number
  step: number
  current: number
  onChange: (v: number) => void
}> = ({ label, value, min, max, step, current, onChange }) => (
  <div>
    <div className="flex items-baseline justify-between mb-1">
      <span className="text-body-sm text-on-surface">{label}</span>
      <span className="text-body-sm text-on-surface-variant">{value}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={current}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-primary"
    />
  </div>
)

// Простое склонение по русским правилам для числительных.
const declension = (n: number, forms: [string, string, string]): string => {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return forms[1]
  return forms[2]
}
