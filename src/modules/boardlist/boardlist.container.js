/* @flow */
import { bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { getAllBoards } from '../../data/boards';
import { BoardSummary } from './boardsummary.component';
import {selectBoard, deselectBoard} from '../../actions/boardselection';
import { map } from 'lodash';
import {boardsContainer} from './boardlist.css';
import { switchViewToSearch } from '../../actions/view';

let toggleBoard = (isSelected, deselect, select, id) => {
    return isSelected ? () => deselect(id) : () => select(id);
};

export class BoardList extends React.Component {
    render() {
        let { boards, selectBoard: _selectBoard, deselectBoard: _deselectBoard } = this.props;
        let boardNodes = map(boards, board => (
            <BoardSummary
                key={board.id}
                board={board}
                isSelected = {board.isSelected}
                toggleBoard = {
                    toggleBoard(board.isSelected, _deselectBoard, _selectBoard, board.id)
                }
            />
        ));

        return <div>
            <div>
                <button onClick={this.props.switchViewToSearch}>Back to Search</button>
            </div>
            <div className={boardsContainer}>
                {boardNodes}
            </div>
        </div>;

    }
}

BoardList.propTypes = {
    boards: React.PropTypes.array.isRequired,
    selectBoard: React.PropTypes.func.isRequired,
    deselectBoard: React.PropTypes.func.isRequired,
    switchViewToSearch: React.PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
    boards: getAllBoards(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    selectBoard,
    deselectBoard,
    switchViewToSearch,
}, dispatch);


export const BoardListContainer = connect(mapStateToProps, mapDispatchToProps)(BoardList);
