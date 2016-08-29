/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { get, map } from 'lodash';
import { bindActionCreators } from 'redux';
import { getAllViews, getCurrentView } from '../../data/views';
import { addView, changeSelectedView } from '../../actions/views';
import { switchPageToViewEditor } from '../../actions/page';
import { sidebar, addViewItem, addViewItemIcon } from './sidebar.css';
import {ViewItem} from './viewitem.component';
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline';

export class Sidebar extends React.Component {

    addView() {
        let {switchPageToViewEditor: createNewView} = this.props;
        createNewView();
    }

    render() {
        let {views, changeSelectedView: selectView, currentView} = this.props;
        let currentViewId = get(currentView, 'id', null);
        let viewElements = map(views, view => <ViewItem
            view={view}
            isSelected = {view.id === currentViewId}
            selectView={() => selectView(view.id)}
        />);
        return <div className={sidebar}>
            <div className={addViewItem}>
                Views <MdAddCircleOutline
                    onClick={() => this.addView()}
                    className={addViewItemIcon}
                />
            </div>
            {viewElements}
        </div>;
    }
};

Sidebar.propTypes = {
    views: React.PropTypes.array.isRequired,
    addView: React.PropTypes.func.isRequired,
    currentView: React.PropTypes.object.isRequired,
    switchPageToViewEditor: React.PropTypes.func.isRequired,
    changeSelectedView: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    views: getAllViews(state),
    currentView: getCurrentView(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addView,
    switchPageToViewEditor,
    changeSelectedView,
}, dispatch);


export const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);
