function findWithKey(f, ls) {
  return ls.find(item => f(item[0]));
}

function assoc(pairs) {
  if (!(this instanceof assoc)) {
    return new assoc(pairs);
  }
  this.v = pairs || [];
  return this;
}

assoc.empty = function() {
  return assoc([]);
};

assoc.prototype.keys = function() {
  return this.v.map(pair => pair[0]);
};

assoc.prototype.values = function() {
  return this.v.map(pair => pair[1]);
};

assoc.prototype.isEmpty = function() {
  return this.v.length == 0;
};

assoc.prototype.set = function(key, value) {
  var s = findWithKey((k, v) => k == key, this.v);
  s && this.update(key, () => value);
  !s && this.v.push([key, value]);
  return this;
};

assoc.prototype.get = function(key) {
  var s = findWithKey((k, v) => k == key, this.v);
  return s ? s[1] : null;
};

assoc.prototype.mapWithKey = function(f) {
  return assoc(this.v.map(
    value => [value[0], f.apply(null, value)]
  ));
};

assoc.prototype.reduce = function(f, initialState) {
  return this.v.reduce(f, initialState);
};

assoc.prototype.concat = function(m) {
  return assoc(this.v.concat(m.v));
};

assoc.prototype.partition = function(f) {
  return this.v.reduce((acc, value) => {
    acc[f.call(null, value[1]) ? 0 : 1].set(value[0], value[1]);
    return acc;
  }, [assoc.empty(), assoc.empty()]);
};

assoc.prototype.partitionWithKey = function(f) {
  return this.v.reduce((acc, value) => {
    acc[f.apply(null, value) ? 0 : 1].set(value[0], value[1]);
    return acc;
  }, [assoc.empty(), assoc.empty()]);
};

assoc.prototype.filter = function(f) {
  return assoc(this.v.filter(value => f(value[1])));
};

assoc.prototype.filterWithKey = function(f) {
  return assoc(this.v.filter(value => f.apply(null, value)));
};

assoc.prototype.find = function(f) {
  var i = this.v.find(f);
  return i ? i[1] : null;
};

assoc.prototype.update = function(key, f) {
  return assoc(this.v.map(pair => {
    if (key == pair[0]) {
      pair[1] = f(pair[1]);
    }
    return pair;
  }));
};

assoc.prototype.updateWithKey = function(key, f) {
  return assoc(this.v.map(pair => {
    if (key == pair[0]) {
      pair[1] = f.apply(null, pair);
    }
    return pair;
  }));
};

export default assoc;
