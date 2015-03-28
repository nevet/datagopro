var NumberType = function (undefined) {
  var
  _type = "",
  _range = new Range(),
  _precision = undefined,
  _precisionInput = undefined;

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
    lower: _range.lower
  }
}