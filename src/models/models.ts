export interface IUser {
  email: string
  exp: number
  iat: number
  id: number
  role: string
}

export interface IType {
  _id: number
  name: string
}

export interface IBrand {
  _id: number
  name: string
}

type DeviceInfo = {
  _id: number
  // deviceId: number
  descriptions: string
  title: string
}

export interface IDevice {
  _id: string
  name: string
  price: number
  rating: number
  img: string
  brandId: string
  typeId: string
  info: Array<DeviceInfo>
}

// export interface IBasket {
//   _id: number
//   basketId: number
//   device: IDevice
//   deviceId: number
// }

export type IBasket = IDevice[]
