var Range = function (lower, upper, undefined) {
  var
  _lower = lower,
  _upper = upper,
  
  _lowerInput = new Input('int', function (text) {
    _lower = parseInt(text, 10);
  }),
  _upperInput = new Input('int', function (text) {
    _upper = parseInt(text, 10);
  });

  return {
    lower: _lower,
    upper: _upper
  }
}