'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

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
      className='min-h-screen flex items-center py-20 md:py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Accessible Pricing, Global First
            </h2>
            <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
              CareerBuddy starts at US $8/mo, UK £5/mo, and India ₹300/mo. Start free—cancel
              anytime.
            </p>

            <div className='flex items-center justify-center mt-8 mb-12'>
              <span
                className={`mr-3 ${isAnnual ? 'text-slate-600' : 'text-slate-900 font-medium'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className='relative inline-flex h-6 w-12 items-center rounded-full bg-slate-200'>
                <span className='sr-only'>Toggle pricing period</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    isAnnual ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span
                className={`ml-3 ${isAnnual ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                Annual <span className='text-green-600 text-sm font-medium'>Save 20%</span>
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
              className={`rounded-xl overflow-hidden ${
                plan.highlighted
                  ? 'border-2 border-[#2dcbc5] shadow-lg shadow-[#2dcbc5]/20'
                  : 'border border-slate-200 shadow-sm'
              }`}>
              {plan.highlighted && (
                <div className='bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] text-white text-center py-2 text-sm font-medium'>
                  Most Popular
                </div>
              )}
              <div className='p-6 md:p-8 bg-white'>
                <h3 className='text-2xl font-bold mb-2'>{plan.name}</h3>
                <p className='text-slate-600 mb-6'>{plan.description}</p>
                <div className='mb-6'>
                  {plan.monthlyPrice !== null ? (
                    <>
                      <span className='text-4xl font-bold'>
                        {plan.name === 'US' && '$'}
                        {plan.name === 'UK' && '£'}
                        {plan.name === 'India' && '₹'}
                        {isAnnual ? (plan.annualPrice / 12).toFixed(0) : plan.monthlyPrice}
                      </span>
                      <span className='text-slate-600'>/month</span>
                      {isAnnual && (
                        <div className='text-sm text-slate-500 mt-1'>
                          Billed annually ({plan.name === 'US' && '$'}
                          {plan.name === 'UK' && '£'}
                          {plan.name === 'India' && '₹'}
                          {plan.annualPrice}/year)
                        </div>
                      )}
                    </>
                  ) : (
                    <span className='text-2xl font-bold'>Custom Pricing</span>
                  )}
                </div>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] hover:from-[#2ab7ca] hover:to-[#2dcbc5] text-white shadow-lg shadow-[#2dcbc5]/25'
                      : 'bg-white border border-slate-300 hover:bg-slate-50 hover:border-[#2dcbc5] text-slate-800'
                  }`}>
                  {plan.cta}
                </Button>
              </div>
              <div className='p-6 md:p-8 bg-slate-50 border-t border-slate-200'>
                <h4 className='font-semibold mb-4'>What's included:</h4>
                <ul className='space-y-3'>
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className='flex items-start'>
                      <Check
                        size={18}
                        className='mr-2 mt-0.5 text-green-600 flex-shrink-0'
                      />
                      <span>{feature}</span>
                    </li>
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
