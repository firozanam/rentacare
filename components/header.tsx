"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Building, ChevronDown, Home, LogOut, Menu, MessageCircle, Search, Settings, User } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, FormEvent } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from "next/navigation"

// Current user information
const currentUser = {
  name: "Ahmed Rahman",
  initials: "AR",
  profilePicture: "/profile-pictures/profile-picture-2.jpg"
}

// Dummy notifications
const notifications = [
  {
    id: 1,
    type: "comment",
    content: "Sarah Johnson commented on your listing: 'Modern 2 Bedroom Apartment in Gulshan'",
    time: "10 minutes ago",
    read: false,
    image: "/profile-pictures/profile-picture-2.jpg",
    link: "/listing/1"
  },
  {
    id: 2,
    type: "message",
    content: "New message from Karim Ali: 'Is the apartment still available?'",
    time: "30 minutes ago",
    read: false,
    image: "/profile-pictures/profile-picture-3.jpg",
    link: "/messages/3"
  },
  {
    id: 3,
    type: "reply",
    content: "Rafiq Uddin replied to your comment on 'Shared Mess Seat for Male Students'",
    time: "2 hours ago",
    read: true,
    image: "/profile-pictures/profile-picture-5.jpg",
    link: "/listing/8"
  },
  {
    id: 4,
    type: "comment",
    content: "New comment from Michael Chen on your listing: 'What's the parking situation like?'",
    time: "Yesterday",
    read: true,
    image: "/profile-pictures/profile-picture-6.jpg",
    link: "/listing/1"
  },
  {
    id: 5,
    type: "system",
    content: "Your listing 'Luxury 4 Bedroom Villa in Baridhara' has been marked as featured!",
    time: "2 days ago",
    read: true,
    image: "",
    link: "/listing/4"
  }
];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const unreadCount = notifications.filter(n => !n.read).length;
  const router = useRouter()
  
  // Handle search form submission
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/listings?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
  
  // Handle "Enter" key press on search input
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        router.push(`/listings?search=${encodeURIComponent(searchQuery.trim())}`)
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 py-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                  <Building className="h-5 w-5" />
                  RentaCare
                </Link>
                <Link href="/" className="text-sm font-medium">
                  Home
                </Link>
                <Link href="/listings" className="text-sm font-medium">
                  Listings
                </Link>
                <Link href="/post-listing" className="text-sm font-medium">
                  Post a Listing
                </Link>
                <Link href="/pricing" className="text-sm font-medium">
                  Pricing
                </Link>
                <Link href="/dashboard" className="text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/messages" className="text-sm font-medium">
                  Messages
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Building className="h-5 w-5 text-teal-600" />
            RentaCare
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Listings</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {[
                      {
                        title: "All Listings",
                        href: "/listings",
                        description: "Browse all available rental properties",
                      },
                      {
                        title: "Apartments",
                        href: "/listings?type=apartment",
                        description: "Find apartments for rent",
                      },
                      { title: "Houses", href: "/listings?type=house", description: "Discover houses for rent" },
                      {
                        title: "Mess Accommodations",
                        href: "/listings?type=mess",
                        description: "Explore mess accommodations",
                      },
                      { title: "Mess Seats", href: "/listings?type=seat", description: "Find available mess seats" },
                    ].map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/post-listing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Post a Listing</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <form 
            className="hidden md:flex relative w-full max-w-sm items-center"
            onSubmit={handleSearch}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search listings..." 
              className="pl-9 w-[200px] lg:w-[300px]" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyPress}
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
              disabled={!searchQuery.trim()}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                    )}
                    <span className="sr-only">Notifications</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0">
                  <div className="p-4 border-b">
                    <div className="font-medium">Notifications</div>
                    <div className="text-xs text-muted-foreground">You have {unreadCount} unread messages</div>
                  </div>
                  <div className="max-h-[300px] overflow-auto">
                    {notifications.map(notification => (
                      <Link key={notification.id} href={notification.link}>
                        <div className={`flex items-start gap-3 p-4 hover:bg-muted cursor-pointer ${!notification.read ? 'bg-muted/50' : ''}`}>
                          {notification.type !== 'system' ? (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={notification.image} alt="" />
                              <AvatarFallback>
                                {notification.type === 'message' ? <MessageCircle className="h-4 w-4" /> : 
                                notification.type === 'comment' ? <Home className="h-4 w-4" /> : <User className="h-4 w-4" />}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-teal-100">
                              <Building className="h-4 w-4 text-teal-600" />
                            </div>
                          )}
                          <div className="space-y-1">
                            <p className="text-sm">{notification.content}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="ml-auto h-2 w-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      Mark all as read
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Button asChild variant="ghost" size="icon">
                <Link href="/messages">
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">Messages</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.profilePicture} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-flex">My Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/messages" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Messages
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
