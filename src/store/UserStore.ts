import { makeAutoObservable } from "mobx"
import { IDevice, IUser } from "../models/models"

export default class UserStore {
  private _isAuth: boolean
  private _user: IUser | null
  private _basketDevicesCount: number
  private _basketDevices: IDevice[]
  private _editMode: boolean

  constructor() {
    this._isAuth = false
    this._user = null
    this._basketDevicesCount = 0
    this._basketDevices = []
    this._editMode = false
    makeAutoObservable(this)
  }

  setIsAuth(value: boolean) {
    this._isAuth = value
  }

  setUser(user: IUser | null) {
    this._user = user
  }

  setBasketDevicesCount(count: number) {
    this._basketDevicesCount = count
  }

  // setBasketDevices(devicesId: number[]) {
  //   this._basketDevices = devicesId
  // }

  setBasketDevices(devicesId: IDevice[]) {
    this._basketDevices = devicesId
  }

  addBasketDevices(deviceId: IDevice) {
    this._basketDevices = [...this._basketDevices, deviceId]
  }

  toggleEditMode() {
    this._editMode = !this._editMode
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }

  get basketDevicesCount() {
    return this._basketDevicesCount
  }

  get basketDevices() {
    return this._basketDevices
  }

  get editMode() {
    return this._editMode
  }
}
