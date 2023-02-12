import {api} from "src/boot/axios"

export function getWifiList() {
  return api(
    {
      url: "/system-settings/wifi",
      method: "get",
    }
  )
}

export function connectWifi(flag, data) {
  return api(
    {
      url: "/system-settings/wifi/" + flag,
      method: "post",
      data: data
    }
  )
}

export function disconnectWifi(flag, data) {
  return api(
    {
      url: "/system-settings/wifi/" + flag,
      method: "post",
      data: data
    }
  )
}

export function getWlanStatus() {
  return api(
    {
      url: "/system-settings/wlan",
      method: "get",
    }
  )
}

export function toggleWlan(flag) {
  return api(
    {
      url: "/system-settings/wlan/" + flag,
      method: "put",
    }
  )
}
