"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ImageIcon, FileText, Video } from "lucide-react"

export function ContentTimeline() {
  const timelineItems = [
    {
      id: 1,
      title: "Product Photoshoot",
      date: "Today, 10:00 AM",
      description: "Summer collection photoshoot with Sarah",
      icon: ImageIcon,
      iconBg: "bg-purple-500",
    },
    {
      i: 2,
      title: "Content Planning",
      date: "Today, 2:00 PM",
      description: "Q3 content strategy meeting",
      icon: Calendar,
      iconBg: "bg-blue-500",
    },
    {
      id: 3,
      title: "Copy Review",
      date: "Tomorrow, 11:00 AM",
      description: "Review product descriptions for new items",
      icon: FileText,
      iconBg: "bg-green-500",
    },
    {
      id: 4,
      title: "Video Editing",
      date: "Aug 12, 2023",
      description: "Edit promotional video for fall campaign",
      icon: Video,
      iconBg: "bg-red-500",
    },
  ]

  return (
    <Card className="col-span-1 rounded-[20px] overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Content Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 space-y-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
          {/* Timeline line */}
          <div className="absolute left-2 top-2 bottom-0 w-0.5 bg-secondary"></div>

          {timelineItems.map((item, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className={`absolute -left-6 w-4 h-4 rounded-full ${item.iconBg} flex items-center justify-center`}>
                <item.icon className="h-2 w-2 text-white" />
              </div>

              <div className="bg-secondary p-4 rounded-[20px]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{item.title}</h3>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
