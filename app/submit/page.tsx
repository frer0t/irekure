"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
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
import { Textarea } from "@/components/ui/textarea";
import { FILES_UPLOAD_CONSTANTS } from "@/constants/files-upload";
import { getApi, postApi } from "@/lib/axios/axios";
import { complaintFormSchema, type ComplaintFormData } from "@/lib/zod/form";
import { ComplaintResponse } from "@/types/api";
import { Tables } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CloudUpload, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const Submit = () => {
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { push } = useRouter();

  const form = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      title: "",
      description: "",
      files: [] as File[],
    },
    mode: "all",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getApi<{ categories: Tables<"categories">[] }>(
          "/categories"
        );
        setCategories(response.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setError(null);
      const fileList = Array.from(e.target.files);
      const currentFiles = form.getValues("files") || [];

      const invalidFiles = fileList.filter(
        (file) =>
          !FILES_UPLOAD_CONSTANTS.ACCEPTED_FILE_TYPES.includes(file.type)
      );

      if (invalidFiles.length > 0) {
        setError(FILES_UPLOAD_CONSTANTS.ERROR_MESSAGES.INVALID_FILE_TYPE);
        return;
      }

      const oversizedFiles = fileList.filter(
        (file) => file.size > FILES_UPLOAD_CONSTANTS.MAX_FILE_SIZE
      );

      if (oversizedFiles.length > 0) {
        setError(FILES_UPLOAD_CONSTANTS.ERROR_MESSAGES.FILE_TOO_LARGE);
        return;
      }

      form.setValue("files", [...currentFiles, ...fileList]);
      form.trigger("files");
    }
  };

  const removeAttachment = (index: number) => {
    const currentAttachments = form.getValues("files") || [];
    const updatedAttachments = currentAttachments.filter((_, i) => i !== index);
    form.setValue("files", updatedAttachments);
    form.trigger("files");
  };

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ComplaintFormData) => {
    setSubmitting(true);
    setError(null);
    if (data.files) {
      for (const file of data.files) {
        if (file.size > FILES_UPLOAD_CONSTANTS.MAX_FILE_SIZE) {
          setError(FILES_UPLOAD_CONSTANTS.ERROR_MESSAGES.FILE_TOO_LARGE);
          setSubmitting(false);
          return;
        }
      }
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("category", data.category);
    formData.append("title", data.title);
    formData.append("description", data.description);
    data?.files?.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const {
        success,
        ticket_id,
        error: sendingError,
      } = await postApi<ComplaintResponse>("/complaint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (success) {
        push(`/submit/success?ticket_id=${ticket_id}`);
      } else {
        setError(
          sendingError || "Failed to submit complaint. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to submit complaint. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center w-full px-4 py-12 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Gutanga Ikibazo Cyawe
          </h1>
          <p className="text-center max-w-lg dark:text-zinc-500">
            Uzuza ubu buryo bwo gutanga ikibazo cyangwa igitekerezo ku nzego za
            Leta. Uzahabwa nomero y'ibiranga kugira ngo ukurikirane aho ikibazo
            cyawe kigeze.
          </p>
        </div>
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amazina yawe</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Andika amazina yawe yose"
                              {...field}
                            />
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

                  {/* Complaint Details */}
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
                                  placeholder={
                                    loading ? "Gutegereza..." : "Hitamo ikiciro"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="w-full ">
                              {categories?.map((category) => (
                                <SelectItem
                                  key={category.cat_id}
                                  value={category.cat_id}
                                >
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
                </div>

                {/* Complaint Description */}
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

                {/* Attachments */}
                <div>
                  <span className="text-sm font-medium block mb-2">
                    Amadosiye y'ingereka (optional)
                  </span>
                  <div className="flex flex-col space-y-3">
                    <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                      <div className="space-y-1 text-center">
                        <div className="flex justify-center">
                          <CloudUpload className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-primary">
                            Kanda hano
                          </span>{" "}
                          cyangwa ukurure dosiye
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, PDF, DOCX (Max: 10MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                        accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                      />
                    </label>

                    {(form.watch("files") || []).length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2">
                          Amadosiye watoranyije (
                          {(form.watch("files") || []).length})
                        </p>
                        <ul className="space-y-2">
                          {(form.watch("files") || []).map(
                            (file: File, index: number) => (
                              <li
                                key={index}
                                className="flex justify-between items-center rounded-md bg-muted/30 px-3 py-2 text-sm"
                              >
                                <span className="truncate max-w-[80%]">
                                  {file.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeAttachment(index)}
                                  className="text-destructive hover:text-destructive/80"
                                >
                                  Siba
                                </button>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Error Message Display */}
                {error && (
                  <div className="p-4 mb-4 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                    <div className="flex items-start">
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8">
                  <Button
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground text-lg font-medium shadow-md"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <span>Kohereza...</span>
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Kohereza Ikibazo
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Submit;
