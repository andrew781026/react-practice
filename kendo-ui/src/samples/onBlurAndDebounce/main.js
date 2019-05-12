import React from "react";
import _ from "lodash";

// Define the method directly in your class
// 產生延遲一秒效果的 function
// 參考資料 : https://stackoverflow.com/questions/36294134/lodash-debounce-with-react-input
let debounce =  _.debounce(func => func(), 1000); // @returns {Function} Returns the new debounced function.

class OnBlurAndDebounceComp extends React.Component {

    state = {
        changeValue: 0,
        blurValue: 0,
        debounce: _.debounce(func => func(), 1000)
    };

    handleOnBlur = () => {
        console.log('you are in handleOnBlur');
        this.setState({blurValue: this.state.blurValue + 1});
    };

    handleOnChange = () => {

        console.log('you are in handleOnChange');

        // 使用延遲一秒效果的 function
        this.state.debounce(this.handleApiRequestInOnChange);
    };

    handleApiRequestInOnChange = () => {
        console.log('you are in handleApiRequestInOnChange');
        this.setState({changeValue: this.state.changeValue + 1});
    };

    render() {

        return (
            <div>
                <button>儲存</button>
                <br/>
                onBlur文字輸入框 : <input type='text' onBlur={this.handleOnBlur.bind(this)}/><br/>
                onChange文字輸入框 : <input type='text' onChange={this.handleOnChange.bind(this)}/><br/>
                <h3>{this.state.changeValue}</h3><br/>
                <h3>{this.state.blurValue}</h3>
            </div>
        );
    }
}


export default OnBlurAndDebounceComp;
