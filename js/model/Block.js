var Block = function (id, undefined) {
  var
  _block = undefined,
  _blockId = id,
  _type = undefined,
  _succ = undefined,
  _inner = undefined,
  _primitive = undefined,
  _repeat = undefined; // this one need to be implemented!!!

  var dispose = function () {
    if (_primitive && _primitive.dispose) {
      _primitive.dispose();
    }

    if (_block) {
      view.removeElement(_block);
    }
  },

  dump = function () {
    _primitive.dump();
  },

  setSucc = function (nextBlk) {
    _succ = nextBlk;
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
    inner: function () { return _inner; },
    succ: function () { return _succ; },
    dispose: dispose,
    dump: dump,
    setSucc: setSucc
  }
}