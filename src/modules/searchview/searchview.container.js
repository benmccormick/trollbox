import { bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';


export class SearchView extends React.Component {
    render() {
        return <div>hi</div>;
    }
}

SearchView.propTypes = {
};


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);


export const SearchViewContainer = connect(mapStateToProps, mapDispatchToProps)(SearchView);
