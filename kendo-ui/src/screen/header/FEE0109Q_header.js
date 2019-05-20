import React from "react";
import {Grid, Button} from "@material-ui/core";
import {ComboBox} from '@progress/kendo-react-dropdowns';
import {unstable_Box as Box} from '@material-ui/core/Box';


class FEE0109Q_header extends React.Component {

    cargoLocation = {
        C: '台北',
        K: '高雄',
        A: '全部'
    };

    state = {
        value: {text: '台北', id: 'C'}
    };

    sports = [
        {text: 'Basketball', id: 1},
        {text: 'Football', id: 2},
        {text: 'Tennis', id: 3},
        {text: 'Volleyball', id: 4}
    ];

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    };

    render() {

        // Grid 系統 => xs = 12 代表 1 個 row , 所以 xs = 4 為 3 個元件 1 row

        const cargoLocations = Object.keys(this.cargoLocation).map((key) => {
            return {text: this.cargoLocation[key], id: key}
        });

        return (
            <div>
                <h1>發票查詢作業</h1>
                <Grid container style={{margin: 10}}>
                    <Button variant="contained"
                            color="primary"
                            style={{margin: 5}}
                            onClick={this.props.handleQueryAction}>
                        查詢
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: 5}}>
                        儲存
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
                            <Grid key={value} item>
                                <Box
                                    border={1}
                                    bgcolor="background.paper"
                                    borderColor="grey.900"
                                    style={{width: '240px', height: '48px'}}
                                >
                                    <Box display="flex" flexDirection="row" bgcolor="background.paper">
                                        <Grid item xs={3}>
                                            <Box display="flex" alignItems="center" justifyContent="flex-end"
                                                 style={{height: '46px', backgroundColor: '#D7D7D7'}}>
                                                <Box pr={1}>
                                                    貨棧別
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Box display="flex" alignItems="center" justifyContent="center"
                                                 style={{height: '48px'}}>
                                                <Box>
                                                    <input type='number'/>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <br/><br/>
                <table style={{border: '3px #cccccc solid'}} cellPadding="10" border='1'>
                    <tbody>
                    <tr>
                        <td className='bg-grey-lighter' style={{fontWeight: 600}}>
                            貨棧別
                        </td>
                        <td>
                            <ComboBox
                                data={cargoLocations}
                                textField="text"
                                dataItemKey="id"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                        </td>
                        <td className='bg-grey-lighter' style={{fontWeight: 600}}>
                            西元
                        </td>
                        <td>
                            <input type='number'/>
                        </td>
                        <td className='bg-grey-lighter' style={{fontWeight: 600}}>
                            月份
                        </td>
                        <td>
                            <input type='number'/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


export default FEE0109Q_header;
