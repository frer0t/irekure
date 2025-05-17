"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComplaintFormData } from "@/lib/zod/form";
import { Tables } from "@/types/supabase";
import { UseFormReturn } from "react-hook-form";

interface ComplaintDetailsFormProps {
  form: UseFormReturn<ComplaintFormData>;
  categories: Tables<"categories">[];
  loading: boolean;
}

export function ComplaintDetailsForm({
  form,
  categories,
  loading,
}: ComplaintDetailsFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ikiciro cy'ikibazo</FormLabel>
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={loading ? "Gutegereza..." : "Hitamo ikiciro"}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="w-full ">
                {categories?.map((category) => (
                  <SelectItem key={category.cat_id} value={category.cat_id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inyito y'ikibazo</FormLabel>
            <FormControl>
              <Input
                placeholder="Tanga inyito ngufi y'ikibazo cyawe"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
