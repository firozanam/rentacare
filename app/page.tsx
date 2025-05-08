"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Home, MapPin, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import LocationFilter from "@/components/location-filter"
import PropertyCard from "@/components/property-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { properties } from "@/app/listings/page"

// Some testimonial users
const testimonials = {
  tenants: [
    {
      name: "Sarah Johnson",
      initials: "SJ",
      profilePicture: "/profile-pictures/profile-picture-2.jpg",
      text: "I found my dream apartment in just 3 days using RentaCare. The location filter made it so easy to find exactly what I was looking for!"
    },
    {
      name: "Michael Chen",
      initials: "MC",
      profilePicture: "/profile-pictures/profile-picture-3.jpg", 
      text: "The detailed listings with actual photos helped me make a decision without even having to visit some properties. Saved me so much time!"
    }
  ],
  landlords: [
    {
      name: "Ahmed Rahman",
      initials: "AR",
      profilePicture: "/profile-pictures/profile-picture-1.jpg",
      text: "I've been able to rent out my properties much faster with RentaCare. The BDT 20 listing fee is well worth the exposure I get!"
    },
    {
      name: "Fatima Ali",
      initials: "FA",
      profilePicture: "/profile-pictures/profile-picture-4.jpg",
      text: "As a property owner, I appreciate how easy it is to manage my listings and communicate with potential tenants. Great platform!"
    }
  ]
};

export default function HomePage() {
  // Get featured properties
  const featuredProperties = properties.filter(property => property.featured).slice(0, 4)
  
  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 to-teal-700 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10 items-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Find Your Perfect Rental Home
              </h1>
              <p className="text-white/90 md:text-xl">
                Connect with landlords and discover rental properties that match your needs. From apartments to houses,
                we have it all.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Button asChild size="lg" className="bg-white text-teal-700 hover:bg-white/90">
                  <Link href="/listings">Browse Listings</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  <Link href="/post-listing">Post a Listing</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/property-image-12.jpg?height=400&width=600"
                alt="Rental home"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location Filter */}
      <section className="container mx-auto px-4 md:px-6 -mt-6 md:-mt-10 relative z-10">
        <Card className="shadow-lg">
          <CardContent className="p-4 md:p-6">
            <LocationFilter />
          </CardContent>
        </Card>
      </section>

      {/* Featured Listings */}
      <section className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">Featured Listings</h2>
            <Button asChild variant="ghost">
              <Link href="/listings">
                View All <Search className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="container mx-auto px-4 md:px-6 py-8 bg-muted/50">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight text-center">Find By Property Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Apartments", icon: <Building className="h-8 w-8" />, count: 245 },
              { name: "Houses", icon: <Home className="h-8 w-8" />, count: 132 },
              { name: "Mess Accommodations", icon: <Building className="h-8 w-8" />, count: 87 },
              { name: "Mess Seats", icon: <MapPin className="h-8 w-8" />, count: 56 },
            ].map((type, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <Link href={`/listings?type=${type.name.toLowerCase()}`}>
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-2">
                    {type.icon}
                    <h3 className="font-medium">{type.name}</h3>
                    <p className="text-sm text-muted-foreground">{type.count} listings</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight text-center">How RentaCare Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Create an Account",
                description: "Sign up for free and create your profile to get started with RentaCare.",
                step: "01",
              },
              {
                title: "Browse or Post Listings",
                description: "Search for rental properties or post your own listing for just BDT 20.",
                step: "02",
              },
              {
                title: "Connect and Finalize",
                description: "Message landlords directly, arrange viewings, and find your perfect rental.",
                step: "03",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-4 -top-4 text-6xl font-bold text-muted-foreground/20">{item.step}</div>
                <Card>
                  <CardContent className="p-6 pt-8">
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 md:px-6 py-12 bg-muted/30">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight text-center">What Our Users Say</h2>
          <Tabs defaultValue="tenants" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="tenants">Tenants</TabsTrigger>
              <TabsTrigger value="landlords">Landlords</TabsTrigger>
            </TabsList>
            <TabsContent value="tenants" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.tenants.map((testimonial, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 rounded-full">
                          <AvatarImage src={testimonial.profilePicture} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">Tenant</p>
                          <p className="mt-2">"{testimonial.text}"</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="landlords" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.landlords.map((testimonial, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 rounded-full">
                          <AvatarImage src={testimonial.profilePicture} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">Landlord</p>
                          <p className="mt-2">"{testimonial.text}"</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-700 py-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Rental?</h2>
            <p className="text-white/90 mb-6">
              Join thousands of users who have found their ideal rental homes through RentaCare.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-teal-700 hover:bg-white/90">
                <Link href="/register">Create an Account</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                <Link href="/listings">Browse Listings</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
