import { FILES_UPLOAD_CONSTANTS } from "@/constants/files-upload";
import { z } from "zod";

export const complaintFormSchema = z.object({
  name: z.string().min(3, "Izina rigomba kugira inyuguti 3 byibura"),
  email: z.string().email("Imeyili ntiyanditse neza"),
  phone: z
    .string()
    .min(10, "Nimero ya telefoni igomba kugira imibare 10 byibura")
    .max(10, "Nimero ya telefoni igomba kutarenga imibare 10 byibura")
    .regex(/^07[2389]\d{7}$/, "Nimero ya telefoni ntiyanditse neza"),
  category: z.string().min(1, "Hitamo ikiciro"),
  title: z.string().min(5, "Inyito igomba kugira inyuguti 5 byibura").max(100),
  description: z
    .string()
    .min(20, "Andika ibisobanuro byimbitse, byibura amagambo 20"),
  files: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= FILES_UPLOAD_CONSTANTS.MAX_FILE_SIZE,
          FILES_UPLOAD_CONSTANTS.ERROR_MESSAGES.FILE_TOO_LARGE
        )
        .refine(
          (file) =>
            FILES_UPLOAD_CONSTANTS.ACCEPTED_FILE_TYPES.includes(file.type),
          FILES_UPLOAD_CONSTANTS.ERROR_MESSAGES.INVALID_FILE_TYPE
        )
    )
    .optional(),
});

export type ComplaintFormData = z.infer<typeof complaintFormSchema>;
