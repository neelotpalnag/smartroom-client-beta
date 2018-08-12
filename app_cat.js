import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


import Amplify from 'aws-amplify';
import PubSub from 'aws-amplify';
import { MqttOverWSProvider, AWSIoTProvider } from "aws-amplify/lib/PubSub/Providers";
import aws_exports from '/home/papapumpkin/Projects/smartroom_client/smartroom_client'


Amplify.configure(aws_exports);
Amplify.addPluggable(new AWSIoTProvider({
     aws_pubsub_region: 'ap-southeast-1',
     aws_pubsub_endpoint: 'wss://a33bhpvmaudokh.iot.ap-southeast-1.amazonaws.com/mqtt',
   }));

// await PubSub.publish('test/topic', { msg: 'Hello to all subscribers!' });

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View>
        <Text>Hello world!</Text>
      </View>
    );
  }
}
