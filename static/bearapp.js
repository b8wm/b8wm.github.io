var mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

var isClocked = false;
var currTS;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var nClose = false;
var nnClose = false;

const TOUCHSCREEN = !mobileAndTabletcheck;
var clockOutHTML;

var oDownP, oUpP;
if (TOUCHSCREEN) { oDownP="touchstart";oUpP="touchend"; }
else { oDownP="mousedown";oUpP="mouseup"; }

function initiate() {
  var t = new Date(); // <<---- INSERT CURRENT TIME FROM DATABASE HERE
  var btn = document.getElementById("clock-btn");
  var duration = document.getElementById("duration");
  currTS = t.getTime();
  CLOCKOUTHTML = findComments(document.getElementById("pop-up-states"))[1].nodeValue;
  if (localStorage.getItem("clock") === null) {
    localStorage.setItem("clock", "false");
  }
  if (localStorage.getItem("clock") === ("false")) {
    btn.innerHTML = "Clock In";
    btn.style.backgroundColor = "#7FFF00";
    btn.style.width = getTextWidth("Clock Out", {'font-family': 'sans-serif', 'font-size': '200%'}) + "px";
  }
  else {
    btn.innerHTML = "Clock Out";
    btn.style.backgroundColor = "#F00";
    btn.style.width = getTextWidth("Clock Out", {'font-family': 'sans-serif', 'font-size': '200%'}) + "px";
    clockIn();
  }
  document.getElementById("left-window-btn").addEventListener(oUpP, leftWindowBtnUp);
  document.getElementById("right-window-btn").addEventListener(oUpP, rightWindowBtnUp);
  document.getElementById("clock-btn").addEventListener(oDownP, clockBtnDown);
  document.getElementById("clock-btn").addEventListener(oUpP, clockBtnUp);
  document.getElementById("pop-up-screen").addEventListener(oDownP, closePop);
  document.getElementById("pop-up-window").addEventListener(oDownP, cancelClosePop);
  document.getElementById("pop-up-exit").addEventListener(oDownP, exitPopDown);
  document.getElementById("pop-up-exit").addEventListener(oUpP, exitPopUp);
  setInterval(refresh, 100);
}
function leftWindowBtnUp() {
  document.getElementById("left-window").classList.add("focus-window");
  document.getElementById("right-window").classList.remove("focus-window");
  document.getElementById("window-indicator").classList.add("focus-window");
  document.getElementById("left-window-icon-i").classList.add("focus-window-icon");
  document.getElementById("right-window-icon-i").classList.remove("focus-window-icon");
}
function rightWindowBtnUp() {
  document.getElementById("right-window").classList.add("focus-window");
  document.getElementById("left-window").classList.remove("focus-window");
  document.getElementById("window-indicator").classList.remove("focus-window");
  document.getElementById("right-window-icon-i").classList.add("focus-window-icon");
  document.getElementById("left-window-icon-i").classList.remove("focus-window-icon");
}
function clockBtnDown() {
  document.getElementById("clock-btn").style.width = "90%";
}
function clockBtnUp() {
  var t = new Date();
  var btn = document.getElementById("clock-btn");
  btn.style.width = getTextWidth("Clock Out", {'font-family': 'sans-serif', 'font-size': '200%'}) + "px";
  if (localStorage.getItem("clock") === ("false")) {
    localStorage.setItem("clock", t.getTime());
    btn.innerHTML = "Clock Out";
    btn.style.backgroundColor = "#F00";
    clockIn();
  }
  else {
    localStorage.setItem("start", localStorage.getItem("clock"));
    localStorage.setItem("end", t.getTime());
    localStorage.setItem("clock", "false");
    btn.innerHTML = "Clock In";
    btn.style.backgroundColor = "#7FFF00";
    clockOut();
  }
}
function refresh() {
  var t = new Date();
  var duration = document.getElementById("clock-status");
  if (localStorage.getItem("clock") === ("false")) {
    duration.innerHTML = "Not Clocked In";
  }
  else {
    var duration_ms = t.getTime() - parseInt(localStorage.getItem("clock"));
    var sec_val = Math.floor(duration_ms / 1000) % 60;
    var sec_str = (sec_val >= 10)?(sec_val + ""):("0" + sec_val);
    var min_val = Math.floor((duration_ms / 1000) / 60) % 60;
    var min_str = (min_val >= 10)?(min_val + ""):("0" + min_val);
    var hr_val  = Math.floor(((duration_ms / 1000) / 60) / 60);
    var duration_str = hr_val + ":" + min_str + ":" + sec_str;
    duration.innerHTML = duration_str;
  }
}
function clockIn() {
  // nothing yet
}
function clockOut() {
  openPop("Clock Out", CLOCKOUTHTML);
}
function openPop(title, contents) {
  document.getElementById("pop-up-screen").classList.remove("unfocus-pop-up-screen");
  document.getElementById("pop-up-window").classList.remove("unfocus-pop-up-window");
  document.getElementById("pop-up-screen").style.display = "block";
  document.getElementById("pop-up-window").style.display = "block";
  document.getElementById("pop-up-title").innerHTML = title;
  document.getElementById("pop-up-body").innerHTML = contents;
}
function closePop() {
  if (!nClose) {
    document.getElementById("pop-up-screen").classList.add("unfocus-pop-up-screen");
    document.getElementById("pop-up-window").classList.add("unfocus-pop-up-window");
    setTimeout(function() {
      document.getElementById("pop-up-screen").style.display = "none";
      document.getElementById("pop-up-window").style.display = "none";
    }, 200);
  } else { nClose = false; }
}
function exitPopDown() {
  document.getElementById("pop-up-exit").classList.add("press-pop-up-exit");
}
function exitPopUp() {
  document.getElementById("pop-up-exit").classList.remove("press-pop-up-exit");
  closePop();
}
function cancelClosePop() {
  if (!nnClose) {
    nClose = true;
  } else { nnClose = false; }
}
function getTextWidth(text, css) {
  var e = $('<span></span>'); // dummy element
  e.css(css); // set properties
  e.text(text); // set test
  var width = e.appendTo($('body')).width(); // append and get width
  e.remove(); // remove from DOM
  return width + 25;
}
function dateString(day) {
  var str=day;var mod=day%10;if(day>=11&&day<=13){return day+"th";}
  else if(mod===0){str+="th";}else if(mod===1){str+="st";}
  else if(mod===2){str+="nd";}else if(mod===3){str+="rd";}
  else{str+="th";}return str;
}

var findComments = function(el) {
var arr=[];for(var i=0;i<el.childNodes.length;i++){
var node=el.childNodes[i];if(node.nodeType===8){arr.push(node);}
else{arr.push.apply(arr,findComments(node));}}return arr;};
