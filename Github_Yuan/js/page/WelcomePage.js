import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import NavigationUtil from '../navigators/NavigationUtil';
import WelcomeImg from '../../0e1LuqHHZwY.jpg'
export default class WelcomePage extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true; // 关闭黄色警告
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHomePage(this.props);
        }, 2000);
    }

    componentWillMount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <ImageBackground
                source={WelcomeImg}
                resizeMode="cover"
                style={styles.backdrop}
            >
            <View style={styles.container}>
                <Text style={styles.text}>WelcomePage</Text>
            </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    backdrop: {flex: 1, flexDirection: 'column', width: '100%'},
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#ffffff'
    }
});
