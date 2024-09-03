import { Clock, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TimeFilter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-2 justify-between bg-white text-blue-900 border-blue-900 hover:bg-blue-90">
          <div className="flex items-center">
            <Clock className="mr-2 size-6 border-r border-r-blue-900 pr-1" />
            <span>Last 2 days</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Last 2 days</DropdownMenuItem>
        <DropdownMenuItem>Last week</DropdownMenuItem>
        <DropdownMenuItem>Last month</DropdownMenuItem>
        <DropdownMenuItem>Last year</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}