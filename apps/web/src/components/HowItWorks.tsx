'use client';

import { motion, useReducedMotion } from 'framer-motion';

const steps = [
  {
    step: '1',
    title: 'Choose a network',
    description: 'Browse networks that need hashrate. Each card shows algorithm, rewards, and status.',
  },
  {
    step: '2',
    title: 'Start mining',
    description: 'Click start—no config files or terminal. We connect you to the pool and manage the session.',
  },
  {
    step: '3',
    title: 'Earn & withdraw',
    description: 'Track hashrate and estimated earnings. Withdraw when you hit the minimum payout. A 1% service fee applies to withdrawals—see Fees for details.',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: (reduced: boolean) => ({
    opacity: 1,
    transition: reduced ? { duration: 0 } : { staggerChildren: 0.1, delayChildren: 0.05 },
  }),
};

const item = (reduced: boolean) => ({
  hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 },
  visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.35, ease: 'easeOut' } },
});

export function HowItWorks() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="how-it-works" className="relative border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduced ? 0 : 0.4 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-gray-400">
            Three steps to contributing to decentralized networks.
          </p>
        </motion.div>
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          custom={reduced}
        >
          {steps.map((s) => (
            <motion.div
              key={s.step}
              variants={item(reduced)}
              className="relative rounded-2xl border border-white/5 bg-surface-900/30 p-8"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan/20 font-mono text-lg font-bold text-accent-cyan">
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-gray-400">{s.description}</p>
              {steps.indexOf(s) < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-gray-600 md:block" aria-hidden="true">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
