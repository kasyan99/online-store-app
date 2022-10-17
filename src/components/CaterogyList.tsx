import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      nested: {
         paddingLeft: theme.spacing(4),
      },
   }),
);

type Item = { _id: number, name: string }
type Props = {
   name: string
   items: Array<Item>
   setSlectCategoty: (item: Item | null) => void
   selectedItem: Item | null
}

const CategoryList: React.FC<Props> = observer(({ name, items, setSlectCategoty, selectedItem }) => {
   const classes = useStyles();

   const [open, setOpen] = useState(true);

   const handleClick = () => {
      setOpen(!open);
   }

   const handleSelect = (item: Item | null) => {

      if (item?._id === selectedItem?._id) {
         setSlectCategoty(null)
      }
      else {
         setSlectCategoty(item)
      }
   }

   return (<>
      <ListItem button onClick={handleClick}>
         <ListItemText primary={name} />
         {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
         <List component="div" disablePadding>
            {items.map(item => (
               <ListItem button
                  className={classes.nested} key={item.name + item._id}
                  onClick={() => handleSelect(item)}
                  style={selectedItem && selectedItem._id === item._id ? { background: '#3b8ad9', color: 'white' } : {}}>
                  <ListItemText primary={item.name} />
               </ListItem>
            ))}

         </List>
      </Collapse>
   </>)
})

export default CategoryList