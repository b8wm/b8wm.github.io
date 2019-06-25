var isClocked = false;
var currTS;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function initiate() {
  var t = new Date(); // <<---- INSERT CURRENT TIME FROM DATABASE HERE
  var btn = document.getElementById("clock-btn");
  var duration = document.getElementById("duration");
  currTS = t.getTime();
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
  document.getElementById("left-window-btn").addEventListener("mouseup", function() {
    leftWindowBtnUp();
  });
  document.getElementById("right-window-btn").addEventListener("mouseup", function() {
    rightWindowBtnUp();
  });
  document.getElementById("clock-btn").addEventListener("mousedown", function() {
    clockBtnDown();
  });
  document.getElementById("clock-btn").addEventListener("mouseup", function() {
    clockBtnUp();
  });
  setInterval(refresh, 100);
}

function leftWindowBtnUp() {
  document.getElementById("left-window").classList.add("focus-window");
  document.getElementById("right-window").classList.remove("focus-window");
  document.getElementById("window-indicator").classList.add("focus-window");
}
function rightWindowBtnUp() {
  document.getElementById("right-window").classList.add("focus-window");
  document.getElementById("left-window").classList.remove("focus-window");
  document.getElementById("window-indicator").classList.remove("focus-window");
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
  // nothing yet
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
