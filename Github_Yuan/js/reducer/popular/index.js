import Types from '../../action/types';

const defaultState = {};
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.POPULAR_REFRESH: //下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                },
            };
        case Types.POPULAR_REFRESH_SUCCESS: //下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items, //原始数据
                    projectModels: action.projectModels, //
                    pageIndex: action.pageIndex,
                    isLoading: false,
                    hideLoadingMore: false,
                },
            };
        case Types.POPULAR_REFRESH_FAIL: //下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                },
            };
        case Types.POPULAR_LOAD_MORE_SUCCESS: //下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            };
        case Types.POPULAR_LOAD_MORE_FAIL: //上拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                },
            };
        default:
            return state;
    }
}
