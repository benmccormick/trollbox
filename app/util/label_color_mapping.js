import {get} from 'lodash';

const LABEL_COLOR_MAP = {
    green: '#61BD4F',
    yellow: '#F2D600',
    orange: '#FFAB4A',
    red: '#EB5A46',
    purple: '#C377E0',
    blue: '#0079BF',
    sky: '#00C2E0',
    lime: '#51E898',
    pink: '#FF80CE',
    black: '#4D4D4D',
};

export const getHexCodeForLabelColor =
    (color: ?string): string => get(LABEL_COLOR_MAP, [color], '#CCCCCC');
