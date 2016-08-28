/* flow */
import React from 'react';
import type {View} from '../../interfaces/view';
import {viewItem, viewItemSelected} from './sidebar.css';

export const ViewItem = props => {
    let view : View = props.view;
    return (
        <div
            className={viewItem + (props.isSelected ? ` ${viewItemSelected}` : '')}
            onClick={props.selectView}>
            {view.name}
        </div>
    );

};

ViewItem.propTypes = {
    view: React.PropTypes.object.isRequired,
    selectView: React.PropTypes.func.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
};
