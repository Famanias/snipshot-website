"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  FileText, 
  Image as ImageIcon, 
  Layout, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Mail,
  Building2,
  Globe,
  User
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import detailsData from "@/data/sponsorship_details.json";

interface DetailsData {
  trafficStats: { label: string; value: string }[];
  tiers: { name: string; price: string; period: string; description: string; features: string[] }[];
  requirements: { label: string; detail: string }[];
}

export default function AdvertisePage() {
  const details = detailsData as DetailsData;

  // Form Field States
  const [formData, setFormData] = useState({
    fullName: "",
    brandName: "",
    email: "",
    websiteUrl: "",
    adTitle: "Sponsored Partner",
    adDescription: "MangaVerse Premium: Read with seamless translation overlays synced from SnipShot.",
    adUrl: "https://example.com/mangaverse",
    imageUrl: "/ads/mangaverse.png",
    additionalMessage: ""
  });

  // Selectable preset images
  const imagePresets = [
    { label: "MangaVerse Logo", url: "/ads/mangaverse.png" },
    { label: "SnipShot Logo", url: "/icon.png" },
    { label: "Promo Banner", url: "/ads/banner_promo.png" },
    { label: "Custom Link", url: "" }
  ];
  const [selectedPreset, setSelectedPreset] = useState("/ads/mangaverse.png");

  // Preview options: card, image, text
  const [previewLayout, setPreviewLayout] = useState<"card" | "image" | "text">("card");

  // Form State Management
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Field validation
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full name is required.";
    if (!formData.brandName.trim()) tempErrors.brandName = "Company/Brand name is required.";
    
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.websiteUrl.trim()) {
      tempErrors.websiteUrl = "Website URL is required.";
    } else if (!formData.websiteUrl.startsWith("http://") && !formData.websiteUrl.startsWith("https://")) {
      tempErrors.websiteUrl = "Website URL must start with http:// or https://";
    }

    if (previewLayout !== "image") {
      if (!formData.adTitle.trim()) tempErrors.adTitle = "Advertisement title is required.";
      if (formData.adTitle.length > 25) tempErrors.adTitle = "Title cannot exceed 25 characters.";
      if (!formData.adDescription.trim()) tempErrors.adDescription = "Advertisement description is required.";
      if (formData.adDescription.length > 80) tempErrors.adDescription = "Description cannot exceed 80 characters.";
    }

    if (!formData.adUrl.trim()) {
      tempErrors.adUrl = "Link destination URL is required.";
    } else if (!formData.adUrl.startsWith("http://") && !formData.adUrl.startsWith("https://")) {
      tempErrors.adUrl = "Destination URL must start with http:// or https://";
    }

    if (previewLayout !== "text" && !formData.imageUrl.trim()) {
      tempErrors.imageUrl = "Logo or banner image URL is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handlePresetSelect = (url: string) => {
    setSelectedPreset(url);
    if (url !== "") {
      setFormData((prev) => ({ ...prev, imageUrl: url }));
      if (errors.imageUrl) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.imageUrl;
          return updated;
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: "",
      brandName: "",
      email: "",
      websiteUrl: "",
      adTitle: "Sponsored Partner",
      adDescription: "MangaVerse Premium: Read with seamless translation overlays synced from SnipShot.",
      adUrl: "https://example.com/mangaverse",
      imageUrl: "/ads/mangaverse.png",
      additionalMessage: ""
    });
    setSelectedPreset("/ads/mangaverse.png");
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="bg-black min-h-screen text-gray-200">
      <Nav />

      {/* Hero Header Section */}
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 overflow-hidden bg-gradient-to-b from-black via-[#030303] to-black">
        {/* Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/3 w-[500px] h-[300px] bg-cyan/5 blur-[120px] rounded-full" />
          <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[250px] bg-violet-600/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-cyan"
          >
            Sponsorship & Partnership
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 heading text-4xl sm:text-5xl lg:text-6xl text-white"
          >
            Advertise With SnipShot
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-base text-gray-400 sm:text-lg leading-relaxed"
          >
            Promote your comic, app, scanlation group, or tool directly to active manga, webtoon, and raw translation enthusiasts. Sponsors are displayed as highly native, visually noticed ad spots on our platform.
          </motion.p>

          {/* Traffic Statistics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {details.trafficStats.map((stat, i) => (
              <div key={i} className="glass p-5 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
                <span className="block text-2xl md:text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
                <span className="block mt-1.5 text-xs text-gray-400 font-medium tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Information: Pricing & Requirements */}
      <section className="py-16 border-y border-[#1A1A1A] bg-[#050505] relative">
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Tiers (Left Side) */}
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan" />
              Sponsorship Packages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {details.tiers.map((tier, idx) => (
                <div key={idx} className="glass p-6 rounded-xl border border-white/5 bg-black/40 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-cyan uppercase tracking-widest bg-cyan/10 px-2 py-0.5 rounded border border-cyan/20 inline-block mb-3">
                      {tier.name}
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-bold text-white tracking-tight">{tier.price}</span>
                      <span className="text-xs text-gray-400">/ {tier.period}</span>
                    </div>
                    <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                  <ul className="mt-6 space-y-2.5 text-xs text-gray-300 border-t border-white/5 pt-4">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements (Right Side) */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan" />
              Sponsor Guidelines
            </h2>
            <div className="glass p-6 rounded-xl border border-white/5 bg-black/40 mt-4 h-fit">
              <p className="text-xs text-gray-400 mb-4">
                To maintain a premium user experience on SnipShot, all promotions must meet our content standards:
              </p>
              <ul className="space-y-4">
                {details.requirements.map((req, idx) => (
                  <li key={idx} className="border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                    <span className="block text-xs font-semibold text-white">{req.label}</span>
                    <span className="block mt-0.5 text-xs text-gray-400 leading-relaxed">{req.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Editor & Inquiry Workspace */}
      <section className="py-20 relative bg-black">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center md:text-left mb-12">
            <h2 className="heading text-2xl sm:text-3xl text-white">Create Your Promotion</h2>
            <p className="mt-2 text-sm text-gray-400 max-w-xl">
              Fill in your details and advertisement copy. Use the live preview on the right to see exactly how it will appear to our users.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="glass p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#050505]/40 space-y-6"
                    noValidate
                  >
                    <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3">Sponsorship Inquiry Form</h3>
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-cyan" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full bg-black/60 border ${errors.fullName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan/50'} focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`}
                          placeholder="Your full name"
                        />
                        {errors.fullName && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
                      </div>

                      <div>
                        <label htmlFor="brandName" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-cyan" />
                          Company / Brand *
                        </label>
                        <input
                          type="text"
                          id="brandName"
                          name="brandName"
                          value={formData.brandName}
                          onChange={handleInputChange}
                          className={`w-full bg-black/60 border ${errors.brandName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan/50'} focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`}
                          placeholder="Brand or website name"
                        />
                        {errors.brandName && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.brandName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-cyan" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full bg-black/60 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan/50'} focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`}
                          placeholder="name@company.com"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="websiteUrl" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-cyan" />
                          Website URL *
                        </label>
                        <input
                          type="url"
                          id="websiteUrl"
                          name="websiteUrl"
                          value={formData.websiteUrl}
                          onChange={handleInputChange}
                          className={`w-full bg-black/60 border ${errors.websiteUrl ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan/50'} focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`}
                          placeholder="https://yourwebsite.com"
                        />
                        {errors.websiteUrl && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.websiteUrl}</p>}
                      </div>
                    </div>

                    {/* Advertisement Details */}
                    <div className="border-t border-white/5 pt-6 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-cyan">Ad Display Details</h4>
                      
                      {previewLayout !== "image" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between items-baseline mb-2">
                              <label htmlFor="adTitle" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Ad Title *</label>
                              <span className="text-[10px] text-gray-500">{formData.adTitle.length}/25</span>
                            </div>
                            <input
                              type="text"
                              id="adTitle"
                              name="adTitle"
                              maxLength={25}
                              value={formData.adTitle}
                              onChange={handleInputChange}
                              className={`w-full bg-black/60 border ${errors.adTitle ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan/50'} focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`}
                              placeholder="e.g. Sponsored Partner"
                            />
                            {errors.adTitle && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.adTitle}</p>}
                          </div>

                          <div>
                            <div className="flex justify-between items-baseline mb-2">
                              <label htmlFor="adDescription" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Ad Description *</label>
                              <span className="text-[10px] text-gray-500">{formData.adDescription.length}/80</span>
                            </div>
                            <input
                              type="text"
                              id="adDescription"
                              name="adDescription"
                              maxLength={80}
                              value={formData.adDescription}
                              onChange={handleInputChange}
                              className={`w-full bg-black/60 border ${errors.adDescription ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan/50'} focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`}
                              placeholder="e.g. Sync manga translations directly in SnipShot."
                            />
                            {errors.adDescription && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.adDescription}</p>}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="adUrl" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Link Destination URL *</label>
                          <input
                            type="url"
                            id="adUrl"
                            name="adUrl"
                            value={formData.adUrl}
                            onChange={handleInputChange}
                            className={`w-full bg-black/60 border ${errors.adUrl ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan/50'} focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`}
                            placeholder="https://example.com/promo-landing"
                          />
                          {errors.adUrl && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.adUrl}</p>}
                        </div>

                        {previewLayout !== "text" && (
                          <div>
                            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Preset Images / Logos</label>
                            <div className="flex flex-wrap gap-2">
                              {imagePresets.map((preset, i) => (
                                <button
                                  type="button"
                                  key={i}
                                  onClick={() => handlePresetSelect(preset.url)}
                                  className={`text-[10px] px-2.5 py-1.5 rounded border ${selectedPreset === preset.url ? 'border-cyan bg-cyan/10 text-cyan' : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/30 hover:text-white'} transition-colors cursor-pointer`}
                                >
                                  {preset.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {previewLayout !== "text" && selectedPreset === "" && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="pt-2"
                        >
                          <label htmlFor="imageUrl" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Custom Image / Logo URL *</label>
                          <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            className={`w-full bg-black/60 border ${errors.imageUrl ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan/50'} focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors`}
                            placeholder="e.g. /ads/custom-logo.png"
                          />
                          {errors.imageUrl && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.imageUrl}</p>}
                        </motion.div>
                      )}
                    </div>

                    {/* Message */}
                    <div className="border-t border-white/5 pt-6">
                      <label htmlFor="additionalMessage" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Additional Message</label>
                      <textarea
                        id="additionalMessage"
                        name="additionalMessage"
                        rows={4}
                        value={formData.additionalMessage}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                        placeholder="Tell us about your campaign goals, desired flight dates, or special requests..."
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full clip-corner bg-cyan text-black py-4 font-bold uppercase tracking-wider text-sm hover:bg-cyan-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Processing Inquiry...
                        </>
                      ) : (
                        <>
                          Submit Inquiry Proposal
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/5 text-center space-y-6"
                  >
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-wide">Inquiry Sent Successfully!</h3>
                      <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
                        Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. We have received your advertisement proposal for <span className="text-white font-semibold">{formData.brandName}</span>. 
                      </p>
                      <p className="mt-2 text-xs text-gray-400 max-w-sm mx-auto">
                        Our sponsorship team will review your copy, link, and creative constraints and get back to you at <span className="text-cyan font-medium">{formData.email}</span> within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={handleResetForm}
                      className="clip-corner border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors cursor-pointer"
                    >
                      Create Another Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Live Preview Column (Sticky on Desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              
              {/* Preview Controls */}
              <div className="glass p-4 rounded-xl border border-white/5 bg-black/40">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <Layout className="w-3.5 h-3.5 text-cyan" />
                  Select Layout Format
                </span>
                <div className="grid grid-cols-3 gap-1 bg-black/60 p-1 rounded-lg border border-white/5">
                  <button
                    type="button"
                    onClick={() => setPreviewLayout("card")}
                    className={`py-1.5 px-2 text-[10px] uppercase font-bold tracking-wider rounded transition-colors cursor-pointer ${previewLayout === "card" ? "bg-cyan text-black" : "text-gray-400 hover:text-white"}`}
                  >
                    Card Layout
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewLayout("image")}
                    className={`py-1.5 px-2 text-[10px] uppercase font-bold tracking-wider rounded transition-colors cursor-pointer ${previewLayout === "image" ? "bg-cyan text-black" : "text-gray-400 hover:text-white"}`}
                  >
                    Image Banner
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewLayout("text")}
                    className={`py-1.5 px-2 text-[10px] uppercase font-bold tracking-wider rounded transition-colors cursor-pointer ${previewLayout === "text" ? "bg-cyan text-black" : "text-gray-400 hover:text-white"}`}
                  >
                    Text Alert
                  </button>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="glass p-6 rounded-2xl border border-white/10 bg-[#050505]/60 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 left-4 text-[9px] font-bold tracking-widest text-cyan bg-cyan/10 px-2 py-0.5 rounded border border-cyan/20">
                  LIVE AD PREVIEW
                </div>

                <div className="mt-8 w-full flex items-center justify-center min-h-[120px]">
                  {previewLayout === "card" && (
                    <div className="group block w-full max-w-md glass clip-corner p-5 text-left border border-cyan/15 hover:border-cyan/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300 relative overflow-hidden">
                      <div className="absolute -right-12 -top-12 -z-10 w-28 h-28 bg-cyan/5 rounded-full blur-2xl transition-all duration-300" />
                      <div className="flex items-center gap-4">
                        {formData.imageUrl ? (
                          <div className="relative w-16 h-16 shrink-0 rounded-lg border border-white/10 overflow-hidden bg-black/35 flex items-center justify-center">
                            <img
                              src={formData.imageUrl}
                              alt="Logo preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback image if invalid URL typed
                                (e.target as HTMLImageElement).src = "/icon.png";
                              }}
                            />
                          </div>
                        ) : (
                          <div className="relative w-16 h-16 shrink-0 rounded-lg border border-white/10 bg-black/35 flex items-center justify-center text-gray-600">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-cyan bg-cyan/10 px-2 py-0.5 rounded border border-cyan/25">
                              {formData.adTitle || "SPONSORED"}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-gray-300 font-medium line-clamp-2 leading-relaxed">
                            {formData.adDescription || "Advertisement description will appear here..."}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-gray-400 group-hover:text-cyan group-hover:border-cyan/35 group-hover:bg-cyan/5 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {previewLayout === "image" && (
                    <div className="group block w-full max-w-md overflow-hidden rounded-xl border border-white/10 hover:border-cyan/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300">
                      {formData.imageUrl ? (
                        <img
                          src={formData.imageUrl}
                          alt="Banner preview"
                          className="w-full h-auto object-cover max-h-40"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/ads/banner_promo.png";
                          }}
                        />
                      ) : (
                        <div className="w-full h-28 bg-black/40 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-gray-500 gap-2">
                          <ImageIcon className="w-6 h-6" />
                          <span className="text-xs">No banner image selected</span>
                        </div>
                      )}
                    </div>
                  )}

                  {previewLayout === "text" && (
                    <div className="group flex w-full max-w-md items-center justify-between gap-4 py-3 px-5 glass rounded-xl border border-white/10 hover:border-cyan/40 hover:shadow-[0_0_15px_rgba(14,165,233,0.1)] transition-all duration-300">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="shrink-0 text-[9px] font-bold tracking-widest uppercase text-cyan bg-cyan/10 px-1.5 py-0.5 rounded border border-cyan/20">
                          {formData.adTitle || "SPONSORED"}
                        </span>
                        <p className="text-xs text-gray-300 font-medium truncate">
                          {formData.adDescription || "Advertisement text description..."}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 group-hover:text-cyan transition-colors">
                        <span className="hidden sm:inline">Learn More</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center text-[10px] text-gray-500 leading-normal max-w-xs">
                  Sponsors must supply their destination URL: <code className="text-cyan truncate block">{formData.adUrl || "Not defined"}</code>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
