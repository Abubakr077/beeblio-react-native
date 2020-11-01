import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    FlatList,
    Dimensions,
    Modal,
    Alert, AsyncStorage,
    TouchableOpacity
} from 'react-native';
import {Icon, Textarea, Picker} from "native-base";
import {ProgressBar} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import * as NavigationService from "../../../NavigationService";
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/AuthActions";
import * as contentActions from "../../../Store/Actions/ConetentActions";
import {ARRAY_FILTER_LIMIT, ARRAY_SORING, ARRAY_CONTRACTION,ARRAY_ACCENTS} from '../../../Helpers/constants'
const windowHeight = Dimensions.get('window').height;
import Loader from '../../SeperateComponents/Loader';
// import {TouchableOpacity} from 'react-native-gesture-handler';

class MainLogin extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            user: null,
            search: '',
            loading: false,
            isFiltered: false,
            progress: 0.2,
            content: [],
            filterItems: [],
            filteredItem: null,
            filterContentId: null,
            // type: 'newspaper',
            type: 'magazine',
            isLoadingContent: false,
            isLoadingContentRss: false,
            modalVisible: false,
            modalVisibleFilteredItem: false,
            xmlUrl: '',
            word: '',
            filter: {
                filterLimit: '10',
                sorting: 'FREQUENCY_REVERSE',
                contractionOption: 'REMOVE_CONTRACTION',
                url: ''
            },
            accent:'Joanna_English_US',
            signUpShow: false
        };
        this.filterResults = this.filterResults.bind(this);
        this.Reaction = this.Reaction.bind(this);
    }

    validURL(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    setModalVisible = (visible) => {
        console.log('visible',visible);
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        this.getNewContent();
        const contentUrl = this.props.navigation.state.params;
        if (contentUrl) {
            this.setState({
                filter: {
                    ...this.state.filter,
                    url: contentUrl
                }
            })
        }
        AsyncStorage.getItem('user_obj').then((user) => {
            this.setState({
                user: JSON.parse(user)
            })
        })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.content !== state.content) {
            return {content: props.content};
        }
        if (props.rssFeedItems !== state.rssFeedItems) {
            return {rssFeedItems: props.rssFeedItems};
        }
        if (props.user !== state.user) {
            return {user: props.user};
        }
        if (props.filterItems !== state.filterItems) {
            return {filterItems: props.filterItems};
        }
        if (props.filterContentId !== state.filterContentId) {
            return {filterContentId: props.filterContentId};
        }
        if (props.filteredItem !== state.filteredItem) {
            return {filteredItem: props.filteredItem};
        }
        return null;
    }

    onRefresh() {
        this.setState({content: [], loading: false, progress: 0});
        this.getNewContent();
    }

    getNewContent() {
        const {getContent} = this.props;

        this.setState({isLoadingContent: true});
        getContent({
            onError: (error) => {
                Alert.alert(
                    'Error',
                    error
                    , [
                        {text: 'Okay'}
                    ]
                );
                this.setState({isLoadingContent: false});
            },
            onSuccess: () => {
                this.setState({isLoadingContent: false});
            },
            type: this.state.type
        });

    }

    getFilteredItem (word) {
        const {getFilteredWordDetails} = this.props;
        this.setState({isLoadingContent: true, word: word});
        getFilteredWordDetails({
            onError: (error) => {
                Alert.alert(
                    'Error',
                    error
                    , [
                        {text: 'Okay'}
                    ]
                );
                this.setState({isLoadingContent: false});
            },
            onSuccess: () => {
                this.setState({isLoadingContent: false,modalVisibleFilteredItem: true});
            },
            data: {
                filterLimit: this.state.filter.filterLimit,
                sorting: this.state.filter.sorting,
                url: encodeURI(this.state.filter.url),
                contentId: this.state.filterContentId,
                word: encodeURI(word)
            }
        });

    }

    getNewContentRss=()=> {
        const {getContentRss} = this.props;

        this.setState({isLoadingContentRss: true,isLoadingContent:true});
        getContentRss({
            onError: (error) => {
                Alert.alert(
                    'Error',
                    error
                    , [
                        {text: 'Okay'}
                    ]
                );
                this.setState({isLoadingContentRss: false,isLoadingContent:false});
            },
            onSuccess: () => {
                this.setState({isLoadingContentRss: false,isLoadingContent:false});
                this.setModalVisible(true);
            },
            url: this.state.xmlUrl
        });

    }

    filterResults() {
        this.setState({
            loading: true
        });
        const {filter} = this.state;
        if (!this.validURL(filter.url)) {
            filter.content = filter.url
            filter.url = ''
        }


        const {getFilteredContentJson} = this.props;


        getFilteredContentJson({
            onError: (error) => {
                Alert.alert(
                    'Error',
                    error
                    , [
                        {text: 'Okay'}
                    ]
                );
                this.setState({progress: 0, loading: false});
            },
            onSuccess: () => {
                this.setState({progress: 0, loading: false, isFiltered: true});
            },
            onLoading: (percentCompleted) => {
                this.setState({
                    progress: this.state.progress + 0.1
                });
            },
            data: filter
        });
    }
    getAudio (sentence) {
        const {getContentAudioAccent} = this.props;
        const {accent} = this.state;
        const data = {
            sentence: sentence,
            accent:accent
        }

        // this.setState({isLoadingContent: true});
        getContentAudioAccent({
            onError: (error) => {
                Alert.alert(
                    'Error',
                    error
                    ,[
                        {text: 'Okay'}
                    ]
                );
                // this.setState({isLoadingContent: false});
            },
            onSuccess: () => {
                // this.setState({isLoadingContent: false});
            }, data
        });
    }
    Reaction () {
        const {doReact} = this.props;
        const {word,filteredItem,user,filterContentId} = this.state;

        if (!user){
            this.setState({
                signUpShow: true
            })
        }else {
            const data = {
                contentId: filterContentId,
                word: word,
                event: "LIKE",
                sentences:filteredItem
            }
            if (!filterContentId) {
                return Alert.alert(
                    'Error',
                    'Content id is not given'
                    ,[
                        {text: 'Okay'}
                    ]
                );

            }
            // this.setState({isLoadingContent: true});
            doReact({
                data,
                onSuccess: () => {
                    Alert.alert(
                        'Success',
                        'The action was successfully completed'
                        ,[
                            {text: 'Okay'}
                        ]
                    );
                    // this.setState({isReact:true});
                },
                onError: (message) => {
                    Alert.alert(
                        'Error',
                        message
                        ,[
                            {text: 'Okay'}
                        ]
                    );
                    // this.setState({isReact:true});
                }
            });
        }
    }
    render() {
        const {classes, className, ...rest} = this.props;
        const {
            loading,
            progress,
            isFiltered,
            isLoadingContent,
            isLoadingContentRss,
            modalVisible,
            user,
            filterItems,
            filteredItem,
            modalVisibleFilteredItem,
            word,
            accent,
            signUpShow
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

                        { user ?
                            !isLoadingContent && <View style={{flex: 1, justifyContent: "center", flexDirection: "row",}}>

                                <TouchableOpacity
                                    style={{marginTop: 10, flex: 1,}}
                                    onPress={() => {
                                        NavigationService.navigate('HomeScreen');
                                    }}
                                >
                                    <LinearGradient
                                        start={{x: 0, y: 0}}
                                        end={{x: 1, y: 0}}
                                        colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                                        style={styles.linearGradient1}>
                                        <Text style={styles.buttonText}>DASHBOARD</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View> :
                            !isLoadingContent && <View style={{flex: 1, justifyContent: "center", flexDirection: "row",}}>

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
                            </View>}

                    </ImageBackground>
                    {isLoadingContent ? <Loader/> : <View>
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
                                onChangeText={text => this.setState({
                                    filter: {
                                        ...this.state.filter,
                                        url: text
                                    }
                                })}
                                style={{borderBottomColor: "#000", height: 100, borderBottomWidth: .5, width: "80%"}}
                            />
                            <View style={styles.input}>
                                <Picker
                                    placeholder="Select the number of most frequently used terms to remove"
                                    placeholderStyle={{color: "#2874F0"}}
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
                                    {ARRAY_FILTER_LIMIT.map((item,index) =>
                                        <Picker.Item key={index} label={item} value={item}/>
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
                                        <Picker.Item key={i} label={t[1]} value={t[0]}/>
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
                                        <Picker.Item key={i} label={t[1]} value={t[0]}/>
                                    )}
                                </Picker>
                            </View>

                            <TouchableOpacity
                                style={{marginTop: 40, width: "100%"}}
                                onPress={this.filterResults}
                            >
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    colors={['#3FB0F1', '#3FB0F1', '#256B9B']}
                                    style={styles.linearGradient1}>
                                    <Text style={styles.buttonText}>FILTER - CHECKOUTYOUR RESULTS</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            {loading &&
                            <View style={{
                                borderBottomColor: "#000",
                                width: "80%",
                                marginTop: "10%",
                                marginBottom: 10,
                            }}>

                                <ProgressBar
                                    style={{height: 5}}
                                    progress={progress}
                                    color={'#007bff'}
                                />
                            </View>
                            }

                            {!user && <View style={{textAlign: "center",alignItems:'center'}}>
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
                                    style={{width: "100%", marginBottom: 20}}>
                                    <LinearGradient
                                        start={{x: 0, y: 0}}
                                        end={{x: 1, y: 0}}
                                        colors={['#3FB0F1', '#3FB0F1', '#256B9B']}
                                        style={styles.linearGradient1}>
                                        <Text style={styles.buttonText}>SIGNUP ITS FREE</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>}

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
                                    data={filterItems}
                                    horizontal={false}
                                    numColumns={2}
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
                                                    fontWeight: "bold",
                                                }}>{item.key}</Text>
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: "black",
                                                    textAlign: "center",
                                                    marginTop: 7
                                                }}>({item.value})</Text>


                                            </View>
                                            <View style={{flex: 1, justifyContent: "flex-end", alignSelf: "flex-end",}}>

                                                <TouchableOpacity
                                                    onPress={() => NavigationService.navigate("Meaning", item.key)}
                                                >

                                                    <Image source={require('./../../../../assets/image/word.png')}
                                                           style={{
                                                               height: 20, width: 25,
                                                               resizeMode: "cover",
                                                               marginLeft: 10
                                                           }}/>

                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={this.getFilteredItem.bind(this,item.key)}
                                                >

                                                    <Image source={require('./../../../../assets/image/so.png')}
                                                           style={{
                                                               height: 20, width: 20,
                                                               resizeMode: "cover",
                                                               marginLeft: 15
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
                                </View> :
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
                                            <View style={{flex: 1}}>
                                            <TouchableOpacity
                                                onPress={() => {

                                                    this.setState({
                                                        xmlUrl: item.rssFeeds[0]
                                                    }, () => {
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
                                                    width: 250,
                                                    height: 300,
                                                    flexDirection: "row",
                                                    marginBottom: 5
                                                }}>
                                                <View style={{flex: 1}}>
                                                    <Image
                                                        style={{
                                                            width: "100%",
                                                            height: undefined,
                                                            aspectRatio: 1
                                                        }}
                                                        resizeMode={'cover'}
                                                        source={{uri: item.referenceRasterImageLink}}
                                                    />
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
                                            </View>
                                        )}
                                    />
                                    <View style={{marginBottom: 25}}/>
                                </View>

                        }
                    </View>}
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
                                            <Loader/>
                                        </View> : <View>
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
                                                renderItem={({item}) =>
                                                    <View style={{flex:1}}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            console.log('here')
                                                            this.setState({
                                                                filter: {
                                                                    ...this.state.filter,
                                                                    url: item.link
                                                                }
                                                            }, () => this.setModalVisible(!modalVisible)
                                                            )
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
                                                        <View style={{
                                                            flex: 1,
                                                            justifyContent: "center",
                                                            alignSelf: "center",
                                                        }}>
                                                            <Text style={styles.modalText}>{item.title}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    </View>
                                                }
                                            />
                                            <View style={{marginBottom: 25}}/>
                                        </View>
                                }
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisibleFilteredItem}
                        // onRequestClose={() => {
                        //     this.setModalVisible(!modalVisible);
                        // }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View>
                                    <Text style={{
                                        fontSize: 20,
                                        color: "black",
                                        fontWeight: 'bold',
                                        textAlign: "center",
                                        marginLeft: 5,
                                        marginTop: 15,
                                        marginRight: 5,
                                        marginBottom: 20
                                    }}>Learn More About: "{word}"</Text>
                                    <View style={styles.linearGradient1}>
                                        <TouchableOpacity
                                            style={styles.centerDiv}
                                        onPress={this.Reaction}
                                    >
                                            <View style={{
                                                flexDirection: 'row',
                                                textAlign: "center",
                                                alignItems: 'center',
                                                marginLeft: 5,
                                            }}>
                                        <Text style={{
                                            fontSize: 15,
                                            color: "#069cdc",
                                            fontWeight: 'bold',
                                            textAlign: "center",
                                            alignSelf: 'center',
                                            marginLeft: 5,
                                            marginRight: 5,
                                        }}>Save this to review later?</Text>
                                            <Image source={require('./../../../../assets/image/like.png')}
                                                   style={{width: 20, height: 20, resizeMode: "cover",
                                                       alignItems: 'center'}}/>
                                            </View>
                                    </TouchableOpacity>
                                    </View>
                                    <View style={styles.linearGradient1}>
                                    <View style={[styles.input,styles.centerDiv]}>
                                        <Picker
                                            selectedValue={accent}
                                            onValueChange={(itemValue) => {
                                                this.setState({
                                                    accent: itemValue
                                                })
                                            }}
                                            mode={'dropdown'}
                                            note={false}
                                        >
                                            {Object.entries(ARRAY_ACCENTS).map((t, i) =>
                                                <Picker.Item key={i} label={t[1]} value={t[0]}/>
                                            )}
                                        </Picker>
                                    </View>
                                    </View>
                                    {filteredItem?<FlatList
                                        data={filteredItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item}) => (
                                            <View style={{
                                                flexDirection: "row",
                                                padding: 5,
                                                borderRadius: 5,
                                                width: "100%",
                                            }}>
                                                <TouchableOpacity
                                                    onPress={this.getAudio.bind(this,item)}
                                                >
                                                    <Image source={require('./../../../../assets/image/so.png')}
                                                           style={{marginLeft: 5,marginTop:5, height: 20, width: 20}}/>
                                                </TouchableOpacity>
                                                <Text
                                                    style={{
                                                        padding: 5,
                                                    }}
                                                >
                                                    {item}
                                                </Text>
                                            </View>
                                        )}
                                    />:<Text style={styles.linearGradient1}>No records Found...</Text>}

                                    {signUpShow && <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            fontWeight: 'bold',
                                            textAlign: "center",
                                            alignSelf: 'center',
                                            marginTop: 15,
                                        }}>To Use This Feature, Please Sign Up Or Log In</Text>
                                        <TouchableOpacity
                                            style={{marginTop: 5}}
                                            onPress={() => {
                                                this.setState({
                                                    modalVisibleFilteredItem:!modalVisibleFilteredItem
                                                })
                                                NavigationService.navigate('RegisterScreen')
                                            }}
                                        >
                                            <LinearGradient
                                                start={{x: 0, y: 0}}
                                                end={{x: 1, y: 0}}
                                                colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                                                style={styles.linearGradient1}>
                                                <Text style={styles.buttonText}>Sign Up</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>}
                                    <TouchableOpacity
                                        style={{marginTop: 5}}
                                        onPress={() => {
                                            this.setState({
                                                modalVisibleFilteredItem:!modalVisibleFilteredItem
                                            })
                                        }}
                                    >
                                        <LinearGradient
                                            start={{x: 0, y: 0}}
                                            end={{x: 1, y: 0}}
                                            colors={['#EBEBE4', '#EBEBE4', '#EBEBE4']}
                                            style={styles.linearGradient1}>
                                            <Text style={styles.buttonText1}>Cancel</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <View style={{marginBottom: 5}}/>
                                </View>


                            </View>
                        </View>
                    </Modal>


                </View>
            </View>
        );
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
        marginRight: 10,
        marginBottom: 10,
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

    },
    buttonText1: {
        fontSize: 13,
        // fontFamily: 'Gill Sans',
        // textAlign: 'center',
        margin: 12,
        color: 'black',
        backgroundColor: 'transparent',
        paddingVertical: 3,
        fontWeight: "bold",
        textAlign: "center"

    },
    centerDiv: {
        fontSize: 13,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 12,
        backgroundColor: 'transparent',
        paddingVertical: 3,
        textAlign: "center"

    },
    centeredView: {
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
    }, input: {
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
        filterItems: state.AuthReducer.filterItems,
        filterContentId: state.AuthReducer.filterContentId,
        filteredItem: state.AuthReducer.filteredItem,
    };
};

export default connect(
    mapStateToProps,
    {
        getContent: actions.getContent,
        getContentRss: actions.getContentRss,
        getFilteredContent: actions.getFilteredContent,
        getFilteredContentJson: actions.getFilteredContentJson,
        getFilteredWordDetails: actions.getFilteredWordDetails,
        getContentAudioAccent: contentActions.getContentAudioAccent,
        doReact: contentActions.doReact,

    },
)(MainLogin);
