import {withStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import React from "react";
import FileSaver from 'file-saver';

class FEE0742R extends React.Component {

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

        const response = await fetch(url);

        // 參考資料 : https://www.fullstackmemo.com/2018/03/31/fetch-save-file/
        const disposition = response.headers;
        console.log('disposition=', disposition);
        const blob = await response.blob();
        console.log('blob=', blob);

        FileSaver.saveAs(blob);
    }

    render() {

        const {classes} = this.props;

        return (
            <div>
                <div>
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={async () => {

                                this.downloadAllWithNewTab([
                                    "https://binged.it/2Eig4s4",
                                    "http://www.africau.edu/images/default/sample.pdf",
                                    "https://go.microsoft.com/fwlink/?LinkID=521962"
                                ]);

                            }}>
                        1. 開新分頁下載多檔案
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={async () => {

                                await this.fetchDownloadAll([
                                    'https://api.aqt.eucare.tw/img/aqt_banner.jpg',
                                    "http://localhost:3001/sample.pdf",
                                    "http://localhost:3001/Financial_Sample.xlsx"
                                ]);

                            }}>
                        2. 直接下載多檔案
                    </Button>
                </div>
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
