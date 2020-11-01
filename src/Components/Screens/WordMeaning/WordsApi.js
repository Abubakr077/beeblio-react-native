import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    AsyncStorage, Alert
} from 'react-native';
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/ConetentActions";


class WordsApi extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            dictionaryName:'',
            isLoadingContent: true,
            word:'',
            wordInfo:''
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('user_obj').then((user) => {
            const tempUSer = JSON.parse(user);
            this.setState({
                isLoadingContent: false,
                user: tempUSer,
                dictionaryName: tempUSer.dictionary.name,
            })
        })
    }
    render() {
        const {wordsApiResult} = this.props;
        const {isLoadingContent} = this.state;
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={{marginTop:2}}>
                        <Text style={styles.h5}>
                            [{wordsApiResult?.pronunciation?.all ? wordsApiResult?.pronunciation?.all : wordsApiResult.pronunciation.length ? wordsApiResult.pronunciation : wordsApiResult.word}]</Text>
                        {wordsApiResult?.syllables && <Text style={styles.p}>Syllable: {wordsApiResult?.syllables.list.join(' ')}</Text>}
                        {
                            wordsApiResult.results && wordsApiResult.results.map(
                                (result, index) => {
                                    return <View key={index}>
                                        {result.partOfSpeech && <Text style={styles.h5}>{result.partOfSpeech}</Text>}
                                        {
                                            result.definition && <View>
                                                <Text style={styles.pExampleBold} >Definition</Text>
                                                <Text>{result.definition}</Text>
                                            </View>
                                        }
                                        {result?.examples && <View>
                                            <Text style={styles.pExampleBold}>Examples</Text>
                                            <Text style={{marginBottom:4}} >
                                                {
                                                    <FlatList
                                                        data={result.examples}
                                                        renderItem={({item}) => <Text
                                                            style={styles.item}>{item}</Text>}
                                                    />
                                                }
                                            </Text>{result?.synonyms && <View>
                                            <Text style={styles.pExampleBold} >Synonyms</Text>
                                            <Text>{result?.synonyms.join(' ,')}</Text>
                                        </View>
                                        }
                                        </View>
                                        }
                                        {result.antonyms && <View>
                                            <Text style={styles.pExampleBold} >Antoynyms</Text>
                                            {
                                                result.antonyms.map(
                                                    (anto,idx) => {
                                                        return <Text key={idx} style={{marginLeft: 5}}>{anto}</Text>
                                                    }
                                                )
                                            }
                                        </View>
                                        }

                                    </View>
                                }
                            )
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "black",
        flex: 1,

    },

    backgroundImage: {
        // flex: 1.5,
        flexDirection: "column",
        resizeMode: "center",
        //backgroundColor:"white",


        // or 'stretch'
        // justifyContent: 'center',
        // marginBottom:20
    },
    contents: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    linearGradient1: {
        // flex: 1,
        paddingLeft: 10,
        paddingRight: 15,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10, marginTop: 20,
        width: 120,
        height: 40,
        alignItems: "center",
        justifyContent: "center",

    },
    button: {
        backgroundColor: '#c0c5cc',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 10,
        shadowOpacity: 0.35,
        height: 50,
        width: 150,
    },
    buttonText: {
        fontSize: 15,

        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: '#4976b8',
        backgroundColor: 'transparent',
        paddingVertical: 5,
        fontWeight: "bold",
        // alignSelf:"center"
    },h5:{
        fontSize: 22,
        fontWeight: 'bold',
        color: "#2f3133",
        textAlign: "left",
        marginTop: 10
    },h5_m_b:{
        fontSize: 22,
        fontWeight: 'bold',
        color: "#2f3133",
        textAlign: "left",
        marginTop: 10,
        marginBottom: 0
    },p:{
        fontSize: 22,
        color: "#2f3133",
        textAlign: "left",
        marginTop: 10
    },pExample:{
        fontSize: 20,
        color: "#2f3133",
        textAlign: "left",
        marginTop: 10,
        marginBottom:0
    },pExampleBold:{
        fontSize: 20,
        color: "#2f3133",
        textAlign: "left",
        marginTop: 10,
        marginBottom:0,
        fontWeight:'bold'
    },audioButton:{
        marginTop: -25,
        color: "#4976b8",
        textAlign: "right",
        fontWeight: "bold",
        fontSize: 18
    }
});


export default WordsApi;
