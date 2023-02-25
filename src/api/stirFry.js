import { api } from "src/boot/axios";

export function getStirFries() {
  return api({
    url: "/stir-fries",
    method: "get"
  });
}
