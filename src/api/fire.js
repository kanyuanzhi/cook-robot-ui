import { api } from "src/boot/axios";

export function getFires() {
  return api({
    url: "/fires",
    method: "get"
  });
}
