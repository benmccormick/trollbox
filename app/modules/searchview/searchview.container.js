/* @flow */
import { bindActionCreators } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getSearchFilter, getSearchResults } from '../../data/search';
import { updateSearchFilter } from '../../actions/search';
import { CardView } from './card.component';
import { map } from 'lodash';
import {SearchInput} from './searchinput.component';
import { searchContainer, searchPage} from './search.css';


export const SearchView = (props: any) => {
    let {searchFilter,
        results,
        updateSearchFilter: _updateSearchFilter,
    } = props;
    let cards = map(results, result => {
        let {card, score, scoreBreakdown} = result;
        return <CardView card={card} score={score} scoreBreakdown={scoreBreakdown}/>;
    });
    return (<div className={searchPage}>
        <div className={searchContainer}>
            <div>
                <SearchInput
                    initialValue={searchFilter}
                    updateSearchFilter={_updateSearchFilter}
                />
            </div>
            {cards}
        </div>
    </div>);
};

SearchView.propTypes = {
    searchFilter: React.PropTypes.string.isRequired,
    updateSearchFilter: React.PropTypes.func.isRequired,
    results: React.PropTypes.array.isRequired,
};


const mapStateToProps = (state) => ({
    searchFilter: getSearchFilter(state),
    results: getSearchResults(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateSearchFilter,
}, dispatch);


export const SearchViewContainer = connect(mapStateToProps, mapDispatchToProps)(SearchView);
