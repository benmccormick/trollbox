/* @flow */
import React from 'react';
import {appShell, pageContainer, sidebarContainer} from './app.css';
import {SearchViewContainer} from '../searchview/searchview.container';
import {SidebarContainer} from '../sidebar/sidebar.container';
import {ViewEditorContainer} from '../vieweditor/vieweditor.container';
import {getPage} from '../../data/page';
import { SEARCH_PAGE, VIEW_EDITOR_PAGE } from '../../actions/page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class App extends React.Component {
    render() {
        let pageContents = false;
        let {page} = this.props;
        switch (page) {
        case SEARCH_PAGE:
            pageContents = <SearchViewContainer/>;
            break;
        case VIEW_EDITOR_PAGE:
            pageContents = <ViewEditorContainer/>;
            break;
        default:
            break;
        }
        return (<div className={appShell}>
            <div className={sidebarContainer}>
                <SidebarContainer/>
            </div>
            <div className={pageContainer}>
                {pageContents}
            </div>
        </div>);
    }
};

App.propTypes = {
    page: React.PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
    page: getPage(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);


export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
