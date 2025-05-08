"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MapPin, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import MessageDialog from "@/components/message-dialog"

interface PropertyCardProps {
  layout?: "grid" | "list"
  compact?: boolean
  property?: any // We could define a proper PropertyType interface in a shared types file
}

export default function PropertyCard({ layout = "grid", compact = false, property }: PropertyCardProps) {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false)
  
  // Handle opening message dialog
  const handleMessageClick = () => {
    setMessageDialogOpen(true)
  }
  
  // If no property is provided, return empty card or null
  if (!property && !compact) {
    return null;
  }

  // For compact view in sidebar recommendations, etc.
  if (compact) {
    return (
      <Card className="overflow-hidden">
        <div className="flex">
          <div className="relative w-24 h-24">
            <Image src={property.image} alt={property.title} fill className="object-cover" />
          </div>
          <div className="flex-1 p-3">
            <h3 className="font-medium text-sm line-clamp-1">{property.title}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                {property.type}
              </Badge>
              <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                {typeof property.bedrooms === 'number' ? `${property.bedrooms} Bed` : property.bedrooms}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (layout === "list") {
    return (
      <>
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-48 h-48 md:h-auto">
              <Image src={property.image} alt={property.title} fill className="object-cover" />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-black h-8 w-8 rounded-full"
              >
                <Heart className={`h-4 w-4 ${property.likes > 20 ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
            <div className="flex-1 p-4">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-2">
                <h3 className="font-medium">{property.title}</h3>
                {property.featured && <Badge>Featured</Badge>}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{property.type}</Badge>
                <Badge variant="outline">
                  {typeof property.bedrooms === 'number' 
                    ? `${property.bedrooms} ${property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`
                    : property.bedrooms}
                </Badge>
                <Badge variant="outline">{property.bathrooms}</Badge>
                <Badge variant="outline">{property.area}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                This {property.type.toLowerCase()} features {typeof property.bedrooms === 'number' 
                  ? `${property.bedrooms} bedroom${property.bedrooms !== 1 ? 's' : ''}` 
                  : property.bedrooms.toLowerCase()} in the popular area of {property.location}.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={property.landlord.profilePicture} alt={property.landlord.name} />
                    <AvatarFallback>{property.landlord.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{property.landlord.name}</span>
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/listing/${property.id}`}>View Details</Link>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="gap-1"
                    onClick={handleMessageClick}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <MessageDialog
          open={messageDialogOpen}
          onOpenChange={setMessageDialogOpen}
          landlord={property.landlord}
          propertyTitle={property.title}
        />
      </>
    )
  }

  // Default grid view
  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative aspect-video">
          <Image src={property.image} alt={property.title} fill className="object-cover" />
          <div className="absolute top-2 left-2">
            {property.featured && <Badge>Featured</Badge>}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-black h-8 w-8 rounded-full"
          >
            <Heart className={`h-4 w-4 ${property.likes > 20 ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="text-white font-medium text-lg">{property.price}</div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span>{property.location}</span>
          </div>
          <h3 className="font-medium mb-2">{property.title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">{property.type}</Badge>
            <Badge variant="outline">
              {typeof property.bedrooms === 'number' 
                ? `${property.bedrooms} ${property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`
                : property.bedrooms}
            </Badge>
            <Badge variant="outline">{property.bathrooms}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={property.landlord.profilePicture} alt={property.landlord.name} />
              <AvatarFallback>{property.landlord.initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{property.landlord.name}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/listing/${property.id}`}>View Details</Link>
          </Button>
          <Button 
            className="flex-1 gap-1"
            onClick={handleMessageClick}
          >
            <MessageCircle className="h-4 w-4" />
            Contact
          </Button>
        </CardFooter>
      </Card>
      
      <MessageDialog
        open={messageDialogOpen}
        onOpenChange={setMessageDialogOpen}
        landlord={property.landlord}
        propertyTitle={property.title}
      />
    </>
  )
}
