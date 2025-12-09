"use client"

import type React from "react"

import { useState } from "react"
import { useKatVerse } from "@/contexts/katverse-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

interface KatVerseCreateRoomProps {
  isOpen: boolean
  onClose: () => void
}

export function KatVerseCreateRoom({ isOpen, onClose }: KatVerseCreateRoomProps) {
  const { createRoom, isLoading } = useKatVerse()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [capacity, setCapacity] = useState(10)
  const [requiresPass, setRequiresPass] = useState(false)
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) return

    const success = await createRoom({
      name,
      description,
      capacity,
      requiresPass,
      isLocked: requiresPass,
    })

    if (success) {
      resetForm()
      onClose()
    }
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setCapacity(10)
    setRequiresPass(false)
    setPassword("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border-gray-800 bg-gray-900 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
          <DialogDescription className="text-gray-400">Create your own space in the KatVerse</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Room Name</Label>
            <Input
              id="name"
              placeholder="Enter room name"
              className="border-gray-700 bg-gray-800 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What's this room about?"
              className="border-gray-700 bg-gray-800 text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="capacity">Capacity: {capacity} users</Label>
            </div>
            <Slider
              id="capacity"
              min={2}
              max={30}
              step={1}
              value={[capacity]}
              onValueChange={(value) => setCapacity(value[0])}
              className="py-4"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="requires-pass"
              checked={requiresPass}
              onCheckedChange={setRequiresPass}
              className="data-[state=checked]:bg-teal-500"
            />
            <Label htmlFor="requires-pass">Password Protected</Label>
          </div>

          {requiresPass && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter room password"
                className="border-gray-700 bg-gray-800 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={requiresPass}
              />
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm()
                onClose()
              }}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700"
              disabled={isLoading || !name.trim() || (requiresPass && !password.trim())}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Room
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
