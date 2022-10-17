import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      formControl: {
         marginBottom: theme.spacing(1),
         minWidth: 120,
      }
   }),
)

type Props = {
   children: JSX.Element,
}

const InputContainer: React.FC<Props> = ({ children }) => {
   const classes = useStyles();

   return <>
      <FormControl variant="outlined" className={classes.formControl} fullWidth>
         {children}
      </FormControl>
   </>
}

export default InputContainer