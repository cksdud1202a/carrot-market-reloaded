"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";
import { z } from "zod";

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;
const formSchema = z
  .object({
    username: z
      .string()
      .trim()
      .regex(/^[a-zA-Z가-힣]+$/, {
        message: "사용자 이름은 한글과 영어만 포함할 수 있습니다.",
      }),
    email: z
      .string()
      .email({ message: "유효한 이메일 주소를 입력해 주세요." })
      .trim(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "비밀번호 확인은 최소 4자 이상이어야 합니다.")
      .trim()
      .regex(
        PASSWORD_REGEX,
        "비밀번호는 숫자, 영어, 특수 문자를 모두 포함해야 합니다."
      ),
    confirm_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "비밀번호 확인은 최소 4자 이상이어야 합니다.")
      .trim()
      .regex(
        PASSWORD_REGEX,
        "비밀번호는 숫자, 영어, 특수 문자를 모두 포함해야 합니다."
      ),
  })
  .refine(checkPasswords, {
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
