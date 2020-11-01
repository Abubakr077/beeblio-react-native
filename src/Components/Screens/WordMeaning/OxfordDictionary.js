import React, {Component, useCallback} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    AsyncStorage, Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/ConetentActions";
import Loader from "../../SeperateComponents/Loader";

class OxfordDictionary extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            dictionaryName:'',
            isLoadingContent: true,
            word:'',
            wordInfo:''
        };
        this.getAudio = this.getAudio.bind(this);
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
    getAudio (sentence){
        const {getContentAudio} = this.props;

        this.setState({isLoadingContent: true});
        getContentAudio({
            onError: (error) => {
                Alert.alert(
                    'Error',
                    error
                    ,[
                        {text: 'Okay'}
                    ]
                );
                this.setState({isLoadingContent: false});
            },
            onSuccess: () => {
                this.setState({isLoadingContent: false});
            }, sentence
        });
    }
    play (url) {
        const {playAudio} = this.props;

        this.setState({isLoadingContent: true});
        playAudio({
            onError: (error) => {
                Alert.alert(
                    'Error',
                    error
                    ,[
                        {text: 'Okay'}
                    ]
                );
                this.setState({isLoadingContent: false});
            },
            onSuccess: () => {
                this.setState({isLoadingContent: false});
            }, url
        });
    }
    render() {
        const {oxfordResult} = this.props;
        const {isLoadingContent} = this.state;
        return (
            <View style={{flex: 1}}>
                    <ScrollView>
                        {
                            oxfordResult && oxfordResult.map(
                                (result, index) => {
                                    return <View key={index}>
                                        {
                                            result.lexicalEntries && result.lexicalEntries.map(
                                                (lexicalEntry, index) => {
                                                    {
                                                        return <View key={index}>
                                                            <Text
                                                                style={styles.h5}
                                                            >{lexicalEntry.lexicalCategory.text}</Text>
                                                            {lexicalEntry.entries &&
                                                            lexicalEntry.entries.map((entry, enIndex) => {
                                                                return <View key={enIndex}>
                                                                    {entry.pronunciations &&
                                                                    entry.pronunciations.map(
                                                                        (pronunciation, prIndex) => {
                                                                            return <View key={prIndex}>
                                                                                <Text style={{marginBottom: 0}}>[{pronunciation.phoneticSpelling}]
                                                                                    (
                                                                                    {pronunciation.dialects &&
                                                                                    pronunciation.dialects.map(
                                                                                        (dialect, diIndex) => {
                                                                                            return <Text key={diIndex}>{dialect}</Text>
                                                                                        }
                                                                                    )
                                                                                    })
                                                                                </Text>
                                                                                {pronunciation.audioFile &&
                                                                                <TouchableOpacity
                                                                                    disabled={isLoadingContent}
                                                                                    style={styles.button}
                                                                                                  onPress={this.play.bind(this,pronunciation.audioFile)}
                                                                                >
                                                                                    {isLoadingContent?<Loader/>:<Image source={require('./../../../../assets/image/sou.png')}
                                                                                           style={{marginRight: 15, height: 30, width: 30}}/>}
                                                                                    <Text style={{
                                                                                        marginTop: -25,
                                                                                        color: "#4976b8",
                                                                                        textAlign: "right",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: 18
                                                                                    }}>{isLoadingContent ? 'Please wait...' : 'Play Audio'}</Text>
                                                                                </TouchableOpacity>}
                                                                            </View>
                                                                        }
                                                                    )
                                                                    }

                                                                    {entry.inflections && entry.inflections.length > 0 &&
                                                                    <Text style={styles.h5_m_b}>Inflections</Text>
                                                                    }
                                                                    {entry.inflections &&
                                                                    entry.inflections.map(
                                                                        (inflecetion, prIndex) => {
                                                                            return <Text
                                                                                style={styles.p}
                                                                                key={prIndex}
                                                                            >{inflecetion.inflectedForm}</Text>
                                                                        }
                                                                    )
                                                                    }
                                                                    {
                                                                        <View>
                                                                            {/* {entry.senses && entry.senses.length > 0 &&
                                                                        <Text>Definitions</Text>
                                                                    }                                                                     */}
                                                                            {entry.senses && entry.senses.map((sense, senIndex) => {
                                                                                return <View key={senIndex}>

                                                                                    {sense.definitions && sense.definitions.length > 0 &&
                                                                                    <Text
                                                                                        style={{marginBottom: 0,marginTop:1.5,fontStyle:'italic'}}>Definition {senIndex + 1}:</Text>
                                                                                    }

                                                                                    {
                                                                                        sense.definitions && sense.definitions.map(
                                                                                            (defination, defIndex) => {
                                                                                                return <Text key={defIndex}
                                                                                                    style={styles.pExample}>{defination}</Text>
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    {
                                                                                        sense.shortDefinitions && sense.shortDefinitions.map(
                                                                                            (shortdefination, defIndex) => {
                                                                                                return <Text
                                                                                                    key={defIndex}
                                                                                                    style={{marginBottom: 0}}>{shortdefination} (short
                                                                                                    def)</Text>
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    {sense.examples && sense.examples.length > 0 &&
                                                                                    <Text
                                                                                        style={{marginBottom: 0,fontWeight: 'bold'}}>Examples:</Text>
                                                                                    }
                                                                                    {
                                                                                        sense.examples && sense.examples.map(
                                                                                            (example, exIndex) => {
                                                                                                return <Text
                                                                                                    key={exIndex}
                                                                                                    style={styles.pExample}>{example.text}</Text>
                                                                                            }
                                                                                        )
                                                                                    }

                                                                                </View>
                                                                            })}
                                                                        </View>
                                                                    }
                                                                </View>
                                                            })
                                                            }

                                                            {lexicalEntry.phrases && lexicalEntry.phrases.length > 0 &&
                                                            <Text
                                                                style={styles.h5}
                                                            >Phrases</Text>
                                                            }
                                                            {lexicalEntry.phrases &&
                                                            lexicalEntry.phrases.map(
                                                                (phrase, prIndex) => {
                                                                    return <Text
                                                                        key={prIndex}
                                                                        style={styles.p}
                                                                    >{phrase.text}</Text>
                                                                }
                                                            )
                                                            }
                                                        </View>
                                                    }

                                                }
                                            )
                                        }
                                    </View>
                                }
                            )
                        }
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
    },audioButton:{
        marginTop: -25,
        color: "#4976b8",
        textAlign: "right",
        fontWeight: "bold",
        fontSize: 18
    }
});


export default connect(
    null,
    {
        getContentAudio: actions.getContentAudio,
        playAudio: actions.playAudio,
    },
)(OxfordDictionary);
