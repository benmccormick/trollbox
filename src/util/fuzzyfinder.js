import { map, includes, sortBy, take} from 'lodash';
import moment from 'moment';

let score, scoreName, scoreRecency;

export const find = (cards, filterStr) => {
    //For now we care about name and dateLastActivity
    //we'll award between 0 and 100 points for a card name match and
    //between 0 and 10 points for a recency bonus
    let scores = sortBy(map(cards, card => [card.id, score(card, filterStr), card]),
        ([id, givenScore]) => 0 - givenScore);

    return map(take(scores, 5), ([id, givenScore, card]) => card);

};


score = (card, filterStr) => {
    //For now we care about name and dateLastActivity
    //we'll award between 0 and 100 points for a card name match and
    //between 0 and 10 points for a recency bonus
    return scoreName(card, filterStr) + scoreRecency(card);
};


scoreName = (card, filterStr) => {
    let {name} = card;
    //just very direct for now
    if (includes(name, filterStr)) {
        return 100;
    } else {
        return 0;
    }
};

scoreRecency = card => {
    let date = moment(card.dateLastActivity);
    let now = moment();

    if (date.isBefore(now.subtract(15, 'minutes'))) {
        // updated within last 15 minutes, return 10 points
        return 10;
    } else if (date.isBefore(now.subtract(1, 'hours'))) {
        return 8;
    } else if (date.isBefore(now.subtract(6, 'hours'))) {
        return 7;
    } else if (date.isBefore(now.subtract(1, 'days'))) {
        return 5;
    } else if (date.isBefore(now.subtract(3, 'days'))) {
        return 3;
    } else if (date.isBefore(now.subtract(1, 'weeks'))) {
        return 2;
    } else if (date.isBefore(now.subtract(3, 'weeks'))) {
        return 1;
    }
    return 0;
};
