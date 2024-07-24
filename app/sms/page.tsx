"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { smsLogIn } from "./actions";

const initialState = {
  token: false,
};
export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogIn, initialState); //페이지가 처음 렌더될 때 state 값은 false
  return (
    //initialstate가 state.token을 false로 만듦 그래서 smsLogIn 실행시 false로 처음 시작하게됨
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input name="phone" type="text" placeholder="Phone number" required />
        {state.token ? (
          <Input //state.token이 true이면 input을 보여주고 false이면 null
            name="token" //token이 false면 null로 사라짐
            type="number"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
          />
        ) : null}
        <Button text="Send the message" />
      </form>
    </div>
  );
}
