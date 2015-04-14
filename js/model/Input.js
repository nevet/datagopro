var Input = function (parent, inputType, cueWord, inputFinish, undefined) {
  var
  _type = inputType,
  _parent = parent,
  _textBox = undefined,
  _backRefId = -1,
  _text = "",

  inputFinishHandler = function () {
    // TODO: back reference needs to be taken into account
    // TODO: handle other input type: text, table
    _text = _textBox.find("input").val();

    if (_type == "int") {
      inputFinish(parseInt(_text, 10));
    } else
    if (_type == "float") {
      inputFinish(parseFloat(_text));
    }
  };

  var
  dispose = function () {
    view.removeElement(_textBox);
  };

  (function () {
    _type = inputType;

    if (inputType == "int") {
      _textBox = view.addInput(_parent, _type, cueWord, inputFinishHandler);
    }
  }) ();

  return {
    text: function () { return _text; },
    backRefId: function () { return _backRefId; },
    dispose: dispose
  }
}