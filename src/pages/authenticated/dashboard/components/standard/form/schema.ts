"use client";

import { z } from "zod";

export const formSchemaAddStandard = z.object({
  standard: z
    .string({ required_error: "This is Required", message: "" })
    .min(1, { message: "Standard must be at least 1 character long" })
    .max(5, { message: "Standard must be at most 5 characters long" }),
  classTeacher: z
    .string({ required_error: "This is Required" })
    .min(4, { message: "Class Teacher must be at least 4 characters long" })
    .max(12, { message: "Class Teacher must be at most 12 characters long" }),
  classTeacherSubject: z
    .string({ required_error: "This is Required" })
    .min(2, { message: "Subject must be at least 2 characters long" })
    .max(10, { message: "Subject must be at most 10 characters long" }),
});
