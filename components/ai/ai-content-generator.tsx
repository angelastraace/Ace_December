"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, HelpCircle, Loader2, Check, Copy } from "lucide-react"

export default function AIContentGenerator() {
  const [contentType, setContentType] = useState("article")
  const [topic, setTopic] = useState("")
  const [complexity, setComplexity] = useState("intermediate")
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!topic) return

    setLoading(true)
    setGenerated(false)

    // Simulate API call
    setTimeout(() => {
      let content = ""

      if (contentType === "article") {
        content = `# Understanding Blockchain Consensus Mechanisms

## Introduction

Blockchain technology has revolutionized the way we think about digital transactions and data storage. At the heart of every blockchain is a consensus mechanism - the protocol that determines how the network agrees on which transactions are valid and should be added to the blockchain.

## Proof of Work (PoW)

The original consensus mechanism, introduced by Bitcoin, is Proof of Work. In PoW:

- Miners compete to solve complex mathematical puzzles
- The first to solve the puzzle gets to add the next block
- Requires significant computational power and energy
- Highly secure but environmentally controversial

## Proof of Stake (PoS)

As an alternative to PoW, Proof of Stake selects validators based on the amount of cryptocurrency they hold and are willing to "stake" as collateral:

- Validators are chosen based on the size of their stake
- No energy-intensive mining required
- Validators are incentivized to act honestly or risk losing their stake
- Generally more energy-efficient than PoW

## Delegated Proof of Stake (DPoS)

DPoS is a variation of PoS where token holders vote for a small number of delegates who validate transactions:

- More scalable than traditional PoS
- Faster transaction processing
- May sacrifice some decentralization for efficiency

## Practical Byzantine Fault Tolerance (PBFT)

PBFT is designed to work efficiently in asynchronous systems and can tolerate malicious nodes:

- Requires known validators
- High transaction throughput
- Lower energy consumption
- Works well in permissioned blockchains

## Conclusion

Each consensus mechanism comes with its own set of trade-offs between security, decentralization, and scalability. The choice of mechanism depends on the specific needs and goals of the blockchain project.`
      } else if (contentType === "quiz") {
        content = `# Blockchain Fundamentals Quiz

1. **What is a blockchain?**
   - A. A type of cryptocurrency
   - B. A distributed, immutable ledger
   - C. A centralized database
   - D. A programming language
   
   **Answer: B. A distributed, immutable ledger**

2. **Which of the following is NOT a characteristic of blockchain technology?**
   - A. Decentralization
   - B. Transparency
   - C. Centralized control
   - D. Immutability
   
   **Answer: C. Centralized control**

3. **What is the purpose of a consensus mechanism in blockchain?**
   - A. To encrypt transactions
   - B. To agree on the valid state of the blockchain
   - C. To create new cryptocurrencies
   - D. To store user data
   
   **Answer: B. To agree on the valid state of the blockchain**

4. **Which consensus mechanism does Bitcoin use?**
   - A. Proof of Stake
   - B. Proof of Authority
   - C. Proof of Work
   - D. Delegated Proof of Stake
   
   **Answer: C. Proof of Work**

5. **What is a smart contract?**
   - A. A legal agreement between blockchain users
   - B. Self-executing code that runs on a blockchain
   - C. A contract to purchase cryptocurrency
   - D. A method to secure private keys
   
   **Answer: B. Self-executing code that runs on a blockchain**

6. **What is a block in a blockchain?**
   - A. A unit of cryptocurrency
   - B. A collection of validated transactions
   - C. A type of encryption
   - D. A mining computer
   
   **Answer: B. A collection of validated transactions**

7. **What is a 51% attack?**
   - A. When a hacker steals 51% of a cryptocurrency
   - B. When 51% of nodes fail simultaneously
   - C. When a single entity controls majority of the network's mining power
   - D. When 51% of transactions are rejected
   
   **Answer: C. When a single entity controls majority of the network's mining power**

8. **Which of these is NOT typically stored on a blockchain?**
   - A. Transaction data
   - B. Large media files
   - C. Smart contracts
   - D. Wallet addresses
   
   **Answer: B. Large media files**

9. **What is a private key in cryptocurrency?**
   - A. A password to access the blockchain
   - B. A secret code that allows you to spend your cryptocurrency
   - C. An encryption method for transactions
   - D. A key held by miners to validate blocks
   
   **Answer: B. A secret code that allows you to spend your cryptocurrency**

10. **What is a fork in blockchain?**
    - A. A tool for mining cryptocurrency
    - B. A split in the blockchain creating two separate paths
    - C. A type of wallet
    - D. A method to combine multiple blockchains
    
    **Answer: B. A split in the blockchain creating two separate paths**`
      } else if (contentType === "summary") {
        content = `# Blockchain Technology: Executive Summary

## Overview

Blockchain technology represents a paradigm shift in how digital information is stored, shared, and verified. At its core, blockchain is a distributed ledger technology that enables secure, transparent, and immutable record-keeping without requiring a central authority.

## Key Components

1. **Distributed Ledger**: The blockchain database is spread across multiple nodes, with each maintaining an identical copy of the ledger.

2. **Consensus Mechanisms**: Protocols like Proof of Work, Proof of Stake, and others ensure all participants agree on the valid state of the blockchain.

3. **Cryptographic Security**: Advanced cryptography secures transactions and controls access to the network.

4. **Smart Contracts**: Self-executing code that automatically enforces agreements when predefined conditions are met.

## Business Applications

- **Financial Services**: Streamlined payments, reduced settlement times, automated compliance
- **Supply Chain**: Enhanced traceability, verification of authenticity, improved inventory management
- **Healthcare**: Secure patient data sharing, medication tracking, clinical trial management
- **Digital Identity**: Self-sovereign identity solutions, reduced fraud, improved privacy

## Challenges & Considerations

- **Scalability**: Transaction throughput limitations compared to traditional systems
- **Regulatory Uncertainty**: Evolving legal frameworks across different jurisdictions
- **Integration Complexity**: Challenges in connecting with legacy systems
- **Energy Consumption**: Environmental concerns, particularly with Proof of Work systems

## Future Outlook

Blockchain technology continues to mature with improvements in scalability, interoperability, and user experience. Enterprise adoption is accelerating as the technology proves its value in real-world applications beyond cryptocurrencies.

## Conclusion

Blockchain represents a fundamental shift in how we approach data integrity, trust, and decentralization in digital systems. Organizations should evaluate specific use cases where blockchain's unique properties address existing pain points rather than applying it as a universal solution.`
      }

      setGeneratedContent(content)
      setLoading(false)
      setGenerated(true)
    }, 3000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center">
          <div className="mr-3 rounded-full bg-green-900/20 p-2">
            <BookOpen className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <CardTitle className="text-white">AI Content Generator</CardTitle>
            <CardDescription className="text-gray-400">Create educational content for ACE Learn</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="preview" disabled={!generated}>
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="content-type" className="text-sm font-medium text-white">
                  Content Type
                </label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger id="content-type" className="border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-800 text-white">
                    <SelectItem value="article">Educational Article</SelectItem>
                    <SelectItem value="quiz">Quiz with Answers</SelectItem>
                    <SelectItem value="summary">Executive Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="topic" className="text-sm font-medium text-white">
                  Topic
                </label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Blockchain Consensus Mechanisms"
                  className="border-gray-700 bg-gray-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="complexity" className="text-sm font-medium text-white">
                  Complexity Level
                </label>
                <Select value={complexity} onValueChange={setComplexity}>
                  <SelectTrigger id="complexity" className="border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Select complexity level" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-800 text-white">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border border-gray-800 bg-gray-900/50 p-3">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-white">Content Generation Tips</p>
                    <ul className="mt-1 list-inside list-disc space-y-1 text-xs text-gray-400">
                      <li>Be specific with your topic for more focused content</li>
                      <li>Choose the appropriate complexity level for your target audience</li>
                      <li>Generated content can be edited further to suit your needs</li>
                      <li>For quizzes, you'll get questions with multiple choice answers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading || !topic}
                className="w-full bg-green-600 text-black hover:bg-green-500"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  "Generate Content"
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-4 space-y-4">
            {generated && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-medium text-white">
                      {contentType === "article"
                        ? "Educational Article"
                        : contentType === "quiz"
                          ? "Quiz with Answers"
                          : "Executive Summary"}
                    </h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-1 h-4 w-4 text-green-500" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-4 w-4" /> Copy
                      </>
                    )}
                  </Button>
                </div>

                <div className="max-h-[400px] overflow-y-auto rounded-md border border-gray-800 bg-gray-900/50 p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-300">{generatedContent}</pre>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={() => {
                      setGenerated(false)
                      setGeneratedContent("")
                    }}
                  >
                    Generate New Content
                  </Button>
                  <Button className="flex-1 bg-green-600 text-black hover:bg-green-500">Save to ACE Learn</Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
