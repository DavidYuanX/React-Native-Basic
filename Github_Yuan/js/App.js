import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigators/AppNavigators';
import store from './store'

export default class App extends Component {
    render() {

        /**
         * @Description: 3.将 story 传递给 app 框架
         * @parpm
         * @date 2019/11/17
        */
        return <Provider store={store}>
            <AppNavigator/>
        </Provider>;
    }
}
