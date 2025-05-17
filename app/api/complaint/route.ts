import { FILES_UPLOAD_CONSTANTS } from "@/constants/files-upload";
import { createClientServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClientServer();
    const formData = await req.formData();

    const complaintData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      category: formData.get("category") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      files: formData.getAll("files") as File[],
    };

    for (const file of complaintData.files) {
      if (file.size > FILES_UPLOAD_CONSTANTS.MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            message: `${file.name} exceeds the 10MB limit`,
            error: "File size too large",
          },
          { status: 400 }
        );
      }
    }
    const fileslinks: string[] = [];

    for (const file of complaintData.files) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("complaint-files")
        .upload(`${complaintData.category}/${file.name}-${Date.now()}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(
          `Failed to upload ${file.name}: ${uploadError.message}`
        );
      }
      const { data: getLinksData } = supabase.storage
        .from("complaint-files")
        .getPublicUrl(uploadData.path);

      if (getLinksData && getLinksData.publicUrl) {
        fileslinks.push(getLinksData.publicUrl);
      } else {
        fileslinks.push(uploadData.path);
      }
    }

    const { data, error } = await supabase
      .from("complaints")
      .insert({
        name: complaintData.name,
        email: complaintData.email,
        phone: complaintData.phone,
        category_id: complaintData.category as string,
        title: complaintData.title,
        description: complaintData.description,
        files: fileslinks as string[],
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit complaint",
          error: "Database error",
          details: [error.message],
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Complaint submitted successfully",
      data: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process complaint",
        error: "Server error",
        details: [(error as Error).message],
      },
      { status: 500 }
    );
  }
}
