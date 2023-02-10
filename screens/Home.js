import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { LineChart, CandlestickChart} from 'react-native-wagmi-charts'; 
const data = [
  {
    timestamp: 1625945400000,
    value: 33575.25
  },
  {
    timestamp: 1625946300000,
    value: 33545.25
  },
  {
    timestamp: 1625947200000,
    value: 33510.25
  },
  {
    timestamp: 1625948100000,
    value: 33215.25
  }
]

const Home = () => {
  return (
    <View style={styles.container}>
      <LineChart.Provider data={data}>
        <LineChart width={300}>
          <LineChart.Path />
          <LineChart.CursorCrosshair>
            <LineChart.Tooltip xGutter={7} yGutter={7} position="bottom"/>
          </LineChart.CursorCrosshair>
        </LineChart>
      </LineChart.Provider>

    <Text>Here is your Line chart</Text>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
    // borderColor: "black",
    // width: "75%",
    marginLeft: 10,
    marginRight: 10,
    height: "80%"
  },
  chart:{
    width:"100",
    height:"100%"
  }
});