import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, FileText, Edit } from 'lucide-react'
import Link from 'next/link'

// Mock data for existing resumes
const existingResumes = [
  { id: 1, title: "Software Developer Resume", lastEdited: "2023-06-15" },
  { id: 2, title: "Data Analyst Resume", lastEdited: "2023-05-20" },
  { id: 3, title: "Project Manager Resume", lastEdited: "2023-04-10" },
]

export default function ResumeSection() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Resumes</h2>
        <Link href="/create-resume">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Resume
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {existingResumes.map((resume) => (
          <Card key={resume.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{resume.title}</span>
                <FileText className="h-5 w-5 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Last edited: {new Date(resume.lastEdited).toLocaleDateString()}
              </p>
              <div className="flex space-x-2">
                <Link href={`/view-resume/${resume.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">View</Button>
                </Link>
                <Link href={`/edit-resume/${resume.id}`} className="flex-1">
                  <Button className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}