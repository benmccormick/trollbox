jest.unmock('../fuzzyfinder');
import {find} from '../fuzzyfinder';
import {defaultsDeep} from 'lodash';

let idIterator = 1;

let defaultCard = (cardOptions) => defaultsDeep(cardOptions, {
    id: idIterator++,
    dateLastActivity: '2016-01-01T01:00:00.000Z',
    name: 'default card',
    description: 'placeholder description',
    board: {
        name: 'default board',
    },
    list: {
        name: 'default list',
    },
    members: [{
        id: '1',
        username: 'user1',
        fullName: 'user name one',
    }, {
        id: '2',
        username: 'user2',
        fullName: 'user name two',
    }],
    labels: [{
        name: 'default label',
        color: 'blue',
    }]


});


describe('find', () => {

    it('scores a card that matches directly against name higher than one that doesn\'t', () => {
        let card1 = defaultCard({
            name: 'Card Number One',
        });

        let card2 = defaultCard({
            name: 'Card One Number'
        });

        let results1 = find([card1, card2], 'Card Number One', '123');

        expect(results1[0]).toBe(card1);
    });
});
