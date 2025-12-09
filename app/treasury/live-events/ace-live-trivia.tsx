"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

interface TriviaQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  points: number
  timeLimit: number
}

const sampleQuestions: TriviaQuestion[] = [
  {
    id: "q1",
    question: "What is the primary purpose of a blockchain?",
    options: [
      "To store large amounts of data",
      "To create a decentralized, immutable ledger",
      "To speed up internet connections",
      "To mine cryptocurrencies",
    ],
    correctAnswer: 1,
    points: 100,
    timeLimit: 20,
  },
  {
    id: "q2",
    question: "Which consensus mechanism does Bitcoin use?",
    options: ["Proof of Stake", "Proof of Work", "Proof of Authority", "Delegated Proof of Stake"],
    correctAnswer: 1,
    points: 150,
    timeLimit: 15,
  },
  {
    id: "q3",
    question: "What is a smart contract?",
    options: [
      "A legal document for cryptocurrency purchases",
      "Self-executing code that runs on a blockchain",
      "A hardware wallet for secure storage",
      "An agreement between miners",
    ],
    correctAnswer: 1,
    points: 200,
    timeLimit: 25,
  },
]

export function AceLiveTrivia() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [participants, setParticipants] = useState<number>(0)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate random number of participants joining
    const interval = setInterval(() => {
      if (isActive) {
        setParticipants((prev) => Math.min(prev + Math.floor(Math.random() * 5), 1250))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isActive])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && isActive && !isAnswered) {
      handleTimeout()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [timeLeft, isActive, isAnswered])

  const startTrivia = () => {
    setIsActive(true)
    setCurrentQuestion(0)
    setScore(0)
    setTimeLeft(sampleQuestions[0].timeLimit)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setParticipants(125) // Start with some participants
    toast({
      title: "Trivia Started!",
      description: "The live trivia event has begun. Good luck!",
    })
  }

  const handleAnswer = (index: number) => {
    if (isAnswered) return

    setSelectedAnswer(index)
    setIsAnswered(true)

    const question = sampleQuestions[currentQuestion]
    if (index === question.correctAnswer) {
      setScore((prev) => prev + question.points)
      toast({
        title: "Correct!",
        description: `You earned ${question.points} points.`,
        variant: "default",
      })
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${question.options[question.correctAnswer]}`,
        variant: "destructive",
      })
    }

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setTimeLeft(sampleQuestions[currentQuestion + 1].timeLimit)
        setSelectedAnswer(null)
        setIsAnswered(false)
      } else {
        endTrivia()
      }
    }, 2000)
  }

  const handleTimeout = () => {
    setIsAnswered(true)
    toast({
      title: "Time's up!",
      description: `The correct answer was: ${
        sampleQuestions[currentQuestion].options[sampleQuestions[currentQuestion].correctAnswer]
      }`,
      variant: "destructive",
    })

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setTimeLeft(sampleQuestions[currentQuestion + 1].timeLimit)
        setSelectedAnswer(null)
        setIsAnswered(false)
      } else {
        endTrivia()
      }
    }, 2000)
  }

  const endTrivia = () => {
    setIsActive(false)
    toast({
      title: "Trivia Completed!",
      description: `You scored ${score} points. Great job!`,
    })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-black/80 border border-purple-500/50 text-white shadow-lg shadow-purple-500/20">
      <CardHeader className="border-b border-purple-500/30">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-purple-300">ACE Live Trivia</CardTitle>
          <Badge variant="outline" className="bg-purple-900/50 text-purple-200">
            {isActive ? "LIVE" : "OFFLINE"}
          </Badge>
        </div>
        <CardDescription className="text-purple-200/70">
          {isActive
            ? `Question ${currentQuestion + 1} of ${sampleQuestions.length}`
            : "Test your crypto knowledge and earn rewards"}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 pb-2">
        {isActive ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-purple-300">Time Remaining: {timeLeft}s</div>
              <div className="text-sm text-purple-300">Score: {score}</div>
            </div>
            <Progress value={(timeLeft / sampleQuestions[currentQuestion].timeLimit) * 100} className="mb-4 h-2" />

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4">{sampleQuestions[currentQuestion].question}</h3>
              <div className="grid gap-3">
                {sampleQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      isAnswered
                        ? index === sampleQuestions[currentQuestion].correctAnswer
                          ? "default"
                          : index === selectedAnswer
                            ? "destructive"
                            : "outline"
                        : "outline"
                    }
                    className={`justify-start text-left h-auto py-3 ${
                      isAnswered && index === sampleQuestions[currentQuestion].correctAnswer
                        ? "bg-green-600 hover:bg-green-700"
                        : ""
                    }`}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-xs text-purple-300/70">
              <span>Points: {sampleQuestions[currentQuestion].points}</span>
              <span>Participants: {participants.toLocaleString()}</span>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium mb-4">Ready to test your knowledge?</h3>
            <p className="text-purple-300/70 mb-6">
              Join our live trivia event to compete with other users and earn XP rewards!
            </p>
            <Button onClick={startTrivia} className="bg-purple-600 hover:bg-purple-700">
              Start Trivia
            </Button>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t border-purple-500/30 flex justify-between">
        <div className="text-xs text-purple-300/70">Next event: Daily at 8PM UTC</div>
        {isActive && (
          <Button variant="outline" size="sm" onClick={endTrivia} className="text-purple-300 border-purple-500/50">
            Exit
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
