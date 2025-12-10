"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Rocket, Zap, Lock, TrendingUp, Download, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import Testimonials from "@/components/testimonials"
import ParticleBackground from "@/components/particle-background"
import SocialProofPopup from "@/components/social-proof-popup"
import InteractiveCoin from "@/components/InteractiveCoin"
import FoundersMessage from "@/components/founders-message"
import MysteriousTeaser from "@/components/mysterious-teaser"
import WaitlistTiers from "@/components/waitlist-tiers"
import Leaderboard from "@/components/leaderboard"
import MilestoneUnlocks from "@/components/milestone-unlocks"
import ExitIntentPopup from "@/components/exit-intent-popup"
import CustomCursor from "@/components/custom-cursor"
import FeedbackButton from "@/components/feedback-button"
import ExpandedFAQ from "@/components/expanded-faq"
import AnalyticsPrep from "@/components/analytics-prep"
import AnimatedCTAButton from "@/components/animated-cta-button"
import WhyAceExchange from "@/components/why-ace-exchange"
import CosmicBackground from "@/components/cosmic-background"
import ScrollAnimation from "@/components/scroll-animation"
import AchievementSystem from "@/components/achievement-system"
import PerformanceOptimizer from "@/components/performance-optimizer"
import { getBrandMessage } from "@/components/brand-messaging"
import HighContrastToggle from "@/components/high-contrast-toggle"
import ParticleAnimation from "@/components/particle-animation"
import StatisticsCounter from "@/components/statistics-counter"
import AnimatedFeatureIcons from "@/components/animated-feature-icons"
import MediaMentions from "@/components/media-mentions"
import RewardsInfographic from "@/components/rewards-infographic"
import EnhancedFooter from "@/components/enhanced-footer"
import TwinklingStarsEffect from "@/components/twinkling-stars"

