import React from 'react';
import './menu-item.styles.scss';
import {withRouter} from 'react-router-dom';

const MenuItem = ({title, imageUrl, size, history, match, linkUrl}) => (
    //1. size as a class add into className
    //2. 为什么background-image div没有把 content wrap 起来
    //3. content 的position设置成absolute 这样会显示在background-image上面
    <div 
        className={`${size} menu-item`}
        onClick={() => history.push(`${match.url}${linkUrl}`)} //match.url
    >  
        <div
            className='background-image'
            style = {{
            backgroundImage: `url(${imageUrl})`
        }}></div>
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

export default withRouter(MenuItem);

