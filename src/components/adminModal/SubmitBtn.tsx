import { Button, CircularProgress } from "@material-ui/core"

type Props = {
   isFetching?: boolean
}

const SubmitBtn: React.FC<Props> = ({ isFetching }) => {
   return <div style={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end' }}>
      {isFetching &&
         <CircularProgress style={{ display: 'inline-block', marginRight: 10 }} />
      }

      <Button
         type="submit"
         variant='contained'
         color="primary"
         style={{ background: 'green' }}
         data-testid='submit btn'

         disabled={isFetching}
      >
         Create
      </Button>
   </div>
}

export default SubmitBtn