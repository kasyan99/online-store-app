import { useEffect, useState } from "react"
import { debounce } from "@material-ui/core"

const useWinWidth = () => {
  let [winWidth, setWinWidth] = useState(document.documentElement.scrollWidth)

  //use debounce to avoid a lot of rerenders
  useEffect(() => {
    window.addEventListener(
      "resize",
      debounce(() => {
        setWinWidth(document.documentElement.scrollWidth)
      }, 300)
    )
  }, [])

  return winWidth
}

export default useWinWidth
