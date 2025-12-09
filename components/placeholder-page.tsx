import Link from "next/link"
import { ArrowLeft, Rocket, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PlaceholderPageProps {
  title: string
  description: string
  category: string
  comingSoon?: boolean
}

export function PlaceholderPage({ title, description, category, comingSoon = true }: PlaceholderPageProps) {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <Card className="border border-purple-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-900/30 text-purple-300 mr-2">
              {category}
            </span>
            {comingSoon && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-900/30 text-blue-300 flex items-center">
                <Construction className="mr-1 h-3 w-3" />
                Coming Soon
              </span>
            )}
          </div>
          <CardTitle className="text-3xl md:text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-400 text-lg">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-purple-500/20 rounded-lg bg-black/20">
            <Rocket className="h-16 w-16 text-purple-500/50 mb-4 animate-pulse" />
            <p className="text-gray-400 max-w-md">
              {comingSoon
                ? "This cosmic sector is currently under construction. Our engineers are working diligently to bring this feature to life."
                : "Welcome to this cosmic sector. Explore the features and capabilities available to you."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
          >
            <Link href="/dreamstate">Explore Dreamstate Instead</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
