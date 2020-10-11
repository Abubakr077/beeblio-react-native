import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    FlatList, RefreshControl, AsyncStorage
} from 'react-native';
import {Icon, Drawer} from "native-base";
import {DrawerItems} from 'react-navigation';
import {Searchbar} from 'react-native-paper';
import {ProgressChart} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
import ProgressCircle from 'react-native-progress-circle'
import {LinearGradient} from 'expo-linear-gradient';
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/ConetentActions";


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searches: [],
            isLoadingContent: true,
            isDetails: false,
            searchItem: '',
            statics:''
        };
        this.updateSearches();
        AsyncStorage.getItem('statics').then((user) => {
            this.setState({
                statics: JSON.parse(user)
            })
        })
    }

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

    onRefresh() {
        //Clear old data of the list
        this.setState({searches: []});
        //Call the Service to get the latest data
        this.updateSearches();
    }

    updateSearches = () => {
        const {getContentSearches} = this.props;

        this.setState({isLoadingContent: true});
        getContentSearches({
            onError: (error) => {
                alert(error);
                this.setState({isLoadingContent: false});
            },
            onSuccess: () => {
                this.setState({isLoadingContent: false});
            }
        });
    }
    search = () => {
        const {doSearch} = this.props;

        const {query} = this.state;
        if (!query) {
            return
        }
        this.setState({isLoadingContent: true});
        doSearch({
            query,
            onSuccess: () => {
                this.setState({isLoadingContent: false});
            },
            onError: (message) => {
                alert(message);
                this.setState({isLoadingContent: false});
            }
        });
    }
    details = (contentId) => {
        const {getDetails} = this.props;

        if (!contentId) {
            return alert('Content id is not given')
        }
        // this.setState({isLoadingContent: true});
        getDetails({
            contentId,
            onSuccess: () => {
                this.setState({isDetails: true});
            },
            onError: (message) => {
                alert(message);
                this.setState({isDetails: false});
            }
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.searches !== this.state.searches) {
            this.setState({searches: nextProps.searches});
        }
        if (nextProps.searchItem !== this.state.searchItem) {
            this.setState({searchItem: nextProps.searchItem});
        }
    }

    render() {
        const {
            searches,
            isLoadingContent,
            searchItem,
            isDetails,
            statics
        } = this.state;
        return (
            <View style={styles.container}>
                {!isDetails ?
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
                                <Text style={{fontSize: 18, fontWeight: "bold", marginTop: 15}}>{statics?statics.totalUrlSearched:0}</Text>
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
                                <Text style={{fontSize: 18, fontWeight: "bold", marginTop: 15}}>{statics?statics.totalContentSearched:0}</Text>
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

                        {isLoadingContent ? <Text>loading...</Text> : <FlatList
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

                                    <Image source={{uri: item.content.reference_image_link}}
                                           style={{height: 120, width: 100, margin: 5}}>

                                    </Image>

                                    <View style={{flexDirection: "column"}}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: "black",
                                            fontWeight: 'bold',
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginTop: 15
                                        }}>{item.content.name ? item.content.name : 'Internet Content'}</Text>
                                        <Text style={{
                                            fontSize: 16,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginTop: 5
                                        }}>{item.content.content_body.substr(0, 10)}</Text>

                                    </View>


                                    <View style={{flex: 1, alignItems: "flex-end", flexDirection: "column"}}>

                                        <TouchableOpacity
                                            style={{marginTop: 10}}
                                            onPress={()=>this.details(item.content_id)}
                                        >
                                            <LinearGradient
                                                start={{x: 0, y: 0}}
                                                end={{x: 1, y: 0}}
                                                colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                                                style={styles.linearGradient1}>
                                                <Text style={styles.buttonText}>VIEW</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            style={{marginTop: 10}}>
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
                    </ScrollView> :
                    <Text>details page{searchItem.content.authors}</Text>
                }

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
    },
)(Search);
