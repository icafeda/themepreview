// Cài component cần thiết (chạy 1 lần):
// npx shadcn@latest add button card input label badge tabs switch checkbox alert progress separator slider
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { Checkbox } from "../components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Slider } from "../components/ui/slider";

type Vars = Record<string, string>;

const f = (n: number) => +n.toFixed(3);
const ok = (l: number, c: number, h: number) =>
  `oklch(${f(l)} ${f(c)} ${f(h)})`;
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const first = (v: number | readonly number[]) =>
  typeof v === "number" ? v : v[0];

// Sinh toàn bộ biến màu từ L, C, H của màu chính (+ hue điểm nhấn)
function buildTheme(L: number, C: number, H: number, HA: number) {
  const k = Math.min(1, C / 0.15); // C thấp thì các màu nền cũng bớt ngả màu
  const Ld = clamp(L + 0.08, 0.5, 0.88); // màu chính ở chế độ tối sáng hơn một chút

  const light: Vars = {
    "--background": ok(0.99, 0.006 * k, H),
    "--foreground": ok(0.22, 0.03 * k, H),
    "--card": ok(1, 0, 0),
    "--card-foreground": ok(0.22, 0.03 * k, H),
    "--popover": ok(1, 0, 0),
    "--popover-foreground": ok(0.22, 0.03 * k, H),
    "--primary": ok(L, C, H),
    "--primary-foreground": L > 0.7 ? ok(0.2, 0.03 * k, H) : ok(0.99, 0, 0),
    "--secondary": ok(0.95, 0.04 * k, H),
    "--secondary-foreground": ok(0.3, 0.06 * k, H),
    "--muted": ok(0.96, 0.015 * k, H),
    "--muted-foreground": ok(0.5, 0.04 * k, H),
    "--accent": ok(0.88, 0.15 * k, HA),
    "--accent-foreground": ok(0.3, 0.07 * k, HA),
    "--destructive": ok(0.62, 0.24, 27),
    "--border": ok(0.92, 0.02 * k, H),
    "--input": ok(0.92, 0.02 * k, H),
    "--ring": ok(L, C, H),
  };

  const dark: Vars = {
    "--background": ok(0.2, 0.03 * k, H),
    "--foreground": ok(0.97, 0.01 * k, H),
    "--card": ok(0.25, 0.035 * k, H),
    "--card-foreground": ok(0.97, 0.01 * k, H),
    "--popover": ok(0.25, 0.035 * k, H),
    "--popover-foreground": ok(0.97, 0.01 * k, H),
    "--primary": ok(Ld, C, H),
    "--primary-foreground": Ld > 0.7 ? ok(0.2, 0.03 * k, H) : ok(0.99, 0, 0),
    "--secondary": ok(0.3, 0.04 * k, H),
    "--secondary-foreground": ok(0.97, 0.01 * k, H),
    "--muted": ok(0.3, 0.03 * k, H),
    "--muted-foreground": ok(0.72, 0.04 * k, H),
    "--accent": ok(0.8, 0.16 * k, HA),
    "--accent-foreground": ok(0.25, 0.05 * k, HA),
    "--destructive": ok(0.7, 0.2, 25),
    "--border": ok(0.35, 0.04 * k, H),
    "--input": ok(0.35, 0.04 * k, H),
    "--ring": ok(Ld, C, H),
  };
  return { light, dark };
}



const toCss = (sel: string, v: Vars) =>
  `${sel} {\n${Object.entries(v)
    .map(([k, val]) => `  ${k}: ${val};`)
    .join("\n")}\n}`;

const swatches = [
  ["background", "bg-background text-foreground"],
  ["card", "bg-card text-card-foreground"],
  ["primary", "bg-primary text-primary-foreground"],
  ["secondary", "bg-secondary text-secondary-foreground"],
  ["muted", "bg-muted text-muted-foreground"],
  ["accent", "bg-accent text-accent-foreground"],
  ["destructive", "bg-destructive text-white"],
];

