"use client"

import { useState } from "react"
import { Save, Play, Code, FileCode, Download, Upload, Copy, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function KatScriptEditor() {
  const [scriptName, setScriptName] = useState("Welcome_Sequence")
  const [scriptContent, setScriptContent] = useState(
    `// ACE Kat Welcome Sequence
// Created: 2023-10-15
// Last Modified: 2023-10-20

function welcomeNewUser(userName) {
  // Set Kat's mood to excited
  setKatMood('excited');
  
  // Play welcome animation
  playAnimation('wave');
  
  // Speak welcome message
  speak("Welcome to ACE Exchange, " + userName + "! I'm ACE Kat, your personal assistant and guide. I'm so excited to help you explore our cosmic trading universe!");
  
  // Wait for animation to complete
  wait(3000);
  
  // Change mood to helpful
  setKatMood('helpful');
  
  // Offer assistance
  speak("Would you like me to show you around, or do you have any specific questions I can help with?");
  
  // Listen for user response
  const response = listenForResponse(15000);
  
  // Process response
  if (response.includes('show') || response.includes('tour') || response.includes('around')) {
    startTutorial('basic');
  } else if (response.includes('question') || response.includes('help')) {
    offerAssistance();
  } else {
    speak("No problem! I'll be here whenever you need me. Just click on me or say 'Hey Kat' to get my attention.");
  }
}

// Export the main function
export default welcomeNewUser;`,
  )

  return (
    <Card className="border-purple-500/20 bg-black/40 backdrop-blur-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">Kat Script Editor</CardTitle>
            <CardDescription className="text-gray-400">Create and edit ACE Kat behavior scripts</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              <Save className="mr-2 h-4 w-4" />
              Save Script
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <div className="flex-1">
            <Input
              value={scriptName}
              onChange={(e) => setScriptName(e.target.value)}
              className="border-gray-800 bg-black/30 text-white"
            />
          </div>
          <Select defaultValue="welcome">
            <SelectTrigger className="w-[180px] border-gray-800 bg-black/30 text-white">
              <SelectValue placeholder="Script Type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-gray-200">
              <SelectItem value="welcome">Welcome</SelectItem>
              <SelectItem value="tutorial">Tutorial</SelectItem>
              <SelectItem value="assistance">Assistance</SelectItem>
              <SelectItem value="notification">Notification</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50">
            <Play className="mr-2 h-4 w-4" />
            Test Run
          </Button>
        </div>

        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/30">
            <TabsTrigger
              value="code"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <Code className="mr-2 h-4 w-4" />
              Code Editor
            </TabsTrigger>
            <TabsTrigger
              value="visual"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <FileCode className="mr-2 h-4 w-4" />
              Visual Editor
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              <Play className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="mt-4">
            <div className="relative rounded-md border border-gray-800 bg-black/50 p-4">
              <div className="absolute right-2 top-2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:bg-black/30">
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:bg-black/30">
                  <Download className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400 hover:bg-black/30">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <textarea
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
                className="h-[400px] w-full resize-none bg-transparent font-mono text-sm text-green-400 outline-none"
              ></textarea>
            </div>
          </TabsContent>

          <TabsContent value="visual" className="mt-4">
            <div className="flex h-[400px] items-center justify-center rounded-md border border-gray-800 bg-black/50 p-4">
              <div className="text-center text-gray-400">
                <FileCode className="mx-auto mb-2 h-12 w-12 opacity-50" />
                <p>Visual Script Editor</p>
                <p className="mt-2 text-sm">Drag and drop components to build Kat's behavior visually</p>
                <Button
                  variant="outline"
                  className="mt-4 border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
                >
                  Open Visual Editor
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <div className="flex h-[400px] items-center justify-center rounded-md border border-gray-800 bg-black/50 p-4">
              <div className="text-center text-gray-400">
                <Play className="mx-auto mb-2 h-12 w-12 opacity-50" />
                <p>Script Preview</p>
                <p className="mt-2 text-sm">See how your script will behave when executed</p>
                <Button
                  variant="outline"
                  className="mt-4 border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
                >
                  Start Preview
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 rounded-md border border-gray-800 bg-black/30 p-3">
          <div className="text-sm font-medium text-gray-400">Console Output</div>
          <div className="mt-2 font-mono text-xs text-green-400">
            &gt; Loading script: Welcome_Sequence
            <br />
            &gt; Syntax check: OK
            <br />
            &gt; Dependencies: All resolved
            <br />
            &gt; Ready to execute
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
