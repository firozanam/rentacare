import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Bell, Camera, CreditCard, Key, Save, Trash2, Upload, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"

// Current user profile information
const currentUser = {
  firstName: "Ahmed",
  lastName: "Rahman",
  email: "ahmed.rahman@example.com",
  phone: "+880 1712 345678",
  bio: "Experienced landlord with multiple properties in Dhaka. I ensure all my properties are well-maintained and provide a comfortable living experience.",
  avatar: "/profile-pictures/profile-picture-2.jpg",
  accountType: "Landlord"
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and profile information</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <div className="sticky top-20">
                <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
                  <TabsTrigger
                    value="profile"
                    className="justify-start px-3 py-2 h-9 w-full data-[state=active]:bg-muted"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="justify-start px-3 py-2 h-9 w-full data-[state=active]:bg-muted"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start px-3 py-2 h-9 w-full data-[state=active]:bg-muted"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="justify-start px-3 py-2 h-9 w-full data-[state=active]:bg-muted"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="flex-1">
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information and public profile</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={currentUser.avatar} alt={`${currentUser.firstName} ${currentUser.lastName}`} />
                          <AvatarFallback>{`${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`}</AvatarFallback>
                        </Avatar>
                        <Button
                          size="icon"
                          variant="outline"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Upload avatar</span>
                        </Button>
                      </div>
                      <div className="flex-1 space-y-1 text-center sm:text-left">
                        <h3 className="font-medium">{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
                        <p className="text-sm text-muted-foreground">{currentUser.accountType}</p>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                          <Button variant="outline" size="sm" className="h-8 gap-1">
                            <Upload className="h-3.5 w-3.5" />
                            Upload Photo
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 text-destructive">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" defaultValue={currentUser.firstName} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" defaultValue={currentUser.lastName} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={currentUser.email} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue={currentUser.phone} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell potential tenants about yourself..."
                          className="min-h-[100px]"
                          defaultValue={currentUser.bio}
                        />
                        <p className="text-sm text-muted-foreground">This will be displayed on your public profile.</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="gap-1">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Update Password</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Preferences</CardTitle>
                    <CardDescription>Manage your account settings and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Account Type</Label>
                        <p className="text-sm text-muted-foreground">You are registered as a {currentUser.accountType}</p>
                      </div>
                      <Button variant="outline">Switch to Tenant</Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Language</Label>
                        <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline">English</Button>
                        <Button variant="ghost">Bengali</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-destructive">
                  <CardHeader>
                    <CardTitle className="text-destructive">Delete Account</CardTitle>
                    <CardDescription>Permanently delete your account and all associated data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        This action cannot be undone. All your data, including listings, messages, and profile
                        information will be permanently deleted.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="destructive" className="gap-1">
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Email Notifications</h3>
                      {[
                        {
                          title: "New Messages",
                          description: "Receive emails when someone sends you a message",
                          defaultChecked: true,
                        },
                        {
                          title: "New Comments",
                          description: "Receive emails when someone comments on your listing",
                          defaultChecked: true,
                        },
                        {
                          title: "Listing Interactions",
                          description: "Receive emails when someone likes or saves your listing",
                          defaultChecked: false,
                        },
                        {
                          title: "Marketing",
                          description: "Receive emails about new features and special offers",
                          defaultChecked: false,
                        },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor={`email-${i}`}>{item.title}</Label>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch id={`email-${i}`} defaultChecked={item.defaultChecked} />
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Push Notifications</h3>
                      {[
                        {
                          title: "New Messages",
                          description: "Receive push notifications when someone sends you a message",
                          defaultChecked: true,
                        },
                        {
                          title: "New Comments",
                          description: "Receive push notifications when someone comments on your listing",
                          defaultChecked: true,
                        },
                        {
                          title: "Listing Interactions",
                          description: "Receive push notifications when someone likes or saves your listing",
                          defaultChecked: true,
                        },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor={`push-${i}`}>{item.title}</Label>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch id={`push-${i}`} defaultChecked={item.defaultChecked} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>View your past payments for listing fees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 p-4 font-medium">
                        <div>Date</div>
                        <div>Description</div>
                        <div>Listing</div>
                        <div className="text-right">Amount</div>
                        <div className="text-right">Status</div>
                      </div>
                      <Separator />
                      {[
                        {
                          date: "May 5, 2023",
                          description: "Listing Fee",
                          listing: "Modern 2 Bedroom Apartment",
                          amount: "BDT 20",
                          status: "Paid",
                        },
                        {
                          date: "Apr 15, 2023",
                          description: "Listing Fee",
                          listing: "Spacious 3 Bedroom House",
                          amount: "BDT 20",
                          status: "Paid",
                        },
                        {
                          date: "Mar 22, 2023",
                          description: "Listing Fee",
                          listing: "Cozy 1 Bedroom Flat",
                          amount: "BDT 20",
                          status: "Paid",
                        },
                      ].map((item, i) => (
                        <div key={i} className="grid grid-cols-5 p-4 text-sm">
                          <div>{item.date}</div>
                          <div>{item.description}</div>
                          <div className="truncate">{item.listing}</div>
                          <div className="text-right">{item.amount}</div>
                          <div className="text-right font-medium text-green-600">{item.status}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods for listing fees</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-16 rounded bg-muted flex items-center justify-center">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">SSLCOMMERZ</p>
                            <p className="text-sm text-muted-foreground">Default payment method</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
