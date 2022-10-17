import { useContext, useState } from "react"
import { Context } from ".."
import { userAPI } from "../api/userAPI"

const useRemoveDevice = () => {
  const { user } = useContext(Context)
  const [isRemoving, setIsRemoving] = useState(false)
  const remove: (deviceId: string) => void = async (deviceId) => {
    setIsRemoving(true)
    if (user.user) {
      await userAPI.removeDeviceFromBasket(user.user.id, deviceId)
      setIsRemoving(false)
      user.setBasketDevicesCount(user.basketDevicesCount - 1)
    }
  }

  return { remove, isRemoving }
}

export default useRemoveDevice
