import { createStyles, makeStyles, Theme } from "@material-ui/core"
import React from 'react';
import BrandForm from "../../components/adminModal/BrandForm";
// import DeviceForm from "../components/adminModal/DeviceForm";
import ModalContainer from "../../components/adminModal/ModalContainer";
import TypeForm from "../../components/adminModal/TypeForm";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         position: 'relative',
         '& button': {
            marginBottom: 20
         }
      }
   }),
)

type Props = {
   deviceForm: JSX.Element
}

const Admin: React.FC<Props> = ({ deviceForm }) => {
   const classes = useStyles()
   return (
      <div className={classes.root}>
         <ModalContainer modalName="Add Type" data-testid='modal'>
            <TypeForm />
         </ModalContainer>
         <ModalContainer modalName="Add Brand" data-testid='modal'>
            <BrandForm />
         </ModalContainer>
         <ModalContainer modalName="Add Device" children={deviceForm} data-testid='modal' />
      </div>
   )
}

export default Admin