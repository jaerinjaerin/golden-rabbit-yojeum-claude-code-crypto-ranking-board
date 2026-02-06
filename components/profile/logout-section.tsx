"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function LogoutSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>로그아웃</CardTitle>
        <CardDescription>
          계정에서 로그아웃합니다
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="destructive" className="w-full">
          로그아웃
        </Button>
      </CardContent>
    </Card>
  )
}
