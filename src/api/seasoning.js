import { api } from "src/boot/axios";

export function getSeasonings() {
  return api({
    url: "/seasonings",
    method: "get"
  });
}

export function getShapes() {
  return api({
    url: "/shapes",
    method: "get"
  });
}
