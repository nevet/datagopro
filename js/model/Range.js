var Range = function (parent, displayMode, lower, upper, undefined) {
  var
  _parent = parent,
  _lower = lower,
  _upper = upper,
  _lowerInput = undefined,
  _upperInput = undefined,
  _tableInput = undefined;

  var
  dispose = function () {
    view.removeElement(_lowerInput);
    view.removeElement(_upperInput);
  };

  (function () {
    if (displayMode == "text") {
      _lowerInput = new Input(_parent, 'int', function (text) {
        _lower = text;
      }),
      _upperInput = new Input(_parent, 'int', function (text) {
        _upper = text;
      });
    } else
    if (displayMode == "table") {
      // display a table input here
    }
  }) ();

  return {
    lower: _lower,
    upper: _upper,
    dispose: dispose
  }
}