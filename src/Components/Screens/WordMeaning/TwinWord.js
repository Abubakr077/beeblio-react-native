import React from 'react';
import {
    StyleSheet,
    Text,
    View,

    ScrollView,
AsyncStorage
} from 'react-native';


class TwinWord extends React.PureComponent {
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
        const {twinResult} = this.props;
        const {isLoadingContent} = this.state;
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                        {
                            (twinResult.result_msg !== '' && twinResult.result_msg !== 'Success') &&
                            <Text style={{
                                paddingTop:4,
                                color: '#dc3545'
                            }} >{twinResult.result_msg}</Text>
                        }
                        {twinResult.ipa &&
                        <View>
                            <Text style={styles.h5_m_b_4} >{twinResult.ipa}</Text>
                            {/* <p>{twinResult.ipa}</p> */}

                        </View>
                        }
                        {
                            (twinResult.meaning && (twinResult.meaning.noun !== '' ||
                                    twinResult.meaning.adjective !== '' ||
                                    twinResult.meaning.adverb !== '' ||
                                    twinResult.meaning.verb !== '')
                            ) &&
                            <Text style={styles.h5_italic} >Definition</Text>
                        }
                        <Text>
                        {(twinResult.meaning && twinResult.meaning.noun && twinResult.meaning.noun !== '') &&
                        <View>
                            {twinResult.meaning.noun.split("\n").map( (item, idx)=>
                                    <View key={idx}>
                                        <Text>{item+'\n'}</Text>
                                    </View>
                             )}
                        </View>
                        }
                        </Text>
                        <Text>
                    {(twinResult.meaning && twinResult.meaning.adjective && twinResult.meaning.adjective !== '') &&
                    <View>
                        {twinResult.meaning.adjective.split("\n").map( (item, idx)=>
                                <View key={idx}>
                                    <Text>{item+'\n'}</Text>
                                </View>
                         )}
                    </View>
                    }
                        </Text>
                    <Text>
                    {(twinResult.meaning && twinResult.meaning.adverb && twinResult.meaning.adverb !== '') &&
                    <view>
                        {twinResult.meaning.adverb.split("\n").map((item, idx)=>
                            <View key={idx}>
                                <Text>{item+'\n'}</Text>
                            </View>
                        )}
                    </view>
                    }
                    </Text>
                    <Text>
                    {(twinResult.meaning && twinResult.meaning.verb && twinResult.meaning.verb !== '') &&
                    <View>
                        {twinResult.meaning.verb.split("\n").map((item, idx)=>
                            <View key={idx}>
                                <Text>{item+'\n'}</Text>
                            </View>
                        )}
                    </View>}
                    </Text>
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
    },h5_italic:{
        fontSize: 22,
        fontWeight: 'bold',
        color: "#2f3133",
        textAlign: "left",
        marginTop: 10,
        marginBottom: 0,
        fontStyle:'italic'
    },h5_m_b_4:{
        fontSize: 22,
        fontWeight: 'bold',
        color: "#2f3133",
        textAlign: "left",
        marginTop: 10,
        marginBottom: 4
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


export default TwinWord;
