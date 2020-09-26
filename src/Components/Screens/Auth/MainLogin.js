import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Modal,
    Alert,
    TouchableHighlight,
    Animated
} from 'react-native';
import {Icon, Textarea, Container, Picker} from "native-base";
import {DrawerItems} from 'react-navigation';
import {Searchbar, ProgressBar} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import * as NavigationService from "../../../NavigationService";
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/AuthActions";
import {ARRAY_FILTER_LIMIT,ARRAY_SORING,ARRAY_CONTRACTION} from '../../../Helpers/constants'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First",
        note: "1"
    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Second",
        note: "1"

    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Third",
        note: "1"

    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First",
        note: "1"
    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Second",
        note: "1"

    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Third",
        note: "1"

    },

];

class MainLogin extends React.Component {
    static navigationOptions = ({navigation}) => ({
        drawerIcon: ({tintColor}) => (
            <Icon
                name="home"
                size={30}
                color='white'
            />
        ),
        headerTitle: "Home",
        headerLeft:
            <View style={{paddingLeft: 16}}>
                <Icon
                    name="md-menu"
                    size={30}
                    color='white'
                    onPress={() => navigation.toggleDrawer()}/>

            </View>,


    })

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            loading:false,
            isFiltered:false,
            progress:0,
            content: [],
            type: 'newspaper',
            isLoadingContent:false,
            isLoadingContentRss:false,
            modalVisible: false,
            xmlUrl:'',
            filter:{
                filterLimit: '',
                sorting:'',
                contractionOption:'',
                url:''
            }
        };
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    componentDidMount() {

        this.getNewContent();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.content !== this.state.content) {
            this.setState({ content: nextProps.content });
        }
        if (nextProps.rssFeedItems !== this.state.rssFeedItems) {
            this.setState({ rssFeedItems: nextProps.rssFeedItems });
        }
    }
    onRefresh() {
        this.setState({ content: [],loading: false,progress: 0 });
        this.getNewContent();
    }
    getNewContent = () => {
        const { getContent} = this.props;

        this.setState({isLoadingContent: true});
        getContent({
            onError: (error) => {
                alert(error);
                this.setState({isLoadingContent: false,progress: 0});
            },
            onSuccess: () => {
                this.setState({isLoadingContent: false,progress: 0});
            },
            type: this.state.type
        });

    }
    getNewContentRss = () => {
        const { getContentRss} = this.props;

        this.setState({isLoadingContentRss: true});
        getContentRss({
            onError: (error) => {
                alert(error);
                this.setState({isLoadingContentRss: false,progress: 0});
            },
            onSuccess: () => {
                this.setState({isLoadingContentRss: false,progress: 0});
                this.setModalVisible(true);
            },
            url: this.state.xmlUrl
        });

    }

    render() {
        const { classes, className, ...rest } = this.props;
        const {
            loading,
            progress,
            isFiltered,
            isLoadingContent,
            isLoadingContentRss,
            modalVisible
        } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView>

                    <ImageBackground source={require('./../../../../assets/image/wave.png')}
                                     style={styles.backgroundImage}>


                        <View style={{marginTop: 50, justifyContent: "center", alignItems: "center"}}>
                            <Image source={require('./../../../../assets/image/logobig.png')}
                                   style={{resizeMode: "cover"}}/>
                        </View>

                        <View style={{marginTop: 15, justifyContent: "center", alignItems: "center"}}>
                            <Image source={require('./../../../../assets/image/homeimg.png')}
                                   style={{resizeMode: "cover"}}/>
                        </View>

                        <View style={{flex: 1, justifyContent: "center", flexDirection: "row",}}>

                            <TouchableOpacity
                                style={{marginTop: 10, flex: 1,}}
                                onPress={() => {
                                    NavigationService.navigate('RegisterScreen');
                                }}
                            >
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                                    style={styles.linearGradient1}>
                                    <Text style={styles.buttonText}>SIGNUP</Text>
                                </LinearGradient>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{marginTop: 10, flex: 1}}
                                onPress={() => {
                                    NavigationService.navigate('LoginScreen');
                                }}
                            >
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                                    style={styles.linearGradient1}>
                                    <Text style={styles.buttonText}>LOGIN</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <View>
                        <View style={{
                            backgroundColor: "#fff", marginLeft: 10, marginRight: 10,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.8,
                            shadowRadius: 3,
                            elevation: 15,
                            alignItems: "center"
                        }}>


                            <Text style={{
                                fontSize: 18,
                                color: "black",
                                fontWeight: 'bold',
                                textAlign: "center",
                                marginLeft: 25,
                                marginTop: 15,
                                marginRight: 25
                            }}>Want to improve your vocabulary? Find and learn less common terms from any text you can
                                access</Text>
                            <Textarea
                                rowSpan={4}
                                bordered
                                placeholder="Provide the text content"
                                value={this.state.filter.url}
                                onChangeText={text => this.setState({ filter:{
                                    ...this.state.filter,
                                        url:text
                                    } })}
                                style={{borderBottomColor: "#000", height: 100, borderBottomWidth: .5, width: "80%"}}
                            />
                            <View style={styles.input}>
                                <Picker
                                    placeholder="Select the number of most frequently used terms to remove"
                                    placeholderStyle={{ color: "#2874F0" }}
                                    selectedValue={this.state.filter.filterLimit}
                                    onValueChange={(itemValue) => {
                                        this.setState({
                                            filter: {
                                                ...this.state.filter,
                                                filterLimit: itemValue
                                            }
                                        })
                                    }}
                                    mode={'dropdown'}
                                    note={false}
                                >
                                    {ARRAY_FILTER_LIMIT.map((item)=>
                                        <Picker.Item label={item} value={item}/>
                                    )}
                                </Picker>
                            </View>
                            <View style={styles.input}>
                                <Picker
                                    selectedValue={this.state.filter.sorting}
                                    onValueChange={(itemValue) => {
                                        this.setState({
                                            filter: {
                                                ...this.state.filter,
                                                sorting: itemValue
                                            }
                                        })
                                    }}
                                    mode={'dropdown'}
                                    note={false}
                                >
                                    {Object.entries(ARRAY_SORING).map((t, i) =>
                                        <Picker.Item label= {t[1]} value= {t[0]}/>
                                    )}
                                </Picker>
                            </View>
                            <View style={styles.input}>
                                <Picker
                                    selectedValue={this.state.filter.contractionOption}
                                    onValueChange={(itemValue) => {
                                        this.setState({
                                            filter: {
                                                ...this.state.filter,
                                                contractionOption: itemValue
                                            }
                                        })
                                    }}
                                    mode={'dropdown'}
                                    note={false}
                                >
                                    {Object.entries(ARRAY_CONTRACTION).map((t, i) =>
                                        <Picker.Item label= {t[1]} value= {t[0]}/>
                                    )}
                                </Picker>
                            </View>

                            <TouchableOpacity
                                style={{marginTop: 40, width: "100%"}}
                                onPress={() => {
                                    this.filterResults();
                                    console.log(this.state.filter)
                                }}
                            >
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    colors={['#3FB0F1', '#3FB0F1', '#256B9B']}
                                    style={styles.linearGradient1}>
                                    <Text style={styles.buttonText}>FILTER - CHECKOUTYOUR RESULTS</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            { loading &&
                            <View style={{
                                borderBottomColor: "#000",
                                width: "80%",
                                marginTop: "10%"
                            }}>

                                <ProgressBar
                                    style={{height: 5}}
                                    progress={progress}
                                    color={'#007bff'}
                                />
                            </View>
                            }

                            <Text style={{
                                fontSize: 20,
                                color: "black",
                                fontWeight: 'bold',
                                textAlign: "center",
                                marginLeft: 25,
                                marginTop: 15,
                                marginRight: 25
                            }}>Do you want to save your search history?</Text>


                            <TouchableOpacity
                                style={{marginTop: 10, width: "100%", marginBottom: 50}}>
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    colors={['#3FB0F1', '#3FB0F1', '#256B9B']}
                                    style={styles.linearGradient1}>
                                    <Text style={styles.buttonText}>SIGNUP ITS FREE</Text>
                                </LinearGradient>
                            </TouchableOpacity>


                        </View>

                        {
                            isFiltered &&
                            <View>
                                <Text style={{
                                    fontSize: 20,
                                    color: "black",
                                    fontWeight: 'bold',
                                    textAlign: "center",
                                    marginLeft: 25,
                                    marginTop: 15,
                                    marginRight: 25,
                                    marginBottom: 20
                                }}>FILTERED RESULTS</Text>
                                <FlatList
                                    data={DATA}
                                    horizontal={false}
                                    numColumns={3}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item}) => (
                                        <View style={{
                                            backgroundColor: "#fff",
                                            padding: 10,
                                            shadowColor: '#000',
                                            shadowOffset: {width: 0, height: 1},
                                            shadowOpacity: 0.8,
                                            shadowRadius: 3,
                                            elevation: 15,
                                            margin: 5,
                                            flex: 1,
                                            borderRadius: 20,
                                            flexDirection: "row",
                                            marginBottom: 5
                                        }}>
                                            <View style={{flex: 1, justifyContent: "center", alignSelf: "center",}}>

                                                <Text style={{
                                                    fontSize: 16,
                                                    color: "black",
                                                    textAlign: "center",
                                                }}>{item.title}</Text>
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: "black",
                                                    textAlign: "center",
                                                    marginTop: 7
                                                }}>({item.note})</Text>


                                            </View>
                                            <View style={{flex: 1, justifyContent: "flex-end", alignSelf: "flex-end",}}>

                                                <TouchableOpacity>

                                                    <Image source={require('./../../../../assets/image/02.png')} style={{
                                                        width: 35,
                                                        height: 35,
                                                        resizeMode: "cover",
                                                        marginLeft: 10
                                                    }}/>

                                                </TouchableOpacity>

                                                <TouchableOpacity>

                                                    <Image source={require('./../../../../assets/image/02.png')} style={{
                                                        width: 35,
                                                        height: 35,
                                                        resizeMode: "cover",
                                                        marginLeft: 10
                                                    }}/>

                                                </TouchableOpacity>

                                            </View>
                                        </View>

                                    )}
                                />
                                <View style={{marginBottom: 25}}/>
                            </View>
                        }
                        {
                            isLoadingContent ?
                                <View style={{
                                borderBottomColor: "#000",
                                width: "80%",
                                marginTop: "10%"
                                }}>
                                    <Text>Loading....</Text>
                                </View>:
                                <View>
                                <Text style={{
                                    fontSize: 20,
                                    color: "black",
                                    fontWeight: 'bold',
                                    textAlign: "center",
                                    marginLeft: 25,
                                    marginTop: 15,
                                    marginRight: 25,
                                    marginBottom: 20
                                }}>YOU CAN ALSO SELECT A CONTENT BELOW</Text>
                                    <FlatList
                                        data={this.state.content}
                                        horizontal={true}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item}) => (
                                                <TouchableOpacity
                                                    onPress={() => {

                                                        this.setState({
                                                            xmlUrl: item.rssFeeds[0]
                                                        },()=>{
                                                            this.getNewContentRss();
                                                        })
                                                    }}
                                                    style={{
                                                    backgroundColor: "#fff",
                                                    padding: 10,
                                                    shadowColor: '#000',
                                                    shadowOffset: {width: 1, height: 1},
                                                    shadowOpacity: 0.8,
                                                    shadowRadius: 3,
                                                    elevation: 15,
                                                    margin: 5,
                                                    flex: 1,
                                                    borderRadius: 5,
                                                    width: 300,
                                                    height: 350,
                                                    flexDirection: "row",
                                                    marginBottom: 5
                                                }}>
                                                    <View style={{flex: 1, justifyContent: "center", alignSelf: "center",}}>

                                                        <View style={{ justifyContent: "center", alignItems: "center"}}>
                                                            <Image
                                                                style={{
                                                                    width: "100%",
                                                                    height: undefined,
                                                                    aspectRatio: 1
                                                                }}
                                                                resizeMode={'cover'}
                                                                source = {{uri : item.referenceImageLink}}
                                                            />
                                                        </View>
                                                        <Text style={{
                                                            fontSize: 20,
                                                            color: "black",
                                                            textAlign: "center",
                                                        }}>{item.name}</Text>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            color: "#3FB0F1",
                                                            textAlign: "center",
                                                        }}>{item.publisher}</Text>
                                                    </View>
                                                </TouchableOpacity>


                                        )}
                                    />
                                <View style={{marginBottom: 25}}/>
                            </View>

                        }
                    </View>
                </ScrollView>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        // onRequestClose={() => {
                        //     Alert.alert("Modal has been closed.");
                        // }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {
                                    isLoadingContentRss ?
                                        <View style={{
                                            borderBottomColor: "#000",
                                            width: "80%",
                                            marginTop: "10%"
                                        }}>
                                            <Text>Loading....</Text>
                                        </View>:<View>
                                            <Text style={{
                                                fontSize: 20,
                                                color: "black",
                                                fontWeight: 'bold',
                                                textAlign: "center",
                                                marginLeft: 5,
                                                marginTop: 15,
                                                marginRight: 5,
                                                marginBottom: 20
                                            }}>List Of Articles: Select One To Get The Words.</Text>
                                            <FlatList
                                                data={this.state.rssFeedItems}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({item}) => (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.setState({ filter:{
                                                                    ...this.state.filter,
                                                                    url:item.link
                                                                }
                                                                },()=>{
                                                                this.setModalVisible(!modalVisible);
                                                            })
                                                        }}
                                                        style={{
                                                            backgroundColor: "#a9e3ff",
                                                            padding: 5,
                                                            flex: 1,
                                                            borderRadius: 5,
                                                            width: "100%",
                                                            height: undefined,
                                                            flexDirection: "row",
                                                            marginBottom: 5
                                                        }}>
                                                        <View style={{flex: 1, justifyContent: "center", alignSelf: "center",}}>
                                                            <Text style={styles.modalText}>{item.title}</Text>
                                                        </View>
                                                    </TouchableOpacity>


                                                )}
                                            />
                                            <View style={{marginBottom: 25}}/>
                                        </View>
                                }

                            </View>
                        </View>
                    </Modal>


                </View>
            </View>
        );
    }
    // anim = new Animated.Value(0);
    filterResults = (item) => {
        this.setState({
            loading:true
        });
        // this.anim.addListener(({value})=> {
        //     this.setState({progress: parseInt(value,10)});
        // });
        // Animated.timing(this.anim,{
        //     toValue: 1000,
        //     duration: 500000,
        // }).start();

        const { getFilteredContent} = this.props;


        getFilteredContent({
            onError: (error) => {
                alert(error);
                this.setState({loading: false,progress: 0});
            },
            onSuccess: () => {
                this.setState({loading: false,progress: 0});
            },
            data: this.state.filter
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: "column",
        backgroundColor: "#F2F2F2"
    },
    backgroundImage: {
        // flex: .5,
        resizeMode: 'cover',
        height: windowHeight * .65
        // or 'stretch'
        // justifyContent: 'center',
    },
    contents: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 12,
        margin: 7,
        height: 100,
        width: 75,
        marginTop: 15
    },
    linearGradient1: {
        // flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 35,
        marginLeft: 10,
        marginRight: 10, marginBottom: 10,
    },
    buttonText: {
        fontSize: 13,
        // fontFamily: 'Gill Sans',
        // textAlign: 'center',
        margin: 12,
        color: '#ffffff',
        backgroundColor: 'transparent',
        paddingVertical: 3,
        fontWeight: "bold",
        textAlign: "center"

    },centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },input:{
        borderBottomColor: "#000",
        borderBottomWidth: .5,
        width: "80%",
        marginTop: "10%"
    }

});


const mapStateToProps = state => {
    return {
        content: state.AuthReducer.content,
        rssFeedItems: state.AuthReducer.rssFeedItems,
        user: state.AuthReducer.user,
    };
};

export default connect(
    mapStateToProps,
    {
        getContent: actions.getContent,
        getContentRss: actions.getContentRss,
        getFilteredContent: actions.getFilteredContent
    },
)(MainLogin);
