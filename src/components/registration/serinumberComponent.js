import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Header from '../custom/Header'
import size from '../../res/size'
import { color } from '../../res/color'
import images from '../../res/image/index'
import TextField from '../custom/TextField'
import { connect } from 'react-redux'
import { actParamAction } from '../../redux/action/paramAction'

class serinumberComponent extends Component {
   constructor(props) {
      super(props)
      this.state = {
         serialnumber: '',
         modelname: '',
      }
      this.serialnumber = React.createRef()
      this.modelname = React.createRef()

   }
   componentDidMount() {
      this.setState({
         modelname: '',
      })
   }
   showError = (message) => {
      this.serialnumber.current.error(message)

   }

   onGetSerial = () => { }
   render() {
      // console.log(this.props.modelname, 'aaaaa')
      return (
         <View style={styles.container}>
            <Text style={styles.text}>Enter Product Barcode here</Text>
            <TextField
               label="Serial Number"
               ref={this.serialnumber}
               onChangeText={(text) => {
                  this.setState({
                     serialnumber: text,
                  })
               }}
               onBlur={() => {
                  this.props.onGetSerial(this.state.serialnumber)
               }}
            />
            <TextField label="Model Name" ref={this.modelname} editable={false} value={this.props.modelname} />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,

      padding: size.h48,
   },
   text: {
      marginLeft: size.h20,
      marginBottom: size.h16,
      fontSize: size.h36,
      color: '#4F4F4F',
   },
})


const mapStateToProps = (state) => {
   return {
      dataParams: state.paramsReducers,

   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onParamAction: (data) => {
         dispatch(actParamAction(data))
      },
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(serinumberComponent)