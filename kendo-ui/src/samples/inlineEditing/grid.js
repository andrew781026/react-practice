import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';

import {sampleProducts} from './sampleProducts';

const newData = sampleProducts.map((item) => ({...item, inEdit: true}));

// 參考資料 : https://www.telerik.com/kendo-react-ui/components/grid/editing/editing-all-cell/
class CellEditingGrid extends React.Component {

    state = {data: newData};

    itemChange = (e) => {
        e.dataItem[e.field] = e.value;
        this.setState({
            data: [...this.state.data]
        });
    };

    render() {
        return (
            <Grid
                data={this.state.data}
                editField="inEdit"
                onItemChange={this.itemChange}
            >
                <Column field="ProductID" title="Id" width="50px" editable={false}/>
                <Column field="ProductName"/>
                <Column field="FirstOrderedOn" editor="date" format="{0:d}"/>
                <Column field="UnitsInStock" width="150px" editor="numeric"/>
                <Column field="Discontinued" width="50px" editor="boolean"/>
            </Grid>
        );
    }

}

export default CellEditingGrid;
