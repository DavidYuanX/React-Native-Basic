import React, {Component} from 'react';
import {FlatList, ActivityIndicator, StyleSheet, Text, View, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Toast from 'react-native-easy-toast';
import NavigationUtil from '../navigators/NavigationUtil';
import DemoPage from './DemoPage';
import PopularItem from '../common/PopularItem';
import NavigationBar from '../common/NavigationBar';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native'];
    }

    _getTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTabPage {...this.props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            };
        });
        return tabs;
    }

    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._getTabs(),
            {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: THEME_COLOR,
                        // marginTop: 104
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle,
                },
            },
        ));
        return (
            <View>
                <NavigationBar
                    title={'tab1'}
                    statusBar={{
                        backgroundColor:THEME_COLOR,
                        barStyle:'light-content',
                    }}
                    style={{backgroundColor: THEME_COLOR}}
                />
                <TabNavigator/>
            </View>
        );
    }
}
const pageSize = 10; //常量  防止其他地方修改
class PopularTab extends Component {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(loadMode) {
        const {onRefresPopular, onLoadMorePopular} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMode) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show('没有更多了');
            });
        } else {
            onRefresPopular(this.storeName, url, pageSize);
        }
    }

    /**
     * @Description:  获取与当前页面有关的数据
     * @date 2019/11/17
     */
    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [], // 要显示的数据
                hideLoadingMore: true, //默认隐藏加载更多
            };
        }
        return store
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }


    renderItem(data) {
        const item = data.item;
        // const {theme} = this.props;
        // return <View><Text>{item.id}</Text></View>

        return <PopularItem
            projectModel={item}
            // theme={theme}
            onSelect={(callback) => {
                // NavigationUtil.goPage({
                //     theme,
                //     projectModel: item,
                //     flag: FLAG_STORAGE.flag_popular,
                //     callback,
                // }, 'DetailPage')
                //  this.props.navigation.navigate('tab1');//跳转到createMaterialTopTabNavigator中的指定tab，主要这个navigation一定要是在跳转到createMaterialTopTabNavigator中的指页面获取的
            }}
            // onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)}
        />
    }

    genIndicator(){
        return this._store().hideLoadingMore?null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator  style={styles.indicator} />
                <Text>正在加载更多</Text>
            </View>
    }
    render() {
        const {popular} = this.props;
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => '' + item.id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                    ListFooterComponent={()=>this.genIndicator()}
                    onEndReached={()=>{
                        setTimeout(()=>{
                            if(this.canLoadMore){
                                console.log('---onEndReached----');
                                this.loadData(true)
                                this.canLoadMore = false
                            }
                        },1000)
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={()=>{
                        this.canLoadMore = true; //fix 初始化时页面滚动 调用onEndReached问题
                        console.log('---onMomentuScrollBegin----');
                    }}
                />
                <Toast ref={'toast'} position={'center'}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    popular: state.popular,
});
const mapDispatchToProps = dispatch => ({
    onRefresPopular: (storeName, url, pageSize) => dispatch(actions.onRefresPopular(storeName, url, pageSize)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack)),
});
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: '#ffffff',
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
