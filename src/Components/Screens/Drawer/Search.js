import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions,Alert,
    FlatList, RefreshControl, AsyncStorage
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Searchbar} from 'react-native-paper';
const screenWidth = Dimensions.get("window").width;
import ProgressCircle from 'react-native-progress-circle'
import {LinearGradient} from 'expo-linear-gradient';
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/ConetentActions";
import Header from "../../SeperateComponents/Header";
import Loader from "../../SeperateComponents/Loader";
import {LOGO_CONTENT_SOURCE_MAP} from "../../../Helpers/constants";
import * as NavigationService from "../../../NavigationService";


class Search extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searches: [],
            isLoadingContent: true,
            searchItem: '',
            statics: ''
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.updateSearches = this.updateSearches.bind(this);
        this.search = this.search.bind(this);

    }

    static navigationOptions = ({navigation}) => ({
        header: (props) => <Header navigation={navigation} previous={false}/>
    })
    onRefresh(){
        this.setState({searches: []});
        AsyncStorage.getItem('statics').then((user) => {
            this.setState({
                statics: JSON.parse(user)
            })
        })
        this.updateSearches();
    }

    componentDidMount() {
        // this.focusListener = this.props.navigation.addListener('didFocus', this.onRefresh)
        this.onRefresh();
    }
    // componentWillUnmount() {
    //     this.focusListener.remove();
    // }
    updateSearches () {
        const {getContentSearches} = this.props;

        this.setState({isLoadingContent: true});
        getContentSearches({
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
            }
        });
    }
    getLogo = (search) => {
        let tempURL = null;
        const url = search?.content?.url ? search?.content?.url : search?.content?.content_link;
        if (!url) {
            return false;
        }
        Object.entries(LOGO_CONTENT_SOURCE_MAP).filter(e => {
            if (url.match(e[0])) {
                tempURL = e[1];
                return e[1]
            }
        });
        return tempURL;
    }
    search ()  {
        const {doSearch} = this.props;

        const {query} = this.state;
        if (!query) {
            this.onRefresh();
        }
        this.setState({isLoadingContent: true});
        doSearch({
            query,
            onSuccess: () => {
                this.setState({isLoadingContent: false});
            },
            onError: (message) => {
                Alert.alert(
                    'Error',
                    message
                    ,[
                        {text: 'Okay'}
                    ]
                );
                this.setState({isLoadingContent: false});
            }
        });
    }
    details (contentId) {
        if (!contentId) {
            return Alert.alert(
                'Error',
                'Content id is not given'
                ,[
                    {text: 'Okay'}
                ]
            );
        }
        NavigationService.navigate("Details", contentId);
    }
    Reaction (contentId)  {
        const {doReact} = this.props;

        const data = {
            contentId: contentId,
            domain: "CONTENT",
            event: "LIKE"
        }
        if (!contentId) {
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

    static getDerivedStateFromProps(props, state) {
        if (props.searches !== state.searches) {
            return {
                searches: props.searches
            };
        }
        if (props.searchItem !== state.searchItem) {
            return {
                searchItem: props.searchItem
            };
        }
        return null;
    }

    render() {
        const {
            searches,
            isLoadingContent,
            searchItem,
            statics
        } = this.state;
        return (
            <View style={styles.container}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>

                        {/* <View style={{ flex: 1.5, marginBottom: 15 }}> */}

                        <ImageBackground source={require('./../../../../assets/image/wave.png')}
                                         style={styles.backgroundImage}>
                            <Text style={{
                                fontSize: 18,
                                color: "black",
                                textAlign: "center",
                                marginHorizontal: 20,
                                marginTop: 30
                            }}>Want to improve your vocabulary?
                                Find and learn less common terms from any text you can access</Text>

                            <View style={{marginHorizontal: 15, marginTop: 30, marginBottom: "32%"}}>

                                <Searchbar
                                    placeholder="Search"
                                    onChangeText={(query) => {
                                        this.setState({query}, () => {
                                            this.search();
                                        });
                                    }}
                                    value={this.state.query}
                                />
                            </View>

                        </ImageBackground>


                        {/* </View> */}

                        {/* <View style={{ flex: 1.7, backgroundColor: "transparent" }}> */}

                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>


                            <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>


                                <ProgressCircle
                                    percent={30}
                                    radius={30}
                                    borderWidth={8}
                                    color="green"
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                </ProgressCircle>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    marginTop: 15
                                }}>{statics ? statics.totalUrlSearched : 0}</Text>
                                <Text style={{fontSize: 16, marginTop: 5}}>{'URL Filtered'}</Text>
                            </View>
                            <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>


                                <ProgressCircle
                                    percent={30}
                                    radius={30}
                                    borderWidth={8}
                                    color="blue"
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                </ProgressCircle>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    marginTop: 15
                                }}>{statics ? statics.totalContentSearched : 0}</Text>
                                <Text style={{fontSize: 16, marginTop: 5}}>{'Texts Filtered'}</Text>

                            </View>

                        </View>

                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginTop: 15,
                            alignSelf: "center",
                            marginHorizontal: 15,
                            marginBottom: 20
                        }}>{'RESULT'}</Text>

                        {isLoadingContent ?
                            <Loader/> : <FlatList
                            data={searches}
                            showsVerticalScrollIndicator={true}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) =>
                                <View style={{
                                    backgroundColor: "#fff",
                                    marginLeft: 5,
                                    marginRight: 5,
                                    flexDirection: "row",
                                }}>
                                    <Image
                                        resizeMode={'cover'}
                                        // source={{uri: this.getLogo(item)?this.getLogo(item):item.content.reference_image_link?item.content.reference_image_link:item.content.url?URLPlaceHolder : ContentPlaceHolder}}
                                        source={{uri: item.content.reference_raster_image_link?item.content.reference_raster_image_link:this.getLogo(item)?this.getLogo(item):item.content.reference_image_link}}
                                        // source={{uri: item.content.reference_image_link}}
                                        style={{height: 120, width: 100, margin: 5}}/>
                                    <View style={{flexDirection: "column"}}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: "black",
                                            fontWeight: 'bold',
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginTop: 15
                                        }}>{item?.content?.name ? item?.content?.name.substr(0, 16) : this.getLogo(item) ? 'News Article' : 'Internet Content'}</Text>
                                        <Text numberOfLines={1} style={{
                                            fontSize: 16,
                                            color: "black",
                                            textAlign: "left",
                                            marginLeft: 10,
                                            marginTop: 5
                                        }}>
                                            {item.content.content_body.substr(0, 10)}
                                        </Text>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            marginTop: 5,
                                            marginLeft: 10,
                                        }}>
                                            <TouchableOpacity
                                                onPress={this.Reaction.bind(this,item.content_id)}
                                            >
                                                <Image source={require('./../../../../assets/image/like.png')}
                                                       style={{width: 20, height: 20, resizeMode: "cover"}}/>
                                            </TouchableOpacity>
                                            {/*<TouchableOpacity>*/}
                                            {/*    <Image source={require('./../../../../assets/image/dislike.png')}*/}
                                            {/*           style={{*/}
                                            {/*               width: 20,*/}
                                            {/*               height: 20,*/}
                                            {/*               marginLeft: 5,*/}
                                            {/*               resizeMode: "cover",*/}
                                            {/*           }}/>*/}
                                            {/*</TouchableOpacity>*/}
                                        </View>
                                    </View>


                                    <View style={{flex: 1, alignItems: "flex-end", flexDirection: "column"}}>

                                        <TouchableOpacity
                                            style={{marginTop: 5}}
                                            onPress={this.details.bind(this,item.content_id)}
                                        >
                                            <LinearGradient
                                                start={{x: 0, y: 0}}
                                                end={{x: 1, y: 0}}
                                                colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                                                style={styles.linearGradient1}>
                                                <Text style={styles.buttonText}>VIEW DETAILS</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            style={{marginTop: 5}}
                                            onPress={() => {
                                                NavigationService.navigate("MainLogin", item.content.url ? item.content.url : item.content.content_link);
                                            }}
                                        >
                                            <LinearGradient
                                                start={{x: 0, y: 0}}
                                                end={{x: 1, y: 0}}
                                                colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                                                style={styles.linearGradient1}>
                                                <Text style={styles.buttonText}>RUN SEARCH</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            }
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isLoadingContent}
                                    onRefresh={this.onRefresh.bind(this)}
                                />
                            }
                        />}


                        {/* </View> */}
                    </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#F2F2F2"

    },
    backgroundImage: {
        // flex: 1.5,
        resizeMode: "center"
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
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 35,
        marginLeft: 10,
        marginRight: 10, marginBottom: 10,
        width: 120,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 13,
        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
        paddingVertical: 3,
        fontWeight: "bold",
        // alignSelf:"center"

    },

});


const mapStateToProps = state => {
    return {
        searches: state.ContentReducer.searches,
        searchItem: state.ContentReducer.searchItem,
    };
};

export default connect(
    mapStateToProps,
    {
        getContentSearches: actions.getContentSearches,
        doSearch: actions.doSearch,
        getDetails: actions.getDetails,
        doReact: actions.doReact,
    },
)(Search);
