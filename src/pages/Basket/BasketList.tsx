import { Button, Card, LinearProgress, createStyles, makeStyles, Theme, Typography } from "@material-ui/core"
import { IDevice } from "../../models/models"
import StarRateIcon from '@material-ui/icons/StarRate';
import { observer } from "mobx-react-lite";
import useRemoveDevice from "../../hooks/useRemoveDevice";
import { checkSrc } from "../../utils/checkSrc";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      card: {
         padding: theme.spacing(4),
         marginBottom: theme.spacing(2),
         '@media(max-width: 800px)': {
            padding: '3vw',
            marginBottom: '2vw'
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
            fontSize: '4vw'
         }
      },
      text: {
         fontSize: 24,
         '@media(max-width: 800px)': {
            fontSize: '3vw'
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
         height: 150,
         width: '100%',
         alignItems: 'left',
         marginBottom: 10,
         '@media(max-width: 620px)': {
            height: 'auto',
         }
      },
      btn: {
         '@media(max-width: 800px)': {
            fontSize: '3vw'
         }
      }

   }),
)

type ItemProps = {
   device: IDevice
}
const BasketItem: React.FC<ItemProps> = ({ device }) => {

   const { remove: removeDevice, isRemoving } = useRemoveDevice()

   const src = checkSrc(device?.img)

   const classes = useStyles()
   return <Card className={classes.card} data-testid="card" key={Date.now() + Math.random()}>
      {isRemoving &&
         <LinearProgress />}
      <Typography
         component='h3'
         variant="h4"
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

      <Button variant="contained" color='secondary' className={classes.btn} onClick={() => removeDevice(device._id)} disabled={isRemoving}>Remove</Button>
   </Card>
}

type Props = {
   basket: IDevice[] | null
}

const BasketList: React.FC<Props> = observer(({ basket }) => {

   return (
      <>
         {basket?.map((device) => <BasketItem device={device} />)}
      </>
   )
})

export default BasketList