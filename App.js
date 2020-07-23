import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

//import NavigationBar from '../component/NavigationBar';
// import ProjectRow from '../component/ProjectRow';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
import aaa from './NetUtils';
import ScrollViewCommands from 'react-native/Libraries/Components/ScrollView/ScrollViewCommands';

var getUrl = 'https//facebook.github.io/react-native/movies.json';
//var getUrl = 'http://192.168.43.187:8080/userLogin/user/getUser?id=1';
type Props = {};
export default class FlatListDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      movies: '',
      isLoading: false,
      // result: '',
      // user: '',
    };
  }
  loadData(refreshing) {
    console.log('loadData=========')
    if (refreshing) {
      this.setState({
        isLoading: true,
      });
    }

    setTimeout(() => {
      let dataArray = [];
      if (refreshing) {
        dataArray = [
          {id: '1', title: 'Star Wars(刷新)', releaseYear: '1977'},
          {id: '2', title: 'Back to the Future(刷新)', releaseYear: '1985'},
          {id: '3', title: 'The Matrix(刷新)', releaseYear: '1999'},
          {id: '4', title: 'Inception(刷新)', releaseYear: '2010'},
          {id: '5', title: 'Interstellar(刷新)', releaseYear: '2014'},
        ];
      } else {
        dataArray = this.state.movies.concat(this.state.movies);
      }
      this.setState({
        movies: dataArray,
        isLoading: false,
      });
      // let dataArray = [];
      // if (refreshing) {
      //   for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
      //     dataArray.push(this.state.dataArray[i]);
      //   }
      // } else {
      //   dataArray = this.state.dataArray.concat(CITY_NAME);
      // }
      //
      // this.setState({
      //   dataArray: dataArray,
      //   isLoading: false,
      // });
    }, 2000);
  }
  genIndicator() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator animating size="large" color="red" />
        <Text>正在加载更多</Text>
      </View>
    );
  }
  // componentDidMount() {
  //   aaa.get(getUrl, (callback) => {
  //     console.log(callback);
  //     this.setState({
  //       title: callback.title,
  //       description: callback.description,
  //       movies: callback.movies,
  //       // result: callback.result,
  //       // user: callback.user,
  //     });
  //   });
  // }
  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            isLoading: false,
            title: responseJson.title,
            description: responseJson.description,
            movies: responseJson.movies,
          }, function(){
          });
        })
        .catch((error) =>{
          console.error(error);
        });

  }
  render() {
    return (
        <FlatList
          style={{flex: 1}}
          //data={this.state.movies}
          data={this.state.movies}
          keyExtractor={this._keyExtractor}
          // ListHeaderComponent={this.renderHeader}
          // ListEmptyComponent={this.renderFooter}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._itemDivide}
          refreshControl={
            <RefreshControl
              title={'加载中...'}
              colors={['red']} //此颜色无效
              tintColor={'orange'}
              titleColor={'red'} //只有ios有效
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.loadData(true);
              }}
            />
          }
          ListFooterComponent={() => this.genIndicator()} //上拉加载更多视图
          onEndReached={() => {
            this.loadData();
          }}
          onEndReachedThreshold={0.1}
        />
    );
  }
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.itemClick.bind(this, item, index)}>
        <View style={{backgroundColor: 'white', height: 300}}>
          <Text>{item.title}</Text>
          <Text>上映年份: {item.releaseYear}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  _itemDivide = () => {
    return <View style={{height: 5, backgroundColor: 'gray'}} />;
  };
  itemClick(item, index) {
    alert(
      '点击了第' +
        index +
        '向，电影名称' +
        item.title +
        '上映年份' +
        item.releaseYear,
    );
  }
  _keyExtractor = (item, index) => index;
  // _ListHeaderComponent = () => {
  //   return (
  //     <View>
  //       <Text>{this.state.title}</Text>
  //       <Text>{this.state.description}</Text>
  //       {/*<Text>{this.state.result}</Text>*/}
  //     </View>
  //   );
  // };
  // _ListEmptyComponent = () => {
  //   return (
  //     <View>
  //       <Text>暂无数据</Text>
  //     </View>
  //   );
  // };
  // renderHeader = () => {
  //   return <ActivityIndicator animating size="large" />;
  // };
  // renderFooter = () => {
  //   // if (!this.state.loading) return null;
  //   return (
  //     <View>
  //       <Text>正在玩命加载......</Text>
  //       <ActivityIndicator animating size="large" color="red" />
  //     </View>
  //   );
  // };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  round_row_sb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  round_center: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 100,
    height: 100,
    margin: 30,
    justifyContent: 'center',
  },
  round_white_sb: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 100,
    height: 100,
    margin: 30,
    justifyContent: 'space-between',
  },
  round_sb: {
    justifyContent: 'space-between',
  },
  round_column_sb: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 100,
    height: 100,
    margin: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  point_center: {
    backgroundColor: 'black',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignSelf: 'center',
  },
  point_start: {
    backgroundColor: 'black',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignSelf: 'flex-start',
    margin: 5,
  },
  point_end: {
    backgroundColor: 'black',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignSelf: 'flex-end',
    margin: 5,
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
});
