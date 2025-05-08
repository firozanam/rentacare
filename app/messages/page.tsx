import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Send, Check } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Sample contacts with profile pictures for the messages page
const contacts = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    avatar: "/profile-pictures/profile-picture-2.jpg", 
    initials: "SJ", 
    lastMessage: "Is this property still available?", 
    time: "2h ago", 
    unread: 2,
    online: true
  },
  { 
    id: 2, 
    name: "Karim Ali", 
    avatar: "/profile-pictures/profile-picture-3.jpg", 
    initials: "KA", 
    lastMessage: "Thanks for your message!", 
    time: "3h ago", 
    unread: 0,
    online: true
  },
  { 
    id: 3, 
    name: "Nadia Islam", 
    avatar: "/profile-pictures/profile-picture-4.jpg", 
    initials: "NI", 
    lastMessage: "When can I schedule a viewing?", 
    time: "Yesterday", 
    unread: 0,
    online: false
  },
  { 
    id: 4, 
    name: "Rafiq Uddin", 
    avatar: "/profile-pictures/profile-picture-5.jpg", 
    initials: "RU", 
    lastMessage: "Thanks for sharing the location!", 
    time: "Yesterday", 
    unread: 0,
    online: true
  },
  { 
    id: 5, 
    name: "Farhan Ahmed", 
    avatar: "/profile-pictures/profile-picture-6.jpg", 
    initials: "FA", 
    lastMessage: "I'm interested in the apartment.", 
    time: "2 days ago", 
    unread: 0,
    online: false
  },
  { 
    id: 6, 
    name: "Tania Khanam", 
    avatar: "/profile-pictures/profile-picture-7.jpg", 
    initials: "TK", 
    lastMessage: "Can we discuss the rent?", 
    time: "3 days ago", 
    unread: 0,
    online: false
  },
  { 
    id: 7, 
    name: "Masud Khan", 
    avatar: "/profile-pictures/profile-picture-8.jpg", 
    initials: "MK", 
    lastMessage: "Is the property pet-friendly?", 
    time: "1 week ago", 
    unread: 0,
    online: false
  },
  { 
    id: 8, 
    name: "Zafar Iqbal", 
    avatar: "/profile-pictures/profile-picture-9.jpg", 
    initials: "ZI", 
    lastMessage: "Thank you for the information.", 
    time: "1 week ago", 
    unread: 0,
    online: false
  }
];

// Current user info
const currentUser = {
  name: "Ahmed Rahman",
  avatar: "/profile-pictures/profile-picture-1.jpg",
  initials: "AR",
  online: true
};

// Component for avatar with online status indicator
const StatusAvatar = ({ src, alt, initials, online, size = "default" }: { 
  src: string, 
  alt: string, 
  initials: string, 
  online: boolean,
  size?: "default" | "sm"
}) => {
  const sizeClasses = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const indicatorSize = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";
  const indicatorPosition = size === "sm" ? "-bottom-0.5 -right-0.5" : "-bottom-0.5 -right-0.5";
  
  return (
    <div className="relative">
      <Avatar className={sizeClasses}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <span className={cn(
        "absolute block rounded-full border-2 border-white", 
        indicatorSize,
        indicatorPosition,
        online ? "bg-green-500" : "bg-red-500"
      )}></span>
    </div>
  );
};

export default function MessagesPage() {
  // Active conversation is with the first contact in the list
  const activeContact = contacts[0];
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Communicate with landlords and tenants</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[500px]">
          {/* Contacts List */}
          <Card className="md:col-span-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              {contacts.map((contact, i) => (
                <div
                  key={contact.id}
                  className={`flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer ${i === 0 ? "bg-muted/50" : ""}`}
                >
                  <StatusAvatar 
                    src={contact.avatar} 
                    alt={contact.name} 
                    initials={contact.initials} 
                    online={contact.online}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium truncate">{contact.name}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{contact.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unread > 0 && (
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">{contact.unread}</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2 flex flex-col overflow-hidden">
            <div className="p-4 border-b flex items-center gap-3">
              <StatusAvatar 
                src={activeContact.avatar} 
                alt={activeContact.name} 
                initials={activeContact.initials} 
                online={activeContact.online}
              />
              <div>
                <h4 className="font-medium">{activeContact.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {activeContact.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 flex flex-col gap-4">
              {/* Property Card */}
              <div className="w-3/4 mx-auto">
                <Card className="overflow-hidden">
                  <div className="relative h-40">
                    <Image src="/images/property-image-1.jpg" alt="Property" fill className="object-cover" />
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-medium text-sm">Modern 2 Bedroom Apartment in Gulshan</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>Gulshan, Dhaka</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                    <AvatarFallback>{activeContact.initials}</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Hi, I'm interested in your apartment listing. Is it still available?</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground block">10:30 AM</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Yes, it's still available! Would you like to schedule a viewing?</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground block">10:32 AM</span>
                      <div className="flex">
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        <Check className="h-3.5 w-3.5 -ml-1.5 text-green-500" />
                      </div>
                    </div>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.initials}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                    <AvatarFallback>{activeContact.initials}</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">That would be great! Can you share the exact location?</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground block">10:35 AM</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Sure, here's the location:</p>
                    <div className="mt-2 aspect-video bg-muted rounded-md flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-muted-foreground" />
                      <span className="ml-2 text-sm text-muted-foreground">Map location</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground block">10:36 AM</span>
                      <div className="flex">
                        <Check className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.initials}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
