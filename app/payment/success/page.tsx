import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ChevronRight, Home, List } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-md mx-auto">
        <Card className="border-2 border-green-500/20">
          <CardHeader className="flex flex-col items-center text-center pb-2">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-2" />
            <CardTitle className="text-2xl font-bold">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center pb-2">
            <div className="space-y-4">
              <p>Thank you for your payment of <strong>৳20.00</strong></p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">Payment Reference</p>
                <p className="font-mono font-medium">TXN-{Math.floor(10000000 + Math.random() * 90000000)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Your property listing has been published successfully. You can now manage your listing from your dashboard.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/dashboard" className="flex items-center justify-center gap-2">
                <List className="h-4 w-4" />
                Go to My Listings
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/" className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Having issues with your payment?</p>
          <Link href="/contact" className="text-primary hover:underline">Contact our support team</Link>
        </div>
      </div>
    </div>
  )
} 