import type { ReactNode } from "react"

export interface SupportCategory {
  id: string
  title: string
  description: string
  icon: ReactNode
  color: string
}

export interface FaqItem {
  question: string
  answer: string
  category: string
}

export interface TicketFormData {
  email: string
  subject: string
  category: string
  description: string
  attachments?: File[]
}
