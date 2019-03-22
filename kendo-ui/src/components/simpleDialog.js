import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';

const emails = ['台中倉庫', '台南倉庫'];
const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

class SimpleDialog extends React.Component {


    handleClose = () => {
        this.props.onClose();
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const {classes, onClose, selectedValue, ...other} = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">請選擇遠端印表機做列印</DialogTitle>
                <div>
                    <List>
                        {emails.map(email => (
                            <ListItem button onClick={() => this.handleListItemClick(email)} key={email}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={email}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(SimpleDialog);
