import { Link } from "react-router-dom"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         color: '#2196f3',
         textDecoration: 'none',

         "&:hover": {
            textDecoration: 'underline'
         },
      },
   }),
);


type Props = {
   to: string,
   style?: Object
   className?: string
   children: JSX.Element | string
}

const NavLink: React.FC<Props> = ({ to, style, children, className }) => {
   return <Link to={to} style={style} className={`${useStyles().root} ${className}`}>{children}</Link>
}

export default NavLink