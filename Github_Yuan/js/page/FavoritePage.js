import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import actions from '../action';
import {connect} from 'react-redux';
import NavigationBar from '../common/NavigationBar';
const THEME_COLOR = '#678';
class FavoritePage extends Component {
    render() {
        return (
            <View>
                <NavigationBar
                    title={'tab3'}
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
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
export default connect(null, mapDispatchToProps)(FavoritePage);
