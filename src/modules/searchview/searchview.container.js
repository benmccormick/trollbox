import { bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { switchViewToBoards } from '../../actions/view';
import { getSearchFilter } from '../../data/search';
import { updateSearchFilter } from '../../actions/search';


export class SearchView extends React.Component {

    onChange() {
        this.props.updateSearchFilter(this.searchField.value);
    }

    render() {
        let {searchFilter} = this.props;
        return (<div>
            <div>
                <button onClick={this.props.switchViewToBoards}>See Boards</button>
            </div>
            <div>
                <input
                    defaultValue={searchFilter}
                    ref={el => this.searchField = el}
                    onKeyUp={() => this.onChange()}
                />
            </div>
        </div>);
    }
}

SearchView.propTypes = {
    switchViewToBoards: React.PropTypes.func.isRequired,
    searchFilter: React.PropTypes.string.isRequired,
    updateSearchFilter: React.PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
    searchFilter: getSearchFilter(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    switchViewToBoards,
    updateSearchFilter,
}, dispatch);


export const SearchViewContainer = connect(mapStateToProps, mapDispatchToProps)(SearchView);
