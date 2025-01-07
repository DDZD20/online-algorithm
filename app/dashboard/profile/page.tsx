import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "./profile-form"

export default function SettingsProfilePage() {
    return (
      <div className="max-w-2xl mx-auto p-6 md:p-10">
        <div className="space-y-0.5 mb-6">
          <h3 className="text-2xl font-semibold tracking-tight">个人资料</h3>
          <p className="text-muted-foreground">
            管理您的个人信息和账户设置
          </p>
        </div>
        <Separator className="my-6" />
        <ProfileForm />
      </div>
    )
  }