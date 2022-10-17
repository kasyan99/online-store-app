import React, { useContext, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button } from '@material-ui/core';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/routesConsts';
import NavLink from './NavLink';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         flexGrow: 1,
         marginBottom: '24px'
      },
      menuButton: {
         marginRight: theme.spacing(2),
      },
      title: {
         flexGrow: 1,
         '& a': {
            color: 'white',
            textDecoration: 'none'
         },
         '@media(max-width:400px)': {
            fontSize: '16px'
         }
      }
   }),
);

const NavBar = observer(() => {
   const { user } = useContext(Context)
   const classes = useStyles();
   const [auth, setAuth] = React.useState(user.isAuth);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const navigate = useNavigate()

   const logOut = () => {
      user.setUser(null)
      user.setIsAuth(false)
      handleClose()
      navigate(LOGIN_ROUTE, { replace: true })
   }

   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   useEffect(() => {
      setAuth(user.isAuth)
   }, [user.isAuth])

   const [devicesCount, setDevicesCount] = useState(user.basketDevicesCount)
   useEffect(() => {
      setDevicesCount(user.basketDevicesCount)
   }, [user.basketDevicesCount])

   return (
      <div className={classes.root}>
         <AppBar position="fixed">
            <Toolbar className='MuiContainer-root MuiContainer-maxWidthLg'>
               {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
               </IconButton> */}
               <Typography variant="h6" className={classes.title} >
                  <Link to={SHOP_ROUTE}>Online Store</Link>
               </Typography>

               {auth && (
                  <div>
                     {user.user?.role === 'ADMIN' &&
                        <>
                           <Button
                              style={{ marginRight: 5, width: '1%' }}
                              onClick={() => user.toggleEditMode()}
                              variant={user.editMode ? 'contained' : 'text'}
                           >
                              <EditIcon style={!user.editMode ? { color: 'white' } : { color: 'gray' }} />
                           </Button>
                           <Button variant='contained' style={{ cursor: 'pointer', marginRight: 5 }}>
                              <Link to={ADMIN_ROUTE} style={{ textDecoration: 'none', color: 'black' }}>Admin</Link>
                           </Button>
                        </>

                     }
                     <Link to={BASKET_ROUTE}>
                        <IconButton>
                           {devicesCount !== 0 &&
                              <Badge badgeContent={devicesCount} color="secondary" overlap="rectangular">
                                 <ShoppingCartIcon style={{ color: 'white' }} />
                              </Badge>
                           }
                           {devicesCount === 0 &&
                              <ShoppingCartIcon style={{ color: 'white' }} />
                           }
                        </IconButton>
                     </Link>

                     <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                     >
                        <AccountCircle />
                     </IconButton>
                     <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                     >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={logOut}>Log Out</MenuItem>
                     </Menu>
                  </div>

               )}
               {
                  !auth && <div>
                     <Button variant="contained" color="default">
                        <NavLink to={LOGIN_ROUTE} style={{ color: 'black', textDecoration: 'none' }}>Sign in</NavLink>
                     </Button>
                  </div>
               }

            </Toolbar>
         </AppBar>
      </div>
   );
})


export default NavBar