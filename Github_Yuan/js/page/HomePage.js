import React, {Component} from 'react';
import NavigationUtil from '../navigators/NavigationUtil';
import DynamicTabNavigator from '../navigators/DynamicTabNavigator';

export default class HomePage extends Component {
    render() {
        //FIX DynamicTabNavigator中的页面无法跳转到外层导航器页面的问题
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator />;
    }
}

