"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, CalendarDays, Clock, Grid, Heart, Home, List, MapPin, MessageCircle, Star } from "lucide-react"
import LocationFilter from "@/components/location-filter"
import PropertyCard from "@/components/property-card"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"

// Property data for list view
export const properties = [
  {
    id: 1,
    title: "Modern 2 Bedroom Apartment in Gulshan",
    location: "Gulshan, Dhaka",
    price: "৳35,000",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "1200 sq.ft",
    features: ["Air Conditioning", "Balcony", "Elevator", "Security", "Parking"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Ahmed Rahman",
      initials: "AR",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 24,
    comments: 8,
    postedDate: "3 days ago",
    image: "/images/property-image-1.jpg"
  },
  {
    id: 2,
    title: "Spacious 3 Bedroom House in Banani",
    location: "Banani, Dhaka",
    price: "৳45,000",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800 sq.ft",
    features: ["Air Conditioning", "Garden", "Garage", "Security", "Fully Furnished"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Sarah Johnson",
      initials: "SJ",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 18,
    comments: 5,
    postedDate: "1 week ago",
    image: "/images/property-image-2.jpg"
  },
  {
    id: 3,
    title: "Cozy 1 Bedroom Flat in Dhanmondi",
    location: "Dhanmondi, Dhaka",
    price: "৳18,000",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: "850 sq.ft",
    features: ["Air Conditioning", "Balcony", "Security", "Near Metro"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Karim Ali",
      initials: "KA",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 12,
    comments: 3,
    postedDate: "2 days ago",
    image: "/images/property-image-3.jpg"
  },
  {
    id: 4,
    title: "Luxury 4 Bedroom Villa in Baridhara",
    location: "Baridhara, Dhaka",
    price: "৳75,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: "2500 sq.ft",
    features: ["Air Conditioning", "Swimming Pool", "Garden", "Garage", "Security", "Fully Furnished"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Ahmed Rahman",
      initials: "AR",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 32,
    comments: 14,
    postedDate: "5 days ago",
    image: "/images/property-image-4.jpg"
  },
  {
    id: 5,
    title: "Studio Apartment in Uttara",
    location: "Uttara, Dhaka",
    price: "৳12,000",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 1,
    area: "600 sq.ft",
    features: ["Air Conditioning", "Security", "Near Metro"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Sarah Johnson",
      initials: "SJ",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 8,
    comments: 2,
    postedDate: "1 day ago",
    image: "/images/property-image-5.jpg"
  },
  {
    id: 6,
    title: "Mess Accommodation in Mohammadpur",
    location: "Mohammadpur, Dhaka",
    price: "৳6,000",
    type: "Mess Accommodation",
    bedrooms: "Multiple",
    bathrooms: "Shared",
    area: "1000 sq.ft",
    features: ["Meals Included", "WiFi", "Study Area", "Laundry Service"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Karim Ali",
      initials: "KA",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 15,
    comments: 7,
    postedDate: "4 days ago",
    image: "/images/property-image-6.jpg"
  },
  {
    id: 7,
    title: "Single Mess Seat for Female Student",
    location: "Mohammadpur, Dhaka",
    price: "৳4,500",
    type: "Mess Seat",
    bedrooms: "Single Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["Meals Included", "WiFi", "Study Table", "Female Only", "Utilities Included"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Nadia Islam",
      initials: "NI",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 9,
    comments: 4,
    postedDate: "2 days ago",
    image: "/images/property-image-7.jpg"
  },
  {
    id: 8,
    title: "Shared Mess Seat for Male Students",
    location: "Mirpur, Dhaka",
    price: "৳3,800",
    type: "Mess Seat",
    bedrooms: "Shared Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["3 Meals Daily", "WiFi", "Close to University", "Male Only"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Rafiq Uddin",
      initials: "RU",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 6,
    comments: 3,
    postedDate: "6 days ago",
    image: "/images/property-image-8.jpg"
  },
  {
    id: 9,
    title: "Elegant 2 Bedroom Flat in Bashundhara",
    location: "Bashundhara, Dhaka",
    price: "৳28,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 2,
    area: "1100 sq.ft",
    features: ["Air Conditioning", "Balcony", "24/7 Security", "Reserved Parking", "Gas Connection"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Farhan Ahmed",
      initials: "FA",
      profilePicture: "/profile-pictures/profile-picture-6.jpg"
    },
    likes: 19,
    comments: 7,
    postedDate: "1 week ago",
    image: "/images/property-image-9.jpg"
  },
  {
    id: 10,
    title: "Family Flat with Beautiful View",
    location: "Uttara, Dhaka",
    price: "৳32,000",
    type: "Flat",
    bedrooms: 3,
    bathrooms: 2,
    area: "1350 sq.ft",
    features: ["Lake View", "Modern Kitchen", "Children's Play Area", "Lift", "24/7 Security"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Tania Khanam",
      initials: "TK",
      profilePicture: "/profile-pictures/profile-picture-7.jpg"
    },
    likes: 22,
    comments: 9,
    postedDate: "3 days ago",
    image: "/images/property-image-10.jpg"
  },
  {
    id: 11,
    title: "Compact Bachelor Flat in Khilgaon",
    location: "Khilgaon, Dhaka",
    price: "৳15,000",
    type: "Flat",
    bedrooms: 1,
    bathrooms: 1,
    area: "650 sq.ft",
    features: ["Furnished", "Gas Connection", "Water Supply", "Cable TV", "Internet Ready"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Masud Khan",
      initials: "MK",
      profilePicture: "/profile-pictures/profile-picture-8.jpg"
    },
    likes: 11,
    comments: 4,
    postedDate: "5 days ago",
    image: "/images/property-image-11.jpg"
  },
  {
    id: 12,
    title: "Luxury Apartment with Rooftop Access",
    location: "Gulshan, Dhaka",
    price: "৳55,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: "2200 sq.ft",
    features: ["Rooftop Garden", "Modern Kitchen", "Servant Room", "Generator", "Parking", "Pool"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Zafar Iqbal",
      initials: "ZI",
      profilePicture: "/profile-pictures/profile-picture-9.jpg"
    },
    likes: 28,
    comments: 12,
    postedDate: "2 weeks ago",
    image: "/images/property-image-12.jpg"
  },
  {
    id: 13,
    title: "Mess Seat with Study Facilities",
    location: "Farmgate, Dhaka",
    price: "৳4,200",
    type: "Mess Seat",
    bedrooms: "Single Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["Study Room", "WiFi", "2 Meals Daily", "Close to Bus Stop", "Laundry Service"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Abdul Karim",
      initials: "AK",
      profilePicture: "/profile-pictures/profile-picture-10.jpg"
    },
    likes: 7,
    comments: 3,
    postedDate: "1 week ago",
    image: "/images/property-image-13.jpg"
  },
  {
    id: 14,
    title: "Affordable Room in Shared Apartment",
    location: "Dhanmondi, Dhaka",
    price: "৳8,500",
    type: "Room",
    bedrooms: 1,
    bathrooms: "Shared",
    area: "180 sq.ft",
    features: ["Shared Kitchen", "WiFi", "Balcony Access", "Students Preferred", "Bills Included"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Farzana Begum",
      initials: "FB",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 13,
    comments: 6,
    postedDate: "4 days ago",
    image: "/images/property-image-14.jpg"
  },
  {
    id: 15,
    title: "Premium Duplex House in Banani",
    location: "Banani, Dhaka",
    price: "৳120,000",
    type: "House",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500 sq.ft",
    features: ["Swimming Pool", "Garden", "Garage", "Security", "Generator", "Modern Kitchen", "Servants Quarters"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Tarek Rahman",
      initials: "TR",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 45,
    comments: 18,
    postedDate: "2 weeks ago",
    image: "/images/property-image-15.jpg"
  },
  {
    id: 16,
    title: "Comfortable 3 Bedroom Apartment in Chittagong",
    location: "Nasirabad, Chittagong",
    price: "৳22,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1350 sq.ft",
    features: ["Air Conditioning", "Elevator", "24/7 Security", "Parking", "Hill View"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Mahmud Hasan",
      initials: "MH",
      profilePicture: "/profile-pictures/profile-picture-6.jpg"
    },
    likes: 19,
    comments: 7,
    postedDate: "4 days ago",
    image: "/images/property-image-1.jpg"
  },
  {
    id: 17,
    title: "Spacious Student Mess in Khulna",
    location: "Sonadanga, Khulna",
    price: "৳5,500",
    type: "Mess Accommodation",
    bedrooms: "Multiple",
    bathrooms: "Shared",
    area: "1200 sq.ft",
    features: ["3 Meals Daily", "WiFi", "Study Room", "Close to University", "Utilities Included"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Jasim Uddin",
      initials: "JU",
      profilePicture: "/profile-pictures/profile-picture-7.jpg"
    },
    likes: 31,
    comments: 12,
    postedDate: "5 days ago",
    image: "/images/property-image-2.jpg"
  },
  {
    id: 18,
    title: "Luxury 4 Bedroom House in Sylhet",
    location: "Uposhohor, Sylhet",
    price: "৳42,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: "2200 sq.ft",
    features: ["Modern Kitchen", "Garden", "Car Parking", "Tea Estate View", "Generator"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Farida Begum",
      initials: "FB",
      profilePicture: "/profile-pictures/profile-picture-8.jpg"
    },
    likes: 27,
    comments: 9,
    postedDate: "1 week ago",
    image: "/images/property-image-3.jpg"
  },
  {
    id: 19,
    title: "Affordable Female Mess Seat in Rajshahi",
    location: "Kazihata, Rajshahi",
    price: "৳4,000",
    type: "Mess Seat",
    bedrooms: "Single Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["2 Meals Daily", "WiFi", "Near University", "Female Only", "Laundry Included"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Nusrat Jahan",
      initials: "NJ",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 14,
    comments: 6,
    postedDate: "2 days ago",
    image: "/images/property-image-4.jpg"
  },
  {
    id: 20,
    title: "Modern Studio Apartment in Barisal",
    location: "Sagardi, Barisal",
    price: "৳10,500",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 1,
    area: "550 sq.ft",
    features: ["River View", "Furnished", "Air Conditioning", "Security", "Boat Dock Access"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Liton Ahmed",
      initials: "LA",
      profilePicture: "/profile-pictures/profile-picture-9.jpg"
    },
    likes: 18,
    comments: 4,
    postedDate: "3 days ago",
    image: "/images/property-image-5.jpg"
  },
  {
    id: 21,
    title: "Spacious 2 Bedroom Flat in Rangpur",
    location: "Dhap, Rangpur",
    price: "৳12,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "1000 sq.ft",
    features: ["Balcony", "Gas Connection", "Water Supply", "Family Preferred"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Akbar Ali",
      initials: "AA",
      profilePicture: "/profile-pictures/profile-picture-10.jpg"
    },
    likes: 9,
    comments: 3,
    postedDate: "1 week ago",
    image: "/images/property-image-6.jpg"
  },
  {
    id: 22,
    title: "Elegant 3 Bedroom House in Jessore",
    location: "Chanchra, Jessore",
    price: "৳25,000",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    area: "1700 sq.ft",
    features: ["Garden", "Parking", "Quiet Neighborhood", "Servants Quarter"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Mominul Haque",
      initials: "MH",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 22,
    comments: 8,
    postedDate: "6 days ago",
    image: "/images/property-image-7.jpg"
  },
  {
    id: 23,
    title: "Shared Mess Accommodation in Mymensingh",
    location: "Chorpara, Mymensingh",
    price: "৳5,200",
    type: "Mess Accommodation",
    bedrooms: "Multiple",
    bathrooms: "Shared",
    area: "1100 sq.ft",
    features: ["Meals Included", "WiFi", "Near Agricultural University", "Laundry Facilities"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Rahmatullah",
      initials: "RM",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 13,
    comments: 5,
    postedDate: "4 days ago",
    image: "/images/property-image-8.jpg"
  },
  {
    id: 24,
    title: "Bachelor Flat in Comilla",
    location: "Kandirpar, Comilla",
    price: "৳8,000",
    type: "Flat",
    bedrooms: 1,
    bathrooms: 1,
    area: "650 sq.ft",
    features: ["Single Person", "Furnished", "Near Market", "Water Supply"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Jamal Hossain",
      initials: "JH",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 7,
    comments: 2,
    postedDate: "1 day ago",
    image: "/images/property-image-9.jpg"
  },
  {
    id: 25,
    title: "Deluxe Villa in Gazipur",
    location: "Tongi, Gazipur",
    price: "৳55,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 4,
    area: "3000 sq.ft",
    features: ["Swimming Pool", "Large Garden", "Modern Kitchen", "Garage", "Security"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Faisal Rahman",
      initials: "FR",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 39,
    comments: 16,
    postedDate: "2 weeks ago",
    image: "/images/property-image-10.jpg"
  },
  {
    id: 26,
    title: "Male Student Mess in Bogra",
    location: "Satmatha, Bogra",
    price: "৳3,800",
    type: "Mess Seat",
    bedrooms: "Shared Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["2 Meals Daily", "WiFi", "Male Only", "Close to College"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Saifur Rahman",
      initials: "SR",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 11,
    comments: 4,
    postedDate: "3 days ago",
    image: "/images/property-image-11.jpg"
  },
  {
    id: 27,
    title: "Family Apartment in Narayanganj",
    location: "Chashara, Narayanganj",
    price: "৳18,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1250 sq.ft",
    features: ["River View", "Lift", "Gas Connection", "24/7 Security"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Imran Khan",
      initials: "IK",
      profilePicture: "/profile-pictures/profile-picture-6.jpg"
    },
    likes: 24,
    comments: 9,
    postedDate: "1 week ago",
    image: "/images/property-image-12.jpg"
  },
  {
    id: 28,
    title: "Cozy 1 Bedroom Apartment in Kushtia",
    location: "New Market, Kushtia",
    price: "৳9,500",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: "720 sq.ft",
    features: ["Furnished", "Air Conditioning", "Near Islamic University"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Shaheen Alam",
      initials: "SA",
      profilePicture: "/profile-pictures/profile-picture-7.jpg"
    },
    likes: 16,
    comments: 5,
    postedDate: "5 days ago",
    image: "/images/property-image-13.jpg"
  },
  {
    id: 29,
    title: "Premium House in Savar",
    location: "Ashulia, Savar",
    price: "৳32,000",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800 sq.ft",
    features: ["Garden", "Garage", "Near Jahangirnagar University", "Quiet Area"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Rubel Ahmed",
      initials: "RA",
      profilePicture: "/profile-pictures/profile-picture-8.jpg"
    },
    likes: 20,
    comments: 7,
    postedDate: "1 week ago",
    image: "/images/property-image-14.jpg"
  },
  {
    id: 30,
    title: "Female Mess Seat in Tangail",
    location: "College Para, Tangail",
    price: "৳3,500",
    type: "Mess Seat",
    bedrooms: "Single Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["Meals Included", "Study Table", "Female Only", "Near College"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Fatima Begum",
      initials: "FB",
      profilePicture: "/profile-pictures/profile-picture-9.jpg"
    },
    likes: 13,
    comments: 6,
    postedDate: "3 days ago",
    image: "/images/property-image-15.jpg"
  },
  {
    id: 31,
    title: "Duplex Apartment in Uttara Model Town",
    location: "Sector 7, Uttara, Dhaka",
    price: "৳45,000",
    type: "Apartment",
    bedrooms: 4,
    bathrooms: 3,
    area: "2200 sq.ft",
    features: ["Duplex Layout", "Modern Kitchen", "Balcony", "Parking", "Gym"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Farid Uddin",
      initials: "FU",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 36,
    comments: 14,
    postedDate: "2 weeks ago",
    image: "/images/property-image-1.jpg"
  },
  {
    id: 32,
    title: "Sunlit 2 Bedroom Flat in Mohakhali",
    location: "Mohakhali DOHS, Dhaka",
    price: "৳25,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "1150 sq.ft",
    features: ["High Floor", "Panoramic View", "Security", "Elevator"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Shamsul Alam",
      initials: "SA",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 22,
    comments: 8,
    postedDate: "1 week ago",
    image: "/images/property-image-2.jpg"
  },
  {
    id: 33,
    title: "Executive Bachelor Mess in Motijheel",
    location: "Motijheel C/A, Dhaka",
    price: "৳7,500",
    type: "Mess Accommodation",
    bedrooms: "Single Room",
    bathrooms: "Shared",
    area: "800 sq.ft",
    features: ["Attached Bathroom", "AC", "Meals Included", "Close to Business District"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Lutfur Rahman",
      initials: "LR",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 15,
    comments: 6,
    postedDate: "5 days ago",
    image: "/images/property-image-3.jpg"
  },
  {
    id: 34,
    title: "Riverside Cottage in Sundarbans",
    location: "Mongla, Khulna",
    price: "৳18,000",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    area: "900 sq.ft",
    features: ["River View", "Eco-friendly", "Nature Surroundings", "Boat Service"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Monir Hossain",
      initials: "MH",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 29,
    comments: 12,
    postedDate: "2 weeks ago",
    image: "/images/property-image-4.jpg"
  },
  {
    id: 35,
    title: "Budget Flat for Small Family in Mirpur",
    location: "Mirpur 10, Dhaka",
    price: "৳15,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "850 sq.ft",
    features: ["Gas Connection", "Water Supply", "Near Market", "School Nearby"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Rashid Khan",
      initials: "RK",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 18,
    comments: 7,
    postedDate: "4 days ago",
    image: "/images/property-image-5.jpg"
  },
  {
    id: 36,
    title: "Student Accommodation near BUET",
    location: "Palashi, Dhaka",
    price: "৳6,500",
    type: "Mess Seat",
    bedrooms: "Shared Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["Meals Included", "Study Table", "WiFi", "Close to BUET"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Abdul Hamid",
      initials: "AH",
      profilePicture: "/profile-pictures/profile-picture-6.jpg"
    },
    likes: 24,
    comments: 9,
    postedDate: "3 days ago",
    image: "/images/property-image-6.jpg"
  },
  {
    id: 37,
    title: "Penthouse Apartment in Purbachal",
    location: "Purbachal New Town, Dhaka",
    price: "৳85,000",
    type: "Apartment",
    bedrooms: 4,
    bathrooms: 4,
    area: "3500 sq.ft",
    features: ["Penthouse", "Rooftop Garden", "Private Elevator", "Smart Home", "Private Pool"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Ziaul Haque",
      initials: "ZH",
      profilePicture: "/profile-pictures/profile-picture-7.jpg"
    },
    likes: 42,
    comments: 18,
    postedDate: "3 weeks ago",
    image: "/images/property-image-7.jpg"
  },
  {
    id: 38,
    title: "Working Women's Hostel in Banasree",
    location: "Banasree, Dhaka",
    price: "৳8,000",
    type: "Mess Accommodation",
    bedrooms: "Single Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["Female Only", "Security", "Meals Optional", "Professional Environment"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Salma Khatun",
      initials: "SK",
      profilePicture: "/profile-pictures/profile-picture-8.jpg"
    },
    likes: 26,
    comments: 11,
    postedDate: "1 week ago",
    image: "/images/property-image-8.jpg"
  },
  {
    id: 39,
    title: "Heritage Home in Old Dhaka",
    location: "Shakhari Bazar, Old Dhaka",
    price: "৳30,000",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    area: "1600 sq.ft",
    features: ["Historical Building", "Traditional Architecture", "Renovated Interior", "Close to Lalbagh Fort"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Ibrahim Khalil",
      initials: "IK",
      profilePicture: "/profile-pictures/profile-picture-9.jpg"
    },
    likes: 35,
    comments: 14,
    postedDate: "2 weeks ago",
    image: "/images/property-image-9.jpg"
  },
  {
    id: 40,
    title: "Modern Flat in Khulshi Hill",
    location: "Khulshi, Chittagong",
    price: "৳27,000",
    type: "Flat",
    bedrooms: 3,
    bathrooms: 2,
    area: "1450 sq.ft",
    features: ["Hill View", "Modern Design", "Elevator", "Parking", "Security"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Nasir Uddin",
      initials: "NU",
      profilePicture: "/profile-pictures/profile-picture-10.jpg"
    },
    likes: 23,
    comments: 8,
    postedDate: "1 week ago",
    image: "/images/property-image-10.jpg"
  },
  {
    id: 41,
    title: "Eco-Friendly Cottage in Cox's Bazar",
    location: "Inani Beach, Cox's Bazar",
    price: "৳15,000",
    type: "House",
    bedrooms: 1,
    bathrooms: 1,
    area: "650 sq.ft",
    features: ["Beach View", "Bamboo Structure", "Solar Power", "Private Garden"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Kamal Hossain",
      initials: "KH",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 45,
    comments: 18,
    postedDate: "2 weeks ago",
    image: "/images/property-image-11.jpg"
  },
  {
    id: 42,
    title: "Premium Mess for Medical Students",
    location: "Medical College Road, Sylhet",
    price: "৳6,500",
    type: "Mess Accommodation",
    bedrooms: "Multiple",
    bathrooms: "Shared",
    area: "1100 sq.ft",
    features: ["3 Meals Daily", "Study Room", "WiFi", "Near Sylhet Medical College"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Dr. Sajid Ahmed",
      initials: "SA",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 19,
    comments: 7,
    postedDate: "5 days ago",
    image: "/images/property-image-12.jpg"
  },
  {
    id: 43,
    title: "Newly Built Flat in Dinajpur",
    location: "Modern More, Dinajpur",
    price: "৳12,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "950 sq.ft",
    features: ["New Construction", "Gas Connection", "Water Supply", "Near Market"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Rafiqul Islam",
      initials: "RI",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 11,
    comments: 3,
    postedDate: "1 week ago",
    image: "/images/property-image-13.jpg"
  },
  {
    id: 44,
    title: "Luxury Villa in Madhupur Forest",
    location: "Madhupur, Tangail",
    price: "৳50,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: "2800 sq.ft",
    features: ["Forest View", "Swimming Pool", "Private Garden", "Modern Kitchen", "Security"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Mahbub Alam",
      initials: "MA",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 37,
    comments: 15,
    postedDate: "3 weeks ago",
    image: "/images/property-image-14.jpg"
  },
  {
    id: 45,
    title: "Affordable Mess Seat in Faridpur",
    location: "College Para, Faridpur",
    price: "৳3,200",
    type: "Mess Seat",
    bedrooms: "Shared Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["2 Meals Daily", "WiFi", "Near College", "Utilities Included"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Babar Ali",
      initials: "BA",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 8,
    comments: 3,
    postedDate: "2 days ago",
    image: "/images/property-image-15.jpg"
  },
  {
    id: 46,
    title: "Modern Apartment in Patenga",
    location: "Patenga, Chittagong",
    price: "৳20,000",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "1100 sq.ft",
    features: ["Sea View", "Balcony", "Security", "Parking", "Near Beach"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Kamrul Hasan",
      initials: "KH",
      profilePicture: "/profile-pictures/profile-picture-6.jpg"
    },
    likes: 26,
    comments: 9,
    postedDate: "1 week ago",
    image: "/images/property-image-1.jpg"
  },
  {
    id: 47,
    title: "Traditional Home in Rangamati",
    location: "Kaptai Lake Area, Rangamati",
    price: "৳14,000",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    area: "800 sq.ft",
    features: ["Lake View", "Traditional Design", "Boat Dock", "Peaceful Environment"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Rani Chakma",
      initials: "RC",
      profilePicture: "/profile-pictures/profile-picture-7.jpg"
    },
    likes: 32,
    comments: 11,
    postedDate: "2 weeks ago",
    image: "/images/property-image-2.jpg"
  },
  {
    id: 48,
    title: "Student Mess near KUET",
    location: "Teligati, Khulna",
    price: "৳4,800",
    type: "Mess Accommodation",
    bedrooms: "Multiple",
    bathrooms: "Shared",
    area: "1000 sq.ft",
    features: ["Meals Included", "Study Room", "WiFi", "Near KUET"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Jahangir Alam",
      initials: "JA",
      profilePicture: "/profile-pictures/profile-picture-8.jpg"
    },
    likes: 22,
    comments: 8,
    postedDate: "5 days ago",
    image: "/images/property-image-3.jpg"
  },
  {
    id: 49,
    title: "Comfortable Flat in Saidpur",
    location: "Shaheed Dr. Zikrul Haque Road, Saidpur",
    price: "৳9,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "850 sq.ft",
    features: ["Gas Connection", "Water Supply", "Near Railway Station"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Moazzem Hossain",
      initials: "MH",
      profilePicture: "/profile-pictures/profile-picture-9.jpg"
    },
    likes: 14,
    comments: 4,
    postedDate: "3 days ago",
    image: "/images/property-image-4.jpg"
  },
  {
    id: 50,
    title: "Luxury Condominium in Gulshan Avenue",
    location: "Gulshan Avenue, Dhaka",
    price: "৳150,000",
    type: "Apartment",
    bedrooms: 4,
    bathrooms: 4,
    area: "4000 sq.ft",
    features: ["Lake View", "Modern Design", "Private Elevator", "Gym", "Swimming Pool", "24/7 Security"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Anwar Hossain",
      initials: "AH",
      profilePicture: "/profile-pictures/profile-picture-10.jpg"
    },
    likes: 56,
    comments: 23,
    postedDate: "1 month ago",
    image: "/images/property-image-5.jpg"
  },
  {
    id: 51,
    title: "Female Hostel in Rajshahi University Area",
    location: "University Road, Rajshahi",
    price: "৳5,500",
    type: "Mess Accommodation",
    bedrooms: "Single Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["Meals Included", "Study Room", "WiFi", "Female Only", "Near Rajshahi University"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Hasina Begum",
      initials: "HB",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 29,
    comments: 12,
    postedDate: "1 week ago",
    image: "/images/property-image-6.jpg"
  },
  {
    id: 52,
    title: "Spacious House in Sreemangal Tea Gardens",
    location: "Sreemangal, Sylhet",
    price: "৳28,000",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800 sq.ft",
    features: ["Tea Garden View", "Spacious Garden", "Modern Kitchen", "Peaceful Area"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Shahid Ahmed",
      initials: "SA",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 31,
    comments: 9,
    postedDate: "2 weeks ago",
    image: "/images/property-image-7.jpg"
  },
  {
    id: 53,
    title: "Budget Flat in Khilgaon",
    location: "Khilgaon, Dhaka",
    price: "৳13,500",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "820 sq.ft",
    features: ["Gas Connection", "Water Supply", "Near Market", "School Nearby"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Rabiul Hasan",
      initials: "RH",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 18,
    comments: 6,
    postedDate: "4 days ago",
    image: "/images/property-image-8.jpg"
  },
  {
    id: 54,
    title: "Waterfront Bungalow in Kuakata",
    location: "Kuakata Sea Beach, Patuakhali",
    price: "৳22,000",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    area: "900 sq.ft",
    features: ["Beach View", "Private Garden", "Sunset View", "Tourist Friendly"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Selim Reza",
      initials: "SR",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 41,
    comments: 16,
    postedDate: "3 weeks ago",
    image: "/images/property-image-9.jpg"
  },
  {
    id: 55,
    title: "Student Studio Apartment in Mohammadpur",
    location: "Mohammadpur, Dhaka",
    price: "৳10,000",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: "500 sq.ft",
    features: ["Furnished", "Students Preferred", "Near University", "Utilities Included"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Nasima Akter",
      initials: "NA",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 17,
    comments: 6,
    postedDate: "5 days ago",
    image: "/images/property-image-10.jpg"
  },
  {
    id: 56,
    title: "Executive Mess for Professionals",
    location: "Kawran Bazar, Dhaka",
    price: "৳9,500",
    type: "Mess Accommodation",
    bedrooms: "Single Room",
    bathrooms: "Attached",
    area: "Single Room",
    features: ["AC", "Meals Optional", "WiFi", "Near Business District", "Professionals Only"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Habibur Rahman",
      initials: "HR",
      profilePicture: "/profile-pictures/profile-picture-6.jpg"
    },
    likes: 25,
    comments: 9,
    postedDate: "1 week ago",
    image: "/images/property-image-11.jpg"
  },
  {
    id: 57,
    title: "Riverside Duplex in Barisal",
    location: "Kirtonkhola River, Barisal",
    price: "৳32,000",
    type: "House",
    bedrooms: 3,
    bathrooms: 3,
    area: "2100 sq.ft",
    features: ["River View", "Boat Dock", "Garden", "Modern Design", "Duplex Layout"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Mosharraf Karim",
      initials: "MK",
      profilePicture: "/profile-pictures/profile-picture-7.jpg"
    },
    likes: 33,
    comments: 12,
    postedDate: "2 weeks ago",
    image: "/images/property-image-12.jpg"
  },
  {
    id: 58,
    title: "Elegant Flat in Agrabad",
    location: "Agrabad, Chittagong",
    price: "৳26,000",
    type: "Flat",
    bedrooms: 3,
    bathrooms: 2,
    area: "1350 sq.ft",
    features: ["Port View", "Modern Design", "Security", "Parking", "Business District"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Farhan Zaman",
      initials: "FZ",
      profilePicture: "/profile-pictures/profile-picture-8.jpg"
    },
    likes: 27,
    comments: 9,
    postedDate: "1 week ago",
    image: "/images/property-image-13.jpg"
  },
  {
    id: 59,
    title: "Historical Home in Panam City",
    location: "Sonargaon, Narayanganj",
    price: "৳18,000",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    area: "950 sq.ft",
    features: ["Heritage Area", "Traditional Architecture", "Renovated Interior", "Tourist Friendly"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Masudur Rahman",
      initials: "MR",
      profilePicture: "/profile-pictures/profile-picture-9.jpg"
    },
    likes: 35,
    comments: 13,
    postedDate: "2 weeks ago",
    image: "/images/property-image-14.jpg"
  },
  {
    id: 60,
    title: "University Student Mess in Shahbag",
    location: "Shahbag, Dhaka",
    price: "৳7,200",
    type: "Mess Accommodation",
    bedrooms: "Multiple",
    bathrooms: "Shared",
    area: "1200 sq.ft",
    features: ["3 Meals Daily", "Study Room", "WiFi", "Near Dhaka University"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Professor Rahim",
      initials: "PR",
      profilePicture: "/profile-pictures/profile-picture-10.jpg"
    },
    likes: 28,
    comments: 11,
    postedDate: "1 week ago",
    image: "/images/property-image-15.jpg"
  },
  {
    id: 61,
    title: "Modern Apartment in Chandgaon",
    location: "Chandgaon R/A, Chittagong",
    price: "৳23,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1300 sq.ft",
    features: ["Elevator", "Parking", "Security", "Modern Design"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Ismail Hossain",
      initials: "IH",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 19,
    comments: 7,
    postedDate: "5 days ago",
    image: "/images/property-image-1.jpg"
  },
  {
    id: 62,
    title: "Affordable House in Jessore Town",
    location: "New Market, Jessore",
    price: "৳16,000",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    area: "1100 sq.ft",
    features: ["Garden", "Gas Connection", "Water Supply", "Quiet Area"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Kabir Hossain",
      initials: "KH",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 15,
    comments: 5,
    postedDate: "3 days ago",
    image: "/images/property-image-2.jpg"
  },
  {
    id: 63,
    title: "Bachelor Mess in Feni",
    location: "College Road, Feni",
    price: "৳3,600",
    type: "Mess Seat",
    bedrooms: "Shared Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["2 Meals Daily", "WiFi", "Near College", "Male Only"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Jalal Uddin",
      initials: "JU",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 12,
    comments: 4,
    postedDate: "2 days ago",
    image: "/images/property-image-3.jpg"
  },
  {
    id: 64,
    title: "Lakeside Villa in Dhanmondi",
    location: "Dhanmondi Lake, Dhaka",
    price: "৳65,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: "3200 sq.ft",
    features: ["Lake View", "Luxury Design", "Garden", "Parking", "24/7 Security"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Sharif Uddin",
      initials: "SU",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 47,
    comments: 19,
    postedDate: "3 weeks ago",
    image: "/images/property-image-4.jpg"
  },
  {
    id: 65,
    title: "Cozy Apartment in Jahangirnagar University Area",
    location: "Savar, Dhaka",
    price: "৳15,000",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: "950 sq.ft",
    features: ["Balcony", "Near University", "Quiet Area", "Nature View"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Mosharraf Khan",
      initials: "MK",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 21,
    comments: 8,
    postedDate: "1 week ago",
    image: "/images/property-image-5.jpg"
  },
  {
    id: 66,
    title: "Medical College Hostel for Women",
    location: "Medical College Road, Dhaka",
    price: "৳8,500",
    type: "Mess Accommodation",
    bedrooms: "Single Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["Meals Included", "Security", "Female Only", "Near Medical College"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Dr. Razia Begum",
      initials: "RB",
      profilePicture: "/profile-pictures/profile-picture-6.jpg"
    },
    likes: 23,
    comments: 9,
    postedDate: "5 days ago",
    image: "/images/property-image-6.jpg"
  },
  {
    id: 67,
    title: "Affordable Flat in Jatrabari",
    location: "Jatrabari, Dhaka",
    price: "৳12,800",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "800 sq.ft",
    features: ["Gas Connection", "Water Supply", "Near Market", "Bus Stop Nearby"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Sohel Rana",
      initials: "SR",
      profilePicture: "/profile-pictures/profile-picture-7.jpg"
    },
    likes: 16,
    comments: 5,
    postedDate: "4 days ago",
    image: "/images/property-image-7.jpg"
  },
  {
    id: 68,
    title: "Farmhouse in Gazipur Countryside",
    location: "Kapasia, Gazipur",
    price: "৳25,000",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    area: "1500 sq.ft",
    features: ["Farm Land", "Organic Garden", "Countryside", "Weekend Getaway", "Peaceful"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Fazlur Rahman",
      initials: "FR",
      profilePicture: "/profile-pictures/profile-picture-8.jpg"
    },
    likes: 38,
    comments: 14,
    postedDate: "2 weeks ago",
    image: "/images/property-image-8.jpg"
  },
  {
    id: 69,
    title: "Professional Mess near Motijheel",
    location: "Arambagh, Dhaka",
    price: "৳8,200",
    type: "Mess Accommodation",
    bedrooms: "Single Room",
    bathrooms: "Shared",
    area: "Single Room",
    features: ["AC", "Meals Optional", "WiFi", "Professional Environment", "Near Business District"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Zahir Uddin",
      initials: "ZU",
      profilePicture: "/profile-pictures/profile-picture-9.jpg"
    },
    likes: 20,
    comments: 7,
    postedDate: "1 week ago",
    image: "/images/property-image-9.jpg"
  },
  {
    id: 70,
    title: "Family Apartment in Tejgaon",
    location: "Tejgaon, Dhaka",
    price: "৳22,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1250 sq.ft",
    features: ["Elevator", "Parking", "Security", "Family Preferred"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Abdul Matin",
      initials: "AM",
      profilePicture: "/profile-pictures/profile-picture-10.jpg"
    },
    likes: 25,
    comments: 8,
    postedDate: "6 days ago",
    image: "/images/property-image-10.jpg"
  },
  {
    id: 71,
    title: "Rustic Cottage in Netrokona",
    location: "Mohanganj, Netrokona",
    price: "৳8,500",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    area: "750 sq.ft",
    features: ["Traditional Design", "Garden", "Quiet Area", "Near Lake Haor"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Monir Khan",
      initials: "MK",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 18,
    comments: 5,
    postedDate: "1 week ago",
    image: "/images/property-image-11.jpg"
  },
  {
    id: 72,
    title: "Student Mess in Rajshahi University Area",
    location: "Kazla, Rajshahi",
    price: "৳4,000",
    type: "Mess Seat",
    bedrooms: "Shared Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["Meals Included", "Study Table", "WiFi", "Near University"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Mahabub Alam",
      initials: "MA",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 14,
    comments: 5,
    postedDate: "3 days ago",
    image: "/images/property-image-12.jpg"
  },
  {
    id: 73,
    title: "Modern Apartment in Sylhet City",
    location: "Upashahar, Sylhet",
    price: "৳25,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1400 sq.ft",
    features: ["Elevator", "Modern Design", "Parking", "24/7 Security"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Sharifuzzaman",
      initials: "SZ",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 29,
    comments: 10,
    postedDate: "2 weeks ago",
    image: "/images/property-image-13.jpg"
  },
  {
    id: 74,
    title: "Riverside Apartment in Chandpur",
    location: "Riverside, Chandpur",
    price: "৳14,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "900 sq.ft",
    features: ["River View", "Balcony", "Close to Boat Terminal", "Peaceful Area"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Kamal Uddin",
      initials: "KU",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 19,
    comments: 6,
    postedDate: "5 days ago",
    image: "/images/property-image-14.jpg"
  },
  {
    id: 75,
    title: "Business District Apartment in Motijheel",
    location: "Motijheel, Dhaka",
    price: "৳30,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1550 sq.ft",
    features: ["Business District", "Modern Design", "Elevator", "Parking", "Security"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Faisal Karim",
      initials: "FK",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 31,
    comments: 12,
    postedDate: "2 weeks ago",
    image: "/images/property-image-15.jpg"
  },
  {
    id: 76,
    title: "Female Hostel in Jahangirnagar University",
    location: "Savar, Dhaka",
    price: "৳5,800",
    type: "Mess Accommodation",
    bedrooms: "Single Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["Meals Included", "Study Room", "WiFi", "Female Only", "University Campus"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Rahima Khatun",
      initials: "RK",
      profilePicture: "/profile-pictures/profile-picture-6.jpg"
    },
    likes: 22,
    comments: 9,
    postedDate: "1 week ago",
    image: "/images/property-image-1.jpg"
  },
  {
    id: 77,
    title: "Hilltop Villa in Bandarban",
    location: "Nilgiri, Bandarban",
    price: "৳40,000",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800 sq.ft",
    features: ["Mountain View", "Natural Surroundings", "Modern Interior", "Tourist Friendly"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Robi Chakma",
      initials: "RC",
      profilePicture: "/profile-pictures/profile-picture-7.jpg"
    },
    likes: 48,
    comments: 21,
    postedDate: "3 weeks ago",
    image: "/images/property-image-2.jpg"
  },
  {
    id: 78,
    title: "Budget Flat in Narayanganj City",
    location: "Mondolpara, Narayanganj",
    price: "৳10,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "750 sq.ft",
    features: ["Gas Connection", "Water Supply", "Near Market", "Close to River"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Nurul Islam",
      initials: "NI",
      profilePicture: "/profile-pictures/profile-picture-8.jpg"
    },
    likes: 16,
    comments: 5,
    postedDate: "4 days ago",
    image: "/images/property-image-3.jpg"
  },
  {
    id: 79,
    title: "Shared Mess for Female Professionals",
    location: "Green Road, Dhaka",
    price: "৳7,500",
    type: "Mess Accommodation",
    bedrooms: "Single Room",
    bathrooms: "Shared",
    area: "Single Room",
    features: ["AC", "Meals Optional", "WiFi", "Female Only", "Professional Environment"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Shahida Begum",
      initials: "SB",
      profilePicture: "/profile-pictures/profile-picture-9.jpg"
    },
    likes: 27,
    comments: 11,
    postedDate: "1 week ago",
    image: "/images/property-image-4.jpg"
  },
  {
    id: 80,
    title: "Luxury Family Home in Khulna",
    location: "KDA Avenue, Khulna",
    price: "৳38,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: "2300 sq.ft",
    features: ["Modern Design", "Garden", "Parking", "Security", "Quiet Area"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Abul Kashem",
      initials: "AK",
      profilePicture: "/profile-pictures/profile-picture-10.jpg"
    },
    likes: 33,
    comments: 12,
    postedDate: "2 weeks ago",
    image: "/images/property-image-5.jpg"
  },
  {
    id: 81,
    title: "University Student Flat in Farmgate",
    location: "Farmgate, Dhaka",
    price: "৳14,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "850 sq.ft",
    features: ["Furnished", "Students Preferred", "Near University", "Bus Stop Nearby"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Manzoor Ahmed",
      initials: "MA",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 21,
    comments: 7,
    postedDate: "5 days ago",
    image: "/images/property-image-6.jpg"
  },
  {
    id: 82,
    title: "Premium Apartment with Lake View",
    location: "Hatirjheel, Dhaka",
    price: "৳42,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1750 sq.ft",
    features: ["Lake View", "Modern Design", "Balcony", "Security", "Parking"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Kazi Rahman",
      initials: "KR",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 38,
    comments: 15,
    postedDate: "2 weeks ago",
    image: "/images/property-image-7.jpg"
  },
  {
    id: 83,
    title: "Mess Accommodation in Bogura",
    location: "Satmatha, Bogura",
    price: "৳4,200",
    type: "Mess Accommodation",
    bedrooms: "Multiple",
    bathrooms: "Shared",
    area: "900 sq.ft",
    features: ["2 Meals Daily", "WiFi", "Near College", "Utilities Included"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Aminul Islam",
      initials: "AI",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 15,
    comments: 5,
    postedDate: "4 days ago",
    image: "/images/property-image-8.jpg"
  },
  {
    id: 84,
    title: "Traditional House in Norsingdi",
    location: "Raipura, Norsingdi",
    price: "৳16,000",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    area: "1100 sq.ft",
    features: ["Traditional Design", "Garden", "Quiet Area", "Family Preferred"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Abul Hossain",
      initials: "AH",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 18,
    comments: 6,
    postedDate: "1 week ago",
    image: "/images/property-image-9.jpg"
  },
  {
    id: 85,
    title: "Modern Flat in Bailey Road",
    location: "Bailey Road, Dhaka",
    price: "৳26,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 2,
    area: "1100 sq.ft",
    features: ["Modern Design", "Balcony", "Security", "Central Location"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Farida Khan",
      initials: "FK",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 29,
    comments: 11,
    postedDate: "10 days ago",
    image: "/images/property-image-10.jpg"
  },
  {
    id: 86,
    title: "Student Mess in Chittagong University Area",
    location: "Hathazari, Chittagong",
    price: "৳4,800",
    type: "Mess Accommodation",
    bedrooms: "Multiple",
    bathrooms: "Shared",
    area: "1000 sq.ft",
    features: ["3 Meals Daily", "Study Room", "WiFi", "Near University"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Mostafa Kamal",
      initials: "MK",
      profilePicture: "/profile-pictures/profile-picture-6.jpg"
    },
    likes: 24,
    comments: 9,
    postedDate: "1 week ago",
    image: "/images/property-image-11.jpg"
  },
  {
    id: 87,
    title: "Compact Flat for Bachelors in Mirpur",
    location: "Mirpur 1, Dhaka",
    price: "৳11,000",
    type: "Flat",
    bedrooms: 1,
    bathrooms: 1,
    area: "650 sq.ft",
    features: ["Bachelors Preferred", "Furnished", "Near Metro Station"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Babul Ahmed",
      initials: "BA",
      profilePicture: "/profile-pictures/profile-picture-7.jpg"
    },
    likes: 17,
    comments: 5,
    postedDate: "3 days ago",
    image: "/images/property-image-12.jpg"
  },
  {
    id: 88,
    title: "Modern Apartment in Basabo",
    location: "East Basabo, Dhaka",
    price: "৳18,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1150 sq.ft",
    features: ["Gas Connection", "Water Supply", "Elevator", "Security"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Shahidul Haque",
      initials: "SH",
      profilePicture: "/profile-pictures/profile-picture-8.jpg"
    },
    likes: 22,
    comments: 8,
    postedDate: "1 week ago",
    image: "/images/property-image-13.jpg"
  },
  {
    id: 89,
    title: "Shared Room for Students in Badda",
    location: "Middle Badda, Dhaka",
    price: "৳5,200",
    type: "Mess Seat",
    bedrooms: "Shared Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["2 Meals Daily", "WiFi", "Study Table", "Students Preferred"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Johir Uddin",
      initials: "JU",
      profilePicture: "/profile-pictures/profile-picture-9.jpg"
    },
    likes: 13,
    comments: 4,
    postedDate: "2 days ago",
    image: "/images/property-image-14.jpg"
  },
  {
    id: 90,
    title: "Luxury Villa in Gulshan",
    location: "Gulshan 2, Dhaka",
    price: "৳180,000",
    type: "House",
    bedrooms: 5,
    bathrooms: 5,
    area: "5500 sq.ft",
    features: ["Swimming Pool", "Garden", "Modern Design", "Gym", "Home Theater", "Servants Quarters"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Salman Khan",
      initials: "SK",
      profilePicture: "/profile-pictures/profile-picture-10.jpg"
    },
    likes: 62,
    comments: 27,
    postedDate: "1 month ago",
    image: "/images/property-image-15.jpg"
  },
  {
    id: 91,
    title: "Mountain View Cottage in Rangamati",
    location: "Sajek Valley, Rangamati",
    price: "৳28,000",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    area: "850 sq.ft",
    features: ["Mountain View", "Tourist Spot", "Natural Surroundings", "Weekend Retreat"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Mong Thowai",
      initials: "MT",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 43,
    comments: 19,
    postedDate: "2 weeks ago",
    image: "/images/property-image-1.jpg"
  },
  {
    id: 92,
    title: "Female Only Mess in Azimpur",
    location: "Azimpur, Dhaka",
    price: "৳6,000",
    type: "Mess Accommodation",
    bedrooms: "Multiple",
    bathrooms: "Shared",
    area: "1100 sq.ft",
    features: ["Meals Included", "Study Room", "WiFi", "Female Only", "Near Eden College"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Fatema Begum",
      initials: "FB",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 19,
    comments: 7,
    postedDate: "5 days ago",
    image: "/images/property-image-2.jpg"
  },
  {
    id: 93,
    title: "Family Flat in Malibagh",
    location: "Malibagh, Dhaka",
    price: "৳15,500",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "900 sq.ft",
    features: ["Gas Connection", "Water Supply", "Family Preferred", "Near Market"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Harun Miah",
      initials: "HM",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 14,
    comments: 5,
    postedDate: "4 days ago",
    image: "/images/property-image-3.jpg"
  },
  {
    id: 94,
    title: "Riverside House in Sunamganj",
    location: "Taherpur, Sunamganj",
    price: "৳12,000",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    area: "950 sq.ft",
    features: ["Haor View", "Boat Access", "Fishing Spot", "Tourist Friendly"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Shafiqul Islam",
      initials: "SI",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 36,
    comments: 14,
    postedDate: "2 weeks ago",
    image: "/images/property-image-4.jpg"
  },
  {
    id: 95,
    title: "Bachelor Apartment in Donia",
    location: "Donia, Dhaka",
    price: "৳9,500",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: "600 sq.ft",
    features: ["Single Person", "Furnished", "Near Market"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Jamal Miah",
      initials: "JM",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 12,
    comments: 4,
    postedDate: "3 days ago",
    image: "/images/property-image-5.jpg"
  },
  {
    id: 96,
    title: "Premium Mess in Notun Bazar",
    location: "Notun Bazar, Dhaka",
    price: "৳7,800",
    type: "Mess Accommodation",
    bedrooms: "Single Room",
    bathrooms: "Attached",
    area: "Single Room",
    features: ["AC", "Meals Included", "WiFi", "TV", "Professional Environment"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Shafiul Azam",
      initials: "SA",
      profilePicture: "/profile-pictures/profile-picture-6.jpg"
    },
    likes: 26,
    comments: 9,
    postedDate: "1 week ago",
    image: "/images/property-image-6.jpg"
  },
  {
    id: 97,
    title: "Affordable House in Narsingdi",
    location: "Madhabdi, Narsingdi",
    price: "৳12,000",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    area: "900 sq.ft",
    features: ["Garden", "Quiet Area", "Near Market", "Family Preferred"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Abdul Alim",
      initials: "AA",
      profilePicture: "/profile-pictures/profile-picture-7.jpg"
    },
    likes: 15,
    comments: 5,
    postedDate: "6 days ago",
    image: "/images/property-image-7.jpg"
  },
  {
    id: 98,
    title: "Modern Apartment in Tongi",
    location: "Tongi, Gazipur",
    price: "৳16,000",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: "950 sq.ft",
    features: ["Elevator", "Security", "Near Station", "Family Preferred"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Mizanur Rahman",
      initials: "MR",
      profilePicture: "/profile-pictures/profile-picture-8.jpg"
    },
    likes: 17,
    comments: 6,
    postedDate: "5 days ago",
    image: "/images/property-image-8.jpg"
  },
  {
    id: 99,
    title: "Student Mess in Panthapath",
    location: "Panthapath, Dhaka",
    price: "৳5,500",
    type: "Mess Seat",
    bedrooms: "Shared Bed",
    bathrooms: "Shared",
    area: "Shared Room",
    features: ["Meals Included", "Study Table", "WiFi", "Near College"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Afsana Begum",
      initials: "AB",
      profilePicture: "/profile-pictures/profile-picture-9.jpg"
    },
    likes: 16,
    comments: 5,
    postedDate: "4 days ago",
    image: "/images/property-image-9.jpg"
  },
  {
    id: 100,
    title: "Premium Flat in Banani DOHS",
    location: "Banani DOHS, Dhaka",
    price: "৳48,000",
    type: "Flat",
    bedrooms: 3,
    bathrooms: 3,
    area: "1850 sq.ft",
    features: ["Modern Design", "Security", "Elevator", "Parking", "Gym"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Tanvir Ahmed",
      initials: "TA",
      profilePicture: "/profile-pictures/profile-picture-10.jpg"
    },
    likes: 39,
    comments: 16,
    postedDate: "2 weeks ago",
    image: "/images/property-image-10.jpg"
  },
  {
    id: 101,
    title: "Family Home in Keraniganj",
    location: "South Keraniganj, Dhaka",
    price: "৳17,000",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    area: "1300 sq.ft",
    features: ["Garden", "Garage", "Near Market", "River View"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Kamrul Islam",
      initials: "KI",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 21,
    comments: 7,
    postedDate: "1 week ago",
    image: "/images/property-image-11.jpg"
  },
  {
    id: 102,
    title: "Executive Mess for Professionals",
    location: "Elephant Road, Dhaka",
    price: "৳9,000",
    type: "Mess Accommodation",
    bedrooms: "Single Room",
    bathrooms: "Shared",
    area: "Single Room",
    features: ["AC", "WiFi", "Meals Optional", "Professional Environment"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Jahangir Alam",
      initials: "JA",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 24,
    comments: 9,
    postedDate: "1 week ago",
    image: "/images/property-image-12.jpg"
  },
  {
    id: 103,
    title: "Affordable Flat in Mohakhali",
    location: "Mohakhali, Dhaka",
    price: "৳14,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "850 sq.ft",
    features: ["Gas Connection", "Water Supply", "Near Bus Stop"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Arifur Rahman",
      initials: "AR",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 16,
    comments: 5,
    postedDate: "4 days ago",
    image: "/images/property-image-13.jpg"
  },
  {
    id: 104,
    title: "Premium House in Mymensingh",
    location: "Chorpara, Mymensingh",
    price: "৳25,000",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    area: "1700 sq.ft",
    features: ["Garden", "Modern Design", "Garage", "Near Agricultural University"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Farid Ahmed",
      initials: "FA",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 27,
    comments: 10,
    postedDate: "10 days ago",
    image: "/images/property-image-14.jpg"
  },
  {
    id: 105,
    title: "Female Mess Seat in Jigatola",
    location: "Jigatola, Dhaka",
    price: "৳5,200",
    type: "Mess Seat",
    bedrooms: "Single Bed",
    bathrooms: "Shared",
    area: "Single Bed",
    features: ["Meals Included", "WiFi", "Study Table", "Female Only", "Near Dhaka University"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Nasrin Akter",
      initials: "NA",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 18,
    comments: 6,
    postedDate: "5 days ago",
    image: "/images/property-image-15.jpg"
  },
  {
    id: 106,
    title: "Modern Apartment in Rupnagar",
    location: "Rupnagar, Mirpur, Dhaka",
    price: "৳22,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1300 sq.ft",
    features: ["Modern Design", "Security", "Elevator", "Parking"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Wahid Ahmed",
      initials: "WA",
      profilePicture: "/profile-pictures/profile-picture-6.jpg"
    },
    likes: 23,
    comments: 8,
    postedDate: "1 week ago",
    image: "/images/property-image-1.jpg"
  },
  {
    id: 107,
    title: "Luxury Home in Foy's Lake Area",
    location: "Foy's Lake, Chittagong",
    price: "৳45,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: "2500 sq.ft",
    features: ["Lake View", "Modern Design", "Garden", "Swimming Pool", "Tourist Area"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Mahbubul Alam",
      initials: "MA",
      profilePicture: "/profile-pictures/profile-picture-7.jpg"
    },
    likes: 42,
    comments: 17,
    postedDate: "3 weeks ago",
    image: "/images/property-image-2.jpg"
  },
  {
    id: 108,
    title: "Student Mess in Khulna University Area",
    location: "Gollamari, Khulna",
    price: "৳4,500",
    type: "Mess Accommodation",
    bedrooms: "Multiple",
    bathrooms: "Shared",
    area: "950 sq.ft",
    features: ["2 Meals Daily", "Study Room", "WiFi", "Near Khulna University"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Jasim Uddin",
      initials: "JU",
      profilePicture: "/profile-pictures/profile-picture-8.jpg"
    },
    likes: 19,
    comments: 7,
    postedDate: "6 days ago",
    image: "/images/property-image-3.jpg"
  },
  {
    id: 109,
    title: "Compact Studio in Mohammadpur",
    location: "Mohammadpur, Dhaka",
    price: "৳11,000",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 1,
    area: "450 sq.ft",
    features: ["Studio Layout", "Single Person", "Furnished", "Near Bus Stop"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Kabir Khan",
      initials: "KK",
      profilePicture: "/profile-pictures/profile-picture-9.jpg"
    },
    likes: 14,
    comments: 4,
    postedDate: "3 days ago",
    image: "/images/property-image-4.jpg"
  },
  {
    id: 110,
    title: "Traditional Home in Comilla",
    location: "Kandirpar, Comilla",
    price: "৳18,000",
    type: "House",
    bedrooms: 3,
    bathrooms: 1,
    area: "1200 sq.ft",
    features: ["Traditional Design", "Garden", "Quiet Area", "Family Preferred"],
    available: "Available Soon",
    featured: false,
    landlord: {
      name: "Rashid Ahmed",
      initials: "RA",
      profilePicture: "/profile-pictures/profile-picture-10.jpg"
    },
    likes: 20,
    comments: 7,
    postedDate: "1 week ago",
    image: "/images/property-image-5.jpg"
  },
  {
    id: 111,
    title: "Professional Mess for Women",
    location: "Indira Road, Dhaka",
    price: "৳8,200",
    type: "Mess Accommodation",
    bedrooms: "Single Room",
    bathrooms: "Shared",
    area: "Single Room",
    features: ["AC", "Meals Optional", "WiFi", "Female Only", "Professional Environment"],
    available: "Available Now",
    featured: true,
    landlord: {
      name: "Samina Chowdhury",
      initials: "SC",
      profilePicture: "/profile-pictures/profile-picture-1.jpg"
    },
    likes: 28,
    comments: 11,
    postedDate: "9 days ago",
    image: "/images/property-image-6.jpg"
  },
  {
    id: 112,
    title: "Affordable Flat in Gazipur City",
    location: "Joydebpur, Gazipur",
    price: "৳13,000",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    area: "850 sq.ft",
    features: ["Gas Connection", "Water Supply", "Near Market", "Factory Area"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Mostafa Rahman",
      initials: "MR",
      profilePicture: "/profile-pictures/profile-picture-2.jpg"
    },
    likes: 16,
    comments: 5,
    postedDate: "4 days ago",
    image: "/images/property-image-7.jpg"
  },
  {
    id: 113,
    title: "Beachfront Cottage in Cox's Bazar",
    location: "Kolatoli Beach, Cox's Bazar",
    price: "৳35,000",
    type: "House",
    bedrooms: 2,
    bathrooms: 2,
    area: "1100 sq.ft",
    features: ["Beach View", "Modern Design", "Tourist Area", "Vacation Rental"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Rafiqul Islam",
      initials: "RI",
      profilePicture: "/profile-pictures/profile-picture-3.jpg"
    },
    likes: 52,
    comments: 23,
    postedDate: "3 weeks ago",
    image: "/images/property-image-8.jpg"
  },
  {
    id: 114,
    title: "Student Apartment in North South University Area",
    location: "Bashundhara R/A, Dhaka",
    price: "৳16,500",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: "950 sq.ft",
    features: ["Students Preferred", "Furnished", "Near NSU", "Security"],
    available: "Available Now",
    featured: false,
    landlord: {
      name: "Nazmul Hasan",
      initials: "NH",
      profilePicture: "/profile-pictures/profile-picture-4.jpg"
    },
    likes: 24,
    comments: 9,
    postedDate: "1 week ago",
    image: "/images/property-image-9.jpg"
  },
  {
    id: 115,
    title: "Luxury Penthouse in Uttara",
    location: "Sector 4, Uttara, Dhaka",
    price: "৳95,000",
    type: "Apartment",
    bedrooms: 4,
    bathrooms: 4,
    area: "3200 sq.ft",
    features: ["Penthouse", "Rooftop Garden", "Modern Design", "Private Elevator", "Gym", "Smart Home"],
    available: "Available Soon",
    featured: true,
    landlord: {
      name: "Faisal Mahmud",
      initials: "FM",
      profilePicture: "/profile-pictures/profile-picture-5.jpg"
    },
    likes: 48,
    comments: 21,
    postedDate: "1 month ago",
    image: "/images/property-image-10.jpg"
  }
];

export default function ListingsPage() {
  const searchParams = useSearchParams()
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("Newest First")
  const [filteredProperties, setFilteredProperties] = useState(properties)
  
  // Get location from URL query parameter
  useEffect(() => {
    const locationParam = searchParams.get('location')
    if (locationParam) {
      setSelectedLocation(locationParam)
    }
    
    // Get search term from URL query parameter
    const searchParam = searchParams.get('search')
    if (searchParam) {
      setSearchTerm(searchParam)
    }
  }, [searchParams])
  
  // For grid view, we'll show 6 items per page, for list view 3 items
  const itemsPerPage = viewMode === "grid" ? 6 : 3
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...properties]
    
    // Apply search term filter
    if (searchTerm) {
      result = result.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply location filter
    if (selectedLocation) {
      result = result.filter(property => 
        property.location.toLowerCase().includes(selectedLocation.toLowerCase())
      )
    }
    
    // Apply property type filter
    if (selectedPropertyType) {
      const typeMap: Record<string, string[]> = {
        "Apartments": ["Apartment", "Flat"],
        "Houses": ["House", "Villa"],
        "Mess Accommodations": ["Mess Accommodation"],
        "Mess Seats": ["Mess Seat"]
      }
      
      const typesToFilter = typeMap[selectedPropertyType] || []
      if (typesToFilter.length) {
        result = result.filter(property => 
          typesToFilter.some(type => property.type.includes(type))
        )
      }
    }
    
    // Apply sorting
    if (sortBy === "Newest First") {
      // Assume that lower IDs are newer for this example
      result = result.sort((a, b) => a.id - b.id)
    } else if (sortBy === "Oldest First") {
      result = result.sort((a, b) => b.id - a.id)
    } else if (sortBy === "Most Liked") {
      result = result.sort((a, b) => b.likes - a.likes)
    } else if (sortBy === "Most Commented") {
      result = result.sort((a, b) => b.comments - a.comments)
    }
    
    setFilteredProperties(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedLocation, selectedPropertyType, sortBy])
  
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  
  // Get current properties based on pagination
  const indexOfLastProperty = currentPage * itemsPerPage
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty)
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top of listings section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
  }

  // Clear all filters and reset to initial state
  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedLocation("")
    setSelectedPropertyType("")
    setSortBy("Newest First")
    
    // Update URL by removing the query parameter
    const url = new URL(window.location.href)
    url.searchParams.delete('location')
    window.history.replaceState({}, '', url)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Rental Listings</h1>
            <p className="text-muted-foreground">Browse all available rental properties</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant={viewMode === "grid" ? "default" : "ghost"} 
                size="sm"
                className="flex items-center gap-1 rounded-none"
                onClick={() => {
                  setViewMode("grid")
                  setCurrentPage(1) // Reset to first page when changing view
                }}
              >
                <Grid className="h-4 w-4" />
                Grid
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"} 
                size="sm"
                className="flex items-center gap-1 rounded-none"
                onClick={() => {
                  setViewMode("list")
                  setCurrentPage(1) // Reset to first page when changing view
                }}
              >
                <List className="h-4 w-4" />
                List
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <Card className="md:col-span-1 h-fit">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                {/* Search */}
                <div>
                  <h3 className="font-medium mb-2">Search</h3>
                  <div className="relative">
                    <Input
                      placeholder="Search listings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Location</h3>
                  <LocationFilter onLocationSelect={handleLocationSelect} />
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Property Type</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { name: "Apartments", icon: <Building className="h-4 w-4" /> },
                      { name: "Houses", icon: <Home className="h-4 w-4" /> },
                      { name: "Mess Accommodations", icon: <Building className="h-4 w-4" /> },
                      { name: "Mess Seats", icon: <MapPin className="h-4 w-4" /> },
                    ].map((type, i) => (
                      <Button 
                        key={i} 
                        variant={selectedPropertyType === type.name ? "default" : "outline"} 
                        className="justify-start gap-2 h-auto py-2"
                        onClick={() => setSelectedPropertyType(selectedPropertyType === type.name ? "" : type.name)}
                      >
                        {type.icon}
                        {type.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Sort By</h3>
                  <div className="flex flex-col gap-2">
                    {["Newest First", "Oldest First", "Most Liked", "Most Commented"].map((option, i) => (
                      <Button 
                        key={i} 
                        variant={sortBy === option ? "default" : "outline"} 
                        className="justify-start h-auto py-2"
                        onClick={() => setSortBy(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Clear Filters */}
                {(searchTerm || selectedLocation || selectedPropertyType) && (
                  <div className="border-t pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={clearAllFilters}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Listings Content */}
          <div className="md:col-span-3">
            {/* Results count */}
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
              {(searchTerm || selectedLocation || selectedPropertyType) && ' with applied filters'}
            </div>
            
            {filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 text-muted-foreground">
                  <Building className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">No properties found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {currentProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-48">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
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
                      <div className="flex-1 p-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-2">
                          <div>
                            <h3 className="font-medium text-lg hover:text-primary transition-colors">
                              <Link href={`/listing/${property.id}`}>{property.title}</Link>
                            </h3>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>{property.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap justify-end">
                            <Badge variant="outline" className="whitespace-nowrap">
                              {property.available}
                            </Badge>
                            {property.featured && <Badge>Featured</Badge>}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4 mt-3">
                          <Badge variant="outline" className="bg-muted/50">
                            {property.type}
                          </Badge>
                          <Badge variant="outline" className="bg-muted/50">
                            {typeof property.bedrooms === 'number' 
                              ? `${property.bedrooms} ${property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`
                              : property.bedrooms}
                          </Badge>
                          <Badge variant="outline" className="bg-muted/50">
                            {property.bathrooms}
                          </Badge>
                          <Badge variant="outline" className="bg-muted/50">
                            {property.area}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {property.features.slice(0, 3).map((feature, index) => (
                            <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                          {property.features.length > 3 && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-xs bg-muted px-2 py-1 rounded-full cursor-help">
                                    +{property.features.length - 3} more
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="space-y-1">
                                    {property.features.slice(3).map((feature, i) => (
                                      <div key={i} className="text-xs">{feature}</div>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t pt-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={property.landlord.profilePicture} alt={property.landlord.name} />
                                <AvatarFallback>{property.landlord.initials}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{property.landlord.name}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {property.postedDate}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 sm:gap-6">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                <Heart className="h-4 w-4" />
                                <span>{property.likes}</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                <MessageCircle className="h-4 w-4" />
                                <span>{property.comments}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button asChild size="sm" variant="outline">
                                <Link href={`/listing/${property.id}`}>View Details</Link>
                              </Button>
                              <Button size="sm" variant="default" className="gap-1">
                                <MessageCircle className="h-4 w-4" />
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination - only show if there are properties to display */}
            {filteredProperties.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  
                  {/* First page */}
                  {totalPages > 0 && (
                    <Button 
                      variant={currentPage === 1 ? "default" : "outline"} 
                      size="sm" 
                      className="w-9"
                      onClick={() => handlePageChange(1)}
                    >
                      1
                    </Button>
                  )}

                  {/* Left ellipsis */}
                  {currentPage > 3 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9"
                      disabled
                    >
                      ...
                    </Button>
                  )}

                  {/* Pages around current page */}
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNumber = i + 1;
                    // Show 1 page before and after current page
                    if (
                      pageNumber !== 1 &&
                      pageNumber !== totalPages &&
                      pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1
                    ) {
                      return (
                        <Button 
                          key={i} 
                          variant={currentPage === pageNumber ? "default" : "outline"} 
                          size="sm" 
                          className="w-9"
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      );
                    }
                    return null;
                  })}

                  {/* Right ellipsis */}
                  {currentPage < totalPages - 2 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9"
                      disabled
                    >
                      ...
                    </Button>
                  )}

                  {/* Last page */}
                  {totalPages > 1 && (
                    <Button 
                      variant={currentPage === totalPages ? "default" : "outline"} 
                      size="sm" 
                      className="w-9"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  )}

                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
