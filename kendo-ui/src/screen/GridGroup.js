import React from 'react';

import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';
import {process, groupBy, aggregateBy} from '@progress/kendo-data-query';

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

        // 將資料丟給 process 做分組 , 然後將結果當作 data 交給 Grid 做顯示
        // products 的參考資料 : https://www.telerik.com/kendo-react-ui/components/dataquery/#toc-process-helpers-for-bulk-operations
        // const result = process(products, dataState);
        const result = process(products, {
            skip: 0,  // 從 第 0 筆資料開始
            take: 10, // 只取 10 筆資料
            group: [
                {
                    field: "UnitsInStock", // groupBy 欄位
                    aggregates: [
                        {field: 'UnitsInStock', aggregate: 'sum'}, // 加總欄位
                        {field: 'UnitPrice', aggregate: 'average'} // 平均欄位
                    ]
                }
            ]
        });


        const newResult = groupBy(products, [{field: "UnitsInStock"}]);


        const aggregateByResult = aggregateBy(products, [
            {field: 'UnitsInStock', aggregate: 'sum'},
            {field: 'UnitPrice', aggregate: 'average'}
        ]);


        console.log('result=', result);
        console.log('newResult=', newResult);
        console.log('aggregateByResult=', aggregateByResult);
        console.log('dataState=', dataState);

        return {
            result: result,
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
                pageable={{pageSizes: true}}

                data={this.state.result}

                groupable={{footer: 'visible'}} // 加總項顯示
                expandField="expanded"          // 可縮起個別群組
                group={[{field: 'UnitsInStock'}]}  // groupBy 的欄位

                onExpandChange={this.expandChange}

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
