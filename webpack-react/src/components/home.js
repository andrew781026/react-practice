import React from 'react';

const Home = () => {
    return (
        <div>
            <div>I'm VERY VERY Good Home Components</div>
            <button onClick={()=>console.log('按鈕已被按下')}>按鈕</button>
            <a href='/hi'><h3>hi</h3></a><br/>
            <a href='/multiDownload'><h3>multiDownload</h3></a><br/>
            <a href='/gameGraph'><h3>晉級圖表</h3></a><br/>
        </div>
    );
};

export default Home;
