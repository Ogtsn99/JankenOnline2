'use strict';
import $ from 'jquery';
const global = Function('return this;')();
global.jQuery = $;

//import io from 'socket.io-client';
import io, { Socket } from 'socket.io-client';

var btnGu = $('#btnGu');
var btnPa = $('#btnPa');
var btnChoki = $('#btnChoki');
var opponentName = $('#opponentName');
var nextTe = $('#nextTe');

btnGu.click(()=>{
    console.log("グーボタンを押しました")
    socket.emit("janken_to_server", {te: 0});
    nextTe.text("次に出す手: グー")
})
btnPa.click(()=>{
    socket.emit("janken_to_server", {te: 1});
    nextTe.text("次に出す手: チョキ")
})
btnChoki.click(()=>{
    socket.emit("janken_to_server", {te: 2});
    nextTe.text("次に出す手: パー")
})

//対戦開始、相手の情報(名前)を受け取る
function setOpponentName(name){
    opponentName.text(name);
}

