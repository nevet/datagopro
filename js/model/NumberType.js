var NumberType = function (type, undefined) {
  var
  _type = type,
  _range = new Range(),
  _precision = undefined,
  _precisionInput = undefined;

  var
  dispose = function () {
    _range.dispose();

    if (_precisionInput) {
      _precisionInput.dispose();
    }
  };

  (function () {
    if (_type == "float") {
      _precisionInput = new Input('float', function (data) {
        _precision = data;
      });
    }
  }) ();

  return {
    type: _type,
    precision: _precision,
    upper: _range.upper,
    lower: _range.lower,
    dispose: dispose
  }
}