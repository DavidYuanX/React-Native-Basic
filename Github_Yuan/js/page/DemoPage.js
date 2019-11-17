import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
import DataStore from '../expand/Datastore';

export default class DemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showText: '',
        };
        this.dataStore = new DataStore();
    }

    /**
     * @Description: 网络请求
     * @parpm url 请求链接
     * @date 2019/11/17
     */
    fetchData = () => {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Network response was not ok.');
            })
            .then(responsrText => {
                this.setState({
                    searchText: responsrText,
                });
            })
            .catch(e => {
                this.setState({
                    searchText: e.toString(),
                });
            });
    };


    /**
     * @Description: 离线缓存
     * @parpm
     * @date 2019/11/17
     */
    loadData = () => {
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetchData(url)
            .then(data => {
                let ShowData = `初次数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText: ShowData,
                });
            })
            .catch(error => {
                error && this.setState({
                    showText: error.toString(),
                });
            });
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>FetchDemoPage</Text>
                <View style={styles.input_contaitor}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => {
                            this.searchKey = text;
                        }}
                    />
                    <Button
                        title={'获取'}
                        onPress={() => this.fetchData()}
                    />
                </View>
                <Text>离线缓存框架设计</Text>
                <View style={styles.input_contaitor}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => {
                            this.value = text;
                        }}
                    />
                    <Button
                        title={'获取'}
                        onPress={() => this.loadData()}
                    />
                </View>
                <Text>{this.state.showText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 30,
        borderColor: '#000',
        borderWidth: 1,
        marginTop: 10,
    },
    container: {
        flex: 1,
    },
    input_contaitor: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
