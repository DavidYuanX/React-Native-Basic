import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import DemoPage from '../page/DemoPage';

const InitNavigator = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                header: null, //隐藏头部
            },
        },
    },
);
const MainNavigator = createStackNavigator(
{
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null, //隐藏头部
        },
    },
    DetailPage: DetailPage,
    DemoPage: DemoPage
});
export default createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        header: null, //隐藏头部
    },
}));

