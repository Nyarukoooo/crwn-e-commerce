import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';
import './collection-preview.styles.scss';

const CollectionPreview = ({title, items}) => (
    //performance concern: if the items array become large, it will slow down the page loading
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {items
            .filter((item, idx) => idx < 4)
            .map((item) => (
                <CollectionItem key={item.id} item={item}></CollectionItem>
            ))}
        </div>
    </div>
);

export default CollectionPreview; 