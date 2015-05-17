(function (view, $, undefined) {
  var saveNotice = $("#notice");
  var currentView = "editor";

  // hard code tag list
  var taglist = ["tag1", "tag2", "tag3"];

  function createSaveWindow(topOffset) {
    var cH = document.documentElement.clientHeight;
    var cW = document.documentElement.clientWidth;

    console.log(topOffset);
    
    //cover
    $("<div></div>", {
      "class": "cover",
      "click" : function(){
            $(".savewindow").remove();
        $(".cover").remove();
        },
      "css": {
        "height": cH+"px",
        "width": cW+"px",
        "opacity": "0",
      },
    }).appendTo("body");
    //savewindow
    $("<div></div>", {
      "class": "savewindow",
      "css": {
        "padding": "20px",
        "position": "absolute",
        "z-index": "1",
        "right": "2%",
        "top": topOffset + 40 + "px",
      },
    }).appendTo("#editor");
    //close
    $("<i></i>", {
      "class": "fa fa-times",
      "css": {
        "position": "absolute",
        "right": "2.5%",
        "top": 5+"px",
        "cursor": "pointer",
      },
      "click" : function(){
            $(".savewindow").remove();
        $(".cover").remove();
        },
    }).appendTo(".savewindow");
    
    //info
    $("<div></div>", {
      "class": "info",
    }).appendTo(".savewindow");

    $("<i></i>", {
      "class": "fa fa-info-circle",
      "css": {
        "color": "#4E4E4E",
        "margin": "0 8px",
      },
    }).appendTo(".info");

    $("<p></p>", {
      "class": "message",
      "text": "Add tags to manage your saved input.",
      "css": {
        "color": "#4E4E4E",
        "display": "inline",
      },
    }).appendTo(".info");

    //tagbox
    $("<div></div>", {
      "class": "tagbox",
    }).appendTo(".savewindow");

    $("<span></span>", {
      "text": "Popular tags:",
      "css": {
        "float": "left",
        "width": "100px",
        "line-height": "34px",
      }
    }).appendTo(".tagbox");

    for (var i=0; i < taglist.length; i++){
      $("<span></span>", {
        "class": "label-size",
      }).appendTo(".tagbox");
      $("<a></a>", {
        "text": taglist[i],
        "click": function(e) {
            e.stopPropagation();
          var tag = $(e.target);
          if(tag.hasClass("selected")) {
            tag.removeClass("selected");
          }
          else {
            tag.addClass("selected");
          }
          },
      }).appendTo(".savewindow .label-size:last");
    }

    //create new tags
    $("<div></div>",{
      "class": "inputcontainer",
      "css": {
        "display": "none",
        "border": "1px solid #ccc",
      },
      "click": function(){
        $(".inputcontainer>input").trigger("focus");
      }
    }).appendTo(".savewindow");

    $("<div></div>", {
      "class": "created",
    }).appendTo(".inputcontainer");

    $("<input>", {
      "type": "text",
      "keydown": function(e){
        var tagname = $(this).val().trim();
        if(e.which == 32) {
          
          this.value = "";
          if($(".created").children().length == 2) {
            $(".info").css("background-color", "#FFC8A5");
            $(".message").text("Only support creating 2 new tags at most.");
          }
          else if(tagname != "") {  
            $("<span></span>", {
              "class": "label-size",
              "html": "<a>"+ tagname+"</a>",
            }).appendTo(".created");          
          }   
        }
        else if(e.which == 127 || e.which == 8) {
          if(tagname == "") {
            $($(".created").children().last()).remove();
          }
        }
      },
    }).appendTo(".inputcontainer");

    //add button
    $("<div></div>", {
      "class": "addtagcontainer",
      "css": {
        "padding-top": "8px",
      },
    }).appendTo(".savewindow");

    $("<i></i>", {
      "class": "fa fa-plus",
      "css": {
        "cursor": "pointer",
        "margin": "0 5px",
      },
      "click": function(e){
        $(".addtagcontainer").css("display", "none");
        $(".inputcontainer").css("display", "block");
        $(".inputcontainer>input").trigger("focus");
      },
    }).appendTo(".addtagcontainer");

    $("<p></p>", {
      "text": "Create new tags",
      "click": function(e){
        $(".addtagcontainer").css("display", "none");
        $(".inputcontainer").css("display", "block");
        $(".inputcontainer>input").trigger("focus");
      },
      "css": {
        "cursor": "pointer",
        "display": "inline",
      },
    }).appendTo(".addtagcontainer");

    //as private
    $("<div></div>", {
      "class": "checkbox",
      "css": {
        "margin": "5px 0",
      },
    }).appendTo(".savewindow");

    $("<label></label>",{
      "for": "aspopular",
      "html": "<input id='aspopular' type='checkbox'> This saved input will be private.",
      "css": {
        "margin": "0 0 0 5px",
      }
    }).appendTo(".savewindow .checkbox");

    //ok and cancel
    $("<div></div>", {
      "class": "buttoncontainer",
    }).appendTo(".savewindow");
    $("<button></button>", {
      "id": "tagok",
      "text": "OK",
      "class": "btn btn-primary",
      "click" : function(){
        getTags();
      },
    }).appendTo(".buttoncontainer");

    $("<button></button>", {
      "id": "tagcancel",
      "text": "Cancel",
      "class": "btn btn-danger",
      "click" : function(){
        $(".savewindow").remove();
      $(".cover").remove();
      },
    }).appendTo(".buttoncontainer");
  }

  function getTags() {
    var tags = [];
    var tagsInput = $(".tagbox .selected"); 
    for (var i=0; i<tagsInput.length; i++) {
      var tagString = $(tagsInput)[i].innerHTML;
      if (tagString != "" && tags.indexOf(tagString) === -1) {
        tags.push(tagString);     
      }
    };

    tagsInput = $(".inputcontainer a");
    for (var i=0; i<tagsInput.length; i++) {
      var tagString = $(tagsInput)[i].innerHTML;
      if (tagString != "" && tags.indexOf(tagString) === -1) {
        tags.push(tagString);     
      }
    };

    if (tags.length < 5) {
      tagsInput = $(".inputcontainer input");
      var tagString = $(tagsInput).val();
      if (tagString != "" && tags.indexOf(tagString) === -1) {
        tags.push(tagString);     
      }
    }

    $(".savewindow").remove();
    $(".cover").remove();

    updateTags();
  }

  function setHeights() {
    if(document.documentElement.clientWidth > 768){
      //big screen
        var cHeight = document.documentElement.clientHeight;
        var navHeight = $("nav").height() + 2; // height + border-height * 2
        //main body height
        var mbHeight = cHeight - navHeight;
        $("#mainbody").css("min-height", mbHeight+"px");
        $("#mainbody").css("height", mbHeight+"px");

        $("#mainbody>div").css("min-height", mbHeight+"px");
      }
  }

  function updateTags() {
    // TODO: to be implemented
  }

  view.finishLoadingLogin = function () {
    $(".loginLoadingCover").css("display", "none");
  }

  view.init = function () {
    setHeights();
  }

  view.loadingSaveRegion = function () {
    saveNotice.html("Saving changes...");
  }

  view.popupLoginClose = function () {
    var bPopup = $("#element_to_pop_up").bPopup();
    bPopup.close({
      transitionClose: 'slideUp'
    });
  }

  view.popupLoginOptions = function (isNewUser) {
    $("#element_to_pop_up").bPopup({ //uses jQuery easing plugin
      speed: 500,
      transition: 'slideDown',
      transitionClose: 'slideUp',
      onClose: function() {
        if (isNewUser) {
          $('#tutorialguide').joyride({
            autoStart: true,
            nubPosition: 'top',
            modal: true,
            expose: true
          });
        }
      }
    });
  }

  view.refreshSaveRegion = function (scope) {
    if (scope == "online") {
      saveNotice.html("All changes saved");
    } else {
      saveNotice.html("All changes saved locally");
    }
  }

  view.showTags = function () {
    var tagButton = $("#add-tags");

    var top = tagButton.offset().top;
    var navHeight = $("nav").height() + 2;

    createSaveWindow(top - navHeight);
  }

  view.startLoadingLogin = function () {
    $(".loginLoadingCover").css("display", "block");
  }

  view.switchToEditor = function () {
    if (currentView == "editor") return;

    $(".navbar-nav > li.active").removeClass();
    $("#newdata").parent().addClass("active");

    $("html").trigger("viewSwitch", [{"fromView": currentView, "toView": "editor"}]);
    currentView = "editor";
  }

  view.switchToMyinput = function () {
    if (currentView == "myinput") return;

    $(".navbar-nav > li.active").removeClass();

    $("html").trigger("viewSwitch", [{"fromView": currentView, "toView": "myinput"}]);
    currentView = "myinput";
  }

  view.switchToPopinput = function () {
    if (currentView == "popinput") return;

    $(".navbar-nav > li.active").removeClass();
    $("#popularinput").parent().addClass("active");

    $("html").trigger("viewSwitch", [{"fromView": currentView, "toView": "popinput"}]);
    currentView = "popinput";
  }

  view.udpateLoginRegion = function (name) {
    $("span#profile").html("Welcome, " + name + "!");
    $("#login").css("display", "none");
    $("#afterlogin").css("display", "");
  }

  $(window).resize(function() {
    setHeights();
  });
} (window.view = window.view || {}, jQuery));