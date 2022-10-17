import { makeAutoObservable } from "mobx"
import { IBrand, IDevice, IType } from "../models/models"

export default class DeviceStore {
  private _types: IType[]
  private _brands: IBrand[]
  private _devices: IDevice[]
  private _selectedType: IType | null
  private _selectedBrand: IBrand | null
  private _page: number
  private _totalCount: number
  private _limit: number

  constructor() {
    this._types = []

    this._brands = []

    this._devices = []

    this._selectedType = null
    this._selectedBrand = null
    this._page = 1
    this._totalCount = 0
    this._limit = 8

    makeAutoObservable(this)
  }

  setTypes(types: IType[]) {
    this._types = types
  }

  setBrands(brands: IBrand[]) {
    this._brands = brands
  }

  setSelectedType(type: IType | null) {
    this.setPage(1)
    this._selectedType = type
  }

  setSelectedBrands(brand: IBrand | null) {
    this.setPage(1)
    this._selectedBrand = brand
  }

  setDevices(devices: IDevice[]) {
    this._devices = devices
  }

  setPage(page: number) {
    this._page = page
  }

  setTotalCount(totalCount: number) {
    this._totalCount = totalCount
  }

  setLimit(limit: number) {
    this._limit = limit
  }

  get types() {
    return this._types
  }

  get brands() {
    return this._brands
  }

  get selectedType() {
    return this._selectedType
  }

  get selectedBrand() {
    return this._selectedBrand
  }

  get devices() {
    return this._devices
  }

  get page() {
    return this._page
  }

  get totalCount() {
    return this._totalCount
  }

  get limit() {
    return this._limit
  }
}
