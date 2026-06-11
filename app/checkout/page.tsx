"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  Zap,
  Sparkles,
  Mail,
  User,
  Copy,
  AlertCircle,
  Loader2,
  ArrowLeft,
  CreditCard,
  QrCode,
  CheckCircle,
  FileText
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  buttonHover,
  buttonTap,
  scaleIn,
  fadeInUp
} from "@/components/motion/variants";

type PaymentMethod = "gcash" | "gotyme";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("gcash");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Form States
  const [email, setEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Flow States
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Payment Details configuration
  const paymentDetails = {
    gcash: {
      accountName: "John Lynard Isip",
      accountNumber: "0947 478 9012",
      qrCodePath: "/qr-codes/gcash.jpg",
      instructions: "Open GCash, choose 'Send via QR' or scan the QR code below. Enter the total amount of $9.99 (or local currency equivalent, approx. ₱580)."
    },
    gotyme: {
      accountName: "John Lynard Famanias Isip",
      accountNumber: "011949702665",
      qrCodePath: "/qr-codes/gotyme.jpg",
      instructions: "Open your banking app, scan the QR code below, or perform a bank transfer to GoTyme Bank using the account details below."
    }
  };

  // Form Validation
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!accountName.trim()) {
      tempErrors.accountName = "Sender account/billing name is required.";
    }

    if (!referenceNumber.trim()) {
      tempErrors.referenceNumber = "Transaction reference number is required.";
    } else if (referenceNumber.trim().length < 6) {
      tempErrors.referenceNumber = "Reference number must be at least 6 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmitConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate API submission and verification queuing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  const activeDetails = paymentDetails[paymentMethod];

  return (
    <div className="bg-black min-h-screen text-gray-200 overflow-x-hidden">
      <Nav />

      <section className="relative pt-32 pb-24 md:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-black via-[#030303] to-black">
        {/* Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/4 w-[400px] h-[250px] bg-cyan/5 blur-[120px] rounded-full" />
          <div className="absolute right-1/4 bottom-1/4 w-[450px] h-[250px] bg-violet-600/5 blur-[110px] rounded-full" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6">

          {/* Back Button */}
          <div className="mb-8">
            <a
              href="/subscriptions"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 hover:text-cyan transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to plans
            </a>
          </div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="checkout-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
              >

                {/* Left Column - Form & QR scanning */}
                <div className="lg:col-span-8 space-y-6">

                  {/* Step 1: Payment Method Selection */}
                  <div className="glass p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#050505]/40 space-y-6">
                    <div className="flex items-center gap-2.5 pb-4 border-b border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/25 flex items-center justify-center text-cyan">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white uppercase tracking-wider">1. Select Payment Method</h2>
                        <p className="text-xs text-gray-400">Choose your preferred peer-to-peer manual payment route.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* GCash Selector */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("gcash")}
                        className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${paymentMethod === "gcash"
                          ? "border-cyan bg-cyan/5 text-white"
                          : "border-white/5 bg-black/40 text-gray-400 hover:border-white/20 hover:text-white"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold uppercase tracking-wider">GCash</span>
                          <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${paymentMethod === "gcash" ? "border-cyan bg-cyan text-black" : "border-white/20"
                            }`}>
                            {paymentMethod === "gcash" && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400">Mobile Wallet transfer</p>
                      </button>

                      {/* GoTyme Selector */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("gotyme")}
                        className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${paymentMethod === "gotyme"
                          ? "border-cyan bg-cyan/5 text-white"
                          : "border-white/5 bg-black/40 text-gray-400 hover:border-white/20 hover:text-white"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold uppercase tracking-wider">GoTyme Bank</span>
                          <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${paymentMethod === "gotyme" ? "border-cyan bg-cyan text-black" : "border-white/20"
                            }`}>
                            {paymentMethod === "gotyme" && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400">Bank Transfer / QR Scan</p>
                      </button>
                    </div>

                    {/* QR Code Display & Accounts details */}
                    <div className="p-5 rounded-xl border border-white/5 bg-black/50 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                      {/* Left: Instructions & details */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-cyan uppercase tracking-widest bg-cyan/10 px-2 py-0.5 rounded border border-cyan/20 inline-block">
                            Instructions
                          </span>
                          <p className="text-xs text-gray-300 leading-relaxed pt-1">
                            {activeDetails.instructions}
                          </p>
                        </div>

                        {/* Account Name */}
                        <div className="border-t border-white/5 pt-3 space-y-1">
                          <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Account Name</span>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{activeDetails.accountName}</span>
                            <button
                              onClick={() => handleCopy(activeDetails.accountName, "name")}
                              className="text-gray-400 hover:text-cyan transition-colors cursor-pointer"
                              title="Copy Account Name"
                            >
                              {copiedText === "name" ? (
                                <span className="text-[10px] font-bold text-cyan">Copied!</span>
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Account Number */}
                        <div className="border-t border-white/5 pt-3 space-y-1">
                          <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                            {paymentMethod === "gcash" ? "GCash Number" : "Account Number"}
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-mono font-bold text-white tracking-wider">{activeDetails.accountNumber}</span>
                            <button
                              onClick={() => handleCopy(activeDetails.accountNumber, "number")}
                              className="text-gray-400 hover:text-cyan transition-colors cursor-pointer"
                              title="Copy Account Number"
                            >
                              {copiedText === "number" ? (
                                <span className="text-[10px] font-bold text-cyan">Copied!</span>
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: Scan QR image */}
                      <div className="md:col-span-5 flex flex-col items-center justify-center">
                        <div className="relative p-2.5 rounded-xl border border-white/10 bg-white/5 overflow-hidden w-48 aspect-[3/4] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                          <img
                            src={activeDetails.qrCodePath}
                            alt={`${paymentMethod === "gcash" ? "GCash" : "GoTyme Bank"} QR Code`}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-gray-500 font-medium mt-2 flex items-center gap-1">
                          <QrCode className="w-3 h-3 text-cyan" /> Scan to Pay
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Step 2: Confirmation Fields */}
                  <form onSubmit={handleSubmitConfirmation} className="glass p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#050505]/40 space-y-6">
                    <div className="flex items-center gap-2.5 pb-4 border-b border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/25 flex items-center justify-center text-cyan">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white uppercase tracking-wider">2. Provide Transfer Details</h2>
                        <p className="text-xs text-gray-400">Submit receipt details so we can manually audit and match your payment.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Email Input */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-cyan" />
                          Account Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                          }}
                          className={`w-full bg-black/60 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan/50'
                            } focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`}
                          placeholder="yourname@gmail.com"
                        />
                        {errors.email && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}</p>}
                        <p className="mt-1 text-[10px] text-gray-500">We will activate SnipShot Pro for this account email address.</p>
                      </div>

                      {/* Account/Billing Name */}
                      <div>
                        <label htmlFor="accountName" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-cyan" />
                          Sender Account Name *
                        </label>
                        <input
                          type="text"
                          id="accountName"
                          value={accountName}
                          onChange={(e) => {
                            setAccountName(e.target.value);
                            if (errors.accountName) setErrors(prev => ({ ...prev, accountName: "" }));
                          }}
                          className={`w-full bg-black/60 border ${errors.accountName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan/50'
                            } focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`}
                          placeholder="e.g. Neil Famanias"
                        />
                        {errors.accountName && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.accountName}</p>}
                        <p className="mt-1 text-[10px] text-gray-500">The name registered on the GCash/bank account you sent the payment from.</p>
                      </div>

                      {/* Reference Number */}
                      <div>
                        <label htmlFor="referenceNumber" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-cyan" />
                          Transaction Reference Number *
                        </label>
                        <input
                          type="text"
                          id="referenceNumber"
                          value={referenceNumber}
                          onChange={(e) => {
                            setReferenceNumber(e.target.value);
                            if (errors.referenceNumber) setErrors(prev => ({ ...prev, referenceNumber: "" }));
                          }}
                          className={`w-full bg-black/60 border ${errors.referenceNumber ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan/50'
                            } focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`}
                          placeholder="e.g. Ref: 901234567"
                        />
                        {errors.referenceNumber && <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.referenceNumber}</p>}
                        <p className="mt-1 text-[10px] text-gray-500">The unique reference number shown on your GCash or banking transaction receipt.</p>
                      </div>
                    </div>
                  </form>

                </div>

                {/* Right Column - Order summary & CTAs */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">

                  {/* Order Summary */}
                  <div className="glass p-6 rounded-xl border border-white/5 bg-[#050505]/40 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-cyan">Order Summary</h3>

                    <div className="flex justify-between items-start border-b border-white/5 pb-3">
                      <div>
                        <span className="block text-xs font-bold text-white uppercase">SnipShot Pro Plan</span>
                        <span className="block mt-0.5 text-[10px] text-gray-400 leading-normal">Unlimited Translations, High-speed GPU Priority, Cross-device Sync.</span>
                      </div>
                      <span className="text-xs font-bold text-white">$9.99<span className="text-[10px] text-gray-500 font-medium">/mo</span></span>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Subtotal</span>
                      <span>$9.99</span>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Setup Fee</span>
                      <span className="text-cyan uppercase font-bold text-[10px]">Free</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-3 border-t border-white/5">
                      <span className="text-xs font-bold uppercase text-white">Total Amount</span>
                      <span className="text-base font-extrabold text-cyan">$9.99</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="button"
                      onClick={handleSubmitConfirmation}
                      disabled={isProcessing}
                      className="w-full clip-corner bg-cyan text-black py-4 font-bold uppercase tracking-wider text-xs hover:bg-cyan-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(14,165,233,0.15)]"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting Request...
                        </>
                      ) : (
                        <>
                          I Have Completed Payment
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-[10px] text-center text-gray-500 leading-normal max-w-xs mx-auto">
                      By clicking above, you certify that the payment was transferred. Fraudulent submissions may result in account locks.
                    </p>
                  </div>

                  {/* Verification Notice */}
                  <div className="p-4 rounded-xl border border-white/5 bg-black/60 text-left space-y-2.5">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-cyan shrink-0" />
                      Verification Details
                    </span>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Because payment matching is performed manually, processing may take up to 1-2 business days. You will receive an activation email as soon as our audits confirm your transfer matches the reference number.
                    </p>
                  </div>

                </div>

              </motion.div>
            ) : (
              // Step 3: Processing & Success state page
              <motion.div
                key="checkout-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-xl mx-auto glass p-8 sm:p-10 rounded-2xl border border-cyan/20 bg-black/40 text-center space-y-6 shadow-[0_0_50px_rgba(14,165,233,0.1)]"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-cyan/10 border border-cyan/35 flex items-center justify-center text-cyan shadow-[0_0_20px_rgba(14,165,233,0.15)] animate-pulse">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>

                <div className="space-y-3">
                  <h2 className="heading text-xl sm:text-2xl text-white">We are processing your payment...</h2>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                    You will receive an email confirmation once your payment has been verified.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-white/5 bg-black/60 text-left space-y-3.5 text-xs text-gray-300">
                  <h4 className="font-bold text-white uppercase tracking-widest text-[10px] text-cyan pb-2 border-b border-white/5">Submitted Details</h4>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Destination Account</span>
                    <span className="font-semibold text-white uppercase">{paymentMethod === "gcash" ? "GCash" : "GoTyme Bank"}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Activation Account</span>
                    <span className="font-semibold text-white truncate max-w-[200px]">{email}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Reference Number</span>
                    <span className="font-mono text-cyan">{referenceNumber}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status</span>
                    <span className="text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded uppercase">Pending Audit</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-[10px] text-gray-500 leading-normal max-w-sm mx-auto">
                    A confirmation email was sent to <strong className="text-gray-400">{email}</strong>. Once approved, your account will instantly convert to Pro inside your desktop client.
                  </p>
                  <motion.a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 clip-corner border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    Return to Homepage
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
