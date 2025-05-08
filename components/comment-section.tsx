"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Reply, ThumbsUp } from "lucide-react"

export default function CommentSection() {
  const [comment, setComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  // Mock comments data
  const comments = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Is this apartment pet-friendly? I have a small dog.",
      time: "2 days ago",
      likes: 3,
      replies: [
        {
          id: 11,
          user: "Ahmed Rahman",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "Yes, small pets are allowed. There's a small pet deposit required.",
          time: "1 day ago",
          likes: 1,
        },
      ],
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "What's the parking situation like? Is there dedicated parking for tenants?",
      time: "3 days ago",
      likes: 2,
      replies: [],
    },
    {
      id: 3,
      user: "Fatima Ali",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Is the rent negotiable? And are utilities included in the rent?",
      time: "4 days ago",
      likes: 0,
      replies: [
        {
          id: 31,
          user: "Ahmed Rahman",
          avatar: "/placeholder.svg?height=40&width=40",
          content:
            "The rent is slightly negotiable for long-term leases. Water is included, but electricity and gas are separate.",
          time: "4 days ago",
          likes: 2,
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none"
          />
          <div className="flex justify-end mt-2">
            <Button size="sm" disabled={!comment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-medium">{comment.user}</span>
                    <span className="text-xs text-muted-foreground ml-2">{comment.time}</span>
                  </div>
                </div>
                <p className="mt-1 text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {comment.likes > 0 && <span>{comment.likes}</span>}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>

                {replyingTo === comment.id && (
                  <div className="flex gap-3 mt-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="You" />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder={`Reply to ${comment.user}...`}
                        className="resize-none text-sm min-h-[60px]"
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                          Cancel
                        </Button>
                        <Button size="sm">Reply</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="ml-11 flex flex-col gap-4 border-l-2 pl-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.user} />
                      <AvatarFallback>{reply.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div>
                        <span className="font-medium">{reply.user}</span>
                        <span className="text-xs text-muted-foreground ml-2">{reply.time}</span>
                      </div>
                      <p className="mt-1 text-sm">{reply.content}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-muted-foreground hover:text-foreground mt-1"
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {reply.likes > 0 && <span>{reply.likes}</span>}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
