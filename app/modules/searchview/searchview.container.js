/* @flow */
import { bindActionCreators } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { switchViewToBoards } from '../../actions/view';
import { getSearchFilter, getSearchResults } from '../../data/search';
import { updateSearchFilter } from '../../actions/search';
import { CardView } from './card.component';
import { map } from 'lodash';
import { searchContainer, searchInput, searchPage} from './search.css';

type Input = React$Component & {
    value: string
};


export class SearchView extends React.Component {

    searchField: ?Input;

    constructor(props: any) {
        super(props);
        this.searchField = null;
    }

    onChange() {
        if (this.searchField) {
            this.props.updateSearchFilter(this.searchField.value);
        }
    }

    componentDidMount() {
        if (this.searchField) {
            ReactDOM.findDOMNode(this.searchField).focus();
        }
    }

    render() {
        let {searchFilter, results} = this.props;
        let cards = map(results, card => {
            return <CardView card={card} />;
        });
        return (<div className={searchPage}>
            <div>
                <button onClick={this.props.switchViewToBoards}>See Boards</button>
            </div>
            <div className={searchContainer}>
                <div>
                    <input
                        className={searchInput}
                        defaultValue={searchFilter}
                        ref={el => this.searchField = el}
                        onKeyUp={() => this.onChange()}
                    />
                </div>
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
