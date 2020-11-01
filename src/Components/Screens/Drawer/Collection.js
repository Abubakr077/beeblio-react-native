import React from 'react';
import {
    FlatList,
    ImageBackground,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image, Alert
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/ConetentActions";
import {LOGO_CONTENT_SOURCE_MAP} from '../../../Helpers/constants'
import {TouchableOpacity} from 'react-native-gesture-handler';
import Details from './Details'

import Loader from '../../SeperateComponents/Loader';
import * as NavigationService from "../../../NavigationService";
import Header from "../../SeperateComponents/Header";

class Collection extends React.PureComponent {
    static navigationOptions = ({navigation}) => ({
        header: (props) => <Header navigation={navigation} previous={false}/>
    })

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searches: [],
            isLoadingContent: true,
            isDetails: false,
            searchItem: '',
            user: ''
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.updateSearches = this.updateSearches.bind(this);
        this.search = this.search.bind(this);
    }

    onRefresh() {
        //Clear old data of the list
        this.setState({searches: []});
        //Call the Service to get the latest data
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
    getLogo (search) {
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

    search(){
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
    details (contentId){
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
    Reaction (contentId) {
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
            return {searches: props.searches};
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
        } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <ImageBackground source={require('./../../../../assets/image/wave.png')}
                                     style={styles.backgroundImage}>
                        <View style={{marginHorizontal: 15, marginTop: 30, marginBottom: 10}}>

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


                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>

                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={['#66AECF', '#82D1F5', '#66AECF']}
                                style={styles.linearGradient}>
                                <View style={{justifyContent: "center", alignItems: "center"}}>

                                    <View style={{marginTop: 15, justifyContent: "center", alignItems: "center"}}>
                                        <Image source={require('./../../../../assets/image/i1.png')}
                                               style={{width: 45, height: 45, resizeMode: "cover"}}/>
                                    </View>

                                    <View style={{marginVertical: 20}}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "white",
                                            fontWeight: 'bold',
                                            textAlign: "center"
                                        }}>MAGAZINES</Text>


                                    </View>


                                </View>
                            </LinearGradient>


                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={['#66AECF', '#82D1F5', '#66AECF']}
                                style={styles.linearGradient}>
                                <View style={{justifyContent: "center", alignItems: "center"}}>

                                    <View style={{marginTop: 15, justifyContent: "center", alignItems: "center"}}>
                                        <Image source={require('./../../../../assets/image/i2.png')}
                                               style={{width: 45, height: 45, resizeMode: "cover"}}/>
                                    </View>

                                    <View style={{marginVertical: 20}}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "white",
                                            fontWeight: 'bold',
                                            textAlign: "center"
                                        }}>NEWS</Text>
                                    </View>
                                </View>
                            </LinearGradient>


                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={['#66AECF', '#82D1F5', '#66AECF']}
                                style={styles.linearGradient}>
                                <View style={{justifyContent: "center", alignItems: "center"}}>

                                    <View style={{marginTop: 15, justifyContent: "center", alignItems: "center"}}>
                                        <Image source={require('./../../../../assets/image/i3.png')}
                                               style={{width: 45, height: 45, resizeMode: "cover"}}/>
                                    </View>

                                    <View style={{marginVertical: 20}}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "white",
                                            fontWeight: 'bold',
                                            textAlign: "center"
                                        }}>BOOKS</Text>


                                    </View>


                                </View>
                            </LinearGradient>


                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={['#66AECF', '#82D1F5', '#66AECF']}
                                style={styles.linearGradient}>
                                <View style={{justifyContent: "center", alignItems: "center"}}>

                                    <View style={{marginTop: 15, justifyContent: "center", alignItems: "center"}}>
                                        <Image source={require('./../../../../assets/image/i4.png')}
                                               style={{width: 45, height: 45, resizeMode: "cover"}}/>
                                    </View>

                                    <View style={{marginVertical: 20}}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "white",
                                            fontWeight: 'bold',
                                            textAlign: "center"
                                        }}>OTHERS</Text>


                                    </View>


                                </View>
                            </LinearGradient>


                        </View>


                    </ImageBackground>
                    <View style={{flex: 1}}>
                        {isLoadingContent ? <Loader/> : <FlatList
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
                                        // source={{uri: item.content.reference_raster_image_link}}
                                        style={{height: 120, width: 100, margin: 5}}/>
                                    <View style={{flexDirection: "column"}}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: "black",
                                            fontWeight: 'bold',
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginTop: 15
                                        }}>{item?.content?.name ? item?.content?.name.substr(0, 30) : this.getLogo(item) ? 'News Article' : 'Internet Content'}</Text>
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
                                    onRefresh={this.onRefresh}
                                />
                            }
                        />}
                    </View>
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
        flex: .5,
        resizeMode: 'cover', // or 'stretch'
        // justifyContent: 'center',
    },
    contents: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    linearGradient: {
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 12,
        margin: 5,
        height: 100,
        width: 85,
        marginTop: 15
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
)(Collection);
