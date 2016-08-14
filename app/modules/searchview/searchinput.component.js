/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { searchInput } from './search.css';

type Input = React$Component<any, any, any> & {
    value: string
};


export class SearchInput extends React.Component {

    searchField: ?Input;
    state: any;

    constructor(props: any) {
        super(props);
        this.searchField = null;
        this.state = {
            initialValue: props.initialValue,
        };
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
        let {initialValue} = this.state;
        return ( <input
            className={searchInput}
            defaultValue={initialValue}
            ref={el => this.searchField = el}
            onKeyUp={() => this.onChange()}
        />
        );
    }
}

SearchInput.propTypes = {
    initialValue: React.PropTypes.string.isRequired,
    updateSearchFilter: React.PropTypes.func.isRequired,
};
