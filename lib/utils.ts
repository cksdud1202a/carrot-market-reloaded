import { init } from "next/dist/compiled/webpack/webpack";

export function formatToTimeAgo(date: string) {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs); //1.3일전같은게 아닌 정수로 보게 해줌, math.round 가까운 정수 반올림

  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "days");
}

export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}
