"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileImageSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필 이미지</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="h-32 w-32">
          <AvatarImage src="" alt="프로필 이미지" />
          <AvatarFallback className="text-2xl">사용자</AvatarFallback>
        </Avatar>
        <Button variant="outline" className="w-full">
          이미지 변경
        </Button>
      </CardContent>
    </Card>
  )
}
