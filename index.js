
/*!
 *
 * vector3
 *
 * MIT licensed.
 *
 */

/**
 * Expose `Vector`.
 */

module.exports = Vector;

/**
 * Vector.
 *
 * @param {Number|Vector} x
 * @param {Number} [y]
 * @param {Number} [z]
 * @api public
 */

function Vector(x, y, z){
  if (!(this instanceof Vector)) return new Vector(x, y, z);
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.set(x, y, z);
}

/**
 * Proto.
 */

var V = Vector.prototype = {};

/**
 * Set Vector elements.
 *
 * @param {Number|Vector} x
 * @param {Number} [y]
 * @param {Number} [z]
 * @return {Vector} this
 */

V.set = function(x, y, z){
  if (x instanceof Vector) {
    this.x = x.x;
    this.y = x.y;
    this.z = x.z;
  }
  else {
    if (null == y) {
      this.z =
      this.y =
      this.x = x || 0;
    }
    else if (null == z) {
      this.z = this.y = y;
      this.x = x;
    }
    else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }
  return this;
};

/**
 * Add A + B.
 *
 * @param {Vector} v
 * @return {Vector}
 * @api public
 */

V.add = function(v){
  return new Vector(
    this.x + v.x,
    this.y + v.y,
    this.z + v.z
  );
};

/**
 * Add A += B.
 *
 * @param {Vector} v
 * @return {Vector} this
 * @api public
 */

V.madd = function(v){
  this.x += v.x;
  this.y += v.y;
  this.z += v.z;
  return this;
};

/**
 * Subtract A - B.
 *
 * @param {Vector} v
 * @return {Vector}
 * @api public
 */

V.sub = function(v){
  return new Vector(
    this.x - v.x,
    this.y - v.y,
    this.z - v.z
  );
};

/**
 * Subtract A -= B.
 *
 * @param {Vector} v
 * @return {Vector} this
 * @api public
 */

V.msub = function(v){
  this.x -= v.x;
  this.y -= v.y;
  this.z -= v.z;
  return this;
};

/**
 * Multiply A * B.
 *
 * @param {Vector} v
 * @return {Vector}
 * @api public
 */

V.mul = function(v){
  return new Vector(
    this.x * v.x,
    this.y * v.y,
    this.z * v.z
  );
};

/**
 * Multiply A *= B.
 *
 * @param {Vector} v
 * @return {Vector} this
 * @api public
 */

V.mmul = function(v){
  this.x *= v.x;
  this.y *= v.y;
  this.z *= v.z;
  return this;
};

/**
 * Divide A / B.
 *
 * @param {Vector} v
 * @return {Vector}
 * @api public
 */

V.div = function(v){
  return new Vector(
    this.x / v.x,
    this.y / v.y,
    this.z / v.z
  );
};

/**
 * Divide A /= B.
 *
 * @param {Vector} v
 * @return {Vector} this
 * @api public
 */

V.mdiv = function(v){
  this.x /= v.x;
  this.y /= v.y;
  this.z /= v.z;
  return this;
};

/**
 * Clone.
 *
 * @return {Vector}
 * @api public
 */

V.clone = function(){
  return new Vector(this);
};

/**
 * Copy elements to `v`.
 *
 * @param {Vector} v
 * @return {Vector} v
 */

V.copyTo = function(v){
  v.x = this.x;
  v.y = this.y;
  v.z = this.z;
  return v;
};

/**
 * Dot product.
 *
 * @param {Vector} [v]
 * @return {Number}
 * @api public
 */

V.dot = function(v){
  v = v || this;
  return (
    this.x * v.x +
    this.y * v.y +
    this.z * v.z
  );
};

/**
 * Cross product.
 *
 * @param {Vector} v
 * @return {Vector}
 * @api public
 */

V.cross = function(v){
  return new Vector(
    this.y * v.z - this.z * v.y,
    this.z * v.x - this.x * v.z,
    this.x * v.y - this.y * v.x
  );
};

