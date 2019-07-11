var isClocked = false;
var pressable = true;
var currTS;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var nClose = false;
var nnClose = false;

const TOUCHSCREEN = false;
var clockOutHTML;

var oDownP, oUpP;
if (TOUCHSCREEN) { oDownP="touchstart";oUpP="touchend"; }
else { oDownP="mousedown";oUpP="mouseup"; }

function initiate() {
  var t = new Date(); // <<---- INSERT CURRENT TIME FROM DATABASE HERE
  var btn = document.getElementById("clock-btn");
  var txt = document.getElementById("clock-btn-txt");
  var duration = document.getElementById("duration");
  currTS = t.getTime();
  CLOCKOUTHTML = findComments(document.getElementById("pop-up-states"))[0].nodeValue;
  if (localStorage.getItem("clock") === null) {
    localStorage.setItem("clock", "false");
  }
  if (localStorage.getItem("clock") === ("false")) {
    isClocked = false;
    txt.innerHTML = "Clock In";
    btn.style.backgroundColor = "#7FFF00";
    btn.style.width = getTextWidth("Clock Out", {'font-family': '"Raleway", sans-serif', 'font-size': '200%'}) + "px";
  }
  else {
    isClocked = true;
    txt.innerHTML = "Clock Out";
    btn.style.backgroundColor = "#F00";
    btn.style.width = getTextWidth("Clock Out", {'font-family': '"Raleway", sans-serif', 'font-size': '200%'}) + "px";
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
  if (pressable) {
    document.getElementById("clock-btn").style.width = "90%";
  } else {
    requestAnimationFrame(function() { wiggleBtn(5, 1.2, 0, 0); });
  }
}
function clockBtnUp() {
  if (pressable) {
    var t = new Date();
    var btn = document.getElementById("clock-btn");
    var txt = document.getElementById("clock-btn-txt");
    btn.style.width = getTextWidth("Clock Out", {'font-family': '"Raleway", sans-serif', 'font-size': '200%'}) + "px";
    if (localStorage.getItem("clock") === ("false")) {
      localStorage.setItem("clock", t.getTime());
      txt.innerHTML = "Clock Out";
      btn.style.backgroundColor = "#F00";
      clockIn();
    }
    else {
      localStorage.setItem("start", localStorage.getItem("clock"));
      localStorage.setItem("end", t.getTime());
      localStorage.setItem("clock", "false");
      txt.innerHTML = "Clock In";
      btn.style.backgroundColor = "#7FFF00";
      clockOut();
    }
  }
}
function wiggleBtn(a, f, d, t) {
  var btn = document.getElementById("clock-btn");
  var txt = document.getElementById("clock-btn-txt");
  t++;
  d = a*Math.sin(t*f);
  btn.style.transform = "rotate("+d+"deg)";
  txt.style.transform = "rotate("+(d*-0.8)+"deg)";
  if (t < 5*Math.PI) {
    requestAnimationFrame(function() { wiggleBtn(a, f, d, t); });
  } else {
    btn.style.transform = "rotate(0deg)";
    txt.style.transform = "rotate(0deg)";
  }
}
function showJobSelect() {
  document.getElementById("job-drop").innerHTML = buildSelect();
  educateDropdown(document.getElementById("job-select"));
  document.getElementById("job-select").addEventListener("selected", enableClockOut);
  document.getElementById("job-select").addEventListener("deselected", disableClockOut);
}
function hideJobSelect() {
  document.getElementById("job-drop").innerHTML = "";
}
function buildSelect() {
  return '<select name="animal" data-placeholder="Select a Pet" id="job-select" class="smart-select smart-select-mobileo">'
         + '<option value="cat">Cat</option>'
         + '<option value="dog">Dog</option>'
         + '<option value="mouse">Mouse</option>'
         + '<option value="rat">Rat</option>'
         + '<option value="ferret">Ferret</option>'
         + '<option value="hamster">Hamster</option>'
         + '<option value="fish">Fish</option>'
         + '<option value="horse">Horse</option>'
         + '<option value="pony">Pony</option>'
         + '<option value="turtle">Turtle</option>'
         + '<option value="snake">Snake</option>'
         + '<option value="lizard">Lizard</option>'
       + '</select>';
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
  // send clock in to server
  disableClockOut();
  showJobSelect();
  
}
function clockOut() {
  hideJobSelect();
  openPop("Clock Out", CLOCKOUTHTML);
}
function openPop(title, contents) {
  document.getElementById("pop-up-title").innerHTML = title;
  document.getElementById("pop-up-body").innerHTML = contents;
  document.getElementById("pop-up-screen").style.display = "block";
  document.getElementById("pop-up-window").style.display = "block";
  setTimeout(function() {
    document.getElementById("pop-up-screen").classList.remove("unfocus-pop-up-screen");
    document.getElementById("pop-up-window").classList.remove("unfocus-pop-up-window");
  }, 5);
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
function disableClockOut() {
  pressable = false;
  document.getElementById("clock-btn").classList.add("disabled-btn");
}
function enableClockOut() {
  
  pressable = true;
  document.getElementById("clock-btn").classList.remove("disabled-btn");
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
