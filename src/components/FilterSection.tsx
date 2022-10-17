import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { LinearProgress, Paper } from '@material-ui/core';
import CategoryList from './CaterogyList';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { deviceAPI } from '../api/deviceAPI';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         width: '100%',
         maxWidth: 360
      }
   }),
);

const FilterSection: React.FC = observer(() => {
   const classes = useStyles();

   const [isFetchingTypes, setIsFetchingTypes] = useState(true)
   const [isFetchingBrands, setIsFetchingBrands] = useState(true)
   const { device } = useContext(Context)

   useEffect(() => {
      deviceAPI.getTypes()
         .then(data => device.setTypes(data.types))
         .then(() => setIsFetchingTypes(false))
      deviceAPI.getBrands()
         .then(data => device.setBrands(data.brands))
         .then(() => setIsFetchingBrands(false))
   }, [device])


   return (
      <Paper style={{ borderRadius: '5px' }}>
         <List
            component="nav"
            aria-labelledby="devices-categories"
            subheader={
               <ListSubheader component="div" id="devices-categories">
                  Categories
               </ListSubheader>
            }
            className={classes.root}
         >
            {isFetchingTypes &&
               <LinearProgress />}
            <CategoryList name='Types' items={device.types} setSlectCategoty={device.setSelectedType.bind(device)} selectedItem={device.selectedType} />
            {isFetchingBrands &&
               <LinearProgress />}
            <CategoryList name='Brands' items={device.brands} setSlectCategoty={device.setSelectedBrands.bind(device)} selectedItem={device.selectedBrand} />
         </List>
      </Paper>

   );
})

export default FilterSection