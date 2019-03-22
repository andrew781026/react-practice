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


class PdfDialog extends React.Component {

    pdfUrl = 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf';

    handleClose = () => {
        this.props.onClose();
    };

    render() {

        return (
            <Dialog fullWidth onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">預覽PDF</DialogTitle>
                <iframe src={this.pdfUrl} height="900"/>
            </Dialog>
        );
    }
}

export default PdfDialog;
