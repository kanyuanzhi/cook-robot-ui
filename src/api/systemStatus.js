import {api} from "src/boot/axios"

export function getSystemStatus() {
  return api(
    {
      url: "/system-status",
      method: "get",
    }
  )
}
