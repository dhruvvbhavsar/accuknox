import { Button } from "./ui/button";

export default function MyButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="outline"
      className="bg-white text-gray-600 p-2 hover:bg-gray-100"
    >
      {children}
    </Button>
  );
}
