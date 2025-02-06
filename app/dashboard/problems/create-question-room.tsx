import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"
import Image from "next/image"

type CreateQuestionRoomProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (settings: RoomSettings) => void;
  problemId: string;
};

type RoomSettings = {
  mode: 'single' | 'multi';
  maxPlayers: number;
  password?: string;
  fastSubmit: boolean;
};

export function CreateQuestionRoom({ isOpen, onClose, onConfirm, problemId }: CreateQuestionRoomProps) {
  const [settings, setSettings] = useState<RoomSettings>({
    mode: 'single',
    maxPlayers: 2,
    password: '',
    fastSubmit: false,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>创建题目房间</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>模式选择</Label>
            <RadioGroup
              defaultValue={settings.mode}
              onValueChange={(value) => setSettings({ ...settings, mode: value as 'single' | 'multi' })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single">单人模式</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multi" id="multi" />
                <Label htmlFor="multi">多人模式</Label>
              </div>
            </RadioGroup>
          </div>

          <Collapsible open={settings.mode === 'multi'}>
            <CollapsibleContent className="space-y-4 transition-all duration-300 ease-in-out">
              <div className="grid gap-2">
                <Label>房间人数上限</Label>
                <Select
                  value={settings.maxPlayers.toString()}
                  onValueChange={(value) => setSettings({ ...settings, maxPlayers: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择人数" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} 人
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="grid gap-2">
            <Label>房间密码（可选）</Label>
            <Input
              type="password"
              value={settings.password}
              onChange={(e) => setSettings({ ...settings, password: e.target.value })}
              placeholder="请输入6位数字"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="fastSubmit"
              checked={settings.fastSubmit}
              onCheckedChange={(checked) => 
                setSettings({ ...settings, fastSubmit: checked as boolean })
              }
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image src="/dialog-info.svg" alt="info" width={20} height={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>极速提交模式下，代码运行在本地执行，提交后立即显示结果</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Label htmlFor="fastSubmit">极速提交模式</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={() => onConfirm(settings)}>
            确定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}