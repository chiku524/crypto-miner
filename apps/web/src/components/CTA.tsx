'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useIsDesktop } from '@/hooks/useIsDesktop';

export function CTA() {
  const reduced = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();

  return (
    <section id="request-service" className="relative border-t border-white/5 py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduced ? 0 : 0.4, ease: 'easeOut' }}
          className="rounded-3xl border border-accent-cyan/20 bg-gradient-to-b from-accent-cyan/10 to-transparent p-12"
        >
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Mine and run nodes—no terminal
          </h2>
          <p className="mt-3 text-gray-400">
            One click to mine or run a full node. Web or desktop (Windows, Mac, Linux)—same dashboard, auto-updates included.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            <Link href="/how-mining-works" className="text-accent-cyan hover:underline">How mining &amp; nodes work</Link> →
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-block rounded-xl bg-accent-cyan px-8 py-3 font-medium text-surface-950 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-surface-950"
            >
              Open dashboard
            </Link>
            {!isDesktop && (
              <Link
                href="/download"
                className="inline-block rounded-xl border border-white/20 px-8 py-3 font-medium text-gray-300 transition hover:border-white/30 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-surface-950"
              >
                Download desktop
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
