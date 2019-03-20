import React, {Component, PropTypes} from 'react';
import {withRouter} from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class UserTable extends Component {

    render() {

        // 姓名參考資料 : http://www.richyli.com/name/index.asp
        const data = [
            {
                name: '王曉明',
                age: 26,
                friend: {
                    name: '陳惠敏',
                    age: 29,
                }
            },
            {
                name: '陳玉夫',
                age: 33,
                friend: {
                    name: '王苡盈',
                    age: 18,
                }
            },
            {
                name: '林宜貞',
                age: 40,
                friend: {
                    name: '杜昌恒',
                    age: 51,
                }
            },
            {
                name: '吳秋博',
                age: 19,
                friend: {
                    name: '黃宗翰',
                    age: 20,
                }
            },
        ];


        const columns = [{
            Header: '姓名',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: '年齡',
            accessor: 'age',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            id: 'friendName', // Required because our accessor is not a string
            Header: '朋友姓名',
            accessor: d => d.friend.name // Custom value accessors!
        }, {
            Header: props => <span>朋友年齡</span>, // Custom header components!
            accessor: 'friend.age'
        }];

        return (
            <div style={{flex: 1}}>
                <h1>React Table 範例</h1>
                <div style={{flex: 0.8}}>
                    <ReactTable
                        data={data}
                        columns={columns}
                        filterable
                        className="-striped -highlight"
                    />
                </div>
            </div>
        );
    }

}


export default withRouter(UserTable);


