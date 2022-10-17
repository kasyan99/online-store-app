import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Context } from '..'
import { authRoutes, publicRoutes, RoutType } from '../routes'
import { SHOP_ROUTE } from '../utils/routesConsts'

const AppRoutes = (routes: RoutType[]) => (
   routes.map(({ path, Component }) => (
      <Route path={path} element={<Component />} key={path} />
   ))
)


const AppRouter: React.FC = () => {
   const { user } = useContext(Context)

   return (
      <Routes>
         {user.isAuth && AppRoutes(authRoutes)}
         {AppRoutes(publicRoutes)}
         <Route
            path='/*'
            element={<Navigate to={SHOP_ROUTE} />}
         />
      </Routes>
   )
}

export default AppRouter