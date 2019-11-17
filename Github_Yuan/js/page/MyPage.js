import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigators/NavigationUtil';
import NavigationBar from '../common/NavigationBar';
const THEME_COLOR = '#678';
export default class MyPage extends Component {

    render() {
        return (
            <View>
                <NavigationBar
                    title={'tab4'}
                    statusBar={{
                        backgroundColor:THEME_COLOR,
                        barStyle:'light-content',
                    }}
                    style={{backgroundColor: THEME_COLOR}}
                />
                <Button
                    title={'修改主题'}
                    onPress={() => this.props.onThemeChange('#fff')}
                />
                <Text onPress={
                    ()=>{
                        NavigationUtil.goPage({},"DetailPage")
                    }
                }>跳转到详情页</Text>
                <Text onPress={
                    ()=>{
                        NavigationUtil.goPage({},"DemoPage")
                    }
                }>跳转到FetchDemoPage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 30
        // justifyContent: 'center',
        // alignItems: 'center',
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
});
