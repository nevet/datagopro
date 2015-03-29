var Block = function (id, undefined) {
  var
  _block = undefined,
  _blockId = id,
  _type = undefined,
  _succ = undefined,
  _primitive = undefined,
  _repeat = undefined; // this one need to be implemented!!!

  var dispose = function () {
    if (_primitive && _primitive.dispose) {
      _primitive.dispose();
    }

    if (_block) {
      view.removeElement(_block);
    }
  };

  var dump = function () {
    if (_primitive.type() == "dec") {
      _primitive.dump();
    }
  };

  (function () {
    // ignore dummy head
    if (_blockId != -1) {
      _block = view.addRow(_blockId, function () {
        _type = _block.find("option:selected").text().toLowerCase();
        console.log(_type);

        // dispose previous type
        if (_primitive && _primitive.dispose) {
          _primitive.dispose();
        }

        if (_type == "number") {
          _primitive = new NumberType(_block, "dec");
        }
      });
    }
  }) ();

  return {
    id: function () { return _blockId; },
    succ: function () { return _succ; },
    primitive: function () { return _primitive; },
    repeat: function () { return _repeat; },
    dispose: dispose,
    dump: dump
  }
}