import React, {Component, useCallback} from 'react';
import {StyleSheet, Text, View, Image, ImageBackground, ScrollView, Dimensions, Linking, Alert} from 'react-native';
import {Container, Icon} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {LinearGradient} from "expo-linear-gradient";
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/ConetentActions";
import * as NavigationService from "../../../NavigationService";
import Header from "../../SeperateComponents/Header";
import Loader from "../../SeperateComponents/Loader";
import {LOGO_CONTENT_SOURCE_MAP} from "../../../Helpers/constants";

class Details extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchItem: {},
            isLoadingContent:true,
            contentId:'',
            item: null
        };
    }
    componentDidMount() {
        this.details();
    }

    Reaction = (contentId) => {
        const { doReact } = this.props;

        const data = {
            contentId: contentId,
            domain: "CONTENT",
            event: "LIKE"
        }
        if (!contentId) {
            return  Alert.alert(
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

    details ()  {
        const contentId = this.props.navigation.state.params;

        if (!contentId.contentBody) {
            console.log('contentId',contentId);
            this.setState({
                contentId : contentId
            })
            const { getDetails } = this.props;
            this.setState({isLoadingContent: true});
            getDetails({
                contentId,
                onSuccess: () => {
                    this.setState({isLoadingContent:false});
                },
                onError: (message) => {
                    Alert.alert(
                        'Error',
                        message
                        ,[
                            {text: 'Okay'}
                        ]
                    );
                    this.setState({isLoadingContent:false});
                }
            });
        }else {
            this.setState({
                item : contentId,
                contentId: '',
                isLoadingContent:false
            })
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.searchItem !== state.searchItem) {
            return {
                searchItem: props.searchItem
            };
        }
        return null;
    }
    getLogo = (search) => {
        let tempURL = false;
        const url = search.url ? search.url : search.content_link;
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
    render() {
        const {
            searchItem,
            isLoadingContent,
            contentId,
            item
        } =this.state;
        return (
            <View style={{flex: 1}}>
                <Header previous={true}  />
                {isLoadingContent?<Loader/>:
                    contentId!==''?<ScrollView>
                    <View style={{backgroundColor: "white", padding: 20}}>
                        <Grid style={{height: "100%", backgroundColor: "white"}}>
                            <Col style={{
                                backgroundColor: 'white', width: "35%", height: "10%", marginTop: 30
                            }}>
                                <Image
                                    // source={{uri: searchItem.reference_image_link?searchItem.reference_image_link:searchItem.source_link}}
                                    source={{uri: searchItem.reference_raster_image_link!==null?searchItem.reference_raster_image_link:this.getLogo(searchItem)?this.getLogo(searchItem):searchItem.reference_image_link?searchItem.reference_image_link:searchItem.source_link}}
                                       style={{height: 200, width: 140}}/>
                                <TouchableOpacity
                                    style={{marginTop: 7}}
                                    onPress={()=>this.Reaction(contentId)}
                                >
                                    <Image source={require('./../../../../assets/image/like.png')}
                                           style={{height: 40, width: 30, alignSelf: 'center'}}>
                                    </Image>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{marginTop: 7}}
                                    onPress={()=> {
                                        NavigationService.navigate("MainLogin",searchItem.url?searchItem.url:searchItem.content_link);
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

                            </Col>

                            <Col style={{height: "100%", width: "65%", backgroundColor: "white"}}>
                                <View style={{width: "100%",alignContent: "center",}}>
                                    <ImageBackground style={styles.backgroundImage}>

                                        <Text style={{
                                            fontSize: 22,
                                            fontWeight: 'bold',
                                            color: "#2465c7",
                                            textAlign: "left",
                                            marginTop: 30,
                                            marginStart:5,
                                            width: '30%'
                                        }}>
                                            Link: </Text>
                                        <Text style={{
                                            fontSize: 22,
                                            fontWeight: 'bold',
                                            color: '#4976b8',
                                            marginTop: -30,
                                            width: '80%',
                                            textAlign: "right",
                                            marginLeft: 20,
                                        }}
                                              onPress={() => Linking.openURL(searchItem.url?searchItem.url:searchItem.content_link)}>
                                            Open Original Content
                                        </Text>
                                        <Text style={{
                                            fontSize: 22,
                                            fontWeight: 'bold',
                                            color: "#2465c7",
                                            textAlign: "left",
                                            marginTop: 30,
                                            marginStart:5
                                        }}>
                                            Type: </Text>
                                        <Text style={{
                                            fontSize: 22,
                                            fontWeight: 'bold',
                                            color: "black",
                                            textAlign: "right",
                                            marginTop: -30,
                                            marginRight: 70,
                                        }}> {searchItem.curated_content_type?searchItem.curated_content_type:'TEXT'} </Text>
                                    </ImageBackground>
                                </View>
                            </Col>
                        </Grid>

                        <View>
                            <Text style={{fontSize: 22, fontWeight: 'bold', color: "#2465c7", textAlign: "left",}}>
                                Contents: </Text>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: "#2f3133",
                                textAlign: "left",
                                marginTop: 10
                            }}>
                                {searchItem.content_body}
                            </Text>

                        </View>
                    </View>
                </ScrollView>:
                        <ScrollView>
                            <View style={{backgroundColor: "white", padding: 20}}>
                                <Grid style={{height: "100%", backgroundColor: "white"}}>
                                    <Col style={{
                                        backgroundColor: 'white', width: "35%", height: "10%", marginTop: 30
                                    }}>
                                        <Image
                                            source={{uri: this.getLogo(item)?this.getLogo(item):''}}
                                            style={{height: 200, width: 140}}/>
                                        <TouchableOpacity
                                            style={{marginTop: 7}}
                                            onPress={()=> {
                                                NavigationService.navigate("MainLogin",item.url?item.url:item.content_link);
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

                                    </Col>

                                    <Col style={{height: "100%", width: "65%", backgroundColor: "white"}}>
                                        <View style={{width: "100%",alignContent: "center",}}>
                                            <ImageBackground style={styles.backgroundImage}>

                                                <Text style={{
                                                    fontSize: 22,
                                                    fontWeight: 'bold',
                                                    color: "#2465c7",
                                                    textAlign: "left",
                                                    marginTop: 30,
                                                    marginStart:5,
                                                    width: '30%'
                                                }}>
                                                    Link: </Text>
                                                <Text style={{
                                                    fontSize: 22,
                                                    fontWeight: 'bold',
                                                    color: '#4976b8',
                                                    marginTop: -30,
                                                    width: '80%',
                                                    textAlign: "right",
                                                    marginLeft: 20,
                                                }}
                                                      onPress={() => Linking.openURL(item.url?item.url:item.content_link)}>
                                                    Open Original Content
                                                </Text>
                                                <Text style={{
                                                    fontSize: 22,
                                                    fontWeight: 'bold',
                                                    color: "#2465c7",
                                                    textAlign: "left",
                                                    marginTop: 30,
                                                    marginStart:5
                                                }}>
                                                    Type: </Text>
                                                <Text style={{
                                                    fontSize: 22,
                                                    fontWeight: 'bold',
                                                    color: "black",
                                                    textAlign: "right",
                                                    marginTop: -30,
                                                    marginRight: 70,
                                                }}> {'TEXT'} </Text>
                                            </ImageBackground>
                                        </View>
                                    </Col>
                                </Grid>

                                <View>
                                    <Text style={{fontSize: 22, fontWeight: 'bold', color: "#2465c7", textAlign: "left",}}>
                                        Contents: </Text>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: "#2f3133",
                                        textAlign: "left",
                                        marginTop: 10
                                    }}>
                                        {item.contentBody}
                                    </Text>

                                </View>
                            </View>
                        </ScrollView>
                }
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
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 35,
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
        searchItem: state.ContentReducer.searchItem,
    };
};

export default connect(
    mapStateToProps,
    {
        getDetails: actions.getDetails,
        doReact: actions.doReact,
    },
)(Details);
