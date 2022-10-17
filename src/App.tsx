import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Container, createStyles, LinearProgress, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { useContext, useEffect, useState } from 'react';
import { userAPI } from './api/userAPI';
import { IBasket, IDevice } from './models/models';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: '88px',
      '@media(max-width: 600px)': {
        marginTop: '78px'
      }
    }
  }),
)

const App = observer(() => {
  const clases = useStyles()
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userAPI.check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [user])

  useEffect(() => {
    if (user.user) {
      userAPI.getBasketDevices(user.user.id).then((data: IDevice[]) => {
        const basketDevices = data.map(device => {
          return device
          // return device.deviceId
        })
        user.setBasketDevicesCount(data.length)
        user.setBasketDevices(basketDevices)
      })
    }
  }, [user, user.user, user.basketDevicesCount])

  if (loading) {
    return <LinearProgress style={{ marginTop: '3%' }} />
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Container className={clases.container}>
          <AppRouter />
        </Container>
      </BrowserRouter>
    </>

  );
})

export default App;
