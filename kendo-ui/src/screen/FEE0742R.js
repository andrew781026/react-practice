import {withStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import React from "react";
import SimpleDialog from '../components/simpleDialog';
import PdfDialog from '../components/pdfDialog';

class FEE0742R extends React.Component {

    state = {
        open: false,
    };

    closeDialog = () => {
        this.setState({open: false});
    };

    stopShowPdf = () => {
        this.setState({show: false});
    };

    render() {

        const {classes} = this.props;

        return (
            <div>
                <a href="http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf" target='_blank'>
                    <Button variant="contained" color="primary" className={classes.button}>
                        預覽-開新頁面
                    </Button>
                </a>
                <Button variant="contained" color="primary" className={classes.button}
                        onClick={() => {
                            this.setState({show: true});
                        }}>
                    預覽-跳出小視窗
                </Button>
                <Button variant="contained" color="secondary" className={classes.button}
                        onClick={() => {
                            this.setState({open: true});
                        }}>
                    遠端列印
                </Button>
                <SimpleDialog open={this.state.open} onClose={this.closeDialog}/>
                <PdfDialog open={this.state.show} onClose={this.stopShowPdf}/>
            </div>
        );
    }
}


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

export default withStyles(styles)(FEE0742R);
