"use server";
import { z } from "zod";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "사용자 이름은 최소 3자 이상이어야 합니다." })
      .max(10, { message: "사용자 이름은 최대 10자까지 입력할 수 있습니다." })
      .regex(/^[a-zA-Z가-힣]+$/, {
        message: "사용자 이름은 영어 알파벳과 한글만 포함할 수 있습니다.",
      }),
    email: z.string().email({ message: "유효한 이메일 주소를 입력해 주세요." }),
    password: z
      .string()
      .min(10, { message: "비밀번호는 최소 10자 이상이어야 합니다." })
      .regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}|:"<>?~`]).{10,}$/, {
        message: "비밀번호는 숫자, 알파벳, 특수 문자를 모두 포함해야 합니다.",
      }),
    confirm_password: z
      .string()
      .min(10, { message: "비밀번호 확인은 최소 10자 이상이어야 합니다." })
      .regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}|:"<>?~`]).{10,}$/, {
        message: "비밀번호는 숫자, 영어, 특수 문자를 모두 포함해야 합니다.",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "비밀번호와 확인 비밀번호가 일치해야 합니다.",
    path: ["confirm_password"], // 오류 메시지를 'confirm_password' 필드에만 표시
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
