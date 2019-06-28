var form =  [
              [ "jobs", "Select a Job", "add",
                [ "Squirrel", "Bird", "Cat", "Dog", "Snake", "Bear", "Wolf",
                "Lion", "Pig gip dslkf huio", "Tiger", "Deer", "Horse", "Monkey", "Fish",
                "Elephant", "Bat", "Fox", "Turtle", "Rabbit", "Rhinoceros",
                "Cow", "Lepard", "Dolphin", "Shark", "Otter", "Kangaroo",
                "Panda", "Giraffe", "Zebra", "Goat" ]
              ]
            ];
var edrop_click = false;
var edrop_which = false;
var edrop_relay_click = false;
var pop_edrop_var;
function initDropdown(indx) {
  document.getElementById("job-drop").innerHTML = buildSelect(indx);
  document.querySelectorAll("[data-index-number='" + indx + "']")[0].addEventListener(oDownP, function() { edrop_click = indx; });
  
}
function deleteDropdown() {
  document.getElementById("job-drop").innerHTML = "";
}
function buildSelect(arrIndex) {
  var str = "";
  str +=  "<div data-index-number='" + arrIndex + "' class='select' on" + oDownP + "='edrop_open(this);'>";
  str +=    "<input type='hidden' name='" + form[arrIndex][0] + "' value='' class='edrop-hidden-input' />";
  str +=    "<div class='edrop-sbox'><span class='edrop-sbox-prompt'>" + form[arrIndex][1] + "</span></div>";
  str +=    "<i class='caret'></i>";
  str +=    "<div class='select-inner'>";
  str +=      "<div class='tbox-div'>";
  str +=        "<input type='text' class='edrop-tbox' onkeyup='pop_edrop(this)' />";
  str +=        "<div class='search-div'><i class='material-icons search'>search</i></div>";
  str +=      "</div>";
  str +=      "<div class='edrop-optbox'></div>";
  str +=    "</div>";
  str +=  "</div>";
  return str;
}
function edrop_open(edrop_div) {
  if (!edrop_which) {
    edrop_which = edrop_div;
    var inner  = edrop_div.getElementsByClassName("select-inner")[0];
    var sbox   = edrop_div.getElementsByClassName("edrop-sbox")[0];
    var tbox   = inner.getElementsByClassName("edrop-tbox")[0];
    var tboxd  = tbox.parentElement;
    var optbox = inner.getElementsByClassName("edrop-optbox")[0];
    var caret  = edrop_div.getElementsByClassName("caret")[0];
    edrop_div.style.zIndex += 1;
    sbox.style.borderBottomLeftRadius = "0";
    sbox.style.borderBottomRightRadius = "0";
    sbox.style.borderBottom = "none";
    inner.style.display = "block";
    inner.style.padding = "8px";
    setTimeout(function() {
      inner.style.height = tboxd.offsetHeight + optbox.offsetHeight + 18 + "px";
    }, 0);
    caret.style.transform = "translateY(-25%) rotate(-225deg)";
    pop_edrop(tbox);
    setTimeout(function() { tbox.focus(); }, 0);
  }
}
function edrop_close(edrop_div) {
  setTimeout(function() {
    if (edrop_relay_click || (edrop_which !== false && (edrop_click !== parseInt(edrop_div.dataset.indexNumber)))) {
      edrop_relay_click = false;
      edrop_which = false;
      var inner  = edrop_div.getElementsByClassName("select-inner")[0];
      var sbox   = edrop_div.getElementsByClassName("edrop-sbox")[0];
      var tbox   = inner.getElementsByClassName("edrop-tbox")[0];
      var optbox = inner.getElementsByClassName("edrop-optbox")[0];
      var caret  = edrop_div.getElementsByClassName("caret")[0];
      caret.style.transform = "translateY(-75%) rotate(-45deg)";
      inner.style.height = "0";
      inner.style.padding = "0";
      setTimeout(function() {
        sbox.style.borderBottomLeftRadius = null;
        sbox.style.borderBottomRightRadius = null;
        sbox.style.borderBottom = null;
        inner.style.display = null;
        edrop_div.style.zIndex -= 1;
      }, 200);
    }
    edrop_click = false;
  }, 0);
}
function edrop_relay(optbox_opt) {
  var edrop_div = optbox_opt.parentElement.parentElement.parentElement;
  var sbox   = edrop_div.getElementsByClassName("edrop-sbox")[0];
  var tbox   = edrop_div.getElementsByClassName("edrop-tbox")[0];
  var val = "";
  if (optbox_opt.classList.contains("optbox-opt-other")) {
    val = optbox_opt.getElementsByTagName("xmp")[0].innerHTML;
  }
  else {
    val = optbox_opt.innerHTML;
  }
  optbox_opt.style.backgroundColor = "#FFF";
  sbox.innerHTML = "<xmp>" + val + "</xmp>";
  edrop_div.getElementsByClassName("edrop-hidden-input")[0].value = val;
  tbox.value = "";
  enableClockOut(); // TEMPORARY!!!
  edrop_relay_click = true;
  setTimeout(function() {
    edrop_close(edrop_div);
  }, 0);
}
function relay_down(optbox_opt) {
  setTimeout(function() { optbox_opt.style.backgroundColor = "#CCC"; }, 0);
  
}
function pop_edrop(tbox) {
  var edrop_div = tbox.parentElement.parentElement.parentElement;
  var optbox = edrop_div.getElementsByClassName("edrop-optbox")[0];
  var ind = parseInt(edrop_div.dataset.indexNumber);
  var add = form[ind][2];
  var arr = form[ind][3];
  var str = "";
  for (var i = 0; i < arr.length; i++) {
    if (tbox.value == "" || arr[i].toLowerCase().indexOf(tbox.value.toLowerCase()) != -1) {
      str += "<div class='optbox-opt' on" + oDownP + "='relay_down(this);' on" + oUpP + "='edrop_relay(this);'>" + arr[i] + "</div>";
    }
  }
  if (str == "") {
    if (add == "") {
      str += "<div class='optbox-opt optbox-opt-none'><i><xmp style='font-family: sans-serif; margin: 0;'>No results for \"" + tbox.value.toLowerCase() + "\"</xmp></i></div>";
    }
    else {
      str += "<div class='optbox-opt optbox-opt-other' on" + oDownP + "='relay_down(this);' on" + oUpP + "='edrop_relay(this);'><i class='material-icons opt-other'>add</i>&nbsp;Use&nbsp;<i style='display: inline-block;'>\"<xmp>" + tbox.value.toLowerCase() + "</xmp>\"</i>&nbsp;?</div>"
    }
  }
  optbox.innerHTML = str;
}
