(function (popinputView, $, undefined) {
  var popinput = $("#popular");

  function clearData() {
    popinput.html("");
  }

  function createPopularBlock(datasetName, createTime, tags, dataArray){
    //block wrap
    $("<div></div>", {
      "class": "popular-block",
      "click": function(e) {
        highlightSelectedBlock("#popular .popular-block", $(e.target).closest(".popular-block"));
      },
    }).appendTo("#populartable");

    //dataset name
    $("<h4></h4>", {
      "text": datasetName,
      "click": function(e) {
        e.stopPropagation();
        $(this).closest('.popular-block').trigger('click');
      },
    }).appendTo("#populartable > .popular-block:last");

    //tags
    $("<i></i>",{
      "class": "fa fa-tags fa-2x",
    }).appendTo("#populartable > .popular-block:last");

    for (var i=0; i < tags.length; i++){
      $("<span></span>", {
      "class": "label-size",
      }).appendTo("#populartable > .popular-block:last");

      $("<a></a>", {
        "text": tags[i],
        "click": function(e) {
          e.stopPropagation();
        },
      }).appendTo("#populartable > .popular-block:last .label-size:last");
    }

    //clone
    $("<a></a>",{
      "class":"clone",
      "data-target": "1",
      "text": "Clone",
      "click": function(e){
        e.stopPropagation();
        e.preventDefault();
        var curBlock = $(e.target).parents(".popular-block");
        var curIndex = curBlock.parent().find(".popular-block").index(curBlock);
        cloneDataSet(e, curIndex);
      },
    }).appendTo("#populartable > .popular-block:last");

    $("<i></i>", {
      "class": "fa fa-pencil",
    }).appendTo("#populartable > .popular-block:last .clone:last");

    //view
    $("<a></a>",{
      "class":"view",
      "data-target": "1",
      "text": "View",
      "click": function(e) {
        e.stopPropagation();
        e.preventDefault();
        var curBlock = $(e.target).parents(".popular-block");
        var curIndex = curBlock.parent().find(".popular-block").index(curBlock);
        viewDataSet(e, curIndex);
      },
    }).appendTo("#populartable > .popular-block:last");

    $("<i></i>", {
      "class": "fa fa-eye",
    }).appendTo("#populartable > .popular-block:last .view:last");
  }

  function createPopular() {
    $.get("/api/datasession.php", {"cmd": "retrievePInp"}, function (res) {
      var data = JSON.parse(res);

      alldata = data.data;

      for (var i = 0; i < alldata.length; i ++) {

        var input = alldata[i].input.replace(/(?:&quot;)/g, '\"');
        // console.log(input);
        input = JSON.parse(input);
        alldata[i].input = input;
        // console.log(input);
        createPopularBlock(alldata[i].setname, alldata[i].date, alldata[i].tag, input);
      }
    });
  }

  function highlightSelectedBlock(container, block){
    if($(block).hasClass("selected")) {
      $(block).removeClass("selected");
    }
    else {
      var prev = $(container+".selected");
      prev.removeClass("selected");
      $(block).addClass("selected");
    }
  }

  $("html").on("viewSwitch", function (event, res) {
    if (res.fromView == "popinput") {
      popinput.css("display", "none");
    }

    if (res.toView == "popinput") {
      popinput.css("display", "block");
      clearData();
      createPopular();
    }
  });
} (window.popinputView = window.popinputView || {}, jQuery));