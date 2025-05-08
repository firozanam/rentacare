"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building, Calendar, Heart, MapPin, MessageCircle, Phone, Share2, ThumbsUp, ArrowLeft } from "lucide-react"
import Image from "next/image"
import CommentSection from "@/components/comment-section"
import PropertyCard from "@/components/property-card"
import { useParams, useRouter } from "next/navigation"
import { properties } from "@/app/listings/page"
import MessageDialog from "@/components/message-dialog"
import Link from "next/link"

// Define types for stronger type checking
interface PropertyType {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms: number | string;
  bathrooms: number | string;
  area: string;
  features: string[];
  available: string;
  featured: boolean;
  landlord: {
    name: string;
    initials: string;
    profilePicture: string;
  };
  likes: number;
  comments: number;
  postedDate: string;
  image: string;
}

export default function ListingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const propertyId = parseInt(params.id as string)
  
  // Find the current property based on the ID
  const property = properties.find((p: PropertyType) => p.id === propertyId) || properties[0]
  
  // Get 3 similar properties (different from current one)
  const similarProperties = properties
    .filter((p: PropertyType) => p.id !== propertyId && p.type === property.type)
    .slice(0, 3)
    
  // State for message dialog
  const [messageDialogOpen, setMessageDialogOpen] = useState(false)
  
  // Handle opening message dialog
  const handleMessageClick = () => {
    setMessageDialogOpen(true)
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header for Mobile */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b md:hidden">
        <div className="container flex items-center gap-4 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold truncate">{property.title}</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Heart className={`h-4 w-4 ${property.likes > 20 ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="container px-0 md:px-6 py-0 md:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Desktop Header - Hidden on Mobile */}
              <div className="hidden md:flex flex-col md:flex-row justify-between mb-6 gap-4 px-4 md:px-0">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full border"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full border"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button className="gap-1" onClick={handleMessageClick}>
                    <MessageCircle className="h-4 w-4" />
                    Contact Landlord
                  </Button>
                </div>
              </div>

              {/* Listing Images */}
              <div className="relative aspect-[4/3] md:aspect-video w-full overflow-hidden md:rounded-lg md:mb-6">
                <Image src={property.image} alt={property.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.featured && <Badge className="bg-teal-500 hover:bg-teal-600">Featured</Badge>}
                  <Badge variant="outline" className="bg-white/80 text-black">
                    {property.type}
                  </Badge>
                </div>
              </div>

              {/* Mobile Price and Quick Actions */}
              <div className="sticky top-[73px] z-40 bg-background/80 backdrop-blur-sm border-b md:hidden">
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">
                      {property.price}<span className="text-sm text-muted-foreground">/month</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {typeof property.bedrooms === 'number' 
                        ? `${property.bedrooms} ${property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}` 
                        : property.bedrooms} • {property.bathrooms} • {property.area}
                    </div>
                  </div>
                  <Button className="gap-1" onClick={handleMessageClick}>
                    <MessageCircle className="h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>

              {/* Desktop Property Info - Hidden on Mobile */}
              <div className="hidden md:block mb-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline" className="py-1 px-2 text-base h-auto">
                    {property.price}<span className="text-xs text-muted-foreground ml-1">/month</span>
                  </Badge>
                  <Badge variant="outline" className="py-1 px-2 text-base h-auto">
                    {typeof property.bedrooms === 'number' 
                      ? `${property.bedrooms} ${property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}` 
                      : property.bedrooms}
                  </Badge>
                  <Badge variant="outline" className="py-1 px-2 text-base h-auto">
                    {property.bathrooms}
                  </Badge>
                  <Badge variant="outline" className="py-1 px-2 text-base h-auto">
                    {property.area}
                  </Badge>
                  <Badge variant="outline" className="py-1 px-2 text-base h-auto bg-teal-50">
                    {property.available}
                  </Badge>
                </div>
              </div>

              {/* Tabs for Details */}
              <div className="px-4 md:px-0">
                <Tabs defaultValue="details" className="mb-6">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-muted-foreground">
                        This {property.type.toLowerCase()} features {typeof property.bedrooms === 'number' 
                          ? `${property.bedrooms} bedroom${property.bedrooms !== 1 ? 's' : ''}` 
                          : property.bedrooms.toLowerCase()} and {property.bathrooms} 
                        in the popular area of {property.location}. It offers {property.area} of living space with 
                        modern amenities and convenient access to local facilities.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Property Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type</span>
                            <span>{property.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bedrooms</span>
                            <span>{property.bedrooms}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bathrooms</span>
                            <span>{property.bathrooms}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Area</span>
                            <span>{property.area}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Availability</span>
                            <span>{property.available}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Posted</span>
                            <span>{property.postedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="features" className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Features and Amenities</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {property.features.map((feature: string, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="location" className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Location</h3>
                      <div className="aspect-video relative rounded-md overflow-hidden bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-muted-foreground">Map view of {property.location}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Nearby</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Schools</span>
                            <span>3 within 1 km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Restaurants</span>
                            <span>12 within 500m</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Parks</span>
                            <span>1 within 800m</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Transport</span>
                            <span>Bus stops nearby</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Landlord Information */}
                <div className="mb-6">
                  <h3 className="font-medium mb-4">Landlord</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4 flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={property.landlord.profilePicture} alt={property.landlord.name} />
                            <AvatarFallback>{property.landlord.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{property.landlord.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <ThumbsUp
                                    key={i}
                                    className={`h-3 w-3 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                                  />
                                ))}
                              </div>
                              <span>Trusted Landlord</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button variant="outline" className="flex-1 sm:flex-auto gap-1" asChild>
                            <a href="tel:+8801712345678">
                              <Phone className="h-4 w-4" />
                              Call
                            </a>
                          </Button>
                          <Button 
                            className="flex-1 sm:flex-auto gap-1"
                            onClick={handleMessageClick}
                          >
                            <MessageCircle className="h-4 w-4" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Comments */}
                <div className="mb-6">
                  <h3 className="font-medium mb-4">Comments ({property.comments})</h3>
                  <CommentSection />
                </div>
              </div>
            </div>

            {/* Sidebar - Hidden on Mobile */}
            <div className="hidden lg:block">
              {/* Landlord Contact Info */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="h-16 w-16 mb-2">
                      <AvatarImage src={property.landlord.profilePicture} alt={property.landlord.name} />
                      <AvatarFallback>{property.landlord.initials}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium">{property.landlord.name}</h3>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <ThumbsUp
                          key={i}
                          className={`h-3 w-3 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Trusted Landlord</p>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-center mb-4">
                    <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>+880 1712 345678</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-1" asChild>
                      <a href="tel:+8801712345678">
                        <Phone className="h-4 w-4" />
                        Call
                      </a>
                    </Button>
                    <Button 
                      className="flex-1 gap-1 bg-teal-500 hover:bg-teal-600"
                      onClick={handleMessageClick}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Request a Viewing</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Today, 3:00 PM</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Tomorrow, 2:00 PM</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Thu, 4:30 PM</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Schedule for later</span>
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex">
                  <Button className="w-full gap-1">
                    <MessageCircle className="h-4 w-4" />
                    Request Viewing
                  </Button>
                </CardFooter>
              </Card>

              <div className="mb-6">
                <h3 className="font-medium mb-4">Similar Listings</h3>
                <div className="flex flex-col gap-4">
                  {similarProperties.map((prop: PropertyType) => (
                    <PropertyCard key={prop.id} property={prop} compact />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Similar Listings */}
          <div className="lg:hidden px-4 py-6">
            <h3 className="font-medium mb-4">Similar Listings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {similarProperties.map((prop: PropertyType) => (
                <PropertyCard key={prop.id} property={prop} compact />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Action Bar */}
      <div className="sticky bottom-0 border-t bg-background p-4 lg:hidden">
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-1" asChild>
            <a href="tel:+8801712345678">
              <Phone className="h-4 w-4" />
              Call Landlord
            </a>
          </Button>
          <Button 
            className="flex-1 gap-1"
            onClick={handleMessageClick}
          >
            <MessageCircle className="h-4 w-4" />
            Message
          </Button>
        </div>
      </div>
      
      {/* Message Dialog */}
      <MessageDialog
        open={messageDialogOpen}
        onOpenChange={setMessageDialogOpen}
        landlord={property.landlord}
        propertyTitle={property.title}
      />
    </div>
  )
}
