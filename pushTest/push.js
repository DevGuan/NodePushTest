'use strict'

var apn = require('apn') , path = require('path');
// var alertOp = require('apn.NotificationAlertOptions');
var devicetokens = ['a9300ac667e7091bf9f37f876f20e7755d7b543c24f99c11661538ef7dda09ff','af3cac2a0f747e85f133a4675c639cae0fd25c196bc2e77395e3a2920e27de00'];

var root = path.resolve('./pushTest');
let provider = new apn.Provider({
    cert : path.join(root ,'cert.pem'),
    key :  path.join(root ,'key.pem'),
    production : false
});

function sendTest(count){
    if(count > 0){
        count --;
        var numuber = 10 - count;
        let notification = new apn.Notification({
            alert : {
                title :'成功率测试第'+ numuber +'条 中山港口镇推送测试',
                subtitle : 'GFS 测试',
                body : '呵呵哈哈哈或或'
            }
        });
        notification.badge = numuber;
        notification.sound = 'default';
        notification.topic = 'cn.com.ecinc.EmoaIPhoneZSGK';
        // notification.alert = {
        //     title :'成功率测试第'+ (10 - count) +'条 中山港口镇推送测试',
        //     subtitle : 'GFS 测试',
        //     body :'呵呵哈哈哈或或'
        // };
        // notification.alert = apn.NotificationAlertOptions
        // var noti_option= notification.alert;
        notification.alert.title : '成功率测试第'+ (10 - count) +'条 中山港口镇推送测试';
        notification.alert.subtitle = 'GFS 测试';
        notification.alert.body = '呵呵哈哈哈或或';
        provider.send(notification ,devicetokens).then( result =>{
        console.log("sent:", result.sent.length);
        console.log("failed:", result.failed.length);
        console.log(result.failed);
        sendTest(count);
        });  
    }else{
        provider.shutdown();
    }
}

sendTest(10);
