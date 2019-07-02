import React from 'react';

import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';
import {process} from '@progress/kendo-data-query';

import products from '../datas/products.json';

class GridGroup extends React.PureComponent {

    aggregates = [
        {field: 'UnitsInStock', aggregate: 'sum'},
        {field: 'UnitPrice', aggregate: 'average'}
    ];

    state = this.createAppState({
        skip: 0,
        take: 10,
        group: [
            {field: 'UnitsInStock'}
        ]
    });

    createAppState(dataState) {
        const groups = dataState.group;
        if (groups) {
            groups.map(group => group.aggregates = this.aggregates);
        }

        const result = process(products, dataState);

        console.log('result=', result);
        console.log('dataState=', dataState);

        return {
            result: process(products, dataState),
            dataState: dataState
        };
    }

    dataStateChange = (event) => {
        this.setState(this.createAppState(event.data));
    };

    expandChange = (event) => {
        event.dataItem[event.target.props.expandField] = event.value;
        this.setState({
            result: {...this.state.result},
            dataState: this.state.dataState
        });
    };

    cellRender(tdElement, cellProps) {
        if (cellProps.rowType === 'groupFooter') {
            if (cellProps.field === 'UnitPrice') {
                return (
                    <td>
                        Average: {cellProps.dataItem.aggregates.UnitPrice.average}
                    </td>
                );
            } else if (cellProps.field === 'UnitsInStock') {
                return (
                    <td>
                        Sum: {cellProps.dataItem.aggregates.UnitsInStock.sum}
                    </td>
                );
            }
        }
        return tdElement;
    }

    render() {
        return (
            <Grid
                style={{height: '520px'}}
                filterable={true}
                sortable={true}
                pageable={{pageSizes: true}}
                groupable={{footer: 'visible'}}

                data={this.state.result}


                skip={0}
                take={10}
                group={[
                    {
                        field: 'UnitsInStock',
                        aggregates: [
                            {field: 'UnitsInStock', aggregate: 'sum'},
                            {field: 'UnitPrice', aggregate: 'average'}
                        ]
                    }
                ]}

                onDataStateChange={this.dataStateChange}

                onExpandChange={this.expandChange}
                expandField="expanded"
                cellRender={this.cellRender}
            >
                <Column field="ProductID" filterable={false} title="ID" width="50px"/>
                <Column field="ProductName" title="Product Name"/>
                <Column field="UnitPrice" title="Unit Price" filter="numeric"/>
                <Column field="UnitsInStock" title="Units In Stock" filter="numeric"/>
                <Column field="Category.CategoryName" title="Category Name"/>
            </Grid>
        );
    }

}

export default GridGroup;
