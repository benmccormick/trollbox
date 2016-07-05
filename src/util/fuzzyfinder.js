/* @flow */
import { map, includes, sortBy, take} from 'lodash';
import type {Card} from '../interfaces/trello';
import moment from 'moment';

type ScoredCard = [string, number, Card];
type ResultSet = [Card, Card, Card, Card, Card];

let score, scoreName, scoreRecency, buildScoreArr, getScore, getCard;


export const find = (cards: Card[], filterStr: string): ResultSet => {
    //For now we care about name and dateLastActivity
    //we'll award between 0 and 100 points for a card name match and
    //between 0 and 10 points for a recency bonus
    let scores: ScoredCard[] = sortBy(map(cards, buildScoreArr(filterStr)), getScore );
    let selectedCards: ResultSet = map(take(scores, 5), getCard);
    return selectedCards;

};


buildScoreArr = (filterStr:string) => (card: Card): ScoredCard =>
    [card.id, score(card, filterStr), card];

score = (card: Card, filterStr: string): number => {
    //For now we care about name and dateLastActivity
    //we'll award between 0 and 100 points for a card name match and
    //between 0 and 10 points for a recency bonus
    return scoreName(card, filterStr) + scoreRecency(card);
};


scoreName = (card: Card, filterStr: string): number => {
    let {name} = card;
    let test = card.foo;
    console.log(test);
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

getScore = (scoredCard: ScoredCard): number => 0 - scoredCard[1];

getCard = (scoredCard: ScoredCard): Card => scoredCard[2];
