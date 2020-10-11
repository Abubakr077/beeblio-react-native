import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Icon, Drawer } from "native-base";
import { DrawerItems } from 'react-navigation';
import { Searchbar ,Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/ConetentActions";


class Collection extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="home"
        size={30}
        color='white'
      />
    ),
    headerTitle: "Collection",
    headerLeft:
      <View style={{ paddingLeft: 16 }}>
        <Icon
          name="md-menu"
          size={30}
          color='white'
          onPress={() => navigation.toggleDrawer()} />

      </View>,

  })
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searches:[],
      isLoadingContent: true,
      isDetails: false,
      searchItem:''
    };
    this.updateSearches();
  }
  onRefresh() {
    //Clear old data of the list
    this.setState({ searches: [] });
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
    const { doSearch } = this.props;

    const { query } = this.state;
    if (!query) {
      return
    }
    this.setState({isLoadingContent: true});
    doSearch({
       query ,
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
    const { getDetails } = this.props;

    if (!contentId) {
      return alert('Content id is not given')
    }
    // this.setState({isLoadingContent: true});
    getDetails({
      contentId,
      onSuccess: () => {
        this.setState({isDetails:true});
      },
      onError: (message) => {
        alert(message);
        this.setState({isDetails:false});
      }
    });
  }
  Reaction = (contentId) => {
    const { doReact } = this.props;

    const data = {
      contentId: contentId,
      domain: "CONTENT",
      event: "LIKE"
    }
    if (!contentId) {
      return alert('Content id is not given')
    }
    // this.setState({isLoadingContent: true});
    doReact({
      data,
      onSuccess: () => {
        alert('The action was successfully completed');
        // this.setState({isReact:true});
      },
      onError: (message) => {
        alert(message);
        // this.setState({isReact:true});
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
      isDetails
    } = this.state;
    return (
      <View style={styles.container}>
        {!isDetails?
          <ScrollView contentContainerStyle={{flexGrow: 1}}>

          <ImageBackground source={require('./../../../../assets/image/wave.png')} style={styles.backgroundImage}>
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
                    <Text style={{fontSize: 16, color: "white", fontWeight: 'bold', textAlign: "center"}}>450</Text>


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
                    <Text style={{fontSize: 16, color: "white", fontWeight: 'bold', textAlign: "center"}}>450</Text>


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
                    <Text style={{fontSize: 16, color: "white", fontWeight: 'bold', textAlign: "center"}}>450</Text>


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
                    <Text style={{fontSize: 16, color: "white", fontWeight: 'bold', textAlign: "center"}}>450</Text>


                  </View>


                </View>
              </LinearGradient>


            </View>


          </ImageBackground>
          <View style={{flex: 1}}>


            {isLoadingContent ? <Text>loading...</Text> : <FlatList
                data={searches}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) =>
                    <View style={{backgroundColor: "#fff", marginLeft: 5, marginRight: 5, flexDirection: "row",}}>

                      <Image
                          resizeMode={'cover'}
                          source={{uri: item.content.reference_image_link}}
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
                        <Text numberOfLines={1} style={{
                          fontSize: 16,
                          color: "black",
                          textAlign: "left",
                          marginLeft: 10,
                          marginTop: 5
                        }}>{item.content.content_body.substr(0, 10)}</Text>

                      </View>


                      <View style={{flex: 1, alignItems: "flex-end", flexDirection: "column"}}>

                        <TouchableOpacity
                            style={{marginTop: 5}}
                            onPress={()=>this.details(item.content_id)}
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
                            onPress={()=>this.Reaction(item.content_id)}
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
          </View>
        </ScrollView>:
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
    flex: .5,
    resizeMode: 'cover', // or 'stretch'
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
    marginRight:10,marginBottom:10
  },
  buttonText: {
    fontSize: 13,
    // fontFamily: 'Gill Sans',
    // textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    paddingVertical:3,
    fontWeight:"bold"

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
