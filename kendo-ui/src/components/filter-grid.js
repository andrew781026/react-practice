import React from 'react';
import {Grid, GridToolbar, GridColumn as Column} from '@progress/kendo-react-grid';
import {defineFont} from '@progress/kendo-drawing/pdf';
import {GridPDFExport} from '@progress/kendo-react-pdf';
import {filterBy, orderBy} from '@progress/kendo-data-query';
import {sampleProducts} from '../datas/sample-products.jsx';


class FilterGrid extends React.Component {

    gridPDFExport;

    state = {
        skip: 0,
        take: 10,
        sort: [
            {field: 'ProductName', dir: 'asc'}
        ]
    };

    setFilter = () => {

        const filter = {
            logic: "and",
            filters: [
                {field: "ProductName", operator: "contains", value: "Chef"}
            ]
        };

        this.setState({filter});
    };

    clearFilter = () => {

        const filter = undefined;

        this.setState({filter});
    };

    pageChange = (event) => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    };

    exportPDF = () => {

        // 微軟正黑體 TTF
        const Microsoft_JhengHei_Url = "http://cloud.ziti8.cn/fonts/weiruan/%E5%BE%AE%E8%BD%AF%E6%AD%A3%E9%BB%91%E4%BD%93.ttf";

        // 思源黑體
        const googleFontUrl = 'https://fonts.googleapis.com/earlyaccess/notosanskannada.css';

        defineFont({
            "DejaVu Sans": Microsoft_JhengHei_Url,
            "DejaVu Sans|Bold": "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic": "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic": "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });


        const saveFunc = () => {
            this.gridPDFExport.save(sampleProducts);
        };

        // Simulate a response from a web request.
        setTimeout(saveFunc, 250);
    };

    render() {

        console.log(this.state.sort);

        const sortedData = orderBy(sampleProducts, this.state.sort);
        const filteredData = filterBy(sortedData, this.state.filter);
        const pageFilteredData = filteredData.slice(this.state.skip, this.state.take + this.state.skip);
        const editingData = pageFilteredData.map(item => ({...item, inEdit: true}));

        const grid = (
            <Grid
                style={{height: '550px'}}
                data={editingData}

                skip={this.state.skip}
                take={this.state.take}
                total={filteredData.length}
                pageable={true}
                onPageChange={this.pageChange}

                filterable
                filter={this.state.filter}
                onFilterChange={(e) => {
                    this.setState({filter: e.filter});
                }}

                editField="inEdit"
                sortable
                sort={this.state.sort}
                onSortChange={(e) => {
                    this.setState({sort: e.sort});
                }}
            >
                <GridToolbar>
                    <button
                        title="Export PDF"
                        className="k-button k-primary"
                        onClick={(this.state.filter) ? this.clearFilter : this.setFilter}
                    >
                        {(this.state.filter) ? '清除 篩選條件 ( Filter )' : '設定 篩選條件 ( Filter )'}
                    </button>
                    <button
                        title="Export PDF"
                        className="k-button k-primary"
                        onClick={this.exportPDF}
                    >
                        Export PDF
                    </button>
                </GridToolbar>
                <Column field="ProductID" title="ID" filterable={false} width="70px"/>
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
