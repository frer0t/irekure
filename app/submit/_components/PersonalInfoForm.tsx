"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComplaintFormData } from "@/lib/zod/form";
import { UseFormReturn } from "react-hook-form";

interface PersonalInfoFormProps {
  form: UseFormReturn<ComplaintFormData>;
}

export function PersonalInfoForm({ form }: PersonalInfoFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Amazina yawe</FormLabel>
            <FormControl>
              <Input placeholder="Andika amazina yawe yose" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Imeyili</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="imeyili@urugero.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefoni</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="07X XXX XXXX"
                {...field}
                maxLength={10}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
