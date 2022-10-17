import { $authHost, $host } from "."

export const deviceAPI = {
  async createType(type: { name: string }) {
    const { data } = await $authHost.post("api/type", type)
    return data
  },

  async getTypes() {
    const { data } = await $host.get("api/type")
    return data
  },

  async createBrand(brand: { name: string }) {
    const { data } = await $authHost.post("api/brand", brand)
    return data
  },

  async getBrands() {
    const { data } = await $host.get("api/brand")
    return data
  },

  async createDevice(device: FormData) {
    const { data } = await $authHost.post("api/device", device)
    return data
  },

  async getDevices(
    typeId = null as number | null,
    brandId = null as number | null,
    page = 1,
    limit = 5
  ) {
    const { data } = await $host.get("api/device", {
      params: {
        typeId,
        brandId,
        page,
        limit,
      },
    })
    return data
  },

  async getOneDevice(id: string) {
    const { data } = await $host.get("api/device/" + id)

    return data
  },

  async deleteOneDevice(id: string) {
    const { data } = await $authHost.delete("api/device/", {
      data: {
        id,
      },
    })
    return data
  },
}
