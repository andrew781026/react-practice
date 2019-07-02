import React from 'react';
import ReactDOM from 'react-dom';
import {PDFExport, GridPDFExport, savePDF} from '@progress/kendo-react-pdf';
import {ExcelExport} from "@progress/kendo-react-excel-export";
import {Grid, GridColumn as Column, GridToolbar} from '@progress/kendo-react-grid';

import products from './products.json';

// 參考資料 : https://www.telerik.com/kendo-react-ui/components/pdfprocessing/
class PdfExportGrid extends React.Component {

    pdfExportComponent;
    gridPDFExport;
    grid;
    _export;

    constructor(props) {
        super(props);
        this.state = {
            gridData: products,
            skip: 0,
            take: 5
        };
    }

    pageChange = (event) => {
        this.setState({skip: event.page.skip, take: event.page.take});
    };

    exportExcelWithComponent = (myExport, data) => {
        myExport.save(data);
    };

    exportPDFWithMethod = (myGrid) => {
        savePDF(ReactDOM.findDOMNode(myGrid), {paperSize: 'A4'});
    };

    exportPDFWithGridPDFExport = (myGridPDFExport, data) => {
        myGridPDFExport.save(data);
    };


    exportPDFWithComponent = (myGridPdfExportComponent) => {
        myGridPdfExportComponent.save();
    };

    render() {

        const currentData = this.state.gridData.slice(this.state.skip, this.state.take + this.state.skip);

        console.log('this.state.gridData=', this.state.gridData);
        console.log('this.state=', this.state);
        console.log('this.state.skip=', this.state.skip);
        console.log('this.state.take=', this.state.take);
        console.log('currentData=', currentData);

        return (
            <div>
                <div className="example-config">
                    <button className="k-button" onClick={() => {
                        this.exportPDFWithComponent(this.pdfExportComponent)
                    }}>Export Pdf with component
                    </button>
                    &nbsp;
                    <button className="k-button" onClick={() => {
                        this.exportPDFWithMethod(this.grid)
                    }}>Export Pdf with method
                    </button>
                    &nbsp;
                    <button className="k-button" onClick={() => {
                        this.exportPDFWithGridPDFExport(this.gridPDFExport, this.state.gridData)
                    }}>Export Pdf with GridPDFExport
                    </button>
                    &nbsp;
                    <button className="k-button" onClick={() => {
                        this.exportExcelWithComponent(this._export, this.state.gridData)
                    }}>Export Excel
                    </button>
                </div>

                <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4">
                    <ExcelExport ref={(exporter) => this._export = exporter}>
                        <Grid
                            ref={(grid) => this.grid = grid}
                            style={{maxHeight: '400px'}}
                            data={currentData}
                            skip={this.state.skip}
                            take={this.state.take}
                            total={this.state.gridData.length}
                            pageSize={this.state.skip}
                            pageable={{
                                buttonCount: 5,
                                info: true,
                                type: "numeric",
                                pageSizes: true,
                                previousNext: true
                            }}
                            onPageChange={this.pageChange}
                            sortable
                            resizable
                            scrollable="scrollable"
                            headerCellRender={(defaultRendering, props) => (
                                <div style={{fontWeight: 500}}>{defaultRendering}</div>
                            )}
                        >
                            <Column field="ProductID" title="ID" width="40px"/>
                            <Column field="ProductName" title="Name" width="250px"/>
                            <Column field="Category.CategoryName" title="CategoryName"/>
                            <Column field="UnitPrice" title="Price" width="80px"/>
                            <Column field="UnitsInStock" title="In stock" width="80px"/>
                        </Grid>
                    </ExcelExport>
                </PDFExport>
            </div>
        );
    }

}

export default PdfExportGrid;

