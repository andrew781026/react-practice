import React from 'react';

import kendo from '@progress/kendo-ui';
import { PivotGrid, PivotGridConfigurator } from '@progress/kendo-pivotgrid-react-wrapper';

class PivotGridContainer extends React.Component {
    constructor(props) {
        super(props);

        this.dataSource = new kendo.data.PivotDataSource({
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" }],
            rows: [{ name: "[Geography].[City]" }],
            measures: ["[Measures].[Reseller Freight Cost]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: "https://demos.telerik.com/olap/msmdpump.dll"
            },
            schema: {
                type: "xmla"
            },
            error: function (e) {
                alert("error: " + kendo.stringify(e.errors[0]));
            }
        });

    }

    render() {
        return (
            <div>
                <PivotGridConfigurator dataSource={this.dataSource}
                                       filterable={true}
                                       sortable={true}
                                       height={300}>
                </PivotGridConfigurator>
                <PivotGrid dataSource={this.dataSource}
                           filterable={true}
                           sortable={true}
                           height={550}
                           columnWidth={200}>
                </PivotGrid>
            </div>
        );
    }
}


export default PivotGridContainer;
