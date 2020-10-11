import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, FlatList, Dimensions } from 'react-native';
import { Icon, Drawer } from "native-base";
import { DrawerItems } from 'react-navigation';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/DictionaryActions";

const DATA = [
  {
    title: 'Help',
  },
  {
    title: 'Hello',
  },
  {
    title: 'Hello',
  },
];



class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Active", indx: 0 },
        { key: "second", title: "Servicing", indx: 1 },
      ],
      email: "",
      selectedItem: 0,
      isLoadingContent: true,

    };
    this.update();
  }
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="setting"
        size={30}
        color='white'
      />
    ),
    headerTitle: "Settings",
    headerLeft:
      <View style={{ paddingLeft: 16 }}>
        <Icon
          name="md-menu"
          size={30}
          color='white'
          onPress={() => navigation.toggleDrawer()} />
      </View>,
  })
  update = () => {
    const {getDictionaries} = this.props;

    this.setState({isLoadingContent: true});
    getDictionaries({
      onError: (error) => {
        alert(error);
        this.setState({isLoadingContent: false});
      },
      onSuccess: () => {
        this.setState({isLoadingContent: false});
      }
    });
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.dictionaries !== this.state.dictionaries) {
      this.setState({dictionaries: nextProps.dictionaries});
    }
  }
  render() {

    const {
      dictionaries,
        isLoadingContent
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground source={require('./../../../../assets/image/wave.png')} style={styles.backgroundImage}>

            <Text style={{ fontSize: 20, color: "black", fontWeight: 'bold', textAlign: "center", marginTop: "13%" }}>RECOMMENDED SITES</Text>

            {isLoadingContent ? <Text>loading...</Text> : <FlatList
              data={dictionaries}
              showsVerticalScrollIndicator={false}
              horizontal={true}
              renderItem={({ item }) =><TouchableOpacity
                  onPress={() => {
                    // this.setState({
                    //   xmlUrl: item.rssFeeds[0]
                    // },()=>{
                    //   this.getNewContentRss();
                    // })
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    // padding: 10,
                    shadowColor: '#000',
                    shadowOffset: {width: 1, height: 1},
                    shadowOpacity: 0.8,
                    shadowRadius: 3,
                    elevation: 15,
                    margin: 5,
                    borderRadius: 5,
                    width: 350,
                    height: 150,
                    flexDirection: "row",
                    marginBottom: 5,
                    justifyContent:'space-between'
                  }}>


                    <Image
                        style={{
                          width: "100%",
                          height: undefined,
                          // aspectRatio: 1
                        }}
                        source={{uri: item.imageUrl}}
                    />


              </TouchableOpacity>


            }
             />
            }

          </ImageBackground>



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
    // flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    alignItems: "center"
  },
  contents: {
    justifyContent: 'center',
    alignContent: 'center'
  },

});

const mapStateToProps = state => {
  return {
    dictionaries: state.DictionaryReducer.dictionaries

  };
};

export default connect(
    mapStateToProps,
    {
      getDictionaries: actions.getDictionaries,
    },
)(Setting);