/**
 * Magnitude.
 *
 * @return {Number}
 * @api public
 */

V.mag = function(){
  return Math.sqrt(this.dot());
};

/**
 * Normalize.
 *
 * @return {Vector}
 * @api public
 */

V.normalize = function(){
  return this.div(new Vector(this.mag()));
};

/**
 * Distance.
 *
 * @param {Vector} v
 * @return {Number}
 * @api public
 */

V.distance = function(v){
  return v.sub(this).mag();
};

/**
 * Theta.
 *
 * @return {Number}
 * @api public
 */

V.theta = function(){
  return Math.atan2(this.z, this.x);
};

/**
 * Phi.
 *
 * @return {Number}
 * @api public
 */

V.phi = function(){
  return Math.asin(this.y / this.mag());
};

/**
 * Angle against `v`.
 *
 * @param {Vector} v
 * @return {Number}
 * @api public
 */

V.angle = function(v){
  return Math.acos(this.normalize().dot(v.normalize()));
};

/**
 * Scale.
 *
 * @param {Number} scale
 * @return {Vector}
 */

V.scale = function(scale){
  var mag = this.mag();
  return new Vector(
    this.x * scale / mag,
    this.y * scale / mag,
    this.z * scale / mag
  );
};

/**
 * Absolute.
 *
 * @return {Vector}
 * @api public
 */

V.abs = function(){
  return new Vector(
    Math.abs(this.x),
    Math.abs(this.y),
    Math.abs(this.z)
  );
};

/**
 * Negate.
 *
 * @return {Vector}
 * @api public
 */

V.neg = function(){
  return new Vector(
    -this.x,
    -this.y,
    -this.z
  );
};

/**
 * Interpolate.
 *
 * @param {Vector} v
 * @param {Number} a
 * @return {Vector}
 * @api public
 */

V.lerp = function(v, a){
  return this.add(v.sub(this).mul(new Vector(a)));
};

/**
 * Examine if vectors are equal.
 *
 * @param {Vector} v
 * @return {Boolean}
 * @api public
 */

V.equals = function(v){
  return (
    this.x === v.x &&
    this.y === v.y &&
    this.z === v.z
  );
};

/**
 * Examine if A < B.
 *
 * @param {Vector} v
 * @return {Boolean}
 * @api public
 */

V.lt = function(v){
  return this.mag() < v.mag();
};

/**
 * Examine if A <= B.
 *
 * @param {Vector} v
 * @return {Boolean}
 * @api public
 */

V.lte = function(v){
  return this.mag() <= v.mag();
};

/**
 * Examine if A > B.
 *
 * @param {Vector} v
 * @return {Boolean}
 * @api public
 */

V.gt = function(v){
  return this.mag() > v.mag();
};

/**
 * Examine if A >= B.
 *
 * @param {Vector} v
 * @return {Boolean}
 * @api public
 */

V.gte = function(v){
  return this.mag() >= v.mag();
};

/**
 * Round elements.
 *
 * @return {Vector}
 * @api public
 */

V.round = function(){
  return new Vector(
    Math.round(this.x),
    Math.round(this.y),
    Math.round(this.z)
  );
};

/**
 * Cast to string.
 *
 * @return {String}
 * @api public
 */

V.toString = function(){
  return (
    this.x + ',' +
    this.y + ',' +
    this.z
  );
};

/**
 * Cast to fixed decimal points string.
 *
 * @return {String}
 * @api public
 */

V.toFixed = function(d){
  return (
    this.x.toFixed(d) + ',' +
    this.y.toFixed(d) + ',' +
    this.z.toFixed(d)
  );
};

/**
 * Inspect
 *
 * @return {String}
 * @api public
 */

V.inspect = function(){
  return '<Vector3D '
    + 'x: ' + this.x
    + 'y: ' + this.y
    + 'z: ' + this.z
    + '>';
};
