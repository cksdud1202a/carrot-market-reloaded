import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-carrot",
    password: process.env.COOKIE_PASSWORD!,
    //!를 붙이는 이유는 타입스크립트에게 .env 안에 COOKIE_PASSWORD가 존재한다는 것을 알리기 위해
  });
}
