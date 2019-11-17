import React, {Component} from 'react';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import PopularPage from '../page/PopularPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';
import Entypo from 'react-native-vector-icons/Entypo';

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: 'tab1',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    }, TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: 'tab2',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'md-rrending-up'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    }, FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: 'tab3',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    }, MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: 'tab4',
            tabBarIcon: ({tintColor, focused}) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
};

class DynamicTabNavigator extends Component {
    _tabNavigator() {
        if (this.Tabs) {
            return this.Tabs;
        }
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
        return this.Tabs = createAppContainer(createBottomTabNavigator(
            tabs, {
                tabBarComponent: props => {
                    return <TabBarComponent theme={this.props.theme} {...props}/>;
                },
            }));
    }

    render() {
        const Tab = this._tabNavigator();
        return <Tab/>;
    }
}

class TabBarComponent extends Component {
    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme}
        />;
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});
export default connect(mapStateToProps)(DynamicTabNavigator);
