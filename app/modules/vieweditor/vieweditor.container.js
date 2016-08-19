/* @flow */
import { bindActionCreators } from 'redux';
import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import {map} from 'lodash';
import { getAllBoards } from '../../data/boards';
import {addView} from '../../actions/views';
import {container, form, formLabel, formInput, formSelect, primaryButton} from './vieweditor.css';
import { switchViewToSearch } from '../../actions/view';
import type { Board} from '../../interfaces/trello';
import type { View } from '../../interfaces/view';
import 'react-select/dist/react-select.css?global=true';

type boardOption = {
    value: string,
    label: string,
};

export class ViewEditor extends React.Component {

    state: {
        name: string,
        selectedBoards: string[],
    };


    updateName(name: string) {
        this.setState({name});
    }

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            selectedBoards: [],
        };
    }

    buildView() {
        let {addView: _addView, switchViewToSearch: _switchViewToSearch} = this.props;
        let {name, selectedBoards} = this.state;
        let newView: View = {
            name,
            sources: {
                boards: selectedBoards,
            }
        };

        _addView(newView);
        _switchViewToSearch();
    }

    selectBoards(boardIds: boardOption[]) {
        this.setState({
            selectedBoards: map(boardIds, option => option.value),
        });
    }

    render() {
        let boards: Board = this.props.boards;
        let boardOptions = map(boards, board => ({value: board.id, label: board.name}));
        let {name, selectedBoards} = this.state;
        return (<div className={container}>
            <h2> Create a new View </h2>
            <div className={form}>
                <label htmlFor="view-name" className={formLabel}>View Name</label>
                <input
                    id="view-name"
                    defaultValue={name}
                    className={formInput}
                    onChange={e => this.updateName(e.target.value)}
                />
                <label htmlFor="view-boards" className={formLabel}>Boards To Pull Cards From</label>
                <Select
                    id="view-boards"
                    className={formSelect}
                    options={boardOptions}
                    value={selectedBoards}
                    onChange={selectedIds => this.selectBoards(selectedIds)}
                    multi={true}
                />
                <span
                    className={primaryButton}
                    onClick={() => this.buildView()}>
                    Create View
                </span>
            </div>
        </div>);

    }
}

ViewEditor.propTypes = {
    boards: React.PropTypes.array.isRequired,
    addView: React.PropTypes.func.isRequired,
    switchViewToSearch: React.PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
    boards: getAllBoards(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addView,
    switchViewToSearch,
}, dispatch);


export const ViewEditorContainer = connect(mapStateToProps, mapDispatchToProps)(ViewEditor);
