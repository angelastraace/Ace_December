"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, FileText, Code, Landmark, ArrowRight } from "lucide-react"

interface ProposalCreationProps {
  currentUser: any
}

export default function ProposalCreation({ currentUser }: ProposalCreationProps) {
  const [proposalType, setProposalType] = useState("text")

  return (
    <div className="space-y-6">
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-white">Create a New Proposal</CardTitle>
          <CardDescription>Draft and submit a proposal for community voting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 rounded-lg bg-blue-900/20 p-4 text-sm text-blue-300">
            <div className="flex items-start">
              <AlertCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
              <div>
                <p className="font-medium">Proposal Requirements</p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>You must hold at least 5,000 ACE tokens to create a proposal</li>
                  <li>Proposals require a 10% quorum to pass</li>
                  <li>Discussion period: 3 days, Voting period: 5 days</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="proposal-type" className="mb-2 block text-sm font-medium text-gray-400">
              Proposal Type
            </Label>
            <Select value={proposalType} onValueChange={setProposalType}>
              <SelectTrigger id="proposal-type" className="border-gray-700 bg-gray-800 text-white">
                <SelectValue placeholder="Select proposal type" />
              </SelectTrigger>
              <SelectContent className="border-gray-700 bg-gray-800 text-white">
                <SelectItem value="text">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-teal-400" />
                    <span>Text Proposal</span>
                  </div>
                </SelectItem>
                <SelectItem value="code">
                  <div className="flex items-center">
                    <Code className="mr-2 h-4 w-4 text-blue-400" />
                    <span>Code Change</span>
                  </div>
                </SelectItem>
                <SelectItem value="treasury">
                  <div className="flex items-center">
                    <Landmark className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Treasury Action</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full bg-gray-800">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-4 space-y-4">
              <div>
                <Label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-400">
                  Proposal Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a clear, descriptive title"
                  className="border-gray-700 bg-gray-800 text-white"
                />
              </div>

              <div>
                <Label htmlFor="summary" className="mb-2 block text-sm font-medium text-gray-400">
                  Summary
                </Label>
                <Textarea
                  id="summary"
                  placeholder="Provide a brief summary of your proposal (max 280 characters)"
                  className="border-gray-700 bg-gray-800 text-white"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                <div>
                  <p className="font-medium text-white">Discussion Period</p>
                  <p className="text-sm text-gray-400">Enable community feedback before voting</p>
                </div>
                <Switch defaultChecked />
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-400">
                    Detailed Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a comprehensive description of your proposal, including background, motivation, and expected outcomes."
                    className="min-h-[200px] border-gray-700 bg-gray-800 text-white"
                    rows={8}
                  />
                </div>

                <div>
                  <Label htmlFor="references" className="mb-2 block text-sm font-medium text-gray-400">
                    References & Links
                  </Label>
                  <Textarea
                    id="references"
                    placeholder="Add any relevant links, research, or previous discussions"
                    className="border-gray-700 bg-gray-800 text-white"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="actions" className="mt-4">
              {proposalType === "text" && (
                <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 text-center">
                  <p className="text-gray-400">Text proposals don't require specific actions</p>
                </div>
              )}

              {proposalType === "code" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contract-address" className="mb-2 block text-sm font-medium text-gray-400">
                      Contract Address
                    </Label>
                    <Input
                      id="contract-address"
                      placeholder="0x..."
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="function-call" className="mb-2 block text-sm font-medium text-gray-400">
                      Function Call
                    </Label>
                    <Textarea
                      id="function-call"
                      placeholder="function updateParameter(uint256 newValue) external {"
                      className="font-mono border-gray-700 bg-gray-800 text-white"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {proposalType === "treasury" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="recipient" className="mb-2 block text-sm font-medium text-gray-400">
                      Recipient Address
                    </Label>
                    <Input id="recipient" placeholder="0x..." className="border-gray-700 bg-gray-800 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-400">
                        Amount
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="token" className="mb-2 block text-sm font-medium text-gray-400">
                        Token
                      </Label>
                      <Select defaultValue="ace">
                        <SelectTrigger id="token" className="border-gray-700 bg-gray-800 text-white">
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent className="border-gray-700 bg-gray-800 text-white">
                          <SelectItem value="ace">ACE</SelectItem>
                          <SelectItem value="eth">ETH</SelectItem>
                          <SelectItem value="usdc">USDC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6">
                <p className="text-center text-gray-400">Complete the previous sections to preview your proposal</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end space-x-3">
            <Button
              variant="outline"
              className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Save Draft
            </Button>
            <Button className="bg-teal-600 text-white hover:bg-teal-700">
              Submit Proposal <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-white">Proposal Guidelines</CardTitle>
          <CardDescription>Best practices for successful proposals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-teal-900 text-xs font-bold text-teal-400">
                1
              </div>
              <div>
                <h3 className="font-medium text-white">Be Clear and Specific</h3>
                <p className="text-sm text-gray-400">
                  Clearly state what you're proposing and why it matters to the community.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-teal-900 text-xs font-bold text-teal-400">
                2
              </div>
              <div>
                <h3 className="font-medium text-white">Provide Context</h3>
                <p className="text-sm text-gray-400">
                  Include background information and any relevant data or research.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-teal-900 text-xs font-bold text-teal-400">
                3
              </div>
              <div>
                <h3 className="font-medium text-white">Consider Alternatives</h3>
                <p className="text-sm text-gray-400">
                  Discuss alternative approaches and why your proposal is the best solution.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-teal-900 text-xs font-bold text-teal-400">
                4
              </div>
              <div>
                <h3 className="font-medium text-white">Engage in Discussion</h3>
                <p className="text-sm text-gray-400">
                  Be responsive to community feedback and be willing to refine your proposal.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
