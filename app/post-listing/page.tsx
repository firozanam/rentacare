"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Building, CreditCard, ImagePlus, Upload, Check, Search } from "lucide-react"
import LocationFilter from "@/components/location-filter"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PostListingPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const router = useRouter()
  
  const handleSearchListings = () => {
    if (selectedLocation) {
      // Navigate to listings page with location query param
      router.push(`/listings?location=${encodeURIComponent(selectedLocation)}`)
    } else {
      router.push('/listings')
    }
  }
  
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
  }
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Post a New Listing</h1>
            <p className="text-muted-foreground">Fill out the form below to create your rental listing</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Listing Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="title">Listing Title</Label>
                  <Input id="title" placeholder="e.g., Modern 2 Bedroom Apartment in Gulshan" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property in detail..."
                    className="min-h-[150px]"
                  />
                </div>

                <div className="grid gap-3">
                  <Label>Property Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="mess">Mess Accommodation</SelectItem>
                      <SelectItem value="seat">Mess Seat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <Label>Location</Label>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <LocationFilter onLocationSelect={handleLocationSelect} />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="md:self-end gap-2"
                      onClick={handleSearchListings}
                    >
                      <Search className="h-4 w-4" />
                      Search Listings
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input id="phone" placeholder="e.g., +880 1712 345678" />
                </div>

                <Separator />

                <div className="grid gap-4">
                  <Label className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Features and Amenities
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Select the features and amenities your property offers
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Interior</h4>
                      <div className="space-y-2">
                        {[
                          {id: "furnished", label: "Fully Furnished"},
                          {id: "semi-furnished", label: "Semi Furnished"},
                          {id: "ac", label: "Air Conditioning"},
                          {id: "hot-water", label: "Hot Water Supply"},
                          {id: "kitchen", label: "Attached Kitchen"},
                          {id: "wifi", label: "WiFi Available"},
                          {id: "generator", label: "Generator Backup"},
                          {id: "balcony", label: "Balcony"},
                        ].map(({id, label}) => (
                          <div key={id} className="flex items-center space-x-2">
                            <Checkbox id={id} />
                            <label
                              htmlFor={id}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Building Facilities</h4>
                      <div className="space-y-2">
                        {[
                          {id: "lift", label: "Elevator/Lift"},
                          {id: "parking", label: "Parking Space"},
                          {id: "security", label: "Security Guard"},
                          {id: "cctv", label: "CCTV Surveillance"},
                          {id: "rooftop", label: "Rooftop Access"},
                          {id: "gym", label: "Gym Facility"},
                          {id: "community", label: "Community Space"},
                          {id: "playground", label: "Children's Playground"},
                        ].map(({id, label}) => (
                          <div key={id} className="flex items-center space-x-2">
                            <Checkbox id={id} />
                            <label
                              htmlFor={id}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-3">
                  <Label>Upload Images</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-md border-2 border-dashed flex flex-col items-center justify-center p-4 ${
                          i === 0 ? "bg-muted/50 border-muted-foreground/20" : "border-muted-foreground/10"
                        }`}
                      >
                        <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
                        <span className="text-xs text-center text-muted-foreground">
                          {i === 0 ? "Upload main image" : "Upload image"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You can upload up to 6 images. First image will be the main image.
                  </p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t p-6">
              <div className="bg-muted/50 p-4 rounded-lg w-full">
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Listing Fee: BDT 20</h4>
                    <p className="text-sm text-muted-foreground">
                      A one-time fee of BDT 20 will be charged to post this listing.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button variant="outline" className="sm:flex-1">
                  Save as Draft
                </Button>
                <Button asChild className="sm:flex-1 gap-2">
                  <Link href="/payment">
                    <Upload className="h-4 w-4" />
                    Post Listing & Pay
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
