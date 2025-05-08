import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building, Edit, Eye, MessageCircle, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Active listings data
const activeListings = [
  {
    id: 1,
    title: "Modern 2 Bedroom Apartment in Gulshan",
    image: "/images/property-image-1.jpg",
    postedDate: "May 5, 2023",
    views: 34,
    type: "Apartment",
    bedrooms: 2,
    location: "Gulshan, Dhaka"
  },
  {
    id: 2,
    title: "Luxury Studio with Amazing View",
    image: "/images/property-image-3.jpg",
    postedDate: "May 12, 2023",
    views: 28,
    type: "Studio",
    bedrooms: 1,
    location: "Banani, Dhaka"
  },
  {
    id: 3,
    title: "Spacious Family Home with Garden",
    image: "/images/property-image-5.jpg",
    postedDate: "May 3, 2023",
    views: 42,
    type: "House",
    bedrooms: 4,
    location: "Dhanmondi, Dhaka"
  }
];

// Rented listings data
const rentedListings = [
  {
    id: 4,
    title: "Spacious 3 Bedroom House in Banani",
    image: "/images/property-image-7.jpg",
    rentedDate: "April 15, 2023",
    views: 56,
    type: "House",
    bedrooms: 3,
    location: "Banani, Dhaka"
  },
  {
    id: 5,
    title: "Cozy 1 Bedroom Apartment with Balcony",
    image: "/images/property-image-9.jpg",
    rentedDate: "April 2, 2023",
    views: 37,
    type: "Apartment",
    bedrooms: 1,
    location: "Uttara, Dhaka"
  }
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Landlord Dashboard</h1>
            <p className="text-muted-foreground">Manage your rental listings and messages</p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/post-listing">
              <Plus className="h-4 w-4" />
              Post New Listing
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          {[
            { title: "Active Listings", value: "5", icon: <Building className="h-4 w-4" /> },
            { title: "Total Views", value: "243", icon: <Eye className="h-4 w-4" /> },
            { title: "Unread Messages", value: "12", icon: <MessageCircle className="h-4 w-4" /> },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="h-12 w-12 bg-muted/50 rounded-full flex items-center justify-center">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="active">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="rented">Rented</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {activeListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-56 h-48 md:h-auto">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-2">
                          <h3 className="font-medium">{listing.title}</h3>
                          <Badge className="rounded-full bg-emerald-500 text-white hover:bg-emerald-600">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Posted on {listing.postedDate} • {listing.views} views</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="rounded-full">{listing.type}</Badge>
                          <Badge variant="outline" className="rounded-full">{listing.bedrooms} {listing.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</Badge>
                          <Badge variant="outline" className="rounded-full">{listing.location}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button asChild size="sm" variant="outline" className="rounded-full gap-1">
                            <Link href={`/listing/${listing.id}`}>
                              <Eye className="h-4 w-4" />
                              View
                            </Link>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="rounded-full gap-1">
                            <Link href={`/edit-listing/${listing.id}`}>
                              <Edit className="h-4 w-4" />
                              Edit
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive rounded-full gap-1">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                          <Button size="sm" variant="default" className="rounded-full bg-emerald-500 hover:bg-emerald-600">
                            Mark as Rented
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rented" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {rentedListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-56 h-48 md:h-auto">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          className="object-cover opacity-70"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-2">
                          <h3 className="font-medium">{listing.title}</h3>
                          <Badge variant="outline" className="text-muted-foreground rounded-full">
                            Rented
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Rented on {listing.rentedDate} • {listing.views} views</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="rounded-full">{listing.type}</Badge>
                          <Badge variant="outline" className="rounded-full">{listing.bedrooms} {listing.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</Badge>
                          <Badge variant="outline" className="rounded-full">{listing.location}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button asChild size="sm" variant="outline" className="rounded-full gap-1">
                            <Link href={`/listing/${listing.id}`}>
                              <Eye className="h-4 w-4" />
                              View
                            </Link>
                          </Button>
                          <Button size="sm" variant="default" className="rounded-full bg-emerald-500 hover:bg-emerald-600">
                            Mark as Available
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drafts" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-56 h-48 md:h-auto bg-muted flex items-center justify-center">
                      <Building className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-2">
                        <h3 className="font-medium">New Listing Draft</h3>
                        <Badge variant="outline" className="text-muted-foreground rounded-full">
                          Draft
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Last edited on May 2, 2023</p>
                      <div className="flex flex-wrap gap-2">
                        <Button asChild size="sm" variant="outline" className="rounded-full gap-1">
                          <Link href="/edit-listing/draft-1">
                            <Edit className="h-4 w-4" />
                            Continue Editing
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive rounded-full gap-1">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
