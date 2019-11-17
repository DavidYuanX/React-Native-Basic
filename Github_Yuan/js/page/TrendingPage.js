import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
import NavigationBar from '../common/NavigationBar';
const THEME_COLOR = '#678';
class TrendingPage extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View>
                <NavigationBar
                    title={'tab2'}
                    statusBar={{
                        backgroundColor:THEME_COLOR,
                        barStyle:'light-content',
                    }}
                    style={{backgroundColor: THEME_COLOR}}
                />
                <Button
                    title={'修改主题'}
                    onPress={() => this.props.onThemeChange('orange')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
export default connect(null, mapDispatchToProps)(TrendingPage);
