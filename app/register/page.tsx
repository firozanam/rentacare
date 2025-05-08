import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">Choose your account type to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tenant" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tenant">Tenant</TabsTrigger>
                <TabsTrigger value="landlord">Landlord</TabsTrigger>
              </TabsList>
              <TabsContent value="tenant" className="mt-4">
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-name">Full Name</Label>
                    <Input id="tenant-name" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-email">Email</Label>
                    <Input id="tenant-email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-phone">Phone Number</Label>
                    <Input id="tenant-phone" placeholder="+880 1712 345678" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-password">Password</Label>
                    <Input id="tenant-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-confirm-password">Confirm Password</Label>
                    <Input id="tenant-confirm-password" type="password" />
                  </div>
                  <Button className="w-full">Create Tenant Account</Button>
                </form>
              </TabsContent>
              <TabsContent value="landlord" className="mt-4">
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="landlord-name">Full Name</Label>
                    <Input id="landlord-name" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="landlord-email">Email</Label>
                    <Input id="landlord-email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="landlord-phone">Phone Number</Label>
                    <Input id="landlord-phone" placeholder="+880 1712 345678" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="landlord-password">Password</Label>
                    <Input id="landlord-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="landlord-confirm-password">Confirm Password</Label>
                    <Input id="landlord-confirm-password" type="password" />
                  </div>
                  <Button className="w-full">Create Landlord Account</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-sm text-center text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
            </div>
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline underline-offset-2">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
