export const TOPICS = {
  update:{
    updateShadow:{
      topic: '$aws/things/smartroom_hub_0/shadow/update',
      allowedOp: 'both'
    },
    updateAccepted:{
      topic: '$aws/things/smartroom_hub_0/shadow/update/accepted',
      allowedOp: 'subscribe'
    },
    updateRejected:{
      topic: '$aws/things/smartroom_hub_0/shadow/update/rejected',
      allowedOp: 'subscribe'
    }
  },
  get:{
    getShadow:{
      topic:'$aws/things/smartroom_hub_0/shadow/get', 
      allowedOp: 'both'
    },
    getAccepted:{
      topic:'$aws/things/smartroom_hub_0/shadow/get/accepted',
      allowedOp: 'subscribe'
    },
    getRejected:{
      topic:'$aws/things/smartroom_hub_0/shadow/get/rejected',
      allowedOp:'subscribe'
    }
  }
  // TODO: DELETE SHADOW IMPLEMENTATION
}
