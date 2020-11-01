import React from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions, Alert
} from 'react-native';

import { Accordion} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TabView,  TabBar} from "react-native-tab-view";
import {LinearGradient} from "expo-linear-gradient";
import Header from "../../SeperateComponents/Header";
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/ConetentActions";
import Loader from "../../SeperateComponents/Loader";
import * as NavigationService from "../../../NavigationService";
const width = Dimensions.get('window').width; //full width
class SavedResources extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            savedContent: [],
            type: 'WORD',
            index: 0,
            dataArray1: [],
            isLoadingContent: true,
            routes: [
                {key: "first", title: "Organized By Words", indx: 0},
                {key: "second", title: "Organized By Contents", indx: 1},
            ],
        };
        this.getContent = this.getContent.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderHeaderGlobal = this._renderHeaderGlobal.bind(this);
        this._renderContent = this._renderContent.bind(this);
    }

    componentDidMount() {
        // this.getContent(0);
        this.focusListener = this.props.navigation.addListener('didFocus', this.getContent)
    }
    refresh= (type) => {
        const {getSavedContent} = this.props;
        this.setState({
            savedContent: [],
            type: type,
            dataArray1: [],
            isLoadingContent: true,
        })
        getSavedContent({
            type,
            onSuccess: () => {
                this.makeAccordionArray(type);
            },
            onError: (message) => {
                Alert.alert(
                    'Error',
                    message
                    , [
                        {text: 'Okay'}
                    ]
                );
                this.setState({isLoadingContent: false});
            }
        });
    }
    // componentWillUnmount() {
    //     this.focusListener.remove();
    // }

    static getDerivedStateFromProps(props, state) {
        if (props.savedContent !== state.savedContent) {
            return {
                savedContent: props.savedContent
            };
        }
        return null;
    }
    getAudio (sentence) {
        const {getContentAudio} = this.props;

        // this.setState({isLoadingContent: true});
        getContentAudio({
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
            }, sentence
        });
    }
    getContent ()  {
        const {selectedItem} = this.state;

        if (selectedItem === 1){
            this.refresh('CONTENT')
        }else {
            this.refresh('WORD')
        }
    }
    makeAccordionArray (type) {
        const {savedContent, dataArray1} = this.state;

        if (type !=='CONTENT'){
            savedContent.map((item) => {
                let tempArray2 = [];
                item.likedEntities.map((liked)=>
                    {
                        if (liked?.content?.contentBody){
                            tempArray2.push({
                                title: liked?.content?.contentBody.substr(0, 25),
                                content: <View style={{flex:1}}>
                                    <FlatList
                                        data={liked?.sentences}
                                        renderItem={({item}) =>
                                            <View style={{
                                                flexDirection: "row",
                                                //height: 60,
                                                padding: 15,
                                                width: 380,
                                                // justifyContent: "space-between",
                                                backgroundColor: "#fff"
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
                                        }
                                    />
                                </View>,
                                count: liked.content.contentBody?liked.sentences.length+' Sentences':0+' Sentences',
                                contentId: liked?.content?.id,
                                wordId: item.id,
                                word:item.languageWord,
                                item: liked.content
                            })
                        }
                    }
                )
                dataArray1.push({
                    title: item.languageWord,
                    content: <View style={{flex: 1}}>
                        <Accordion animation={true}
                                   expanded={true}
                                   dataArray={ tempArray2}
                                   renderHeader={this._renderHeaderGlobal}
                        />
                    </View>,
                    count: item.likedEntities[0].content?item.likedEntities.length+' resource':0+' resource',
                    wordId: item.id,
                    contentId: 0
                })
            })
        }else {
            savedContent.map((item) => {
                let tempArray2 = [];
                item.likedEntities.map((liked)=>
                    {
                        if (liked.sentences){
                            tempArray2.push({
                                title: liked?.word?.languageWord,
                                content: <View style={{flex:1}}>
                                    <FlatList
                                        data={liked?.sentences}
                                        renderItem={({item}) =>
                                            <View style={{
                                                flexDirection: "row",
                                                //height: 60,
                                                padding: 15,
                                                width: 380,
                                                // justifyContent: "space-between",
                                                backgroundColor: "#fff"
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
                                        }
                                    />
                                </View>,
                                count: liked.sentences?liked.sentences.length+' sentences':0+' sentence',
                                contentId: item.id,
                                wordId: liked.word.id,
                                word:liked.word.languageWord
                            })
                        }
                    }
                )
                dataArray1.push({
                    title: item.contentBody.substr(0, 30),
                    content: <View style={{flex: 1}}>
                        <Accordion animation={true}
                                   expanded={true}
                                   dataArray={ tempArray2}
                                   renderHeader={this._renderHeaderGlobal}
                        />
                    </View>,
                    count: item.likedEntities[0].word?item.likedEntities.length+' words':0+' word',
                    wordId: 0,
                    contentId: item.id,
                    item:item
                })
            })
        }


        this.setState({
            isLoadingContent: false
        })
    }

    _renderHeader(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                height: 60,
                padding: 10,
                width: width,
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff"
            }}>
                <View style={{
                    flexDirection: "row"
                }}>
                    {expanded
                        ? <Icon style={{fontSize: 18,
                            color: "#2a72de"}} name="angle-up"/>
                        : <Icon style={{fontSize: 18, color: "#2294f2"}} name="angle-down"/>}

                         <TouchableOpacity onPress={(props) => {
                             this.state.type === 'CONTENT' ?NavigationService.navigate("Details",item.item)
                                 :NavigationService.navigate("Meaning",item.title)
                        }}>
                            <Image source={require('./../../../../assets/image/word.png')}
                                   style={{marginLeft: 10, height: 25, width: 30}}/>
                        </TouchableOpacity>


                    <Text style={{fontWeight: "bold", color: "#2465c7"}}>
                        {item.title} {' ('+ item.count+' ) '}
                    </Text>
                </View>
                {item.contentId !== 0 && <TouchableOpacity style={{textAlign: 'right',justifyContent:'flex-end'}}
                                                           onPress={() => this.state.type!== 'CONTENT'?
                                                               this.doReaction(item.wordId, item.title,null):
                                                                    this.doReaction(null, null,item.contentId)
                                                           }>
                    <Image source={require('./../../../../assets/image/bin.png')}
                           style={{marginLeft: 20,marginRight:10, height: 20, width: 20}}/>
                </TouchableOpacity>}
            </View>
        );
    }
    _renderHeaderGlobal(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                padding: 10,
                width: 410,
                backgroundColor: "#fff"
            }}>
                {expanded
                    ? <Icon style={{fontSize: 18, marginRight:10, color: "#2a72de"}} name="angle-up"/>
                    : <Icon style={{fontSize: 18, marginRight:10,color: "#2294f2"}} name="angle-down"/>}
                {
                    <TouchableOpacity onPress={() => {
                        this.state.type !== 'CONTENT' ?NavigationService.navigate("Details",item.item)
                            :NavigationService.navigate("Meaning",item.title)
                    }}>
                        <Image source={require('./../../../../assets/image/word.png')}
                               style={{marginLeft: 10, height: 25, width: 30}}/>
                    </TouchableOpacity>

                }
                <Text style={{fontWeight: "bold", color: "#2465c7"}}>
                    {item.title} {"("+item.count+" ) "}
                </Text>
                {item.contentId!== 0 && this.state.type !=='CONTENT'  && <TouchableOpacity style={{textAlign: 'right',justifyContent:'flex-end'}}
                                                           onPress={() => this.doReaction(item.wordId, item.word,item.contentId)}>
                    <Image source={require('./../../../../assets/image/bin.png')}
                           style={{marginLeft: 20,marginRight:10, height: 20, width: 20}}/>
                </TouchableOpacity>}
            </View>
        );
    }

    _renderContent(item) {
        return (
            <Text
                style={{
                    padding: 10,
                }}>
                {item.content}
            </Text>
        );
    }

    static navigationOptions = ({navigation}) => ({
        header: (props) => <Header navigation={navigation} previous={false}/>
    })
    _handleIndexChange = index => {
        setTimeout(() => {
            this.setState({index});
            this.setState({selectedItem: index},()=>this.getContent());
        }, 500);
    }
    renderScene = ({route}) => {
        switch (route.key) {
            case 'first':
                return <View style={{
                    flex: 1,
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.8,
                    shadowRadius: 3,
                    elevation: 15, marginLeft: 0, marginRight: 15, backgroundColor: "white",
                    width: 430
                }}>
                    {this.state.isLoadingContent?<Loader/>:<ScrollView>
                        <View padder style={{backgroundColor: "white",width:width}}>
                            <Accordion
                                dataArray={this.state.dataArray1}
                                animation={true}
                                expanded={true}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}/>
                        </View>
                    </ScrollView>}
                </View>
                    ;
            case 'second':
                return <View style={{
                    flex: 1,
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.8,
                    shadowRadius: 3,
                    elevation: 15, marginLeft: 0, marginRight: 15, backgroundColor: "white",
                    width: 430
                }}>
                    {this.state.isLoadingContent?<Loader/>:<ScrollView>
                        <View padder style={{backgroundColor: "white"}}>
                            <Accordion
                                dataArray={this.state.dataArray1}
                                animation={true}
                                expanded={true}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}/>
                        </View>
                    </ScrollView>}
                </View>
                    ;
            default:
                return null;
        }
    };
    doReaction(wordId,title,contentId) {
        const {doReact} = this.props;
        let data = null;
        if (this.state.type ==='CONTENT'){
            data = {
                contentId: contentId,
                domain: "CONTENT",
                event: "UNLIKE",
                word: null,
                wordId: null
            }
        }else {
            data = {
                contentId: contentId,
                domain: "WORD",
                event: "UNLIKE",
                word: title,
                wordId: wordId
            }
        }
        this.setState({isLoadingContent: true});
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
                this.getContent();
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
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <TabView
                        navigationState={this.state}
                        lazy={true}
                        renderTabBar={props => (
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FFF', '#FFF', '#FFF']}
                                            style={{
                                                // borderTopLeftRadius: 20, borderTopRightRadius: 20,
                                                shadowColor: '#000',
                                                shadowOffset: {width: 0, height: 1},
                                                shadowOpacity: 0.8,
                                                shadowRadius: 3,
                                                elevation: 15, marginLeft: 0, marginRight: 15, width: '100%'
                                            }}>
                                <TabBar
                                    {...props}
                                    indicatorStyle={{
                                        backgroundColor: "transparent"
                                    }}
                                    style={{backgroundColor: "transparent"}}
                                    // renderIcon={({ route, focused, color }) => (
                                    //   <Icon name={"images"} color="#fff" />
                                    // )}
                                    renderLabel={({route, focused, color}) => (
                                        <View
                                            style={
                                                this.state.selectedItem === route.indx ? {
                                                    backgroundColor: '#f0f8ff',
                                                    borderRadius: 30,
                                                    width: 200,
                                                    alignItems: "center"

                                                } : {
                                                    alignItems: "center"

                                                }
                                            }
                                        >
                                            <Text
                                                style={{
                                                    color: "black",
                                                    padding: 7,
                                                    margin: 5,
                                                    fontSize: 14,
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {route.title}
                                            </Text>
                                        </View>
                                    )}
                                />
                            </LinearGradient>
                        )}
                        style={{marginTop: 0}}
                        renderScene={this.renderScene}
                        onIndexChange={this._handleIndexChange}
                        initialLayout={{
                            width: Dimensions.get("window").width,
                            height: Dimensions.get("window").height
                        }}
                    />
                </View>
            </ScrollView>
        );
    }

}

const mapStateToProps = state => {
    return {
        savedContent: state.ContentReducer.savedContent,
    };
};

export default connect(
    mapStateToProps,
    {
        getSavedContent: actions.getSavedContent,
        getContentAudio: actions.getContentAudio,
        doReact: actions.doReact,
    },
)(SavedResources);
