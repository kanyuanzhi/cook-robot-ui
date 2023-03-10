import { api } from "src/boot/axios";

export function postCommand(command) {
  return api({
    url: "/command",
    method: "post",
    data: { command: command }
  });
}
