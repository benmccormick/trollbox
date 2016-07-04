import { bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { switchViewToBoards } from '../../actions/view';
import { getSearchFilter, getSearchResults } from '../../data/search';
import { updateSearchFilter } from '../../actions/search';
import { map } from 'lodash';


export class SearchView extends React.Component {

    onChange() {
        this.props.updateSearchFilter(this.searchField.value);
    }

    render() {
        let {searchFilter, results} = this.props;
        let cards = map(results, card => {
            return <div>{card.name}</div>;
        });
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
            <div>
                {cards}
            </div>
        </div>);
    }
}

SearchView.propTypes = {
    switchViewToBoards: React.PropTypes.func.isRequired,
    searchFilter: React.PropTypes.string.isRequired,
    updateSearchFilter: React.PropTypes.func.isRequired,
    results: React.PropTypes.array.isRequired,
};


const mapStateToProps = (state) => ({
    searchFilter: getSearchFilter(state),
    results: getSearchResults(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    switchViewToBoards,
    updateSearchFilter,
}, dispatch);


export const SearchViewContainer = connect(mapStateToProps, mapDispatchToProps)(SearchView);
