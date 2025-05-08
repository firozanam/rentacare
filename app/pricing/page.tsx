import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PricingPage() {
  return (
    <div className="container max-w-6xl px-4 py-12 md:py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
          RentaCare offers a straightforward pricing model to help landlords connect with potential tenants.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Standard Listing Plan */}
        <Card className="flex flex-col border-2">
          <CardHeader className="flex flex-col items-center text-center space-y-2">
            <CardTitle className="text-xl font-bold">Standard Listing</CardTitle>
            <CardDescription className="text-sm">Post your property and reach potential tenants</CardDescription>
            <div className="flex items-baseline justify-center mt-4">
              <span className="text-5xl font-extrabold tracking-tight">৳20</span>
              <span className="ml-1 text-sm text-muted-foreground">per listing</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              {[
                "Post detailed property information",
                "Upload multiple property images",
                "Share your contact information",
                "Location-based visibility",
                "Receive messages from potential tenants",
                "Comment interaction on listings",
                "Mark property as rented when filled",
                "Edit listings anytime"
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/post-listing">Post a Listing</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* For Tenants */}
        <Card className="flex flex-col border-2">
          <CardHeader className="flex flex-col items-center text-center space-y-2">
            <CardTitle className="text-xl font-bold">For Tenants</CardTitle>
            <CardDescription className="text-sm">Find your perfect rental property</CardDescription>
            <div className="flex items-baseline justify-center mt-4">
              <span className="text-5xl font-extrabold tracking-tight">Free</span>
              <span className="ml-1 text-sm text-muted-foreground">forever</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              {[
                "Browse all available listings",
                "Filter by location (Division to Area)",
                "View property details and images",
                "Like and save favorite listings",
                "Comment on listings",
                "Direct message landlords",
                "Receive real-time notifications",
                "Simple account creation"
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-4">
            <Button asChild className="w-full" size="lg" variant="outline">
              <Link href="/register">Create Free Account</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* FAQ Section */}
        <Card className="flex flex-col bg-muted/50">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-6">
            <div>
              <h3 className="font-medium mb-1">How does payment work?</h3>
              <p className="text-sm text-muted-foreground">
                We use SSLCOMMERZ for secure payment processing. You'll be prompted to pay ৳20 when posting a new listing.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Can I edit my listing after posting?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can edit your listing details, images, and contact information at any time from your dashboard.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">What happens when my property is rented?</h3>
              <p className="text-sm text-muted-foreground">
                You can mark your listing as "rented" from your dashboard, which will remove it from the main feed.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Do I need to pay again to repost?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, each new listing requires a ৳20 payment, even for previously rented properties.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/profile-pictures/profile-picture-1.jpg" alt="Ahmed Rahman" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Ahmed Rahman</h4>
                  <p className="text-sm text-muted-foreground">Landlord</p>
                  <p className="mt-2">
                    "I've been able to rent out my properties much faster with RentaCare. The BDT 20 listing fee
                    is well worth the exposure I get!"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/profile-pictures/profile-picture-5.jpg" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Tenant</p>
                  <p className="mt-2">
                    "I found my dream apartment in just 3 days using RentaCare. The location filter made it so
                    easy to find exactly what I was looking for!"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to find your perfect rental match?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/post-listing">Post a Property</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/listings">Browse Listings</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 