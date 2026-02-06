"use client"

import { ProfileImageSection } from "./profile-image-section"
import { BioSection } from "./bio-section"
import { PasswordSection } from "./password-section"
import { LogoutSection } from "./logout-section"

export function ProfileLayout() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">프로필 설정</h1>
        <p className="text-muted-foreground mt-2">
          사용자 정보를 관리하고 설정을 변경할 수 있습니다
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <ProfileImageSection />
          <BioSection />
        </div>

        <div className="space-y-6">
          <PasswordSection />
          <LogoutSection />
        </div>
      </div>
    </div>
  )
}
