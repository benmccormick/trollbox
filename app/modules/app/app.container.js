/* @flow */
import React from 'react';
import {appShell, pageContainer, sidebarContainer} from './app.css';
import {BoardListContainer} from '../boardlist/boardlist.container';
import {SearchViewContainer} from '../searchview/searchview.container';
import {SidebarContainer} from '../sidebar/sidebar.container';
import {ViewEditorContainer} from '../vieweditor/vieweditor.container';
import {getView} from '../../data/view';
import {SEARCH_VIEW, BOARD_VIEW, VIEW_EDITOR_VIEW} from '../../actions/view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class App extends React.Component {
    render() {
        let page = false;
        let {view} = this.props;
        switch (view) {
        case SEARCH_VIEW:
            page = <SearchViewContainer/>;
            break;
        case BOARD_VIEW:
            page = <BoardListContainer/>;
            break;
        case VIEW_EDITOR_VIEW:
            page = <ViewEditorContainer/>;
            break;
        default:
            break;
        }
        return (<div className={appShell}>
            <div className={sidebarContainer}>
                <SidebarContainer/>
            </div>
            <div className={pageContainer}>
                {page}
            </div>
        </div>);
    }
};

App.propTypes = {
    view: React.PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
    view: getView(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);


export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
