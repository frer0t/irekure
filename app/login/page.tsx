"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { login } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Login Card */}
        <Card className="w-full border shadow-md">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl font-bold text-center">
              Kwinjira
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  Imeyili
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  Ijambo ryibanga
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  formAction={login}
                  variant="default"
                  size="lg"
                  className="w-full"
                >
                  injira
                </Button>
                {/* <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      cyangwa
                    </span>
                  </div>
                </div>
                <Button
                  formAction={signup}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Kwiyandikisha
                </Button> */}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
