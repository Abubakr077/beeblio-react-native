import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    AsyncStorage, Alert
} from 'react-native';

import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/ConetentActions";
import Header from "../../SeperateComponents/Header";
import OxfordDictionary from "../WordMeaning/OxfordDictionary";
import Loader from "../../SeperateComponents/Loader";
import NotFound from "../../SeperateComponents/NotFound";
import WordsApi from "../WordMeaning/WordsApi";
import TwinWord from "../WordMeaning/TwinWord";

class Meaning extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            dictionaryName:'',
            isLoadingContent: true,
            word:'',
            wordInfo:null
        };
    }
    componentDidMount() {
        const word = this.props.navigation.state.params;
        AsyncStorage.getItem('user_obj').then((user) => {
            const tempUSer = JSON.parse(user);
            this.setState({
                isLoadingContent: false,
                user: tempUSer,
                dictionaryName: tempUSer.dictionary.name,
                word: word
            },()=>{
                this.updateWordInfo();
            })
        })
    }

    updateWordInfo () {
        const {getWordInfo} = this.props;
        const word = this.props.navigation.state.params;
        this.setState({isLoadingContent: true,word:word});

        getWordInfo({
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
            }, data:{
                dicName: this.state.dictionaryName,
                word: word
            }
        });
    }
    static getDerivedStateFromProps(props, state) {
        if (props.wordInfo !== state.wordInfo) {
            return {wordInfo: props.wordInfo};
        }
        return null;
    }

    render() {
        const {dictionaryName,wordInfo,isLoadingContent,word} = this.state;
        return (
            <View style={{flex: 1}}>
            <Header previous={true}  />
            <ScrollView style={{backgroundColor: 'white', marginTop: 10,marginBottom:30}}>
                    <Text style={{
                        fontSize: 42,
                        fontWeight: 'bold',
                        color: "#4976b8",
                        textAlign: "left",
                        marginHorizontal: 20,
                        marginTop: 20
                    }}>
                        {word} </Text>
                {isLoadingContent?<Loader/>:<View style={{backgroundColor: "white"}}>
                    <View style={{backgroundColor: "white"}}>
                        <View style={{
                            textAlign: "left",
                            marginHorizontal: 20,
                        }}>

                            {((dictionaryName === 'WORDSAPI' && wordInfo) &&
                                Object.entries(wordInfo).length > 0) &&
                            <WordsApi wordsApiResult={wordInfo} />
                            }



                            {(dictionaryName === 'TWINWORD' && wordInfo) &&
                            <TwinWord twinResult={wordInfo} />
                            }


                            {(dictionaryName === 'OXFORDDICTIONARIES' && wordInfo) &&
                            <OxfordDictionary oxfordResult={wordInfo} />
                            }
                            { !wordInfo &&
                            <NotFound/>
                            }
                        </View>
                    </View>
                </View>}
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
        marginLeft: 20,
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

    },
});


const mapStateToProps = state => {
    return {
        wordInfo: state.ContentReducer.wordInfo

    };
};

export default connect(
    mapStateToProps,
    {
        getWordInfo: actions.getWordInfo,
    },
)(Meaning);
