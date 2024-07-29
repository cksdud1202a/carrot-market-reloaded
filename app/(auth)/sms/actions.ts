"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format"
  ); //숫자여도 string으로 받음

const tokenSchema = z.coerce.number().min(100000).max(999999); //coerce를 사용해 string을 number로 바꾸기 시도

interface ActionState {
  token: boolean;
}

export async function smsLogIn(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");
  if (!prevState.token) {
    //(토큰이 있지 않다면)
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false, //검증이 안됐으면 유저가 전화번호를 잘못 입력했다는 의미, false로 코드 input 안 보이게
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true, //전화번호 제대로 입력시 true로 코드 input 보이게
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    //true면 이미 올바른 전화번호를 입력했고 코드 input 인증 할 차례
    if (!result.success) {
      //(검증이 안됐는가)
      return {
        token: true, //(다시 올바른 코드 입력하라고 코드 input 보이게 놔둠)
        error: result.error.flatten(),
      };
    } else {
      redirect("/"); //올바른 코드를 입력했으면 로그인 처리를 해야하니 아무 결과 리턴 안 해도 됨
    }
  }
}
