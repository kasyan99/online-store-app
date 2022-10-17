import { Button, createStyles, makeStyles, Theme } from "@material-ui/core"
import React from 'react';
import Modal from '@material-ui/core/Modal';

//you need to add position relative for parent element 
const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      paper: {
         position: 'absolute',
         width: 400,
         backgroundColor: theme.palette.background.paper,
         border: '2px solid #000',
         boxShadow: theme.shadows[5],
         padding: theme.spacing(2, 4, 3),
         '@media(max-width: 530px)': {
            width: '70vw',
         }
      }
   }),
)

type Props = {
   modalName: string,
   children: JSX.Element,
   'data-testid'?: string
}

const ModalContainer: React.FC<Props> = ({ modalName, children, "data-testid": testid }) => {
   const classes = useStyles()

   const [open, setOpen] = React.useState(false);

   const handleOpen = () => {
      setOpen(true);
   }

   const handleClose = () => {
      setOpen(false);
   }

   //create props for children
   const childrenProps = {
      closeModal: handleClose
   }
   //clone children and put props into it
   const childrenWithProps = React.cloneElement(children, childrenProps)

   return (
      <div data-testid={testid}>
         <Button variant="outlined" fullWidth onClick={handleOpen} data-testid='open btn'>{modalName}</Button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            style={{ overflowY: 'auto' }}
            data-testid='modal'
         >
            <div style={{ left: '50%', top: "10%", transform: 'translate(-50%)' }} className={classes.paper}>
               <h2 id="simple-modal-title">{modalName}</h2>
               {childrenWithProps}
            </div>
         </Modal>
      </div>
   )
}

export default ModalContainer