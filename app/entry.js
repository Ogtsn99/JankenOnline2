'use strict';
import $ from 'jquery';
const global = Function('return this;')();
global.jQuery = $;
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
  var win=0, draw = 0, lose=0;
function winIncrement(){
  win++;
$('#winCounter').text("勝ち: " + win);
  }
function drawIncrement() {
  draw++;
  $('#drawCounter').text("あいこ: " + draw);
}
function loseIncrement() {
  lose++;
  $('#loseCounter').text("負け: " + lose);
}
  //対戦開始、相手の情報(名前)を受け取る
function setOpponentName(name){
  opponentName.text(name);
}
function appendMsg(message) {
  $("#chatLogs").append("<div>" + message + "</div>");
  $('#chatLogs').animate({scrollTop: $('#chatLogs')[0].scrollHeight}, 'fast');
}
$("msgform").submit(function(e){
  var msg = $("#msgForm").val();
  socket.emit('message_to_server', {msg: msg});
  e.preventDefault();
});
