import { api } from "src/boot/axios";

export function getRunningStatus() {
  return api({
    url: "/running-status",
    method: "get",
  });
}
