"use client";

import { Form } from "@/components/ui/form";
import { getApi, postApi } from "@/lib/axios/axios";
import { complaintFormSchema, type ComplaintFormData } from "@/lib/zod/form";
import { ComplaintResponse } from "@/types/api";
import { Tables } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ComplaintDetailsForm,
  DescriptionField,
  ErrorDisplay,
  FileUploader,
  PersonalInfoForm,
  SubmitButton,
} from "./_components";

const Submit = () => {
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const onSubmit = async (data: ComplaintFormData) => {
    setSubmitting(true);
    setError(null);

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
        data,
        error: sendingError,
      } = await postApi<ComplaintResponse>("/complaint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (success) {
        push(`/submit/success?ticket_id=${data?.ticket_id}`);
      } else {
        setError(
          (sendingError as string) ||
            "Failed to submit complaint. Please try again."
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PersonalInfoForm form={form} />
          <ComplaintDetailsForm
            form={form}
            categories={categories}
            loading={loading}
          />
        </div>
        <DescriptionField form={form} />
        <FileUploader form={form} />
        <ErrorDisplay error={error} />
        <SubmitButton submitting={submitting} />
      </form>
    </Form>
  );
};

export default Submit;
