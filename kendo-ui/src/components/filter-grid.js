import React from 'react';
import {Grid, GridToolbar, GridColumn as Column} from '@progress/kendo-react-grid';
import {GridPDFExport} from '@progress/kendo-react-pdf';
import {filterBy} from '@progress/kendo-data-query';
import {sampleProducts} from '../datas/sample-products.jsx';

class FilterGrid extends React.Component {

    gridPDFExport;

    state = {
        filter: {
            logic: "and",
            filters: [
                {field: "ProductName", operator: "contains", value: "Chef"}
            ]
        }
    };

    exportPDF = () => {

        const saveFunc = () => {
            this.gridPDFExport.save(sampleProducts);
        };

        // Simulate a response from a web request.
        setTimeout(saveFunc, 250);
    };

    render() {

        const grid = (
            <Grid
                style={{height: '420px'}}
                data={filterBy(sampleProducts, this.state.filter)}
                filterable
                filter={this.state.filter}
                onFilterChange={(e) => {
                    this.setState({
                        filter: e.filter
                    });
                }}
            >
                <GridToolbar>
                    <button
                        title="Export PDF"
                        className="k-button k-primary"
                        onClick={this.exportPDF}
                    >
                        Export PDF
                    </button>
                </GridToolbar>
                <Column field="ProductID" title="ID" filterable={false} width="40px"/>
                <Column field="ProductName" title="Product Name"/>
                <Column field="FirstOrderedOn" width="240px" filter="date" format="{0:d}"/>
                <Column field="UnitPrice" width="180px" filter="numeric" format="{0:c}"/>
                <Column field="Discontinued" width="130px" filter="boolean"/>
            </Grid>
        );


        return (
            <div>
                {grid}
                <GridPDFExport
                    ref={(element) => {
                        this.gridPDFExport = element;
                    }}
                    margin="1cm">
                    {grid}
                </GridPDFExport>
            </div>
        );
    }
}


export default FilterGrid;
