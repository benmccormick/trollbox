import { bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { getAllCards } from '../../data/cards';
import { map } from 'lodash';

export class CardList extends React.Component {
    render() {
        let { cards } = this.props;
        let cardNodes = map(cards, card => (<div key={card.id}>
            {card.name}
        </div>));

        return <div>{cardNodes}</div>;

    }
}

CardList.propTypes = {
    cards: React.PropTypes.array.isRequired,
};


const mapStateToProps = (state) => ({
    cards: getAllCards(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);


export const CardListContainer = connect(mapStateToProps, mapDispatchToProps)(CardList);
