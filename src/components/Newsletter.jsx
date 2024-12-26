/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ncDGZikrp16
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Subscribe to our newsletter</CardTitle>
        <CardDescription>
          Stay up to date with the latest news, updates, and special offers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <Button type="submit" className="w-full">
            Subscribe
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
