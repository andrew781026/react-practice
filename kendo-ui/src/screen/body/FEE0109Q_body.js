import React from "react";
import {Grid, Button} from "@material-ui/core";
import {ComboBox} from '@progress/kendo-react-dropdowns';


class FEE0109Q_body extends React.Component {

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

        // Grid 系統 => xs = 12 代表 1個 row

        const cargoLocations = Object.keys(this.cargoLocation).map((key) => {
            return {text: this.cargoLocation[key], id: key}
        });

        return (
            <div>
                <h1>華儲公司年度行事曆</h1>
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


export default FEE0109Q_body;
