import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/DictionaryActions";
import Header from "../../SeperateComponents/Header";
import Loader from "../../SeperateComponents/Loader";
import * as actionsUsers from "../../../Store/Actions/UserActions";


class Setting extends React.PureComponent  {
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
      dictionaryID:''

    };
    this.update= this.update.bind(this);
  }
  static navigationOptions = ({ navigation }) => ({
    header: (props) => <Header navigation={navigation}  previous={false}/>
  })
  componentDidMount() {
    this.update();
    // alert('position here: '+this.props.position);
  }
  updateUser = () => {
    const {getUser} = this.props;
    getUser({
      onError: (error) => {
        this.setState({isLoadingContent: false});
        Alert.alert(
            'Error',
            error
            , [
              {text: 'Okay'}
            ]
        );
      },
      onSuccess: () => {
        this.setState({isLoadingContent: false});
        Alert.alert(
            'Success',
            'Default Dictionary Changed'
            ,[
              {text: 'Okay'}
            ]
        );
      }
    });
  }
  update() {
    const {getDictionaries} = this.props;

    this.setState({isLoadingContent: true});
    getDictionaries({
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

  updateDictionary(id) {
    const {setDictionary} = this.props;

    this.setState({isLoadingContent: true});
    setDictionary({
      onError: (error) => {
        this.setState({isLoadingContent: false});
        Alert.alert(
            'Error',
            error
            ,[
              {text: 'Okay'}
            ]
        );
      },
      onSuccess: () => {
        this.updateUser();
      },data:{
        dictionaryId: id
      }
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.dictionaries !== state.dictionaries) {
      return {
        dictionaries: props.dictionaries
      };
    }
    return null;
  }
  render() {

    const {
      dictionaries,
        isLoadingContent
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1,paddingBottom:30 }}>
          <ImageBackground source={require('./../../../../assets/image/wave.png')} style={styles.backgroundImage}>

            <Text style={{ fontSize: 20, color: "black", fontWeight: 'bold', textAlign: "center", marginTop: "13%" }}>RECOMMENDED SITES</Text>

            {isLoadingContent ? <Loader/> : <FlatList
              data={dictionaries}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) =><TouchableOpacity
                  onPress={this.updateDictionary.bind(this,item.id)}
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
                    width: 400,
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
      setDictionary: actions.setDictionary,
    getUser: actionsUsers.getUser,
    },
)(Setting);

