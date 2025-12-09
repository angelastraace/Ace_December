"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCcw, Download } from "lucide-react"

export default function AiProposalAssistant() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")

  const handleGenerate = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const mockResponses = [
        `# Treasury Diversification Proposal

## Summary
This proposal aims to diversify 10% of the DAO treasury into stablecoins to reduce volatility and ensure operational runway.

## Background
The ACE DAO treasury currently holds 95% of its assets in ACE tokens, exposing it to significant market volatility. This concentration creates risk for ongoing operations and development funding.

## Proposal Details
- Convert 10% of treasury ACE tokens (approximately 6.85M ACE) to USDC
- Execute the conversion gradually over 30 days to minimize market impact
- Maintain the stablecoin reserve in the existing treasury multisig wallet
- Require governance approval for any use of these reserve funds

## Expected Benefits
- Reduced treasury volatility
- Guaranteed operational runway for at least 18 months
- Protection against extreme market downturns
- Ability to capitalize on market opportunities without selling ACE at unfavorable prices

## Implementation Plan
1. Initial conversion of 2M ACE to USDC within 7 days of proposal passing
2. Remaining 4.85M ACE converted in equal weekly amounts over the following 3 weeks
3. Monthly reporting on treasury composition and diversification status

## Conclusion
This conservative diversification strategy balances the need for treasury stability while maintaining significant ACE token holdings for long-term alignment.`,

        `# Staking Rewards Enhancement Proposal

## Summary
This proposal seeks to increase staking rewards by 2% for long-term holders (>6 months) to incentivize platform stability and token retention.

## Background
Current staking rewards are set at 8% APY regardless of staking duration. This structure doesn't adequately reward long-term holders who provide greater stability to the protocol.

## Proposal Details
- Maintain base staking rate of 8% APY for all stakers
- Add a loyalty bonus of +2% APY (total 10%) for tokens staked continuously for 6+ months
- Implement a linear vesting schedule for the bonus (0.33% per month until reaching full 2% at 6 months)
- Cap the total rewards pool at 5M ACE tokens annually

## Expected Benefits
- Increased token lock-up period and reduced circulating supply
- Greater protocol stability through reduced token velocity
- Reward loyal community members who demonstrate long-term commitment
- Competitive APY compared to similar protocols

## Implementation Plan
1. Smart contract update to implement tiered reward structure
2. 14-day notice period before activation
3. Automatic qualification of existing stakers based on their current stake duration
4. Quarterly review of reward rates and economic impact

## Technical Implementation
The implementation requires updating the RewardDistributor contract to track staking duration and calculate tiered rewards. No migration of staked tokens will be necessary.`,
      ]

      setGeneratedContent(mockResponses[Math.floor(Math.random() * mockResponses.length)])
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-white">AI Proposal Assistant</CardTitle>
              <CardDescription>Generate and refine governance proposals with AI</CardDescription>
            </div>
            <Badge variant="outline" className="border-purple-500 bg-purple-500/10 text-purple-400">
              <Sparkles className="mr-1 h-3 w-3" /> AI Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="w-full bg-gray-800">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="improve">Improve Existing</TabsTrigger>
              <TabsTrigger value="analyze">Analyze</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="mt-4 space-y-4">
              <div>
                <label htmlFor="prompt" className="mb-2 block text-sm font-medium text-gray-400">
                  Describe your proposal idea
                </label>
                <Textarea
                  id="prompt"
                  placeholder="E.g., I want to create a proposal to increase staking rewards for long-term holders..."
                  className="min-h-[100px] border-gray-700 bg-gray-800 text-white"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-purple-600 text-white hover:bg-purple-700"
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                >
                  {isGenerating ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-1 h-4 w-4" /> Generate Proposal
                    </>
                  )}
                </Button>
              </div>

              {generatedContent && (
                <div className="mt-6 rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-medium text-white">Generated Proposal</h3>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto rounded bg-gray-900 p-4 text-sm text-gray-300">
                    <pre className="whitespace-pre-wrap font-sans">{generatedContent}</pre>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 text-gray-400 hover:text-green-400">
                        <ThumbsUp className="mr-1 h-4 w-4" /> Helpful
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-gray-400 hover:text-red-400">
                        <ThumbsDown className="mr-1 h-4 w-4" /> Not Helpful
                      </Button>
                    </div>
                    <Button size="sm" className="h-8 bg-teal-600 text-white hover:bg-teal-700">
                      Use This Proposal
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="improve" className="mt-4 space-y-4">
              <div>
                <label htmlFor="existing-proposal" className="mb-2 block text-sm font-medium text-gray-400">
                  Paste your existing proposal
                </label>
                <Textarea
                  id="existing-proposal"
                  placeholder="Paste your draft proposal here..."
                  className="min-h-[150px] border-gray-700 bg-gray-800 text-white"
                  rows={6}
                />
              </div>

              <div>
                <label htmlFor="improvement-instructions" className="mb-2 block text-sm font-medium text-gray-400">
                  What would you like to improve?
                </label>
                <Input
                  id="improvement-instructions"
                  placeholder="E.g., Make it more concise, add more technical details, improve clarity..."
                  className="border-gray-700 bg-gray-800 text-white"
                />
              </div>

              <div className="flex justify-end">
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  <Sparkles className="mr-1 h-4 w-4" /> Improve Proposal
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="analyze" className="mt-4 space-y-4">
              <div>
                <label htmlFor="analysis-proposal" className="mb-2 block text-sm font-medium text-gray-400">
                  Paste proposal to analyze
                </label>
                <Textarea
                  id="analysis-proposal"
                  placeholder="Paste a proposal to analyze its strengths, weaknesses, and potential impact..."
                  className="min-h-[150px] border-gray-700 bg-gray-800 text-white"
                  rows={6}
                />
              </div>

              <div className="flex justify-end">
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  <Sparkles className="mr-1 h-4 w-4" /> Analyze Proposal
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 rounded-lg bg-gray-800/50 p-4">
            <h3 className="mb-2 text-sm font-medium text-white">AI Assistant Tips</h3>
            <ul className="list-inside list-disc space-y-1 text-xs text-gray-400">
              <li>Be specific about the problem your proposal aims to solve</li>
              <li>Include quantifiable metrics and expected outcomes</li>
              <li>For technical proposals, specify which contracts would be affected</li>
              <li>Consider asking the AI to analyze potential risks or edge cases</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
