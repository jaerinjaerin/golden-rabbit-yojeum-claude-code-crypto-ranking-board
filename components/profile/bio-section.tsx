"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function BioSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>소개</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bio">자기소개</Label>
          <Textarea
            id="bio"
            placeholder="자기소개를 입력하세요"
            defaultValue="안녕하세요"
            className="min-h-[120px] resize-none"
          />
        </div>
        <Button className="w-full">저장</Button>
      </CardContent>
    </Card>
  )
}
