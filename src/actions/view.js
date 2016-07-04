export const CHANGE_VIEW = 'CHANGE_VIEW';

export const SEARCH_VIEW = 'SEARCH_VIEW';
export const BOARD_VIEW = 'BOARD_VIEW';

export const switchViewToSearch = () => ({
    type: CHANGE_VIEW,
    view: SEARCH_VIEW,
});

export const switchViewToBoards = () => ({
    type: CHANGE_VIEW,
    view: BOARD_VIEW,
});
