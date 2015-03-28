var Input = function (inputType, inputFinish, undefined) {
  var
  _textBox = undefined,
  _type = "",
  _backRefId = -1,
  _text = "",

  inputChangedHandler = function (curText, curBackRef) {
    if (curBackRef) {
      _backRefId = curBackRef;
    } else {
      _text = curText;
    }
  },

  inputFinishHandler = function () {
    if (_type == 'int') {
      inputFinish(parseInt(_text, 10));
    } else
    if (_type == 'float') {
      inputFinish(parseFloat(_text));
    }
  };

  (function (inputType) {
    _type = inputType;

    _textBox = view.addInputBox(_type, inputChangedHandler, inputFinishHandler);
  }) ();

  return {
    type: _type,
    text: _text,
    backRefId: _backRefId
  }
}