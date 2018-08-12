import React, {Component} from 'react';
import {Text, View, ImageBackground} from 'react-native';

import ToggleSwitch from 'toggle-switch-react-native';
import Amplify, {PubSub} from 'aws-amplify';
import {AWSIoTProvider} from 'aws-amplify/lib/PubSub/Providers';

import Style from './src/Style';
import OnToggleState from './src/OnToggleState';
import {TOPICS} from './src/Topics';

topics = TOPICS;

Amplify.configure({
    Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'ap-southeast-1:f697d060-3911-4045-993d-2d6335ceeb67',
    // REQUIRED - Amazon Cognito Region
        region: 'ap-southeast-1',
    }
});

Amplify.addPluggable(new AWSIoTProvider({
     aws_pubsub_region: 'ap-southeast-1',
     aws_pubsub_endpoint: 'wss://a33bhpvmaudokh.iot.ap-southeast-1.amazonaws.com/mqtt',
   }));

console.log("SUBSCRIBING");
PubSub.subscribe(String(topics.update.updateAccepted.topic)).subscribe({
   next: data => {console.log("data received", data);},
   error: error => console.error(error),
   close: () => console.log('Done'),
   //   pub_response_accepted = data;
   // },
 });
//
// // var START_STATE;
// setTimeout(function(){
// PubSub.publish(String(topics.get.getShadow.topic), {});}, 5000);

export default class SmartRoomClient extends Component {

  constructor(props) {
      super(props);
      this.client_id = 'neelotpal';
      this.initialState = {
        clientVersion: 'V0.1.0',
        connectedStatus: true,   // Disconnected from AWS Cloud by default
        awsThingName: 'smartroom_hub_0',
        switchStatus: {
          light_1: 'OFF',
          light_2: 'OFF',
          fan_1: 'OFF'
        },
        connectionMode: 'MQTT'    // HTTP can also be implemented using the AWS IoT APIs
      };

      this.state = this.initialState;
      //PubSub.publish('myTopic1', { msg: 'Hello to all subscribers!' });
  }

  render() {
    return (
      <View style={{flex: 1}}>
            <View style={{height: 120, backgroundColor: '#000', alignItems: 'center'}}>
              <ImageBackground source={require('./src/back.jpg')} style={{width: '100%', height: '100%', alignItems:'flex-start'}}>
                <Text style={Style.dashTitleText}> SmartRoom Client Dashboard</Text>
                <Text style={Style.dashVersionText}> {this.state.clientVersion}</Text>
              </ImageBackground>
            </View>

            <View style={{backgroundColor: '#FFF'}}>
            <ImageBackground source={require('./src/back_white.jpg')} style={{width: '100%', height: '100%', alignItems:'flex-start'}}>
            <View>
              <Text style={[{color: this.state.connectedStatus?'green':'red'}, Style.connectedStatus]}> {this.state.connectedStatus?'Connected: AWS':'Disconnected'}</Text>
            </View>
            <View style={{paddingLeft: 10}}>
              <Text style={Style.firstStatusBoard}> AWS Thing Name: <Text style={{fontWeight: 'bold'}}>{this.state.awsThingName}</Text> </Text>
              <Text style={Style.firstStatusBoard}> Client ID: <Text style={{fontWeight: 'bold'}}>{this.client_id}</Text> </Text>
            </View>

            <View style={{paddingTop: 50, paddingLeft: 10}}><ToggleSwitch
                  isOn={this.state.switchStatus.light_1==='ON'?true:false}
                  onColor='green'
                  offColor='red'
                  label='Light 1     '
                  labelStyle={{color: 'black', fontWeight: '700', fontSize: 16}}
                  size='large'
                  onToggle={ () => this._OnToggle('light_1') }
            /></View>
            <View style={{paddingTop: 20, paddingLeft: 10}}><ToggleSwitch
                  isOn={this.state.switchStatus.light_2==='ON'?true:false}
                  onColor='green'
                  offColor='red'
                  label='Light 2    '
                  labelStyle={{color: 'black', fontWeight: '700', fontSize: 16}}
                  size='large'
                  onToggle={ () => this._OnToggle('light_2') }
            /></View>
            <View style={{paddingTop: 20, paddingLeft: 10}}><ToggleSwitch
                  isOn={this.state.switchStatus.fan_1==='ON'?true:false}
                  onColor='green'
                  offColor='red'
                  label='Fan 1        '
                  labelStyle={{color: 'black', fontWeight: '700', fontSize: 16}}
                  size='large'
                  onToggle={ () => this._OnToggle('fan_1') }
            /></View>
            <Text style={[Style.firstStatusBoard, {paddingTop: 80}]}> Connection Mode: <Text style={{fontWeight: 'bold'}}>{this.state.connectionMode}</Text></Text>
            </ImageBackground>
            </View>
        </View>
    );
  }

  _OnToggle(dat){
    let stat = this.state.switchStatus;
    switch (dat) {
      case 'light_1':
        res = OnToggleState('light_1', this.state.switchStatus.light_1);
        if (res === 1){
          stat.light_1 = stat.light_1==='ON'?'OFF':'ON';
        }
        break;

      case 'light_2':
        res = OnToggleState('light_2', this.state.switchStatus.light_2);
        if (res === 1){
          stat.light_2 = stat.light_2==='ON'?'OFF':'ON';
        }
        break;

      case 'fan_1':
        res = OnToggleState('fan_1', this.state.switchStatus.fan_1);
        if (res == 1){
          stat.fan_1 = stat.fan_1==='ON'?'OFF':'ON';
        }
        break;
    }
    this.setState({switchStatus: stat});
    console.log();
  };
}
