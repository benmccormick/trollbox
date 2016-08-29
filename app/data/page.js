/* @flow */
import { CHANGE_PAGE, SEARCH_PAGE} from '../actions/page';
import type { actionType, pageOption } from '../interfaces/redux';


export const getPage = (state: any ): pageOption => state.page;

export const page = (state : pageOption = SEARCH_PAGE, action: actionType): pageOption => {
    let { type, page: _page } = action;
    switch (type) {
    case CHANGE_PAGE:
        return _page;
    default:
        return state;
    }
};
