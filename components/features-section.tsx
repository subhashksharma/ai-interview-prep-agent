'use client';

import { motion } from 'framer-motion';
import { Brain, Workflow, Layers, Shield, Zap, Code } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Brain className='h-6 w-6 text-blue-600' />,
      title: 'Autonomous Decision Making',
      description:
        'Our agents make intelligent decisions based on your goals and constraints without constant supervision.',
    },
    {
      icon: <Workflow className='h-6 w-6 text-blue-600' />,
      title: 'Complex Workflow Automation',
      description:
        'Automate multi-step processes that require judgment, adaptation, and coordination between systems.',
    },
    {
      icon: <Layers className='h-6 w-6 text-blue-600' />,
      title: 'Multi-Agent Collaboration',
      description:
        'Deploy teams of specialized agents that work together to solve complex problems.',
    },
    {
      icon: <Shield className='h-6 w-6 text-blue-600' />,
      title: 'Secure & Compliant',
      description:
        'Enterprise-grade security with fine-grained permissions and audit logs for all agent actions.',
    },
    {
      icon: <Zap className='h-6 w-6 text-blue-600' />,
      title: 'Rapid Integration',
      description:
        'Connect to your existing tools and data sources in minutes with our extensive API library.',
    },
    {
      icon: <Code className='h-6 w-6 text-blue-600' />,
      title: 'Customizable Agents',
      description:
        'Build and customize agents with our intuitive interface or advanced programming options.',
    },
  ];

  return (
    <section
      id='features'
      className='py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#2dcbc5]/5 rounded-full blur-3xl pointer-events-none' />
      <div className='container mx-auto px-6 relative z-10'>
        <div className='text-center mb-20'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <div className='inline-flex items-center px-4 py-2 rounded-full bg-[#2dcbc5]/10 border border-[#2dcbc5]/20 text-[#2dcbc5] mb-6'>
              <span className='text-sm font-semibold'>Core Features</span>
            </div>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight'>
              Powerful Agentic AI Features
            </h2>
            <p className='text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed'>
              Our platform provides everything you need to build, deploy, and manage intelligent AI
              agents that get work done.
            </p>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className='group'>
              <div className='bg-white p-8 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-[#2dcbc5]/10 transition-all duration-300 h-full relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#2dcbc5]/0 via-[#2dcbc5]/0 to-[#2dcbc5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                <div className='relative z-10'>
                  <div className='w-14 h-14 bg-gradient-to-br from-[#2dcbc5]/10 to-[#2ab7ca]/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm'>
                    {feature.icon}
                  </div>
                  <h3 className='text-xl font-bold mb-3 text-slate-900 group-hover:text-[#2dcbc5] transition-colors duration-300'>
                    {feature.title}
                  </h3>
                  <p className='text-[15px] text-slate-600 leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
