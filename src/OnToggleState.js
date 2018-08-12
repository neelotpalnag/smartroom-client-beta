import TOPICS from './Topics';
import {Alert} from 'react-native';

import Amplify, {PubSub} from 'aws-amplify';
import {AWSIoTProvider} from 'aws-amplify/lib/PubSub/Providers';

// THIS METHOD IS CALLED WHEN A TOGGLE BUTTON IS PRESSED
// THIS ACTS ON THE RELEVANT TOGGLE ACTION AND RETURNS WHETHER THE RESULT OF THE TOGGLE WAS SUCCESSFUL OR NOT

topics = TOPICS;

export default function OnToggleState(component, stat){

    pub_stat = {
      "state":{
        "desired":{
          [component]: stat==="ON"?"OFF":"ON"
        }
      }
    }
    //
    // console.log("SUBSCRIBING");
    // const sub_update_acc = PubSub.subscribe(String(topics.update.updateAccepted.topic)).subscribe({
    //    next: function _onDataReceived(data){
    //      up_dat = data;
    //      console.log("Data Received:");
    //      sub_update_acc.unsubscribe();
    //    },
    //    error: error => console.error(error),
    //    close: () => console.log('Done'),
    //    //   pub_response_accepted = data;
    //    // },
    //  });

    // var START_STATE;
    // PubSub.publish(String(topics.get.getShadow.topic), {});

    // var pub_response_accepted = null;
    // var pub_response_rejected = null;

    // BEFORE PUBLISHING, SUBSCRIBE TO UPDATE TOPICS
    // SUBSCRIBE TO UPDATE-ACCEPTED TOPIC
  //   console.log('SUBSCRIBING');
  //   const updateAccept = PubSub.subscribe(String(topics.update.updateAccepted.topic)).subscribe({
  //   next: data =>{
  //     console.log('ACCEPTED: '. data);
  //     pub_response_accepted = true;
  //   },
  //   error: error => {
  //     console.log("Error in subscription");
  //     return 0;},
  //   close: () => console.log('Done'),
  // });
  //
  //   //SUBSCRIBE TO UPDATE-REJECTED TOPIC
  //   const updateReject = PubSub.subscribe(String(topics.update.updateRejected.topic)).subscribe({
  //   next: data => {
  //     pub_response_rejected = true;
  //   },
  //   error: error => {
  //     console.log("Error in subscription");
  //     return 0;},
  //   close: () => console.log('Done'),
  // });
  // //
    // PUBLISH UPDATE TO SHADOW
    PubSub.publish(topics.update.updateShadow.topic , pub_stat);

    //return 1;

    // WAIT TILL THE UPDATE-ACCEPTED TOPIC PUBLISHES A REPLY
    // while(pub_response_accepted===null && pub_response_rejected===null){
    //   setTimeout(function(){}, 500);}
    // if (pub_response_accepted === true){
    //   updateAccept.unsubscribe();
    //   updateReject.unsubscribe();
    //   return 1;
    //
    // }
    // else if (pub_response_rejected === true) {
    //   updateAccept.unsubscribe();
    //   updateReject.unsubscribe();
    //   return 0;
    // }
    return 1;
};
