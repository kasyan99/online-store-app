import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import { CircularProgress, Container, FormControl, TextField, Typography } from '@material-ui/core';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/routesConsts';
import { useLocation, useNavigate } from 'react-router-dom';
import NavLink from '../../components/NavLink';
import { userAPI } from '../../api/userAPI';
import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { AxiosError } from 'axios';
import { IUser } from '../../models/models';
import { useForm, SubmitHandler } from "react-hook-form";

const useStyles = makeStyles({
   root: {
      minWidth: 275,
      marginTop: '10%',
      padding: '5%',
      position: 'relative'
   },
   noPadding: {
      padding: 0
   },
   mb: {
      marginBottom: '3%'
   },
   text: {
      '@media(max-width: 500px)': {
         display: 'none'
      }
   }
});

const Auth = observer(() => {
   const classes = useStyles();

   const { user } = useContext(Context)
   const location = useLocation()
   const navigate = useNavigate()
   const onRegistr = location.pathname === REGISTRATION_ROUTE
   const [isFetching, setIsFetching] = useState(false)

   type Inputs = {
      email: string,
      password: string
   };

   const methods = useForm<Inputs>();
   const { register, handleSubmit, formState: { errors } } = methods;

   const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
      setIsFetching(true)
      try {
         let data: IUser

         if (onRegistr) {
            data = await userAPI.registration(email, password)
         } else {
            data = await userAPI.login(email, password)
         }
         user.setUser(data)
         user.setIsAuth(true)

         navigate(SHOP_ROUTE, { replace: true })

      } catch (e: unknown) {
         if (e instanceof AxiosError) {
            alert(e.response?.data.message)
         }
      }
      setIsFetching(false)
   }

   return (
      <Container maxWidth="sm">
         <Card className={classes.root}>

            {isFetching &&
               <CircularProgress style={{ position: 'absolute', right: 10, top: 10 }} />}

            <form onSubmit={handleSubmit(onSubmit)} >

               <CardContent className={classes.noPadding}>
                  <Typography variant='h4' component="h2" style={{ textAlign: 'center', marginBottom: '3%' }}>
                     {onRegistr ? 'Registration' : 'Authorization'}
                  </Typography>
                  <FormGroup>
                     <FormControl fullWidth className={classes.mb}>
                        <TextField
                           label='Email'
                           type="email"
                           variant="outlined"
                           placeholder='Enter your email...'
                           {...register("email", { required: 'Email is required' })}
                        />
                     </FormControl>
                     {errors.email && <span className={classes.mb} style={{ color: 'red', display: 'block' }}>{errors.email.message}</span>}
                     <FormControl fullWidth className={classes.mb}>
                        <TextField
                           label='Password'
                           variant="outlined"
                           type='password'
                           placeholder='Enter your password...'
                           {...register("password", { required: 'Password is required' })}
                        />
                     </FormControl>
                     {errors.password && <span className={classes.mb} style={{ color: 'red', display: 'block' }}>{errors.password.message}</span>}

                  </FormGroup>
               </CardContent>
               <CardActions className={classes.noPadding} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>
                     <span className={classes.text}>{onRegistr ? 'Do you have account?' : 'Do not you have account?'}</span> <NavLink to={onRegistr ? LOGIN_ROUTE : REGISTRATION_ROUTE}>{onRegistr ? 'Sign in' : 'Registration'}</NavLink>
                  </span>

                  <Button
                     type='submit'
                     variant="contained"
                     color='primary'
                     disabled={isFetching}
                  >
                     {onRegistr ? 'Sign up' : 'Sign in'}
                  </Button>
               </CardActions>
            </form>
         </Card>

      </Container>
   );
})

export default Auth