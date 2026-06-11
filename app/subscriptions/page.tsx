"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  HelpCircle, 
  ArrowRight, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Layers,
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles,
  RefreshCw
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { 
  staggerContainer, 
  fadeInUp, 
  fadeIn,
  scaleIn,
  buttonHover, 
  buttonTap 
} from "@/components/motion/variants";

// FAQ Data Structure
interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Do limits reset?",
    answer: "Yes, hourly and daily limits reset automatically. Hourly limits reset at the start of every hour, and daily limits reset 24 hours after your first translation."
  },
  {
    question: "What happens when I hit the limit?",
    answer: "You will be blocked temporarily and shown an upgrade prompt in the app. You can wait for the limit to reset, or upgrade to Pro to resume translating immediately without limits."
  },
  {
    question: "Do I need an account?",
    answer: "Yes, to track your translation usage and activate your Pro features across your desktop devices."
  },
  {
    question: "Is Pro a subscription?",
    answer: "Yes, it is a monthly subscription managed securely through our website checkout system (powered by Stripe). You can cancel or change your plan at any time."
  }
];

export default function SubscriptionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleScrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("pricing-cards");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToLimits = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("limits-explanation");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black min-h-screen text-gray-200 overflow-x-hidden">
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 overflow-hidden bg-gradient-to-b from-black via-[#030303] to-black">
        {/* Neon Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/4 w-[500px] h-[300px] bg-cyan/5 blur-[120px] rounded-full" />
          <div className="absolute right-1/4 bottom-1/3 w-[450px] h-[250px] bg-violet-600/5 blur-[100px] rounded-full" />
          
          {/* Subtle grid lines background */}
          <div className="absolute inset-x-[8%] top-[80%] h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent opacity-30" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan">
              SnipShot Pro
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="heading text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.05]"
          >
            Unlock Unlimited <br className="hidden sm:inline" />
            <span className="text-cyan">AI Image Translation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-2xl mx-auto text-base text-gray-400 sm:text-lg lg:text-xl leading-relaxed"
          >
            Go beyond free limits and process images faster, without interruptions.
          </motion.p>

          {/* Key Value Bullets */}
          <motion.div
            variants={staggerContainer(0.1, 0.3)}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 max-w-3xl mx-auto"
          >
            {[
              "Higher daily and hourly limits",
              "Faster processing priority",
              "Continuous workflow without interruptions"
            ].map((bullet, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="flex items-center gap-2 text-sm text-gray-300 font-medium"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                <span>{bullet}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <motion.a
              href="#pricing-cards"
              onClick={handleScrollToPricing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 clip-corner bg-cyan px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-cyan-dark"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Upgrade Now
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#limits-explanation"
              onClick={handleScrollToLimits}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 clip-corner border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Try Free Limits
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Pricing / Plan Cards */}
      <section id="pricing-cards" className="py-16 md:py-24 border-y border-[#1A1A1A] bg-[#050505] relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(14,165,233,0.03),transparent_40%)]" />
        
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="heading text-3xl sm:text-4xl text-white">Simple, transparent plans</h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400">Choose the speed and capability that fits your reading habits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Free Plan Card */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded border border-white/10 inline-block mb-4">
                  🆓 Free Plan
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold text-white tracking-tight">$0</span>
                  <span className="text-xs text-gray-400">/ forever</span>
                </div>
                <p className="mt-4 text-xs text-gray-400 leading-relaxed">
                  Perfect for casual readers who translate raw manga pages occasionally.
                </p>

                <ul className="mt-8 space-y-4 text-xs text-gray-300 border-t border-white/5 pt-6">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-cyan shrink-0" />
                    <span>5 images per hour limit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-cyan shrink-0" />
                    <span>50 images per day limit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-cyan shrink-0" />
                    <span>Standard processing speed</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-cyan shrink-0" />
                    <span>Basic AI translation & OCR pipeline</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <button
                  disabled
                  className="w-full clip-corner bg-white/5 border border-white/10 text-gray-500 py-3 text-xs font-bold uppercase tracking-wider cursor-default"
                >
                  Current Plan
                </button>
              </div>
            </motion.div>

            {/* Pro Plan Card */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border-2 border-cyan/40 bg-black/50 flex flex-col justify-between relative overflow-hidden shadow-[0_0_40px_rgba(14,165,233,0.07)]"
            >
              {/* Top gradient glow overlay */}
              <div className="absolute top-0 right-0 -z-10 w-48 h-48 bg-cyan/5 rounded-full blur-3xl" />
              
              <div className="absolute top-3 right-3">
                <span className="text-[9px] font-extrabold text-cyan uppercase tracking-widest bg-cyan/15 px-2.5 py-1 rounded border border-cyan/35 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan fill-cyan" />
                  Most Popular
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-cyan uppercase tracking-widest bg-cyan/10 px-2.5 py-1 rounded border border-cyan/25 inline-block mb-4">
                  🚀 Pro Plan
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold text-white tracking-tight">$9.99</span>
                  <span className="text-xs text-gray-400">/ month</span>
                </div>
                <p className="mt-4 text-xs text-gray-300 leading-relaxed">
                  Best for heavy readers, scanlation groups, and professionals translating entire volumes.
                </p>

                <ul className="mt-8 space-y-4 text-xs text-gray-300 border-t border-white/5 pt-6">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-cyan shrink-0" />
                    <span className="font-semibold text-white">1,000 images per day</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-cyan shrink-0" />
                    <span className="font-semibold text-white">No hourly limits or interruptions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-cyan shrink-0" />
                    <span>Priority high-speed GPU processing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-cyan shrink-0" />
                    <span>Premium high-stability service for heavy use</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <motion.a
                  href="/checkout"
                  className="block text-center w-full clip-corner bg-cyan text-black py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-cyan-dark transition-colors"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  Upgrade via Website
                </motion.a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Usage Limit Explanation */}
      <section id="limits-explanation" className="py-16 md:py-24 bg-black relative">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="heading text-2xl sm:text-3xl text-white">How Free Limits Work</h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
              We aim to keep SnipShot accessible to everyone while maintaining high service availability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="glass p-6 rounded-xl border border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-cyan" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Hourly Limits</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Free users can process up to <strong>5 images per hour</strong>. This hourly window restarts automatically at the start of every hour.
              </p>
            </div>

            <div className="glass p-6 rounded-xl border border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-3">
                <RefreshCw className="w-5 h-5 text-cyan" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Daily Limits</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                A daily cap of <strong>50 images</strong> is set to protect against automated scraping. It resets automatically 24 hours after your activity begins.
              </p>
            </div>

            <div className="glass p-6 rounded-xl border border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-cyan" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Fair Sharing</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Limits ensure fair and continuous access to high-quality OCR and Translation GPUs for all free tier users.
              </p>
            </div>

            <div className="glass p-6 rounded-xl border border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-cyan" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Instant Resumes</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                You can upgrade to Pro at any time to instantly lift these limits and resume reading without any workflow interruptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section (Why Pro Exists) */}
      <section className="py-16 md:py-24 border-t border-[#1A1A1A] bg-[#050505] relative">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="heading text-2xl sm:text-3xl text-white">Why Upgrade to Pro?</h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">Built for power readers who value speed and efficiency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center md:text-left space-y-2">
              <div className="mx-auto md:mx-0 w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/25 flex items-center justify-center text-cyan mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Zero Interruptions</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Stay fully immersed in your stories without hitting limit screens during reading sessions.
              </p>
            </div>

            <div className="text-center md:text-left space-y-2">
              <div className="mx-auto md:mx-0 w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/25 flex items-center justify-center text-cyan mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Ideal for Batch Work</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Translate multiple pages or chapters consecutively without pausing to wait for limit resets.
              </p>
            </div>

            <div className="text-center md:text-left space-y-2">
              <div className="mx-auto md:mx-0 w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/25 flex items-center justify-center text-cyan mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Peak Hour Priority</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Skip standard queues during peak traffic and get translations rendered almost instantly.
              </p>
            </div>

            <div className="text-center md:text-left space-y-2">
              <div className="mx-auto md:mx-0 w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/25 flex items-center justify-center text-cyan mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Professional Grade</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Built to support power users, scanlators, and manga fans who read heavily every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 border-t border-[#1A1A1A] bg-black relative">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12">
            <h2 className="heading text-2xl sm:text-3xl text-white">Frequently Asked Questions</h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">Got questions? We have answers.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="glass rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-cyan transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA */}
      <section className="py-16 bg-gradient-to-b from-[#050505] to-black border-t border-[#1A1A1A] relative text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[200px] bg-cyan/5 blur-[80px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-xl px-6">
          <h2 className="heading text-2xl sm:text-3xl text-white">Ready to read without limits?</h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 max-w-sm mx-auto">
            Get instant setup and bypass limits immediately with SnipShot Pro.
          </p>
          <div className="mt-8">
            <motion.a
              href="/checkout"
              className="inline-flex items-center gap-2.5 clip-corner bg-cyan px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-cyan-dark"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Upgrade to Pro Now
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
