"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Building, Check, CreditCard, ShieldCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [loading, setLoading] = useState<boolean>(false)
  
  const handlePayment = () => {
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      window.location.href = "/payment/success"
    }, 2000)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="text-center py-6">
              <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Complete Your Payment</h1>
              <p className="text-muted-foreground text-lg">Pay the listing fee to publish your rental property</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                    <CardDescription>
                      Select your preferred payment method
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <RadioGroup 
                      defaultValue={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="grid gap-4"
                    >
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer w-full">
                          <div className="flex items-center gap-2">
                            <Image 
                              src="/payment-image/card-logo.png" 
                              alt="Credit/Debit Cards" 
                              width={50} 
                              height={35} 
                              className="rounded-md"
                            />
                          </div>
                          <span className="font-medium">Credit/Debit Card</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <RadioGroupItem value="bkash" id="bkash" />
                        <Label htmlFor="bkash" className="flex items-center gap-3 cursor-pointer w-full">
                          <Image 
                            src="/payment-image/b-kash-logo.png" 
                            alt="bKash" 
                            width={50} 
                            height={35} 
                            className="rounded-md"
                          />
                          <span className="font-medium">bKash</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <RadioGroupItem value="nagad" id="nagad" />
                        <Label htmlFor="nagad" className="flex items-center gap-3 cursor-pointer w-full">
                          <Image 
                            src="/payment-image/nagad-logo.png" 
                            alt="Nagad" 
                            width={50} 
                            height={35} 
                            className="rounded-md"
                          />
                          <span className="font-medium">Nagad</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <RadioGroupItem value="rocket" id="rocket" />
                        <Label htmlFor="rocket" className="flex items-center gap-3 cursor-pointer w-full">
                          <Image 
                            src="/payment-image/rocket-logo.png" 
                            alt="Rocket" 
                            width={50} 
                            height={35} 
                            className="rounded-md"
                          />
                          <span className="font-medium">Rocket</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div className="mt-6 grid gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="grid gap-2">
                          <Label htmlFor="card-number" className="text-sm font-medium">Card Number</Label>
                          <Input 
                            id="card-number" 
                            placeholder="1234 5678 9012 3456" 
                            className="border-gray-300 focus:border-primary"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="expiry" className="text-sm font-medium">Expiry Date</Label>
                            <Input 
                              id="expiry" 
                              placeholder="MM/YY" 
                              className="border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="cvc" className="text-sm font-medium">CVC</Label>
                            <Input 
                              id="cvc" 
                              placeholder="123" 
                              className="border-gray-300 focus:border-primary"
                            />
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="name" className="text-sm font-medium">Name on Card</Label>
                          <Input 
                            id="name" 
                            placeholder="John Doe" 
                            className="border-gray-300 focus:border-primary"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "bkash" && (
                      <div className="mt-6 grid gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="grid gap-2">
                          <Label htmlFor="phone" className="text-sm font-medium">bKash Number</Label>
                          <Input 
                            id="phone" 
                            placeholder="01712345678" 
                            className="border-gray-300 focus:border-primary"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "nagad" && (
                      <div className="mt-6 grid gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="grid gap-2">
                          <Label htmlFor="phone" className="text-sm font-medium">Nagad Number</Label>
                          <Input 
                            id="phone" 
                            placeholder="01712345678" 
                            className="border-gray-300 focus:border-primary"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "rocket" && (
                      <div className="mt-6 grid gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="grid gap-2">
                          <Label htmlFor="phone" className="text-sm font-medium">Rocket Number</Label>
                          <Input 
                            id="phone" 
                            placeholder="01712345678" 
                            className="border-gray-300 focus:border-primary"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <Alert className="border border-primary/20 bg-primary/5 text-primary">
                        <ShieldCheck className="h-4 w-4" />
                        <AlertDescription>
                          Your payment is secure and processed through SSLCOMMERZ, a trusted payment gateway in Bangladesh.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-0 shadow-md sticky top-6">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                    <CardTitle>Payment Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Building className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">Property Listing</h4>
                          <p className="text-sm text-muted-foreground">Standard Listing Fee</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between px-1">
                        <span className="text-sm">Subtotal</span>
                        <span className="font-medium">৳20.00</span>
                      </div>
                      
                      <div className="flex items-center justify-between px-1">
                        <span className="text-sm">Processing Fee</span>
                        <span className="font-medium">৳0.00</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between px-1">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-lg text-primary">৳20.00</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 pt-4">
                    <Button 
                      onClick={handlePayment} 
                      disabled={loading} 
                      className="w-full font-medium text-base py-6"
                    >
                      {loading ? "Processing..." : "Pay and Publish"}
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/post-listing">Cancel</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 