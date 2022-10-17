import { makeStyles, createStyles, Theme, Card, Typography, Button } from "@material-ui/core"
import StarRateIcon from '@material-ui/icons/StarRate';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../..";
import { deviceAPI } from "../../api/deviceAPI";
import { userAPI } from "../../api/userAPI";
import useRemoveDevice from "../../hooks/useRemoveDevice";
import { IDevice } from "../../models/models";
import CircleLoader from "../../components/loaders/CircleLoader";
import { observer } from "mobx-react-lite";
import { LOGIN_ROUTE } from "../../utils/routesConsts";
import { checkSrc } from "../../utils/checkSrc";


const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      card: {
         padding: theme.spacing(4),
         '@media(max-width: 800px)': {
            padding: '3vw'
         }
      },
      descrItem: {
         fontSize: 20,
         padding: theme.spacing(4),
         paddingBottom: theme.spacing(2),
         paddingTop: theme.spacing(2),

         '&:nth-child(2n)': {
            background: '#ebebeb'
         },

         '@media(max-width: 800px)': {
            padding: '3vw',
            paddingBottom: '1.5vw',
            paddingTop: '1.5vw',
         }
      },
      headersText: {
         '@media(max-width: 800px)': {
            fontSize: '6vw'
         }
      },
      text: {
         fontSize: 24,
         '@media(max-width: 800px)': {
            fontSize: '4vw'
         }
      },
      img: {
         '@media(max-width: 620px)': {
            width: '100%',
            height: '100%',
            objectFit: 'contain'
         }
      },
      imgCont: {
         height: 250,
         width: '100%',
         alignItems: 'left',
         marginBottom: 10,
         '@media(max-width: 620px)': {
            height: 'auto',
         }
      }

   }),
)

const DevicePage: React.FC = observer(() => {
   const classes = useStyles()
   const [device, setDevice] = useState<IDevice | null>(null)
   const [isInBasket, setIsInBasket] = useState(false)
   const [isFetching, setIsFetching] = useState(true)
   const [isAdding, setIsAdding] = useState(false)

   const params = useParams()

   const navigate = useNavigate()

   const { user } = useContext(Context)
   useEffect(() => {

      if (params.id) {
         deviceAPI.getOneDevice(params.id)
            .then(data => setDevice(data))
            .then(() => setIsFetching(false))
      }
   }, [params])

   useEffect(() => {
      if (device?._id) {
         // setIsInBasket(user.basketDevices.includes(Number(device._id)))
         //to change button (add/remove)
         user.basketDevices.forEach(basketDevice => {
            if (basketDevice._id === device._id) {
               setIsInBasket(true)
            } else {
               setIsInBasket(false)
            }
         })
      }
   }, [device?._id, user.basketDevices])

   const addToBasket = async () => {
      if (user.user) {
         setIsAdding(true)
         const deviceId = params.id
         const userId = user.user?.id
         if (deviceId && userId) {
            await userAPI.addDeviceToBasket(userId, deviceId)
         }
         setIsAdding(false)
         user.setBasketDevicesCount(user.basketDevicesCount + 1)
      } else {
         navigate(LOGIN_ROUTE, { replace: true })
      }
   }

   const { remove: removeDevice, isRemoving } = useRemoveDevice()

   // const src = device?.img ? `${process.env.REACT_APP_API_URL}${device?.img}` : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'
   const src = checkSrc(device?.img)

   if (isFetching) {
      return <CircleLoader />
   }

   return (
      <>
         <Card className={classes.card} data-testid="card">
            <Typography
               component='h3'
               variant="h3"
               style={{ marginBottom: 10 }}
               className={classes.headersText}
            >
               {device?.name}
            </Typography>

            <div className={classes.imgCont}>
               <img
                  src={src}
                  alt={device?.name}
                  style={{ height: '100%', objectFit: 'contain' }}
                  className={classes.img}
               />
            </div>
            <Typography
               component='p'
               style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}
               className={classes.text}
            >
               Rating: {device?.rating}
               <StarRateIcon style={{ color: '#fc9512' }} /></Typography>
            <Typography
               component='p'
               style={{ marginBottom: 10 }}
               className={classes.text}
            >
               Price: <b>{device?.price}$</b>
            </Typography>
            {!isInBasket &&
               <Button
                  variant="contained"
                  color='primary'
                  style={{ background: '#ffa500' }}
                  onClick={addToBasket}
                  disabled={isAdding}
               >
                  Add to basket
               </Button>}
            {isInBasket &&
               <Button
                  variant="contained"
                  color='secondary'
                  onClick={() => device && removeDevice(device._id)}
                  disabled={isRemoving}
               >
                  Remove
               </Button>}

         </Card>
         <Typography
            style={{ marginTop: 25 }}
            component="h2"
            variant="h3"
            className={classes.headersText}
         >
            Characteristic
         </Typography>
         <Card style={{ marginTop: 25 }}>
            {device?.info.map((info) => (
               <Typography className={`${classes.descrItem} ${classes.text}`} key={Date.now() + Math.random()}>{info.title}: {info.descriptions}</Typography>
            ))}
         </Card>
      </>
   )
})

export default DevicePage