function Showcase({ id }: { id: string }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {swatches.map(([name, cls]) => (
          <div
            key={name}
            className={`rounded-md border px-3 py-2 text-xs font-medium ${cls}`}
          >
            {name}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
        <Button disabled>Disabled</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Biểu mẫu</CardTitle>
          <CardDescription>Bấm vào ô nhập để thấy viền focus.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input id={`${id}-email`} placeholder="ten@congty.vn" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-agree`} defaultChecked />
            <Label htmlFor={`${id}-agree`}>Đồng ý điều khoản</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id={`${id}-notify`} defaultChecked />
            <Label htmlFor={`${id}-notify`}>Nhận thông báo</Label>
          </div>
          <Slider defaultValue={[40]} max={100} step={1} />
          <Progress value={65} />
          <Button className="w-full">Lưu thay đổi</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tổng quan</TabsTrigger>
          <TabsTrigger value="b">Chi tiết</TabsTrigger>
          <TabsTrigger value="c">Cài đặt</TabsTrigger>
        </TabsList>
        <TabsContent value="a" className="text-sm text-muted-foreground">
          Chữ phụ dùng màu muted-foreground.
        </TabsContent>
        <TabsContent value="b" className="text-sm text-muted-foreground">
          Nội dung tab chi tiết.
        </TabsContent>
        <TabsContent value="c" className="text-sm text-muted-foreground">
          Nội dung tab cài đặt.
        </TabsContent>
      </Tabs>

      <Alert>
        <AlertTitle>Thông báo</AlertTitle>
        <AlertDescription>Đây là cảnh báo mặc định.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Có lỗi</AlertTitle>
        <AlertDescription>Không lưu được, hãy thử lại.</AlertDescription>
      </Alert>
    </div>
  );
}

export default function ThemePreview() {
  const [L, setL] = useState(0.64);
  const [C, setC] = useState(0.19);
  const [H, setH] = useState(150);
  const [HA, setHA] = useState(85);
  const [copied, setCopied] = useState(false);

  // Trang điều khiển luôn ở chế độ sáng, hai khung bên dưới tự có theme riêng
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const theme = useMemo(() => buildTheme(L, C, H, HA), [L, C, H, HA]);
  const css = useMemo(
    () => `${toCss(":root", theme.light)}\n\n${toCss(".dark", theme.dark)}`,
    [theme],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* trình duyệt chặn clipboard: bấm chọn đoạn CSS và chép tay */
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Thanh trượt */}
      <div className="border-b bg-background sm:sticky sm:top-0 sm:z-10">
        <div className="mx-auto grid max-w-6xl gap-4 p-4 sm:grid-cols-4">
          <div className="space-y-2">
            <Label>L (độ sáng): {f(L)}</Label>
            <Slider
              value={[L]}
              min={0.2}
              max={0.95}
              step={0.01}
              onValueChange={(v) => setL(first(v))}
            />
          </div>
          <div className="space-y-2">
            <Label>C (độ rực): {f(C)}</Label>
            <Slider
              value={[C]}
              min={0}
              max={0.3}
              step={0.005}
              onValueChange={(v) => setC(first(v))}
            />
          </div>
          <div className="space-y-2">
            <Label>H (sắc độ): {Math.round(H)}</Label>
            <Slider
              value={[H]}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => setH(first(v))}
            />
          </div>
          <div className="space-y-2">
            <Label>H điểm nhấn: {Math.round(HA)}</Label>
            <Slider
              value={[HA]}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => setHA(first(v))}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-6 p-4">
        {/* Hai khung: sáng và tối */}
        <div className="grid gap-4 lg:grid-cols-2">
          <section
            style={theme.light as CSSProperties}
            className="space-y-3 rounded-xl border bg-background p-4 text-foreground"
          >
            <h2 className="font-semibold">Chế độ sáng</h2>
            <Showcase id="light" />
          </section>

          <section
            style={theme.dark as CSSProperties}
            className="dark space-y-3 rounded-xl border bg-background p-4 text-foreground"
          >
            <h2 className="font-semibold">Chế độ tối</h2>
            <Showcase id="dark" />
          </section>
        </div>

        <Separator />

        {/* CSS để chép vào index.css */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold">CSS cho index.css</h2>
            <Button onClick={copy}>{copied ? "Đã chép" : "Chép CSS"}</Button>
          </div>
          <pre className="max-h-80 overflow-auto rounded-lg border bg-muted p-4 text-xs text-foreground">
            {css}
          </pre>
        </section>
      </div>
    </div>
  );
}
