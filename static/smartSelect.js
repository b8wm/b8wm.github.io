function allocateOptions_ssel(givenArr_ssel, givenElem_ssel) {
  var optElems_ssel = givenElem_ssel.children;
  for (var i_ssel = 0; i_ssel < optElems_ssel.length; i_ssel++) {
    givenArr_ssel.push([optElems_ssel[i_ssel].innerHTML, optElems_ssel[i_ssel].value]);
  }
}

function educateDropdowns() {
  var dumbElems_ssel = document.getElementsByClassName("smart-select");
  for (var i_ssel = 0; i_ssel < dumbElems_ssel.length; i_ssel++) {
    var tmp_ssel = new Select_ssel(dumbElems_ssel[i_ssel]);
    tmp_ssel.educateDropdown();
  }
}

function educateDropdown(dumbElem_ssel) {
  var tmp_ssel = new Select_ssel(dumbElem_ssel);
  return tmp_ssel.educateDropdown();
}

function Select_ssel(elem_ssel) {
  this.elem = elem_ssel;
  this.smartElem;
  this.name = elem_ssel.name;
  this.cid = elem_ssel.id;
  this.placeholder = elem_ssel.dataset.placeholder;
  this.placeholder = this.placeholder?this.placeholder:"Search...";
  this.isMobile = elem_ssel.classList.contains("smart-select-mobile");
  this.isMobile = this.isMobile?this.isMobile:false;
  this.options = [];
  allocateOptions_ssel(this.options, elem_ssel);
  this.selection;
  this.shownSelection;
  this.input = "";
  this.selected = new CustomEvent('selected', { selection: this.selection });
  this.deselected = new CustomEvent('deselected', {});
  this.dragging = false;
  this.open = false;
  this.cancelCollapse = false;
  this.generateUID = function() {
    var testUid_ssel = 0;
    while (document.getElementById(testUid_ssel + "-uid-ssel")) { testUid_ssel++; }
    return testUid_ssel + "-uid-ssel";
  };
  this.uid = this.generateUID();
  this.generateNode = function() {
    var str_ssel = "";
    str_ssel += "<div class='space-ssel'>";
    str_ssel +=   "<div class='select-ssel' id=" + this.uid + ">";
    str_ssel +=     "<input type='hidden' class='hidden-ssel' name='" + this.name + "' value='' />";
    str_ssel +=     "<div class='select-top-ssel'>";
    str_ssel +=       "<input type='text' class='input-ssel' placeholder='" + this.placeholder + "'/>";
    str_ssel +=     "</div>";
    str_ssel +=     "<div class='select-body-ssel'>";
    for (var i_ssel = 0; i_ssel < this.options.length; i_ssel++) {
      str_ssel +=     "<div class='option-ssel' data-value='" + this.options[i_ssel][1] + "'>" + this.options[i_ssel][0] + "</div>";
    }
    str_ssel +=     "</div>";
    str_ssel +=   "</div>";
    str_ssel += "</div>";
    return document.createRange().createContextualFragment(str_ssel);
  };
  this.educateDropdown = function() {
    elem_ssel.parentElement.replaceChild(this.generateNode(), elem_ssel).getElementsByClassName("select-ssel")[0];
    this.initiate();
    return this.smartElem;
  };
  this.initiate = function() {
    this.smartElem = document.getElementById(this.uid);
    if (this.cid !== "") { this.smartElem.id = this.cid; }
    else { this.smartElem.removeAttribute("id"); }
    initiateOptions_ssel(this);
    this.smartElem.getElementsByClassName("input-ssel")[0].addEventListener("keyup", () => {
      this.input = this.smartElem.getElementsByClassName("input-ssel")[0].value;
      if (this.input === this.shownSelection) {
        this.smartElem.getElementsByClassName("input-ssel")[0].style.fontStyle = "normal";
      } else {
        this.shownSelection = null;
        this.selection = null;
        this.smartElem.getElementsByClassName("hidden-ssel")[0].value = null;
        this.smartElem.getElementsByClassName("input-ssel")[0].style.fontStyle = "italic";
        this.smartElem.dispatchEvent(this.deselected);
      }
      let out_ssel = "";
      for (var i_ssel = 0; i_ssel < this.options.length; i_ssel++) {
        if (this.input === "" || this.options[i_ssel][0].toLowerCase().indexOf(this.input.toLowerCase()) !== -1) {
          out_ssel += "<div class='option-ssel' data-value='" + this.options[i_ssel][1] + "'>" + this.options[i_ssel][0] + "</div>";
        }
      }
      if (out_ssel === "") {
        out_ssel = "<xmp class='no-results-ssel'>No results for \"" + this.input + "\"</xmp>";
      }
      this.smartElem.getElementsByClassName("select-body-ssel")[0].innerHTML = out_ssel;
      initiateOptions_ssel(this);
      let top_ssel = this.smartElem.getElementsByClassName("select-top-ssel")[0];
      let bod_ssel = this.smartElem.getElementsByClassName("select-body-ssel")[0];
      this.smartElem.style.height = top_ssel.offsetHeight + bod_ssel.offsetHeight + "px";
    });
    this.smartElem.addEventListener(this.isMobile?"touchstart":"mousedown", () => {
      this.cancelCollapse = true;
      this.open = true;
      let top_ssel = this.smartElem.getElementsByClassName("select-top-ssel")[0];
      let bod_ssel = this.smartElem.getElementsByClassName("select-body-ssel")[0];
      this.smartElem.style.height = top_ssel.offsetHeight + bod_ssel.offsetHeight + "px";
    });
    document.addEventListener(this.isMobile?"touchend":"mouseup", () => {
      if (!this.cancelCollapse) {
        this.open = false;
        let top_ssel = this.smartElem.getElementsByClassName("select-top-ssel")[0];
        this.smartElem.style.height = top_ssel.offsetHeight + "px";
      }
      this.cancelCollapse = false;
    });
    let spa_ssel = this.smartElem.parentElement;
    let top_ssel = this.smartElem.getElementsByClassName("select-top-ssel")[0];
    let bod_ssel = this.smartElem.getElementsByClassName("select-body-ssel")[0];
    this.smartElem.style.height = top_ssel.offsetHeight + "px";
    this.smartElem.style.width = document.getElementsByTagName("body")[0].offsetWidth / 2 + "px";
    spa_ssel.style.height = top_ssel.offsetHeight + "px";
    spa_ssel.style.width = top_ssel.offsetWidth + "px";
    this.smartElem.getElementsByClassName("input-ssel")[0].style.fontStyle = "italic";
    
    function initiateOptions_ssel(this_ssel) {
      var options_ssel = this_ssel.smartElem.getElementsByClassName("option-ssel");
      for (var i_ssel = 0; i_ssel < options_ssel.length; i_ssel++) {
        let tmp_ssel = options_ssel[i_ssel];
        tmp_ssel.addEventListener(this_ssel.isMobile?"touchstart":"mousedown", () => {
          tmp_ssel.classList.add("option-down-ssel");
        });
        if (this_ssel.isMobile) {
          tmp_ssel.addEventListener("touchmove", () => {
            this_ssel.dragging = true;
          });
        }
        tmp_ssel.addEventListener(this_ssel.isMobile?"touchend":"mouseup", () => {
          tmp_ssel.classList.remove("option-down-ssel");
          if (!this_ssel.dragging) {
            this_ssel.selection = tmp_ssel.dataset.value;
            this_ssel.smartElem.dispatchEvent(this_ssel.selected);
            this_ssel.smartElem.getElementsByClassName("hidden-ssel")[0].value = this_ssel.selection;
            this_ssel.smartElem.getElementsByClassName("input-ssel")[0].value = tmp_ssel.innerHTML;
            this_ssel.shownSelection = tmp_ssel.innerHTML;
            this_ssel.smartElem.getElementsByClassName("input-ssel")[0].style.fontStyle = "normal";
            this_ssel.open = false;
            let top = this_ssel.smartElem.getElementsByClassName("select-top-ssel")[0];
            this_ssel.smartElem.style.height = top.offsetHeight + "px";
            this_ssel.cancelCollapse = false;
          } else {
            this_ssel.dragging = false;
          }
        });
      }
    }
  };
}
