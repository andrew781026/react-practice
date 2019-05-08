import {withStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import React from "react";
import SimpleDialog from '../components/simpleDialog';
import PdfDialog from '../components/pdfDialog';
// import keydown, {Keys} from 'react-keydown';

// const {ENTER, TAB} = Keys; // optionally get key codes from Keys lib to check against later

class FEE0742R extends React.Component {

    state = {
        open: false,
        pdf_show: false,
        pdfUrl: 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf'
    };

    closeDialog = () => {
        this.setState({open: false});
    };

    stopShowPdf = () => {
        this.setState({show: false});
    };

    // @keydown(ENTER, TAB, 'ctrl+z') // could also be an array
    startShowPdf = () => {
        this.setState({show: true});
    };

    render() {

        const {classes} = this.props;

        return (
            <div>
                <div>
                    <a href="http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf" rel="noopener noreferrer"
                       target='_blank'>
                        <Button variant="contained" color="primary" className={classes.button}>
                            1.預覽-開新頁面
                        </Button>
                    </a>
                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={() => {
                                this.setState({show: true});
                            }}>
                        2.預覽-跳出小視窗
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={() => {
                                this.setState({pdf_show: !this.state.pdf_show});
                            }}>
                        {(this.state.pdf_show) ? '3.預覽-關閉當頁查看' : '3.預覽-當頁查看'}
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={() => {
                                this.setState({open: true});
                            }}>
                        4.遠端列印
                    </Button>
                    <a href="http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf">同頁切換</a>
                </div>
                <div style={{display: (this.state.pdf_show) ? '' : 'none'}}>
                    <h2>預覽 PDF</h2>
                    <iframe title='pdf preview' src={this.state.pdfUrl} width="100%" height='600'/>
                </div>
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
