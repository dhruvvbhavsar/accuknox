import {
  BellRing,
  ChevronDown,
  CircleUserRound,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import { Input } from "./ui/input";

export const Nav = () => {
  return (
    <nav className="h-10 flex px-6 py-2 items-center justify-between">
      <div className="flex gap-2 items-center">
        <p className="text-sm text-gray-400">Home</p>
        <p className="text-sm text-gray-400">&gt;</p>
        <p className="font-bold text-sm text-blue-950">Dashboard V2</p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative w-32 md:w-96 h-8">
          <Search className="absolute left-2 top-2 size-4 text-gray-400" />
          <Input placeholder="Search" className="pl-8 m-0 h-full bg-gray-100" />
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm">Pro</p>
          <ChevronDown className="size-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-3">
          <BellRing className="size-5  text-gray-400" />
          <CircleUserRound className="size-5 text-gray-400" />
          <Settings className="size-5 text-gray-400" />
          <LogOut className="size-5  text-red-600" />
        </div>
      </div>
    </nav>
  );
};
