/* flow */
import React from 'react';
import type {View} from '../../interfaces/view';
import {viewItem} from './sidebar.css';

export const ViewItem = props => {
    let view : View = props.view;
    return (
        <div className={viewItem}> {view.name} </div>
    );

};

ViewItem.propTypes = {
    view: React.PropTypes.object,
};
