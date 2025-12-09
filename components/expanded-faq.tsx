"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "What is ACE Exchange?",
    answer:
      "ACE Exchange is a next-generation cryptocurrency trading platform that combines cutting-edge technology with an intuitive user experience. We offer advanced trading features, AI-powered insights, and a unique rewards system designed to empower traders of all experience levels.",
  },
  {
    question: "How does the waitlist work?",
    answer:
      "Our waitlist gives you priority access to ACE Exchange when we launch. The more friends you refer, the higher you move up in the queue. Different tiers (Bronze, Silver, Gold) offer increasing benefits based on your referral count.",
  },
  {
    question: "What makes ACE Exchange different from other platforms?",
    answer:
      "ACE Exchange stands out with our AI-powered trading assistant, zero-fee structure for early adopters, advanced security measures, and our community-focused approach. We're building more than just an exchange - we're creating a financial ecosystem for the future.",
  },
  {
    question: "When will ACE Exchange launch?",
    answer:
      "We're targeting a full public launch in Q2 2025. However, waitlist members will get early access based on their position in the queue, with Gold tier members gaining access up to a week before the public launch.",
  },
  {
    question: "What cryptocurrencies will be supported?",
    answer:
      "At launch, we'll support all major cryptocurrencies including BTC, ETH, SOL, ADA, DOT, and many more. We'll continuously add support for additional tokens based on community demand and our rigorous security assessment process.",
  },
  {
    question: "Is ACE Exchange secure?",
    answer:
      "Security is our top priority. We implement industry-leading security measures including multi-signature wallets, cold storage for the majority of assets, regular security audits, and comprehensive insurance coverage to protect user funds.",
  },
  {
    question: "Will there be a mobile app?",
    answer:
      "Yes! We're developing native mobile apps for both iOS and Android that will launch alongside our web platform. The mobile apps will offer the full functionality of the web version with additional mobile-specific features.",
  },
  {
    question: "What are ACE tokens?",
    answer:
      "ACE tokens are our native utility tokens that power the ACE Exchange ecosystem. They can be used for reduced trading fees, governance voting, staking rewards, and accessing premium features. Waitlist members will receive exclusive ACE token allocations.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Our support team is available 24/7. You can reach us through the in-app chat, email at support@aceexchange.io, or through our community channels on Discord and Telegram.",
  },
]

export default function ExpandedFAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (value: string) => {
    setOpenItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <Accordion type="multiple" value={openItems} className="space-y-4">
      {faqItems.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="rounded-lg border border-gray-800 bg-black/40 px-6 backdrop-blur-sm"
        >
          <AccordionTrigger
            onClick={() => toggleItem(`item-${index}`)}
            className="py-4 text-left text-white hover:no-underline"
          >
            <span>{item.question}</span>
            <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200" />
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-0 text-gray-300">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
