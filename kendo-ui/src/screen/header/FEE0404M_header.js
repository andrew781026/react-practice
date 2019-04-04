import React from "react";
import {Grid, Button} from "@material-ui/core";
import {ComboBox} from '@progress/kendo-react-dropdowns';


class FEE0404R_Header extends React.Component {

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
                    <Button variant="contained" color="primary" style={{margin: 5}}>
                        查詢
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: 5}}>
                        儲存
                    </Button>
                </Grid>
                <Grid container>
                    <Grid item xs={4} style={{border: '3px solid grey'}}>
                        <Grid container>
                            <Grid className='bg-grey-darker' style={{width: 100}}>貨棧別</Grid>
                            <Grid>
                                <ComboBox
                                    data={cargoLocations}
                                    textField="text"
                                    dataItemKey="id"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} style={{border: '3px solid grey'}}>
                        <Grid container>
                            <Grid className='bg-grey-darker' style={{width: 100}}>西元</Grid>
                            <Grid><input type='number'/></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} style={{border: '3px solid grey'}}>
                        <Grid container>
                            <Grid className='bg-grey-darker' style={{width: 100}}>月份</Grid>
                            <Grid><input type='number'/></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default FEE0404R_Header;
