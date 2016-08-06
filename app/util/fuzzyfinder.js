/* @flow */
import { map, includes, sortBy, take, lowerCase, words, filter, some,
    gt, every, max, reduce} from 'lodash';
import type {Card} from '../interfaces/trello';
import moment from 'moment';

type ScoredCard = [string, number, Card];
export type ResultSet = [Card, Card, Card, Card, Card];

let score, scoreName, scoreRecency, buildScoreArr, getScore, getCard, scoreBoardName,
    fullMatch, cheapMatch, scoreDescription, scoreListName, scoreUserName, scoreLabelNames,
    currentUserOnCard;


export const find = (cards: Card[], filterStr: string, currentUserId: ?string): ResultSet => {
    //For now we care about name and dateLastActivity
    //we'll award between 0 and 100 points for a card name match and
    //between 0 and 10 points for a recency bonus
    let scores: ScoredCard[] =
        sortBy(map(cards, buildScoreArr(filterStr, currentUserId)), getScore );
    let selectedCards: ResultSet = map(take(scores, 5), getCard);
    return selectedCards;

};


buildScoreArr = (filterStr:string, currentUserId: ?string) => (card: Card): ScoredCard =>
    [card.id, score(card, filterStr, currentUserId), card];

score = (card: Card, filterStr: string, currentUserId: ?string): number => {

    /* filter scores: based on the user search entry */

    // Score based on name of card (0 - 100 )
    let nameScore = scoreName(card, filterStr) * 100;
    // Score based on recency (0 - 10)
    let recencyScore = scoreRecency(card) * 10;
    // Score based on board name (0 - 120)
    let boardNameScore = scoreBoardName(card, filterStr) * 120;
    // Score based on card description (0 - 60)
    let cardDescriptionScore = scoreDescription(card, filterStr) * 60;
    // Score based on list name (0 - 60)
    let listNameScore = card.list ? scoreListName(card, filterStr) * 60 : 0;
    // Score based on user name (0 - 150)
    let userNameScore = scoreUserName(card, filterStr) * 150;

    /* intrinsic scores: these aren't based on the filterStr */

    // Score based on whether the current user is on the card (30)
    let currentUserScore = currentUserOnCard(card, currentUserId) * 30;

    let labelNamesScore =
        reduce(scoreLabelNames(card, filterStr), (num, _score) => num + _score * 30, 0);

    //aggregate the scores
    return nameScore + recencyScore + boardNameScore + cardDescriptionScore +
        listNameScore + userNameScore + labelNamesScore + currentUserScore;
};


scoreName = (card: Card, filterStr: string): number => {
    let {name} = card;
    return fullMatch(filterStr, name);
};

scoreDescription = (card: Card, filterStr: string): number => {
    let {description} = card;
    return cheapMatch(filterStr, description);
};

scoreLabelNames = (card: Card, filterStr: string): number[] => {
    let {labels} = card;
    return map(labels, label => fullMatch(filterStr, label.name));
};

scoreBoardName = (card: Card, filterStr: string): number => {
    let {board: {name: boardName}} = card;
    //just very direct for now
    return fullMatch(filterStr, boardName);
};

scoreListName = (card: Card, filterStr: string): number => {
    let {list: {name: listName}} = card;
    return fullMatch(filterStr, listName);
};

currentUserOnCard = (card: Card, currentUserId: ?string) => {
    let {users} = card;
    return some(users, user => user.id === currentUserId) ? 1 : 0;
};

scoreRecency = (card:Card): number => {
    let date = moment(card.dateLastActivity);
    let now = moment();

    if (date.isBefore(now.subtract(15, 'minutes'))) {
        // updated within last 15 minutes, return 10 points
        return 1;
    } else if (date.isBefore(now.subtract(1, 'hours'))) {
        return 0.8;
    } else if (date.isBefore(now.subtract(6, 'hours'))) {
        return 0.7;
    } else if (date.isBefore(now.subtract(1, 'days'))) {
        return 0.5;
    } else if (date.isBefore(now.subtract(3, 'days'))) {
        return 0.3;
    } else if (date.isBefore(now.subtract(1, 'weeks'))) {
        return 0.2;
    } else if (date.isBefore(now.subtract(3, 'weeks'))) {
        return 0.1;
    }
    return 0;
};

scoreUserName = (card: Card, filterStr: string): number => {
    let {members} = card;
    return reduce(members, (maxVal, member) => {
        let {fullName, username} = member;
        let match = str => fullMatch(filterStr, str);
        return max([maxVal, match(fullName), match(username)]);
    }, 0);
};

// this is the expensive fuzzy matching algorithm to see if filterStr is in text
// it returns a number between 0 and 1
fullMatch = (filterStr: string, text: string) => {
    //look for direct matches first
    if (lowerCase(filterStr) === lowerCase(text)) {
        //small bonus for correct casing
        return filterStr === text ? 1 : 0.98;
    }
    // look for matches on part of the search string next
    if (includes(lowerCase(text), lowerCase(filterStr))) {
        //small bonus for correct casing
        return includes(text, filterStr) ? .98 : 0.96;
    }
    // finally look for substring matches on part of the text
    if (includes(lowerCase(filterStr), lowerCase(text))) {
        //small bonus for correct casing
        return includes(filterStr, text) ? .96 : 0.94;
    }
    let filterWords = words(filterStr);
    let indices = map(filterWords, word => text.indexOf(word));

    //we give up to .8 points for matching each word individually, and a bonus .10 for all matches
    //being in order
    let matches = filter(indices, i => gt(i, 0));
    let baseScore = matches.length * 0.8 / filterWords.length;
    let getsBonus =
        matches.length > 1 && every(matches, (num, idx, list) => !idx || num > list[idx - 1]);
    let bonus = getsBonus ? 0.1 : 0;
    return baseScore + bonus;
};

cheapMatch = (filterStr, text) => {
    return includes(lowerCase(filterStr), lowerCase(text)) ? 1 : 0;
};

getScore = (scoredCard: ScoredCard): number => 0 - scoredCard[1];

getCard = (scoredCard: ScoredCard): Card => scoredCard[2];
