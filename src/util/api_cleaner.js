import {map, cloneDeep, keyBy} from 'lodash';

//no cleaning for now, just cloning
const cleanCardFromAPI = card => cloneDeep(card);

export const cleanCardsFromAPI = cards => keyBy(map(cards, cleanCardFromAPI), 'id');
