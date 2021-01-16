"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.addEventListener('load', function () {
  var product = new Map();
  var search_result = new Map();
  product.set(1, {
    "ProductName": 'Test Name',
    "CategoryName": 'Test Category',
    "Manufacturer": 'Test Manufacturer',
    "Description": 'Test Description',
    "BasePrice": "154"
  });
  display_map(product);
  generate_category_selection();
  document.getElementById('get_items').addEventListener('click', function () {
    display_map(product);
  });
  document.getElementById('Update_Input_Delete').addEventListener('click', function (event) {
    var data = document.getElementsByTagName('input');

    try {
      if (document.getElementById('selectOption').value == 'input') {
        var p_id = '';
        var temp = {};

        var _iterator = _createForOfIteratorHelper(data),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var x = _step.value;

            if (x.id != 'ProductId' && x.id != 's_r' && x.id != 's_r1' && x.id != 'Search') {
              if (x.id == 'BasePrice') {
                temp[x.id] = parseFloat(x.value);
              } else {
                temp[x.id] = x.value;
              }
            } else if (x.id == 'ProductId' && x.id != 's_r' && x.id != 's_r1' && x.id != 'Search') {
              if (!product.has(x.value)) {
                p_id = x.value;
                temp = {};
              } else {
                throw new Error('Product ALready Exiists');
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        product.set(p_id, temp);
      } else if (document.getElementById('selectOption').value == 'update') {
        var _p_id = '';
        var _temp = {};

        var _iterator2 = _createForOfIteratorHelper(data),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _x = _step2.value;

            if (_x.id != 'ProductId' && _x.id != 's_r' && _x.id != 's_r1' && _x.id != 'Search') {
              if (_x.id == 'BasePrice') {
                _temp[_x.id] = parseFloat(_x.value);
              } else {
                _temp[_x.id] = _x.value;
              }
            } else if (_x.id == 'ProductId' && _x.id != 's_r' && _x.id != 's_r1' && _x.id != 'Search') {
              if (product.has(_x.value)) {
                _p_id = _x.value;
                _temp = {};
              } else {
                throw new Error('Product Does not Exiists');
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        product.set(_p_id, _temp);
      } else if (document.getElementById('selectOption').value == 'del') {
        product["delete"](document.getElementById('ProductId').value);
      }

      display_map(product);
    } catch (err) {
      alert(err);
    }
  });
  document.getElementById('ProductId').addEventListener('change', function () {
    if (document.getElementById('selectOption').value == 'update' || document.getElementById('selectOption').value == 'del') {
      product.forEach(function (v, i) {
        if (document.getElementById('ProductId').value == i) {
          Object.keys(v).forEach(function (v2, i2) {
            document.getElementById(v2).value = v[v2];
          });
        }
      });
    }
  });
  document.getElementById('selectOption').addEventListener('change', function () {
    var _iterator3 = _createForOfIteratorHelper(document.getElementsByTagName('input')),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var x = _step3.value;

        if (x.id != 'Search') {
          x.value = '';
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    document.getElementById('Update_Input_Delete').innerHTML = document.getElementById('selectOption').value + ' Data';
  });
  document.getElementById('searchit').addEventListener('click', function () {
    var search_text = document.getElementById('Search').value;
    var search_category = document.getElementById('selector').value;
    search_result.clear();
    product.forEach(function (v, i) {
      Object.keys(v).forEach(function (v2, i2) {
        if (v2 != 'BasePrice') {
          if (v2 == search_category && v[v2].includes(search_text)) {
            search_result.set(i, v);
          }
        } else {
          if (v2 == search_category && v[v2] == parseFloat(search_text)) {
            search_result.set(i, v);
          }
        }
      });
    });
    display_map(search_result);
  });
  var counter = 0;
  document.getElementById('s_r').addEventListener('click', function (event) {
    if (counter == 1) {
      document.getElementById('s_r').checked = false;
      counter = 0;

      if (search_result.size > 0) {
        display_map(search_result);
      } else {
        display_map(product);
      }
    } else {
      document.getElementById('s_r').checked = true;
      counter = 1;
      var temp;

      if (search_result.size > 0) {
        temp = search_result;
      } else {
        temp = product;
      }

      var arr = [];
      temp.forEach(function (v, i) {
        Object.keys(v).forEach(function (v2, i2) {
          if (v2 == document.getElementById('selector').value) {
            if (v2 == 'BasePrice') {
              arr.push(parseFloat(v[v2]));
            } else {
              arr.push(v[v2]);
            }
          }
        });
      });
      arr = arr.sort();
      var s_map = new Map();
      arr.forEach(function (v, i) {
        temp.forEach(function (v2, i2) {
          Object.keys(v2).forEach(function (v3, i3) {
            if (v3 == document.getElementById('selector').value && v2[v3] == v && !s_map.has(i2)) {
              s_map.set(i2, v2);
            }
          });
        });
      });
      display_map(s_map);
    }
  });
  var reve_counter = 0;
  document.getElementById('s_r1').addEventListener('click', function (event) {
    if (reve_counter == 1) {
      document.getElementById('s_r1').checked = false;
      reve_counter = 0;

      if (search_result.size > 0) {
        display_map(search_result);
      } else {
        display_map(product);
      }
    } else {
      document.getElementById('s_r1').checked = true;
      reve_counter = 1;
      var temp;

      if (search_result.size > 0) {
        temp = search_result;
      } else {
        temp = product;
      }

      var arr = [];
      temp.forEach(function (v, i) {
        Object.keys(v).forEach(function (v2, i2) {
          if (v2 == document.getElementById('selector').value) {
            if (v2 == 'BasePrice') {
              arr.push(parseFloat(v[v2]));
            } else {
              arr.push(v[v2]);
            }
          }
        });
      });
      arr = arr.reverse();
      var r_map = new Map();
      arr.forEach(function (v, i) {
        temp.forEach(function (v2, i2) {
          Object.keys(v2).forEach(function (v3, i3) {
            if (v3 == document.getElementById('selector').value && v2[v3] == v && !r_map.has(i2)) {
              r_map.set(i2, v2);
            }
          });
        });
      });
      display_map(r_map);
    }
  });

  function display_map(incomingdata) {
    document.getElementById('loadingImg').style.display = '';
    var th = '';
    incomingdata.forEach(function (v, i) {
      th += "<tr><td>".concat(i, "</td>");
      Object.keys(v).forEach(function (v2, i2) {
        th += "<td>".concat(v[v2], "</td>");
      });
      th += "</tr>";
    });
    document.getElementById('data').innerHTML = th;
    document.getElementById('loadingImg').style.display = 'none';
  }

  function generate_category_selection() {
    var temp = '';

    var _iterator4 = _createForOfIteratorHelper(document.getElementsByTagName('input')),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var x = _step4.value;

        if (x.id != 'Search' && x.id != 'ProductId' && x.id != 's_r' && x.id != 's_r1') {
          temp += "<option value=".concat(x.id, ">").concat(x.id, "</option>");
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    document.getElementById('selector').innerHTML = temp;
  }
});
