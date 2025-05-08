"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface MessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  landlord: {
    name: string
    initials: string
    profilePicture: string
  }
  propertyTitle: string
}

export default function MessageDialog({ open, onOpenChange, landlord, propertyTitle }: MessageDialogProps) {
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSendMessage = () => {
    if (!message.trim()) return
    
    setIsSending(true)
    
    // Simulate API call to send message
    setTimeout(() => {
      setIsSending(false)
      setShowSuccess(true)
      
      // Reset after a delay
      setTimeout(() => {
        setShowSuccess(false)
        setMessage("")
        onOpenChange(false)
      }, 2000)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Message to Landlord</DialogTitle>
          <DialogDescription>
            Send a message to {landlord.name} about their property
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={landlord.profilePicture} alt={landlord.name} />
            <AvatarFallback>{landlord.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{landlord.name}</div>
            <div className="text-sm text-muted-foreground">Re: {propertyTitle}</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Input 
              placeholder="Subject (optional)"
              className="w-full"
            />
          </div>
          <div>
            <Textarea
              placeholder="Write your message here..."
              className="min-h-[120px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSendMessage}
            disabled={!message.trim() || isSending}
            className="gap-2"
          >
            {isSending ? (
              "Sending..."
            ) : showSuccess ? (
              <>
                Message Sent
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 