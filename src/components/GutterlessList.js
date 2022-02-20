import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import BasicModal from './BasicModal';
import ProductInfo from './ProductInfo';

export default function GutterlessList(props) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {props.list.map((value, index) =>
            (
                <ListItem
                    key={value}
                    disableGutters
                    secondaryAction={
                        <IconButton>
                            <BasicModal text={"info"} comp={<ProductInfo text={value} />} />
                        </IconButton>
                    }
                >
                    <ListItemText className="favourite_list_items" primary={`${index + 1} - ${value}`} />
                </ListItem>
            ))}
        </List>
    );
}
