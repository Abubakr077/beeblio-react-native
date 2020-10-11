import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import {Icon, Drawer} from "native-base";
import {DrawerItems} from 'react-navigation';
import {LinearGradient} from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import {BarChart, LineChart} from "react-native-chart-kit";
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/UserActions";

const screenWidth = Dimensions.get("window").width;
const monthNames = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    // backgroundGradientToOpacity: 0.5,
    color: () => `rgb(28, 163, 220)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};


class DashBoard extends React.Component {
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
            statics: '',
            isReady: false,
            user: null
        };
        this.data = null;
        AsyncStorage.getItem('user_obj').then((user) => {
            this.setState({
                user: JSON.parse(user)
            })
        })
    }

    componentDidMount() {
        this.updateStatics();
        this.updateChart();
    }

    updateStatics = () => {
        const {getStatistics} = this.props;

        this.setState({isLoadingContent: true});
        getStatistics({
            onError: (error) => {
                alert(error);
                this.setState({isLoadingContent: false, progress: 0});

            },
            onSuccess: () => {
                this.setState({isLoadingContent: false, progress: 0});
            }
        });

    }
    updateChart = () => {
        const {getWordChart} = this.props;

        this.setState({isLoadingContent: true});
        getWordChart({
            onError: (error) => {
                alert(error);
                this.setState({isLoadingContent: false, progress: 0});

            },
            onSuccess: () => {
                let array = ['0'];
                const chart = this.state.chart;
                array.push(chart.wordFiltered.toString());
                array.push(chart.wordCollected.toString());
                this.data = {
                    labels: ["", "Words Searched", "Words Collected"],
                    datasets: [
                        {
                            data: array,
                            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                            strokeWidth: 2
                        }
                    ],
                    legend: [monthNames[chart.monthValue]]
                };
                this.setState({isLoadingContent: false, isReady: true});
            }
        });

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.statics !== this.state.statics) {
            this.setState({statics: nextProps.statics});
        }
        if (nextProps.chart !== this.state.chart) {
            this.setState({chart: nextProps.chart});
        }
    }

    render() {

        const {
            statics,
            isReady,
            chart,
            user
        } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>

                    <ImageBackground source={require('./../../../../assets/image/wave.png')}
                                     style={styles.backgroundImage}>
                        {user ? <Text style={{
                            fontSize: 22,
                            color: "black",
                            fontWeight: 'bold',
                            textAlign: "center",
                            marginTop: 17
                        }}>{user.apiUserProfile.firstName}</Text> : <View/>}
                        <Text style={{
                            fontSize: 27,
                            color: "black",
                            fontWeight: 'bold',
                            textAlign: "center",
                            marginTop: 15
                        }}>{chart ? chart.wordCollected : 0}</Text>

                        <View style={{backgroundColor: "#0F0B41", borderRadius: 10, marginTop: 15}}>

                            <Text style={{
                                fontSize: 20,
                                color: "white",
                                fontWeight: 'bold',
                                textAlign: "center",
                                paddingHorizontal: 15,
                                paddingVertical: 6
                            }}>WORDS COLLECTED</Text>


                        </View>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: 10,
                            marginTop: 15,
                            marginBottom: 20
                        }}>

                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={['#256B9B', '#256B9B', '#3FB0F1']}
                                style={styles.linearGradient}>
                                <View style={{justifyContent: "center", alignItems: "center"}}>

                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: 15,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Image source={require('./../../../../assets/image/fil.png')}
                                               style={{width: 45, height: 45, resizeMode: "cover"}}/>
                                        <View style={{
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginLeft: 7
                                        }}>

                                            <Text style={{
                                                fontSize: 16,
                                                color: "white",
                                                fontWeight: 'bold',
                                                textAlign: "center"
                                            }}>{statics.totalWordCollected ? statics.totalWordCollected : 0}</Text>
                                            <Text style={{
                                                fontSize: 16,
                                                color: "white",
                                                fontWeight: 'bold',
                                                textAlign: "center",
                                                marginTop: 5
                                            }}>Texts Filtered</Text>

                                        </View>
                                    </View>

                                    <View style={{marginTop: 20, width: "80%"}}>
                                        <Progress.Bar progress={0.7}
                                                      width={150}
                                                      color="#71BF71"
                                                      height={10}/>

                                    </View>


                                </View>
                            </LinearGradient>

                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={['#256B9B', '#256B9B', '#3FB0F1']}
                                style={styles.linearGradient}>
                                <View style={{justifyContent: "center", alignItems: "center"}}>

                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: 15,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Image source={require('./../../../../assets/image/sear.png')}
                                               style={{width: 45, height: 45, resizeMode: "cover"}}/>
                                        <View style={{
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginLeft: 7
                                        }}>

                                            <Text style={{
                                                fontSize: 16,
                                                color: "white",
                                                fontWeight: 'bold',
                                                textAlign: "center"
                                            }}>{statics.totalUrlSearched ? statics.totalUrlSearched : 0}</Text>
                                            <Text style={{
                                                fontSize: 16,
                                                color: "white",
                                                fontWeight: 'bold',
                                                textAlign: "center",
                                                marginTop: 5
                                            }}>URL Searched</Text>

                                        </View>
                                    </View>

                                    <View style={{marginTop: 20, width: "100%"}}>
                                        <Progress.Bar progress={0.7}
                                                      width={150}
                                                      color="#d097e8"
                                                      height={10}/>

                                    </View>


                                </View>
                            </LinearGradient>

                        </View>


                    </ImageBackground>


                    <View style={{flex: 1}}>


                        <Text style={{
                            fontSize: 18,
                            color: "black",
                            fontWeight: 'bold',
                            textAlign: "center",
                            marginTop: 30,
                            marginBottom: 15
                        }}>CONTENT SEARCHED THIS MONTH</Text>


                        {isReady ? <LineChart
                            style={{width: "80%"}}
                            data={this.data}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                        /> : <View/>}

                        <View style={{
                            flexDirection: "row",
                            marginHorizontal: 12,
                            marginBottom: 10,
                            justifyContent: "center",
                            marginTop: 15,
                            alignContent: "center",
                        }}>


                            <ImageBackground source={require('./../../../../assets/image/news.jpg')}
                                             style={{height: 120, width: 150}}>
                                <View style={{
                                    backgroundColor: 'rgba(37,107,155,0.8)',
                                    alignItems: "center",
                                    flex: 1,
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: "white",
                                        fontWeight: 'bold',
                                        textAlign: "center",
                                    }}>NEWS</Text>


                                </View>

                            </ImageBackground>


                            <ImageBackground source={require('./../../../../assets/image/magazine.jpg')}
                                             style={{height: 120, width: 150, marginLeft: 15}}>
                                <View style={{
                                    backgroundColor: 'rgba(37,107,155,0.8)',
                                    alignItems: "center",
                                    flex: 1,
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: "white",
                                        fontWeight: 'bold',
                                        textAlign: "center",
                                    }}>MAGAZINE</Text>


                                </View>
                            </ImageBackground>


                        </View>


                        <View style={{
                            flexDirection: "row",
                            marginHorizontal: 12,
                            marginBottom: 10,
                            justifyContent: "center",
                            marginTop: 15,
                            alignContent: "center",
                        }}>


                            <ImageBackground source={require('./../../../../assets/image/books.jpg')}
                                             style={{height: 120, width: 150}}>
                                <View style={{
                                    backgroundColor: 'rgba(37,107,155,0.8)',
                                    alignItems: "center",
                                    flex: 1,
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: "white",
                                        fontWeight: 'bold',
                                        textAlign: "center",
                                    }}>BOOKS</Text>


                                </View>

                            </ImageBackground>


                            <ImageBackground source={require('./../../../../assets/image/others.jpg')}
                                             style={{height: 120, width: 150, marginLeft: 15}}>
                                <View style={{
                                    backgroundColor: 'rgba(37,107,155,0.8)',
                                    alignItems: "center",
                                    flex: 1,
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: "white",
                                        fontWeight: 'bold',
                                        textAlign: "center",
                                    }}>OTHERS</Text>


                                </View>
                            </ImageBackground>


                        </View>


                    </View>


                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        // flex: 1,
        resizeMode: 'cover',
        flex: 1,
        // height:"100%",
        // justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20
    },
    contents: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 12,
        margin: 7,
        height: 130,
        width: 120
    },
    buttonText: {
        fontSize: 18,
        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },

});

const mapStateToProps = state => {
    return {
        statics: state.UserReducer.statics,
        chart: state.UserReducer.chart,
    };
};

export default connect(
    mapStateToProps,
    {
        getStatistics: actions.getStatistics,
        getWordChart: actions.getWordChart,
    },
)(DashBoard);
