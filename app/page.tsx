import Component from "../crypto-ranking-board"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export default function Page() {
  return (
    <div>
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
              암호화폐 순위 보드
            </Link>
            <nav>
              <Link href="/profile">
                <Button variant="ghost" className="text-white hover:text-gray-300 hover:bg-gray-800">
                  <User className="w-4 h-4 mr-2" />
                  프로필
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <Component />
    </div>
  )
}
