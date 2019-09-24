import {withStyles} from '@material-ui/core/styles';
import React from "react";

// 也許可以用 org-chart 做出比賽圖的效果 , https://www.npmjs.com/package/orgchart
class GameGraph extends React.Component {

    render() {

        const imgSrcFirst = 'data:image/jpeg;base64,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';

        const divStyle = {
            backgroundColor: '#dddddd',
            padding: '10px',
            marginLeft: '10px',
            marginRight: '10px',
            marginBottom: '10px',
            borderRadius: '10px',
            width: '100px'
        };

        const {classes} = this.props;

        const vlStyle = {
            borderLeft: '6px solid black',
            marginLeft: '10px',
            height: '100px'
        };

        const lineBoxStyle = {
            borderTop: '3px solid black',
            borderLeft: '3px solid black',
            borderRight: '3px solid black',
            marginLeft: '70px',
            height: '100px',
            width: '140px',
        };

        const secondLineBoxStyle = {
            borderTop: '3px solid black',
            borderLeft: '3px solid black',
            borderRight: '3px solid black',
            marginLeft: '140px',
            height: '100px',
            width: '140px',
        };

        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={lineBoxStyle}/>
                    <div style={secondLineBoxStyle}/>
                    <div style={secondLineBoxStyle}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={divStyle}>
                        <img width='100px' src={imgSrcFirst}/>
                    </div>
                    <div style={divStyle}>
                        <img width='100px' src={imgSrcFirst}/>
                    </div>
                    <div style={divStyle}>
                        <img width='100px' src={imgSrcFirst}/>
                    </div>
                    <div style={divStyle}>
                        <img width='100px' src={imgSrcFirst}/>
                    </div>
                    <div style={divStyle}>
                        <img width='100px' src={imgSrcFirst}/>
                    </div>
                    <div style={divStyle}>
                        <img width='100px' src={imgSrcFirst}/>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

export default withStyles(styles)(GameGraph);
