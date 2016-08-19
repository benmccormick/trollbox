/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { bindActionCreators } from 'redux';
import { getAllViews } from '../../data/views';
import { addView, changeSelectedView } from '../../actions/views';
import { switchViewToViewEditor } from '../../actions/view';
import { sidebar, addViewItem } from './sidebar.css';
import {ViewItem} from './viewitem.component';
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline';

export class Sidebar extends React.Component {

    addView() {
        // let {addView: _addView} = this.props;
        //
        // _addView({
        //     name: 'Test View',
        //     sources: {
        //
        //     },
        //     filters: {
        //
        //     },
        // });
        let {switchViewToViewEditor: createNewView} = this.props;
        createNewView();
    }

    render() {
        let {views, changeSelectedView: selectView} = this.props;
        let viewElements = map(views, view => <ViewItem
            view={view}
            selectView={() => selectView(view.id)}
        />);
        return <div className={sidebar}>
            <div className={addViewItem}>
                Views <MdAddCircleOutline onClick={() => this.addView()}/>
            </div>
            {viewElements}
        </div>;
    }
};

Sidebar.propTypes = {
    views: React.PropTypes.array.isRequired,
    addView: React.PropTypes.func.isRequired,
    switchViewToViewEditor: React.PropTypes.func.isRequired,
    changeSelectedView: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    views: getAllViews(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addView,
    switchViewToViewEditor,
    changeSelectedView,
}, dispatch);


export const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);
