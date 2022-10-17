import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core"
import { useContext, useEffect, useState } from "react"
import { userAPI } from "../../api/userAPI"
import { IBasket, IDevice } from "../../models/models"
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import CircleLoader from "../../components/loaders/CircleLoader";
import BasketList from "./BasketList";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      h2: {
         marginBottom: theme.spacing(2),
         '@media(max-width: 800px)': {
            marginBottom: '2vw',
            fontSize: '6vw'
         }
      }
   }),
)

const Basket: React.FC = observer(() => {
   const classes = useStyles()
   // const imgUrl = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'

   const [basket, setBasket] = useState<IDevice[] | null>(null)
   const { user } = useContext(Context)
   const [isFetching, setIsFetching] = useState(true)

   useEffect(() => {
      const getBasketDevices = async () => {
         if (user.user) {
            const basket = await userAPI.getBasketDevices(user.user.id)
            console.log('basket', basket);

            setBasket(basket)
            setIsFetching(false)
         }
      }
      getBasketDevices()
   }, [user.user, user.basketDevicesCount])


   if (isFetching) {
      return <CircleLoader />
   }

   return (
      <>
         <Typography variant="h3" component='h2' className={classes.h2}>Basket</Typography>
         <BasketList basket={basket} />
      </>
   )
})

export default Basket