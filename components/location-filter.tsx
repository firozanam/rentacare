"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface LocationFilterProps {
  onLocationSelect?: (location: string) => void;
}

type DistrictMap = {
  [key: string]: string[];
};

type ThanaMap = {
  [key: string]: string[];
};

type AreaMap = {
  [key: string]: string[];
};

export default function LocationFilter({ onLocationSelect }: LocationFilterProps = {}) {
  const [division, setDivision] = useState("")
  const [district, setDistrict] = useState("")
  const [thana, setThana] = useState("")
  const [area, setArea] = useState("")

  // Mock data - in a real app, these would be fetched from an API
  const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"]
  
  const districts: DistrictMap = {
    Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail"],
    Chittagong: ["Chittagong", "Cox's Bazar", "Comilla"],
    // Other divisions would have their districts
  }
  
  const thanas: ThanaMap = {
    Dhaka: ["Gulshan", "Banani", "Dhanmondi", "Mirpur", "Uttara"],
    Gazipur: ["Gazipur Sadar", "Kaliakair", "Kaliganj"],
    // Other districts would have their thanas
  }
  
  const areas: AreaMap = {
    Gulshan: ["Gulshan 1", "Gulshan 2"],
    Banani: ["Banani DOHS", "Banani 11"],
    // Other thanas would have their areas
  }

  // Create a complete location string when any part changes
  useEffect(() => {
    const parts = [area, thana, district, division].filter(Boolean);
    if (parts.length > 0 && onLocationSelect) {
      onLocationSelect(parts.join(", "));
    }
  }, [division, district, thana, area, onLocationSelect]);

  // Handle division change - reset child selections
  const handleDivisionChange = (value: string) => {
    setDivision(value);
    setDistrict("");
    setThana("");
    setArea("");
  };

  // Handle district change - reset child selections
  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setThana("");
    setArea("");
  };

  // Handle thana change - reset area
  const handleThanaChange = (value: string) => {
    setThana(value);
    setArea("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <Select value={division} onValueChange={handleDivisionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Division" />
            </SelectTrigger>
            <SelectContent>
              {divisions.map((div) => (
                <SelectItem key={div} value={div}>
                  {div}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={district} onValueChange={handleDistrictChange} disabled={!division}>
            <SelectTrigger>
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              {division &&
                districts[division]?.map((dist) => (
                  <SelectItem key={dist} value={dist}>
                    {dist}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={thana} onValueChange={handleThanaChange} disabled={!district}>
            <SelectTrigger>
              <SelectValue placeholder="Thana" />
            </SelectTrigger>
            <SelectContent>
              {district &&
                thanas[district]?.map((th) => (
                  <SelectItem key={th} value={th}>
                    {th}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={area} onValueChange={setArea} disabled={!thana}>
            <SelectTrigger>
              <SelectValue placeholder="Area" />
            </SelectTrigger>
            <SelectContent>
              {thana &&
                areas[thana]?.map((ar) => (
                  <SelectItem key={ar} value={ar}>
                    {ar}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {!onLocationSelect && (
        <Button className="w-full md:w-auto md:self-end gap-2">
          <Search className="h-4 w-4" />
          Search Listings
        </Button>
      )}
    </div>
  )
}
