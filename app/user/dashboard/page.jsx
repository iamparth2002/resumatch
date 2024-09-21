'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Briefcase, FileText, User, Award, Menu } from 'lucide-react'
import JobListings from './_components/JobListings'
import ResumeCreator from './_components/ResumeBuilder'
import Profile from './_components/Profile'
import Hackathons from './_components/Hackathons'

const Sidebar = ({ activeSection, setActiveSection, setOpen }) => {
  const navItems = [
    { name: "Jobs", icon: Briefcase },
    { name: "Resume", icon: FileText },
    { name: "Hackathons", icon: Award },
    { name: "Profile", icon: User },
  ]

  return (
    <div className="space-y-4">
      <h2 className="mb-2 px-4 text-2xl font-semibold">ResuMatch</h2>
      <div className="space-y-2 mt-8">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant={activeSection === item.name ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => { setActiveSection(item.name); setOpen(false); }}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Jobs")
  const [open, setOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "Jobs":
        return <JobListings />
      case "Resume":
        return <ResumeCreator />
      case "Profile":
        return <Profile />
      case "Hackathons":
        return <Hackathons />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 bg-white p-4 shadow-md lg:block">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            {/* Menu button for mobile */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} setOpen={setOpen} />
              </SheetContent>
            </Sheet>

            <h1 className="text-2xl font-bold">Job Seeker Dashboard</h1>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <Card>
            <CardHeader>
              <CardTitle>{activeSection}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
