(function (dataSession, $, undefined) {
  dataSession.input = [];
  dataSession.data = [];

  dataSession.add = function () {
    
  }

  dataSession.init = function () {
    dataSession.input = [];
    dataSession.data = [];

    $("html").trigger("sessionUpdate", [{"opcode": "clear"}]);
  }
} (window.dataSession = window.dataSession || {}, jQuery));