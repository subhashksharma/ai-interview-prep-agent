'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'US',
      description: 'Simple monthly price for US users',
      monthlyPrice: 8,
      annualPrice: 8 * 12,
      features: [
        'Full end‑to‑end career workflow',
        'Mock interviews + pop‑up quizzes',
        'ATS‑ready resume + cover letters',
        'Job import + progress tracking',
        'Offer breakdown + negotiation scripts',
      ],
      cta: 'Start Free',
      highlighted: true,
    },
    {
      name: 'UK',
      description: 'Affordable monthly price for UK users',
      monthlyPrice: 5,
      annualPrice: 5 * 12,
      features: [
        'Self‑discovery + role exploration',
        'Dynamic prep plans (master + job)',
        'Communication templates',
        'Curated resources + summaries',
        'Career journal + checkpoints',
      ],
      cta: 'Start Free',
      highlighted: false,
    },
    {
      name: 'India',
      description: 'Localized pricing for India',
      monthlyPrice: 300,
      annualPrice: 300 * 12,
      features: [
        'All modules included',
        'Empathetic guidance throughout',
        'Daily plan updates',
        'Email support',
        'Cancel anytime',
      ],
      cta: 'Start Free',
      highlighted: false,
    },
  ];

  return (
    <section
      id='pricing'
      className='min-h-screen flex items-center py-20 md:py-24 bg-gradient-to-b from-cyan-50/30 via-blue-50/20 to-white relative overflow-hidden'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className='inline-flex items-center justify-center p-2 mb-6 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10'>
              <Sparkles className='w-8 h-8 text-cyan-500' />
            </div>
            <h2 className='text-section-heading bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent'>
              Accessible Pricing, Global First
            </h2>
            <p className='text-body-large max-w-2xl mx-auto'>
              CareerBuddy starts at US $8/mo, UK £5/mo, and India ₹300/mo. Start free—cancel
              anytime.
            </p>

            <div className='flex items-center justify-center mt-8 mb-12'>
              <span
                className={`mr-4 text-lg ${
                  isAnnual ? 'text-slate-600' : 'text-slate-900 font-semibold'
                }`}>
                Monthly
              </span>
              <motion.button
                onClick={() => setIsAnnual(!isAnnual)}
                whileTap={{ scale: 0.95 }}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ${
                  isAnnual
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-300'
                }`}>
                <span className='sr-only'>Toggle pricing period</span>
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md ${
                    isAnnual ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </motion.button>
              <span
                className={`ml-4 text-lg ${
                  isAnnual ? 'text-slate-900 font-semibold' : 'text-slate-600'
                }`}>
                Annual{' '}
                <span className='inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold ml-2'>
                  Save 20%
                </span>
              </span>
            </div>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: plan.highlighted ? 1.05 : 1.02, y: -5 }}
              className={`rounded-3xl overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? 'border-2 border-cyan-500 shadow-2xl shadow-cyan-500/25 ring-4 ring-cyan-500/10'
                  : 'border-2 border-slate-200 hover:border-blue-500/50 shadow-xl hover:shadow-2xl'
              }`}>
              {plan.highlighted && (
                <div className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center py-3 text-sm font-bold flex items-center justify-center gap-2'>
                  <Sparkles className='w-4 h-4' />
                  Most Popular
                </div>
              )}
              <div
                className={`p-6 md:p-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-white to-cyan-50/30'
                    : 'bg-gradient-to-br from-white to-blue-50/20'
                }`}>
                <h3
                  className={`text-3xl font-bold mb-3 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'
                      : 'text-slate-800'
                  }`}>
                  {plan.name}
                </h3>
                <p className='text-slate-600 mb-6 text-base'>{plan.description}</p>
                <div className='mb-8'>
                  {plan.monthlyPrice !== null ? (
                    <>
                      <span
                        className={`text-5xl font-bold ${
                          plan.highlighted
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'
                            : 'text-slate-800'
                        }`}>
                        {plan.name === 'US' && '$'}
                        {plan.name === 'UK' && '£'}
                        {plan.name === 'India' && '₹'}
                        {isAnnual ? (plan.annualPrice / 12).toFixed(0) : plan.monthlyPrice}
                      </span>
                      <span className='text-slate-600 text-lg font-medium'>/month</span>
                      {isAnnual && (
                        <div className='text-sm text-slate-500 mt-2 font-medium'>
                          Billed annually ({plan.name === 'US' && '$'}
                          {plan.name === 'UK' && '£'}
                          {plan.name === 'India' && '₹'}
                          {plan.annualPrice}/year)
                        </div>
                      )}
                    </>
                  ) : (
                    <span className='text-3xl font-bold text-slate-800'>Custom Pricing</span>
                  )}
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Button
                    className={`w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-xl shadow-cyan-500/25'
                        : 'bg-white border-2 border-slate-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:border-blue-500 text-slate-800 hover:text-blue-700 shadow-lg hover:shadow-xl'
                    }`}>
                    {plan.cta}
                  </Button>
                </motion.div>
              </div>
              <div
                className={`p-6 md:p-8 border-t-2 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-cyan-50/50 to-blue-50/30 border-cyan-200'
                    : 'bg-gradient-to-br from-slate-50 to-blue-50/20 border-slate-200'
                }`}>
                <h4 className='font-bold text-lg mb-5 text-slate-800'>What's included:</h4>
                <ul className='space-y-3'>
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className='flex items-start'>
                      <div className='mr-3 mt-0.5 flex-shrink-0'>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            plan.highlighted
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                              : 'bg-gradient-to-r from-blue-400 to-cyan-400'
                          }`}>
                          <Check
                            size={14}
                            className='text-white'
                          />
                        </div>
                      </div>
                      <span className='text-slate-700'>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
