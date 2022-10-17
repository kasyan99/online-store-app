import { CircularProgress } from "@material-ui/core"

const CircleLoader: React.FC = () => {
   return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vw' }}>
      <CircularProgress size='10vw' />
   </div>
}

export default CircleLoader