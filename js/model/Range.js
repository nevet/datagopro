var Range = function (parent, inputType, lowerInit, upperInit, undefined) {
  var
  _parent = parent,
  _lower = lowerInit,
  _upper = upperInit,
  _lowerInput = undefined,
  _upperInput = undefined,
  _tableInput = undefined;

  var
  dispose = function () {
    view.removeElement(_lowerInput);
    view.removeElement(_upperInput);
  },

  dump = function () {
    console.log(_lowerInput);
    console.log(_lower);
  };

  (function () {
    if (inputType == "int") {
      _lowerInput = new Input(_parent, "int", "min", function (text) {
        _lower = text;
        console.log(_lower);
      }),
      _upperInput = new Input(_parent, "int", "max", function (text) {
        _upper = text;
        console.log(_upper);
      });
    } else
    if (inputType == "table") {
      // display a table input here
    }
  }) ();

  return {
    lower: function () { return _lower; },
    upper: function () { return _upper; },
    dispose: dispose,
    dump: dump
  }
}