export default function LandingPage() {
  // Get a consistent headline and subtitle
  const [headlineIndex, setHeadlineIndex] = useState(0)
  const headlines = [
    "The Banks Are Dead.\nACE is Not.",
    "Unleash the Future of Finance",
    "Dominate the Crypto Universe",
    "Trade Beyond Boundaries",
    "Financial Freedom Awaits",
  ]
  const headline = headlines[headlineIndex]
  const subtitle = getBrandMessage("subtitle", headlineIndex)

  return (
    <div className="flex min-h-screen flex-col bg-[#001219]">
      {/* Performance optimization (invisible) */}
      <PerformanceOptimizer />

      {/* Analytics preparation (invisible) */}
      <AnalyticsPrep />

      {/* Feedback button */}
      <FeedbackButton />

      {/* High contrast toggle */}
      <HighContrastToggle />

      {/* Achievement system */}
      <AchievementSystem />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Exit intent popup */}
      <ExitIntentPopup />

      {/* Social proof popups */}
      <SocialProofPopup />

      {/* Enhanced cosmic background with twinkling stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cosmic-bg absolute inset-0 z-0">
          <div className="stars-container absolute inset-0">
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>
            <div className="twinkling-stars"></div>
          </div>
          <div className="cosmic-nebula absolute inset-0"></div>
        </div>
        <ParticleBackground />
        <CosmicBackground />
        <ParticleAnimation />
        <TwinklingStarsEffect />
      </div>

      {/* Large background AE logo with glow effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="relative h-[800px] w-[800px] opacity-10">
          <Image src="/ae-logo-glow.png" alt="AE Logo Background" fill className="object-contain" priority />
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#001219] opacity-40"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-gray-800 bg-black/20 px-4 py-4 backdrop-blur-md md:px-6">
        <div className="flex items-center space-x-4">
          <Link href="/sign-up">
            <Button variant="outline" size="sm" className="border-teal-500 text-teal-400 hover:bg-teal-950">
              Sign Up
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="border-teal-500 text-teal-400 hover:bg-teal-950">
              User Dashboard
            </Button>
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          <Link href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-sm text-gray-300 hover:text-white transition-colors">
            Testimonials
          </Link>
          <Link href="#faq" className="text-sm text-gray-300 hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>
      </header>

      {/* Crypto Ticker */}
      <div className="relative z-10 overflow-hidden border-b border-gray-800 bg-black/30 py-2 backdrop-blur-sm">
        <div className="flex animate-marquee items-center space-x-6 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-yellow-500"></div>
            <span className="font-medium text-white">BTC</span>
            <span className="text-white">$36,500</span>
            <span className="text-green-500">+2.34%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-500"></div>
            <span className="font-medium text-white">ETH</span>
            <span className="text-white">$2,000</span>
            <span className="text-red-500">-1.25%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-purple-500"></div>
            <span className="font-medium text-white">SOL</span>
            <span className="text-white">$100</span>
            <span className="text-green-500">+5.67%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-400"></div>
            <span className="font-medium text-white">ADA</span>
            <span className="text-white">$0.9</span>
            <span className="text-green-500">+0.89%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-pink-500"></div>
            <span className="font-medium text-white">DOT</span>
            <span className="text-white">$10</span>
            <span className="text-red-500">-0.45%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-green-500"></div>
            <span className="font-medium text-white">LINK</span>
            <span className="text-white">$15.75</span>
            <span className="text-green-500">+3.21%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-red-500"></div>
            <span className="font-medium text-white">AVAX</span>
            <span className="text-white">$28.40</span>
            <span className="text-red-500">-2.15%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-yellow-400"></div>
            <span className="font-medium text-white">MATIC</span>
            <span className="text-white">$0.65</span>
            <span className="text-green-500">+1.87%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-indigo-500"></div>
            <span className="font-medium text-white">XRP</span>
            <span className="text-white">$0.52</span>
            <span className="text-red-500">-0.73%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-orange-500"></div>
            <span className="font-medium text-white">DOGE</span>
            <span className="text-white">$0.08</span>
            <span className="text-green-500">+4.20%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-teal-500"></div>
            <span className="font-medium text-white">ATOM</span>
            <span className="text-white">$8.15</span>
            <span className="text-green-500">+2.75%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-gray-500"></div>
            <span className="font-medium text-white">LTC</span>
            <span className="text-white">$65.30</span>
            <span className="text-red-500">-1.05%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-600"></div>
            <span className="font-medium text-white">ALGO</span>
            <span className="text-white">$0.12</span>
            <span className="text-green-500">+0.95%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-purple-600"></div>
            <span className="font-medium text-white">UNI</span>
            <span className="text-white">$5.45</span>
            <span className="text-red-500">-0.35%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-amber-600"></div>
            <span className="font-medium text-white">SHIB</span>
            <span className="text-white">$0.00001</span>
            <span className="text-green-500">+6.42%</span>
          </div>

          {/* Duplicate for continuous scrolling effect */}
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-yellow-500"></div>
            <span className="font-medium text-white">BTC</span>
            <span className="text-white">$36,500</span>
            <span className="text-green-500">+2.34%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-500"></div>
            <span className="font-medium text-white">ETH</span>
            <span className="text-white">$2,000</span>
            <span className="text-red-500">-1.25%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-purple-500"></div>
            <span className="font-medium text-white">SOL</span>
            <span className="text-white">$100</span>
            <span className="text-green-500">+5.67%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-400"></div>
            <span className="font-medium text-white">ADA</span>
            <span className="text-white">$0.9</span>
            <span className="text-green-500">+0.89%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-pink-500"></div>
            <span className="font-medium text-white">DOT</span>
            <span className="text-white">$10</span>
            <span className="text-red-500">-0.45%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-green-500"></div>
            <span className="font-medium text-white">LINK</span>
            <span className="text-white">$15.75</span>
            <span className="text-green-500">+3.21%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-red-500"></div>
            <span className="font-medium text-white">AVAX</span>
            <span className="text-white">$28.40</span>
            <span className="text-red-500">-2.15%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-yellow-400"></div>
            <span className="font-medium text-white">MATIC</span>
            <span className="text-white">$0.65</span>
            <span className="text-green-500">+1.87%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-indigo-500"></div>
            <span className="font-medium text-white">XRP</span>
            <span className="text-white">$0.52</span>
            <span className="text-red-500">-0.73%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-orange-500"></div>
            <span className="font-medium text-white">DOGE</span>
            <span className="text-white">$0.08</span>
            <span className="text-green-500">+4.20%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-teal-500"></div>
            <span className="font-medium text-white">ATOM</span>
            <span className="text-white">$8.15</span>
            <span className="text-green-500">+2.75%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-gray-500"></div>
            <span className="font-medium text-white">LTC</span>
            <span className="text-white">$65.30</span>
            <span className="text-red-500">-1.05%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-600"></div>
            <span className="font-medium text-white">ALGO</span>
            <span className="text-white">$0.12</span>
            <span className="text-green-500">+0.95%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-purple-600"></div>
            <span className="font-medium text-white">UNI</span>
            <span className="text-white">$5.45</span>
            <span className="text-red-500">-0.35%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-amber-600"></div>
            <span className="font-medium text-white">SHIB</span>
            <span className="text-white">$0.00001</span>
            <span className="text-green-500">+6.42%</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 flex-1">
        <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center md:py-24 lg:py-32">
          <div className="mb-6 flex justify-center">
            <InteractiveCoin />
          </div>

          <ScrollAnimation animation="fade">
            <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {headline.includes("\n") ? (
                <>
                  <span className="text-gradient">The Banks Are Dead.</span>
                  <br />
                  <span className="text-gradient">ACE is Not.</span>
                </>
              ) : (
                <span className="text-gradient">{headline}</span>
              )}
            </h1>
            <p className="mb-8 max-w-2xl mx-auto text-center text-lg text-gray-300 md:text-xl">{subtitle}</p>
          </ScrollAnimation>

          {/* Hero CTA Button */}
          <ScrollAnimation animation="scale" delay={0.2}>
            <div className="mb-10 w-full max-w-md">
              <AnimatedCTAButton text="Join the Future" className="w-full" />
            </div>
          </ScrollAnimation>

          {/* Key Benefits Section */}
          <ScrollAnimation animation="slide-up">
            <div id="features" className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group flex flex-col items-center p-4 transition-transform hover:scale-105">
                <div className="mb-3 rounded-full bg-teal-900/50 p-3 transition-colors group-hover:bg-teal-800/70">
                  <Rocket className="h-6 w-6 text-teal-500" />
                </div>
                <h3 className="mb-1 font-medium text-white">Next-Gen Trading</h3>
                <p className="text-sm text-gray-400">AI-powered algorithms for optimal trades</p>
              </div>
              <div className="group flex flex-col items-center p-4 transition-transform hover:scale-105">
                <div className="mb-3 rounded-full bg-teal-900/50 p-3 transition-colors group-hover:bg-teal-800/70">
                  <Zap className="h-6 w-6 text-teal-500" />
                </div>
                <h3 className="mb-1 font-medium text-white">Financial Freedom</h3>
                <p className="text-sm text-gray-400">Break free from traditional banking limits</p>
              </div>
              <div className="group flex flex-col items-center p-4 transition-transform hover:scale-105">
                <div className="mb-3 rounded-full bg-teal-900/50 p-3 transition-colors group-hover:bg-teal-800/70">
                  <Lock className="h-6 w-6 text-teal-500" />
                </div>
                <h3 className="mb-1 font-medium text-white">Unmatched Security</h3>
                <p className="text-sm text-gray-400">Enterprise-grade protection for your assets</p>
              </div>
              <div className="group flex flex-col items-center p-4 transition-transform hover:scale-105">
                <div className="mb-3 rounded-full bg-teal-900/50 p-3 transition-colors group-hover:bg-teal-800/70">
                  <TrendingUp className="h-6 w-6 text-teal-500" />
                </div>
                <h3 className="mb-1 font-medium text-white">Rewards & Cashback</h3>
                <p className="text-sm text-gray-400">Earn while you trade with our loyalty program</p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Statistics Counter */}
          <ScrollAnimation animation="fade">
            <div className="mb-16 w-full">
              <StatisticsCounter />
            </div>
          </ScrollAnimation>

          {/* Feature Highlights */}
          <ScrollAnimation animation="fade">
            <div className="mb-16">
              <h2 className="mb-8 text-center text-2xl font-bold text-white md:text-3xl">
                Unleash the Power of <span className="text-teal-500">ACE Exchange</span>
              </h2>
              <AnimatedFeatureIcons />
            </div>
          </ScrollAnimation>

          {/* Rewards Infographic */}
          <ScrollAnimation animation="fade">
            <div className="mb-16">
              <RewardsInfographic />
            </div>
          </ScrollAnimation>

          {/* Mysterious Teaser */}
          <ScrollAnimation animation="fade">
            <div className="mb-16">
              <MysteriousTeaser />
            </div>
          </ScrollAnimation>

          {/* Media Mentions */}
          <ScrollAnimation animation="fade">
            <div className="mb-16">
              <MediaMentions />
            </div>
          </ScrollAnimation>
        </section>

        {/* Why ACE Exchange Section */}
        <ScrollAnimation animation="fade">
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
                Why Choose <span className="text-teal-500">ACE Exchange</span>?
              </h2>
              <WhyAceExchange />
            </div>
          </section>
        </ScrollAnimation>

        {/* Waitlist Tiers Section */}
        <ScrollAnimation animation="fade">
          <section className="border-t border-gray-800 bg-black/40 py-16 backdrop-blur-sm md:py-24">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
                Exclusive Waitlist Benefits
              </h2>
              <WaitlistTiers />

              {/* CTA Button */}
              <div className="mt-12 text-center">
                <AnimatedCTAButton text="Secure Your Tier Now" className="px-8" />
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* Milestone Unlocks Section */}
        <ScrollAnimation animation="fade">
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">Community Milestones</h2>
              <MilestoneUnlocks />
            </div>
          </section>
        </ScrollAnimation>

        {/* How It Works Section */}
        <ScrollAnimation animation="fade">
          <section id="how-it-works" className="border-t border-gray-800 bg-black/40 py-16 backdrop-blur-sm md:py-24">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
                How Our Referral Program Works
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <ScrollAnimation animation="slide-up" delay={0.1}>
                  <div className="relative rounded-xl border border-gray-800 bg-black/40 p-6 backdrop-blur-sm transform transition-all hover:scale-105 hover:border-teal-900">
                    <div className="absolute -top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-lg font-bold text-black">
                      1
                    </div>
                    <h3 className="mb-3 mt-2 text-xl font-bold text-white">Sign Up</h3>
                    <p className="text-gray-300">Join the waitlist and get your unique referral link.</p>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation animation="slide-up" delay={0.2}>
                  <div className="relative rounded-xl border border-gray-800 bg-black/40 p-6 backdrop-blur-sm transform transition-all hover:scale-105 hover:border-teal-900">
                    <div className="absolute -top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-lg font-bold text-black">
                      2
                    </div>
                    <h3 className="mb-3 mt-2 text-xl font-bold text-white">Invite Friends</h3>
                    <p className="text-gray-300">Share your link and move up in the waitlist with each referral.</p>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation animation="slide-up" delay={0.3}>
                  <div className="relative rounded-xl border border-gray-800 bg-black/40 p-6 backdrop-blur-sm transform transition-all hover:scale-105 hover:border-teal-900">
                    <div className="absolute -top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-lg font-bold text-black">
                      3
                    </div>
                    <h3 className="mb-3 mt-2 text-xl font-bold text-white">Get Rewards</h3>
                    <p className="text-gray-300">Earn ACE points, early access, and exclusive rewards.</p>
                  </div>
                </ScrollAnimation>
              </div>

              {/* Leaderboard */}
              <ScrollAnimation animation="fade" delay={0.4}>
                <div className="mt-16">
                  <Leaderboard />
                </div>
              </ScrollAnimation>

              {/* CTA Button */}
              <ScrollAnimation animation="scale" delay={0.5}>
                <div className="mt-12 text-center">
                  <AnimatedCTAButton text="Join the Referral Program" className="px-8" />
                </div>
              </ScrollAnimation>
            </div>
          </section>
        </ScrollAnimation>

        {/* Founder's Message */}
        <ScrollAnimation animation="fade">
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-4">
              <FoundersMessage />
            </div>
          </section>
        </ScrollAnimation>

        {/* Testimonials Section */}
        <ScrollAnimation animation="fade">
          <section id="testimonials" className="border-t border-gray-800 bg-black/40 py-16 backdrop-blur-sm md:py-24">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
                What Early Users Are Saying
              </h2>
              <Testimonials />

              {/* CTA Button */}
              <ScrollAnimation animation="scale">
                <div className="mt-12 text-center">
                  <p className="mb-4 text-gray-300">
                    Don't miss out on the future of finance. Join the revolution now!
                  </p>
                  <AnimatedCTAButton text="Secure Your Spot" className="px-8" />
                </div>
              </ScrollAnimation>
            </div>
          </section>
        </ScrollAnimation>

        {/* Media Kit Section */}
        <ScrollAnimation animation="fade">
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Spread the Word</h2>
              <p className="mb-8 text-lg text-gray-300">
                Help us spread the word about ACE Exchange. Download our media kit for logos, brand assets, and more.
              </p>
              <Button variant="outline" className="border-teal-500 text-teal-400 hover:bg-teal-950">
                <Download className="mr-2 h-4 w-4" /> Download Media Kit
              </Button>
            </div>
          </section>
        </ScrollAnimation>

        {/* FAQ Section */}
        <ScrollAnimation animation="fade">
          <section id="faq" className="border-t border-gray-800 bg-black/40 py-16 backdrop-blur-sm md:py-24">
            <div className="mx-auto max-w-4xl px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
                Frequently Asked Questions
              </h2>
              <ExpandedFAQ />
            </div>
          </section>
        </ScrollAnimation>

        {/* Launch Countdown Events */}
        <ScrollAnimation animation="fade">
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">Launch Countdown Events</h2>
              <div className="space-y-6">
                <ScrollAnimation animation="slide-up" delay={0.1}>
                  <div className="rounded-lg border border-gray-800 bg-black/40 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-teal-500" />
                          <h3 className="text-xl font-medium text-white">2 Weeks Before Launch</h3>
                        </div>
                        <p className="mt-2 text-gray-300">
                          Exclusive AMA with the founding team and sneak peek at the trading interface
                        </p>
                      </div>
                      <div className="rounded-full bg-teal-900/30 px-4 py-2 text-sm font-medium text-teal-400">
                        For Gold & Silver Tiers
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation animation="slide-up" delay={0.2}>
                  <div className="rounded-lg border border-gray-800 bg-black/40 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-teal-500" />
                          <h3 className="text-xl font-medium text-white">1 Week Before Launch</h3>
                        </div>
                        <p className="mt-2 text-gray-300">
                          Special announcement of an exclusive feature and early access token distribution
                        </p>
                      </div>
                      <div className="rounded-full bg-teal-900/30 px-4 py-2 text-sm font-medium text-teal-400">
                        For All Waitlist Members
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation animation="slide-up" delay={0.3}>
                  <div className="rounded-lg border border-gray-800 bg-black/40 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-teal-500" />
                          <h3 className="text-xl font-medium text-white">Launch Day</h3>
                        </div>
                        <p className="mt-2 text-gray-300">
                          Live streaming event with major announcements and special launch day bonuses
                        </p>
                      </div>
                      <div className="rounded-full bg-teal-900/30 px-4 py-2 text-sm font-medium text-teal-400">
                        For All Waitlist Members
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* Final CTA */}
        <ScrollAnimation animation="fade">
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="mb-6 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                The Banks Are Dead.
                <br />
                <span className="text-teal-500">ACE is Not.</span>
              </h2>
              <p className="mb-8 text-lg text-gray-300">
                Be among the first to experience the future of crypto trading. Sign Up Now!
              </p>
              <AnimatedCTAButton text="Join the Waitlist" className="px-8 text-lg" />
            </div>
          </section>
        </ScrollAnimation>
      </main>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  )
}