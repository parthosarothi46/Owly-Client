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
import news from "../assets/newsletter.json";
import Lottie from "lottie-react";

export default function Newsletter() {
  return (
    <div className="container mx-auto py-10 px-4 xl:px-0">
      <div className="flex flex-col md:flex-row justify-around gap-5">
        <div>
          <Lottie animationData={news}></Lottie>
        </div>
        <div>
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Subscribe to our newsletter</CardTitle>
              <CardDescription>
                Stay up to date with the latest news, updates, and special
                offers.
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
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
