"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Lightbulb, ArrowRight, Check, Star, Rocket, Sparkles } from "lucide-react"

export default function AIWizard() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(20)
  const [experience, setExperience] = useState("beginner")
  const [interests, setInterests] = useState<string[]>([])
  const [goal, setGoal] = useState("")
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const handleInterestChange = (interest: string) => {
    setInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
      setProgress((step + 1) * 25)
    } else {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setLoading(false)
        setCompleted(true)
      }, 2000)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      setProgress(step * 25 - 25)
    }
  }

  return (
    <Card className="border-gray-800 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 rounded-full bg-amber-900/20 p-2">
              <Lightbulb className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <CardTitle className="text-xl text-white">AI Onboarding Wizard</CardTitle>
              <CardDescription className="text-gray-400">
                Let our AI guide you through setting up your ACE Exchange experience
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="border-amber-500 text-amber-400">
            Beta
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {!completed ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Step {step} of 4</span>
                <span className="text-amber-400">{progress}% Complete</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-700" indicatorClassName="bg-amber-500" />
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Welcome to ACE Exchange!</h3>
                <p className="text-gray-300">
                  Let's get to know you better so we can personalize your experience. What's your experience level with
                  cryptocurrency?
                </p>

                <RadioGroup value={experience} onValueChange={setExperience} className="space-y-3">
                  <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <RadioGroupItem value="beginner" id="experience-beginner" className="border-amber-600" />
                    <Label htmlFor="experience-beginner" className="flex-1 cursor-pointer">
                      <div className="font-medium text-white">Beginner</div>
                      <div className="text-xs text-gray-400">I'm new to crypto and still learning the basics</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <RadioGroupItem value="intermediate" id="experience-intermediate" className="border-amber-600" />
                    <Label htmlFor="experience-intermediate" className="flex-1 cursor-pointer">
                      <div className="font-medium text-white">Intermediate</div>
                      <div className="text-xs text-gray-400">
                        I understand the basics and have some trading experience
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <RadioGroupItem value="advanced" id="experience-advanced" className="border-amber-600" />
                    <Label htmlFor="experience-advanced" className="flex-1 cursor-pointer">
                      <div className="font-medium text-white">Advanced</div>
                      <div className="text-xs text-gray-400">
                        I'm experienced with various crypto assets, trading strategies, and DeFi
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">What are you interested in?</h3>
                <p className="text-gray-300">
                  Select the areas that interest you the most so we can customize your dashboard and recommendations.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <Checkbox
                      id="interest-trading"
                      checked={interests.includes("trading")}
                      onCheckedChange={() => handleInterestChange("trading")}
                      className="border-amber-600 data-[state=checked]:bg-amber-600 data-[state=checked]:text-black"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="interest-trading"
                        className="flex cursor-pointer items-center font-medium text-white"
                      >
                        Trading
                      </Label>
                      <p className="text-xs text-gray-400">
                        Buying and selling cryptocurrencies on spot and futures markets
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <Checkbox
                      id="interest-investing"
                      checked={interests.includes("investing")}
                      onCheckedChange={() => handleInterestChange("investing")}
                      className="border-amber-600 data-[state=checked]:bg-amber-600 data-[state=checked]:text-black"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="interest-investing"
                        className="flex cursor-pointer items-center font-medium text-white"
                      >
                        Long-term Investing
                      </Label>
                      <p className="text-xs text-gray-400">Building a diversified portfolio for long-term growth</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <Checkbox
                      id="interest-earn"
                      checked={interests.includes("earn")}
                      onCheckedChange={() => handleInterestChange("earn")}
                      className="border-amber-600 data-[state=checked]:bg-amber-600 data-[state=checked]:text-black"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="interest-earn"
                        className="flex cursor-pointer items-center font-medium text-white"
                      >
                        Earn & Staking
                      </Label>
                      <p className="text-xs text-gray-400">
                        Generating passive income through staking, lending, and yield farming
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <Checkbox
                      id="interest-nft"
                      checked={interests.includes("nft")}
                      onCheckedChange={() => handleInterestChange("nft")}
                      className="border-amber-600 data-[state=checked]:bg-amber-600 data-[state=checked]:text-black"
                    />
                    <div className="flex-1">
                      <Label htmlFor="interest-nft" className="flex cursor-pointer items-center font-medium text-white">
                        NFTs & Digital Collectibles
                      </Label>
                      <p className="text-xs text-gray-400">Exploring, creating, and trading non-fungible tokens</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <Checkbox
                      id="interest-learn"
                      checked={interests.includes("learn")}
                      onCheckedChange={() => handleInterestChange("learn")}
                      className="border-amber-600 data-[state=checked]:bg-amber-600 data-[state=checked]:text-black"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="interest-learn"
                        className="flex cursor-pointer items-center font-medium text-white"
                      >
                        Learning & Education
                      </Label>
                      <p className="text-xs text-gray-400">
                        Expanding knowledge about blockchain, crypto, and trading strategies
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">What's your primary goal?</h3>
                <p className="text-gray-300">
                  Understanding your main objective helps us tailor our recommendations and features to your needs.
                </p>

                <RadioGroup value={goal} onValueChange={setGoal} className="space-y-3">
                  <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <RadioGroupItem value="growth" id="goal-growth" className="border-amber-600" />
                    <Label htmlFor="goal-growth" className="flex-1 cursor-pointer">
                      <div className="font-medium text-white">Portfolio Growth</div>
                      <div className="text-xs text-gray-400">
                        I want to increase the value of my crypto holdings over time
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <RadioGroupItem value="income" id="goal-income" className="border-amber-600" />
                    <Label htmlFor="goal-income" className="flex-1 cursor-pointer">
                      <div className="font-medium text-white">Passive Income</div>
                      <div className="text-xs text-gray-400">
                        I want to generate regular income from my crypto assets
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <RadioGroupItem value="trading" id="goal-trading" className="border-amber-600" />
                    <Label htmlFor="goal-trading" className="flex-1 cursor-pointer">
                      <div className="font-medium text-white">Active Trading</div>
                      <div className="text-xs text-gray-400">I want to profit from short-term price movements</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <RadioGroupItem value="learn" id="goal-learn" className="border-amber-600" />
                    <Label htmlFor="goal-learn" className="flex-1 cursor-pointer">
                      <div className="font-medium text-white">Learning & Exploration</div>
                      <div className="text-xs text-gray-400">
                        I want to learn more about crypto and blockchain technology
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Almost there!</h3>
                <p className="text-gray-300">
                  Based on your preferences, we'll customize your ACE Exchange experience. Here's a summary of your
                  profile:
                </p>

                <div className="space-y-3">
                  <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Experience Level:</span>
                      <span className="font-medium text-white capitalize">{experience}</span>
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <div className="flex flex-col">
                      <span className="mb-2 text-sm text-gray-400">Interests:</span>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => (
                          <Badge key={interest} className="bg-amber-900/50 text-amber-400 capitalize">
                            {interest}
                          </Badge>
                        ))}
                        {interests.length === 0 && <span className="text-sm text-gray-500">No interests selected</span>}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-700 bg-gray-800/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Primary Goal:</span>
                      <span className="font-medium text-white capitalize">{goal || "Not specified"}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300">
                  Click "Complete Setup" to finalize your profile and get personalized recommendations.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="mb-4 rounded-full bg-green-900/20 p-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-medium text-white">Setup Complete!</h3>
              <p className="mt-2 text-center text-gray-300">
                Your personalized ACE Exchange experience is ready. We've customized your dashboard based on your
                preferences.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-white">Recommended Next Steps:</h4>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-gray-700 bg-gray-800/50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 rounded-full bg-amber-900/20 p-2">
                      <Rocket className="h-5 w-5 text-amber-500" />
                    </div>
                    <h5 className="font-medium text-white">Complete Your Profile</h5>
                  </div>
                  <p className="text-sm text-gray-400">
                    Add your profile picture, connect your social accounts, and set up your security preferences.
                  </p>
                  <Button className="mt-3 w-full bg-amber-600 text-black hover:bg-amber-500">Go to Profile</Button>
                </div>

                <div className="rounded-md border border-gray-700 bg-gray-800/50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 rounded-full bg-amber-900/20 p-2">
                      <Star className="h-5 w-5 text-amber-500" />
                    </div>
                    <h5 className="font-medium text-white">Explore ACE Learn</h5>
                  </div>
                  <p className="text-sm text-gray-400">
                    Discover educational content tailored to your experience level and interests.
                  </p>
                  <Button className="mt-3 w-full bg-amber-600 text-black hover:bg-amber-500">Start Learning</Button>
                </div>

                <div className="rounded-md border border-gray-700 bg-gray-800/50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 rounded-full bg-amber-900/20 p-2">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                    </div>
                    <h5 className="font-medium text-white">Connect Your Wallet</h5>
                  </div>
                  <p className="text-sm text-gray-400">
                    Link your crypto wallet to start trading, staking, and exploring the ACE ecosystem.
                  </p>
                  <Button className="mt-3 w-full bg-amber-600 text-black hover:bg-amber-500">Connect Wallet</Button>
                </div>

                <div className="rounded-md border border-gray-700 bg-gray-800/50 p-4">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 rounded-full bg-amber-900/20 p-2">
                      <Lightbulb className="h-5 w-5 text-amber-500" />
                    </div>
                    <h5 className="font-medium text-white">Get AI Recommendations</h5>
                  </div>
                  <p className="text-sm text-gray-400">
                    Use our Smart Advisor to get personalized investment recommendations based on your profile.
                  </p>
                  <Button className="mt-3 w-full bg-amber-600 text-black hover:bg-amber-500">
                    View Recommendations
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {!completed && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={step === 1 || loading}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Back
          </Button>
          <Button
            onClick={handleNextStep}
            disabled={loading || (step === 2 && interests.length === 0) || (step === 3 && !goal)}
            className="bg-amber-600 text-black hover:bg-amber-500"
          >
            {loading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></span>
                Processing...
              </>
            ) : step === 4 ? (
              "Complete Setup"
            ) : (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
