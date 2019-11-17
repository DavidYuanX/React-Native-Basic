import {combineReducers} from 'redux';
import theme from './theme';
import popular from './popular';

/**
 * @Description: 1.创建 reducer
 * @parpm
 * @date 2019/11/17
 */
const index = combineReducers({
    theme: theme,
    popular: popular,
});
export default index;
