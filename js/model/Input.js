var Input = function (parent, inputType, inputFinish, undefined) {
  var
  _parent = parent,
  _textBox = undefined,
  _type = inputType,
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

  var
  dispose = function () {
    view.removeElement(_textBox);
  };

  (function (inputType) {
    _type = inputType;

    _textBox = view.addInput(_parent, _type, 
                             inputChangedHandler, inputFinishHandler);
  }) ();

  return {
    type: _type,
    text: _text,
    backRefId: _backRefId,
    dispose: dispose
  }
}