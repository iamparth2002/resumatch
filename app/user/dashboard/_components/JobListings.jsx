import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Calendar, Users, Briefcase, DollarSign, Filter } from 'lucide-react'

const jobListings = [
  { 
    id: 1, 
    title: "Frontend Developer", 
    company: "TechCorp", 
    location: "Remote",
    workType: "WFH",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    jobOffer: "$80,000 - $120,000",
    startDate: "Immediate",
    openings: 2,
    experience: "2-5 years",
    logo: "/techcorp-logo.png"
  },
  { 
    id: 2, 
    title: "Backend Engineer", 
    company: "DataSys", 
    location: "New York, NY", 
    workType: "In-office",
    skills: ["Node.js", "Python", "MongoDB"],
    jobOffer: "$90,000 - $130,000",
    startDate: "August 1, 2023",
    openings: 3,
    experience: "3-7 years",
    logo: "/datasys-logo.png"
  },
  { 
    id: 3, 
    title: "Full Stack Developer", 
    company: "WebSolutions", 
    location: "San Francisco, CA", 
    workType: "Hybrid",
    skills: ["React", "Node.js", "PostgreSQL", "Docker"],
    jobOffer: "$100,000 - $150,000",
    startDate: "September 1, 2023",
    openings: 1,
    experience: "5+ years",
    logo: "/websolutions-logo.png"
  },
  { 
    id: 4, 
    title: "UI/UX Designer", 
    company: "DesignHub", 
    location: "London, UK", 
    workType: "In-office",
    skills: ["Figma", "Adobe XD", "Sketch"],
    jobOffer: "£50,000 - £70,000",
    startDate: "October 1, 2023",
    openings: 2,
    experience: "3-6 years",
    logo: "/designhub-logo.png"
  },
]

export default function JobListings() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState([])

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const filteredJobs = jobListings.filter(job =>
    (searchTerm === "" || 
     job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (activeFilters.length === 0 || 
     activeFilters.includes(job.workType) ||
     activeFilters.some(filter => job.skills.includes(filter)))
  )

  const filterButtons = [
    { label: "WFH", value: "WFH" },
    { label: "In-office", value: "In-office" },
    { label: "Hybrid", value: "Hybrid" },
    { label: "React", value: "React" },
    { label: "Node.js", value: "Node.js" },
    { label: "Python", value: "Python" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search jobs, companies, or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <Filter className="h-5 w-5 text-gray-500" />
        {filterButtons.map((button) => (
          <Button
            key={button.value}
            variant={activeFilters.includes(button.value) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter(button.value)}
          >
            {button.label}
          </Button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map(job => (
          <Card key={job.id} className="flex flex-col hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out ">
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={job.logo} alt={`${job.company} logo`} />
                    <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{job.title}</CardTitle>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                </div>
                <Badge variant={job.workType === "WFH" ? "secondary" : job.workType === "Hybrid" ? "outline" : "default"}>
                  {job.workType}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-0">
              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{job.jobOffer}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">Start: {job.startDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">Openings: {job.openings}</span>
                </div>
                <div className="flex items-center text-gray-600 col-span-2">
                  <Briefcase className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">Experience: {job.experience}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                ))}
              </div>
            </CardContent>
            <div className="p-4 pt-0 mt-auto">
              <div className="flex space-x-2">
                <Button className="flex-1 text-sm" variant="outline">View</Button>
                <Button className="flex-1 text-sm">Apply</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}