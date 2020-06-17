//appモジュールを読み込む（このappには、www内ですでにポート番号が登録されているので、ポート番号を取得したことにもなる）
var app = require('../app');
var express = require('express');
var router = express.Router();
const User = require('../models/user');

//httpモジュールを読み込んで、サーバーを立ち上げる（createServerと同じ扱い）
var http = require('http');

//必要な三要素を揃えて初めてサーバーを立ち上げられる
var server = http.createServer(app);

//サーバーをlistenしてsocketIOを設定
var io = require('socket.io')(server);

var userMap = new Map(); //ユーザーID: ユーザーの次の手, 勝ち, あいこ, 負け, gu, choki, pa
var roomMap = new Map(); //ルームID: ルームにいるユーザー1, ユーザー2

//socketIOモジュール
function socketIO(){
    //サーバーを立ち上げたら実行
    server.listen(app.get('port'), function() {
        console.log('listening!!!');
    });
    //socket処理を記載する
    io.sockets.on('connection', function(socket){
        var roomId = "", username = "", userId = "", hand=-1;
        console.log("connected");
        //socket処理
        socket.on('join',function(data){
            roomId = data.roomId, username = data.username, userId = data.userId;
            //ユーザーをセットする。
            if(userMap.get(userId)){//すでに同じIDで入っている
                socket.emit("canjoin", {ok: false});
            }else{
                userMap.set(userId, {username: username, hand:-1, win:0, draw:0, lose:0, gu:0, choki:0, pa:0});
                //ルームをセットorチェック
                if(roomMap.get(roomId)){
                    if(roomMap.get(roomId).user2){
                        socket.emit("canjoin", {ok: false});
                    }else{
                        socket.emit("canjoin", {ok: true});
                        roomMap.get(roomId).user2 = userId;
                    }
                }else{
                    //roomには0人
                    socket.emit("canjoin", {ok: true});
                    roomMap.set(roomId, {user1: userId, user2: null});
                }
            }
        })

        socket.on('disconnect', () => {
            console.log(username + "さんが退出しました")
        })
    });
};

//export
module.exports = socketIO;