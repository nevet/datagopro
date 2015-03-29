var NumberType = function (parent, type, undefined) {
  var
  _type = type,
  _range = new Range(parent, "int"),
  _precision = undefined,
  _precisionInput = undefined;

  var
  dispose = function () {
    _range.dispose();

    if (_precisionInput) {
      _precisionInput.dispose();
    }
  },

  dump = function () {
    console.log(_range.lower());
    _range.dump();
  };

  (function () {
    if (_type == "float") {
      _precisionInput = new Input('float', function (data) {
        _precision = data;
      });
    }
  }) ();

  return {
    type: function () { return _type; },
    precision: function () { return _precision; },
    upper: function () { return _range.upper(); },
    lower: function () { return _range.lower(); },
    dispose: dispose,
    dump: dump
  }
}