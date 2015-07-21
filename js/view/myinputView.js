(function (myinputView, $, undefined) {
  var myinput = $("#timeline");

  function clearData() {
    myinput.html("");
  }

  function createTimelineBlock(datasetName, createTime, tags, dataArray){
    //block wrap
    $("<div></div>", {
      "class": "timeline-block"
    }).appendTo("#timeline");

    //dot on timeline
    $("<div></div>", {
      "class": "timeline-dot"
    }).appendTo("#timeline .timeline-block:last");

    //content
    $("<div></div>", {
      "class": "timeline-content",
    }).appendTo("#timeline .timeline-block:last");

    //dataset name
    $("<h4></h4>", {
      "text": datasetName,
      "click": function(e) {
        e.stopPropagation();
        $(this).closest('.timeline-content').trigger('click');
      },
    }).appendTo("#timeline > .timeline-block:last > .timeline-content");

    //created time
    $("<p></p>", {
      "html": createTime,
      "click": function(e) {
        e.stopPropagation();
        $(this).closest('.timeline-content').trigger('click');
      },
    }).appendTo("#timeline > .timeline-block:last > .timeline-content");

    //tags
    $("<i></i>",{
      "class": "fa fa-tags fa-2x",
    }).appendTo("#timeline > .timeline-block:last > .timeline-content");

    for (var i=0; i < tags.length; i++){
      $("<span></span>", {
        "class": "label-size",
      }).appendTo("#timeline > .timeline-block:last > .timeline-content");

      $("<a></a>", {
        "text": tags[i],
        "click": function(e) {
          e.stopPropagation();
        },
      }).appendTo("#timeline > .timeline-block:last .label-size:last");
    }

    //clone
    $("<a></a>",{
      "class":"clone",
      "data-target": "1",
      "text": "Clone",
      "click": function(e){
        e.stopPropagation();
        e.preventDefault();
        var curBlock = $(e.target).parents(".timeline-block");
        var curIndex = curBlock.parent().find(".timeline-block").index(curBlock);
        cloneDataSet(e, curIndex);
      },
    }).appendTo("#timeline > .timeline-block:last > .timeline-content");

    $("<i></i>", {
      "class": "fa fa-pencil",
    }).appendTo("#timeline > .timeline-block:last .clone:last");

    //view
    $("<a></a>",{
      "class":"view",
      "data-target": "1",
      "text": "View",
      "click": function(e) {
        e.stopPropagation();
        e.preventDefault();
        var curBlock = $(e.target).parents(".timeline-block");
        var curIndex = curBlock.parent().find(".timeline-block").index(curBlock);
        viewDataSet(e, curIndex);
      }
    }).appendTo("#timeline > .timeline-block:last > .timeline-content");

    $("<i></i>", {
      "class": "fa fa-eye",
    }).appendTo("#timeline > .timeline-block:last .view:last");
  }

  function createTimeLine() {
    user.getAllDataset(function (data) {
      for (var i = 0; i < data.length; i ++) {
        createTimelineBlock(data[i].setname, data[i].date, data[i].tag, data[i].input);
      }
    });
  }

  myinputView.highlightSelectedBlock = function (block) {
    var container = "#timeline .timeline-content";

    if($(block).hasClass("selected")) {
      $(block).removeClass("selected");
    } else {
      var prev = $(container+".selected");

      prev.removeClass("selected");
      $(block).addClass("selected");
    }
  }

  $("html").on("viewSwitch", function (event, res) {
    if (res.fromView == "myinput") {
      myinput.css("display", "none");
    }

    if (res.toView == "myinput") {
      myinput.css("display", "block");
      clearData();
      createTimeLine();
    }
  });
} (window.myinputView = window.myinputView || {}, jQuery));