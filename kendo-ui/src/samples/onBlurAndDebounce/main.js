import React from "react";
import _ from "lodash";

class OnBlurAndDebounceComp extends React.Component {

    state = {
        changeValue: 0,
        blurValue: 0
    };

    handleOnBlur = () => {
        console.log('you are in handleOnBlur');
        this.setState({blurValue: this.state.blurValue + 1});
    };

    handleOnChange = () => {

        console.log('you are in handleOnChange');

        // 使用延遲一秒效果的 function
        this.debounce();
    };

    // Define the method directly in your class
    // 產生延遲一秒效果的 function
    debounce = _.debounce(() => {
        console.log('you are in handleApiRequestInOnChange');
        this.setState({changeValue: this.state.changeValue + 1});
    }, 1000);

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
