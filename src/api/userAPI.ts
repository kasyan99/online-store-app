import jwtDecode from "jwt-decode"
import { $authHost, $host } from "."
import { IUser } from "../models/models"

export const userAPI = {
  async registration(email: string, password: string) {
    const { data } = await $host.post("api/user/registration", {
      email,
      password,
      role: "ADMIN",
    })

    localStorage.setItem("token", data)

    return jwtDecode<IUser>(data)
  },

  async login(email: string, password: string) {
    const { data } = await $host.post("api/user/login", {
      email,
      password,
    })
    localStorage.setItem("token", data)
    return jwtDecode<IUser>(data)
  },

  async check() {
    const { data } = await $authHost.get("api/user/auth")

    localStorage.setItem("token", data.token)
    const res: IUser = jwtDecode(data.token)

    return res
  },

  async getBasketDevices(id: number) {
    const { data } = await $host.get("api/basket/", {
      // params: {
      //   basketId: id,
      // },
      params: {
        userId: id,
      },
    })
    return data
  },

  async addDeviceToBasket(userId: number, deviceId: string) {
    const { data } = await $host.post("api/basket/", {
      userId,
      deviceId,
    })
    return data
  },

  async removeDeviceFromBasket(userId: number, deviceId: string) {
    const { data } = await $host.delete("api/basket/", {
      data: {
        userId,
        deviceId,
      },
    })
    return data
  },
}
