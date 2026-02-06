"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function PasswordSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>비밀번호 변경</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">현재 비밀번호</Label>
          <Input
            id="current-password"
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">새 비밀번호</Label>
          <Input
            id="new-password"
            type="password"
            placeholder="새 비밀번호를 입력하세요"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">비밀번호 확인</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>
        <Button className="w-full">비밀번호 변경</Button>
      </CardContent>
    </Card>
  )
}
