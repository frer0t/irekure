"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ComplaintFormData } from "@/lib/zod/form";
import { UseFormReturn } from "react-hook-form";

interface DescriptionFieldProps {
  form: UseFormReturn<ComplaintFormData>;
}

export function DescriptionField({ form }: DescriptionFieldProps) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Ibisobanuro by'ikibazo</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Andika hano ibisobanuro birambuye by'ikibazo cyawe..."
              className="min-h-[150px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
