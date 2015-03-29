var Block = function (id, type, undefined) {
  var
  _block = undefined,
  _blockId = id,
  _type = type,
  _succ = undefined,
  _number = undefined;

  (function () {
    // ignore dummy head
    if (_blockId != -1) {
      _block = view.addRow(_blockId);
    }

    if (type == "number") {
      _number = new NumberType(_block, "dec");
    }
  }) ();

  return {
    id: _blockId,
    succ: _succ
  }
}