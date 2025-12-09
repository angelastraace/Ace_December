"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Upload, Info, Users, Rocket, Coins } from "lucide-react"
import Link from "next/link"

const projectSchema = z.object({
  name: z.string().min(3, { message: "Project name must be at least 3 characters" }),
  tagline: z.string().max(100, { message: "Tagline must be less than 100 characters" }),
  description: z.string().min(100, { message: "Description must be at least 100 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  website: z.string().url({ message: "Please enter a valid URL" }),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  telegram: z.string().optional(),
  github: z.string().optional(),
  logo: z.string().optional(),
  banner: z.string().optional(),
  whitepaper: z.string().optional(),
  tokenName: z.string().min(1, { message: "Token name is required" }),
  tokenSymbol: z.string().min(1, { message: "Token symbol is required" }),
  tokenDecimals: z.string().min(1, { message: "Token decimals are required" }),
  tokenSupply: z.string().min(1, { message: "Token supply is required" }),
  tokenAllocation: z.string().min(1, { message: "Token allocation is required" }),
  fundingGoal: z.string().min(1, { message: "Funding goal is required" }),
  minContribution: z.string().min(1, { message: "Minimum contribution is required" }),
  maxContribution: z.string().min(1, { message: "Maximum contribution is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  vestingSchedule: z.string().optional(),
  teamMembers: z.string().min(1, { message: "Team information is required" }),
  roadmap: z.string().min(1, { message: "Roadmap is required" }),
})

export default function SubmitProject() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("project")

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      tagline: "",
      description: "",
      category: "",
      website: "",
      twitter: "",
      discord: "",
      telegram: "",
      github: "",
      logo: "",
      banner: "",
      whitepaper: "",
      tokenName: "",
      tokenSymbol: "",
      tokenDecimals: "",
      tokenSupply: "",
      tokenAllocation: "",
      fundingGoal: "",
      minContribution: "",
      maxContribution: "",
      startDate: "",
      endDate: "",
      vestingSchedule: "",
      teamMembers: "",
      roadmap: "",
    },
  })

  function onSubmit(values) {
    console.log(values)
    // Submit to API
    router.push("/launchpad/submit/success")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <Link href="/launchpad" className="flex items-center text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Launchpad
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">Submit Your Project</h1>
        <p className="text-muted-foreground mt-2">
          Launch your project on ACE Launchpad and reach thousands of potential investors
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Submission Form</CardTitle>
          <CardDescription>
            Fill out the details below to submit your project for review. Our team will review your submission and get
            back to you within 48 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="project">
                <Info className="mr-2 h-4 w-4" />
                Project Info
              </TabsTrigger>
              <TabsTrigger value="token">
                <Coins className="mr-2 h-4 w-4" />
                Tokenomics
              </TabsTrigger>
              <TabsTrigger value="sale">
                <Rocket className="mr-2 h-4 w-4" />
                Sale Details
              </TabsTrigger>
              <TabsTrigger value="team">
                <Users className="mr-2 h-4 w-4" />
                Team & Roadmap
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <TabsContent value="project" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter project name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="defi">DeFi</SelectItem>
                              <SelectItem value="nft">NFT</SelectItem>
                              <SelectItem value="gaming">Gaming</SelectItem>
                              <SelectItem value="metaverse">Metaverse</SelectItem>
                              <SelectItem value="dao">DAO</SelectItem>
                              <SelectItem value="infrastructure">Infrastructure</SelectItem>
                              <SelectItem value="social">Social</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline*</FormLabel>
                        <FormControl>
                          <Input placeholder="A short description of your project (max 100 characters)" {...field} />
                        </FormControl>
                        <FormDescription>This will appear as a subtitle for your project</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a detailed description of your project"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Project Links</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website*</FormLabel>
                            <FormControl>
                              <Input placeholder="https://yourproject.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                              <Input placeholder="https://twitter.com/yourproject" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="discord"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discord</FormLabel>
                            <FormControl>
                              <Input placeholder="https://discord.gg/yourproject" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="telegram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telegram</FormLabel>
                            <FormControl>
                              <Input placeholder="https://t.me/yourproject" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/yourproject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Project Media</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="logo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Logo</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-4">
                                <Button type="button" variant="outline" className="w-full">
                                  <Upload className="mr-2 h-4 w-4" />
                                  Upload Logo
                                </Button>
                                {field.value && <span className="text-sm text-muted-foreground">File uploaded</span>}
                              </div>
                            </FormControl>
                            <FormDescription>Square format, minimum 500x500px</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="banner"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Banner Image</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-4">
                                <Button type="button" variant="outline" className="w-full">
                                  <Upload className="mr-2 h-4 w-4" />
                                  Upload Banner
                                </Button>
                                {field.value && <span className="text-sm text-muted-foreground">File uploaded</span>}
                              </div>
                            </FormControl>
                            <FormDescription>Recommended size 1600x900px</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="whitepaper"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Whitepaper</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Button type="button" variant="outline" className="w-full md:w-1/2">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Whitepaper
                              </Button>
                              {field.value && <span className="text-sm text-muted-foreground">File uploaded</span>}
                            </div>
                          </FormControl>
                          <FormDescription>PDF format, max 10MB</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setActiveTab("token")}>
                      Next: Tokenomics
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="token" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="tokenName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Token Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Ethereum" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tokenSymbol"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Token Symbol*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. ETH" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="tokenDecimals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Token Decimals*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 18" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tokenSupply"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Supply*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 1000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="tokenAllocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token Allocation*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe how tokens will be allocated (e.g. 40% public sale, 20% team, 15% marketing, etc.)"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("project")}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("sale")}>
                      Next: Sale Details
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="sale" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fundingGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Funding Goal (USD)*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 500000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="minContribution"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Min. Contribution*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="maxContribution"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max. Contribution*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 10000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date*</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date*</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="vestingSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vesting Schedule</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the vesting schedule for token distribution (e.g. 25% at TGE, 25% monthly for 3 months)"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("token")}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("team")}>
                      Next: Team & Roadmap
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-6 mt-6">
                  <FormField
                    control={form.control}
                    name="teamMembers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Members*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List key team members with their roles, experience, and LinkedIn profiles"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roadmap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Roadmap*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Outline your project roadmap with key milestones and timelines"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("sale")}>
                      Back
                    </Button>
                    <Button type="submit">Submit Project</Button>
                  </div>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm text-muted-foreground">
            By submitting this form, you agree to our{" "}
            <Link href="#" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
