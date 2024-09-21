import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const hackathons = [
  { id: 1, name: "TechInnovate 2023", date: "Aug 15-17, 2023", location: "Virtual" },
  { id: 2, name: "CodeForGood", date: "Sep 5-7, 2023", location: "New York, NY" },
  { id: 3, name: "AI Hackathon", date: "Oct 1-3, 2023", location: "San Francisco, CA" },
  { id: 4, name: "Blockchain Challenge", date: "Nov 10-12, 2023", location: "London, UK" },
]

export default function Hackathons() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {hackathons.map(hackathon => (
        <Card key={hackathon.id}>
          <CardHeader>
            <CardTitle>{hackathon.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Date: {hackathon.date}</p>
            <p className="text-sm text-gray-600">Location: {hackathon.location}</p>
            <Button className="mt-2">Register</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}