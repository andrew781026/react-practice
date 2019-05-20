import {withStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import React from "react";
import SimpleDialog from '../components/simpleDialog';
import PdfDialog from '../components/pdfDialog';
import FileSaver from 'file-saver';

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

    downloadAllWithNewTab(urls) {
        let link = document.createElement('a');

        // link.setAttribute('download', null);
        link.setAttribute('target', '_blank');
        // link.style.display = 'none';

        document.body.appendChild(link);

        for (let i = 0; i < urls.length; i++) {
            link.setAttribute('href', urls[i]);
            link.click();
        }

        document.body.removeChild(link);
    }

    fetchDownloadAll = async (urls) => {
        return await Promise.all(urls.map(async (url) => this.fetchDownload(url)));
    };

    async fetchDownload(url) {

        let response = await fetch(url);
        const blob = await response.blob();

        FileSaver.saveAs(blob);
    }

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
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={async () => {

                                this.downloadAllWithNewTab([
                                    "https://httpbin.org/image",
                                    "http://www.africau.edu/images/default/sample.pdf",
                                    "https://go.microsoft.com/fwlink/?LinkID=521962"
                                ]);

                            }}>
                        5. download files with new tab
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={async () => {

                                await this.fetchDownloadAll([
                                    'https://api.aqt.eucare.tw/img/aqt_banner.jpg',
                                    "http://localhost:3001/sample.pdf",
                                    "http://localhost:3001/Financial_Sample.xlsx"
                                ]);

                            }}>
                        6. use fetch to download file
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
        )
            ;
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
