import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, GridSize } from '@material-ui/core';
import DeviceList from '../../components/DeviceList';
import FilterSection from '../../components/FilterSection';
import useWinWidth from '../../hooks/useWinWidth';

const useStyles = makeStyles(() =>
   createStyles({
      root: {
         flexGrow: 1,
      }
   }),
);


const Shop: React.FC = () => {
   const classes = useStyles();
   const winWidth = useWinWidth()

   let [asideXS, setAsideXS] = useState<GridSize>(3)
   let [mainXS, setMainXS] = useState<GridSize>(9)

   useEffect(() => {
      if (winWidth > 860) {
         setAsideXS(3)
         setMainXS(9)
      }
      if (winWidth < 860 && winWidth > 500) {
         setAsideXS(4)
         setMainXS(8)
      }
   }, [winWidth])

   return (<>
      <div></div>
      {winWidth >= 600 &&
         <Grid container className={classes.root} spacing={3}>
            <Grid item xs={asideXS} >
               <aside >
                  <FilterSection />
               </aside>
            </Grid>
            <Grid item xs={mainXS}>
               <main>
                  <DeviceList />
               </main>
            </Grid>

         </Grid>}
      {winWidth < 600 &&
         <>
            <aside style={{ marginBottom: '3%' }}>
               <FilterSection />
            </aside>
            <main style={{ marginBottom: '3%' }}>
               <DeviceList />
            </main>
         </>
      }
   </>

   )
}

export default Shop