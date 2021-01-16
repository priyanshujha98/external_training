"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _validate = new WeakSet();

var Task = /*#__PURE__*/function () {
  function Task() {
    _classCallCheck(this, Task);

    _validate.add(this);

    this.url = 'https://apiapptrainingnewapp.azurewebsites.net/api/Products';
  }

  _createClass(Task, [{
    key: "postData",
    value: function postData(data) {
      var _this = this;

      try {
        _classPrivateMethodGet(this, _validate, _validate2).call(this, data);
      } catch (err) {
        alert(err);
        throw new Error(err);
      }

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();

        req.onload = function () {
          if (req.status == 201) {
            resolve(req.response);
          } else {
            reject(req.statusText);
          }
        };

        req.onerror = function () {
          reject(req.statusText);
        };

        req.open('POST', _this.url);
        req.setRequestHeader("Content-Type", "application/json");
        delete data.ProductRowId;
        console.log(JSON.stringify(data));
        req.send(JSON.stringify(data));
      });
    }
  }, {
    key: "getData",
    value: function getData() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();

        req.onload = function () {
          if (req.status == 200) {
            console.log('Successful');
            resolve(req.response);
          } else {
            reject(req.statusText);
          }
        };

        req.onerror = function () {
          reject(re.statusText);
        };

        req.open('GET', _this2.url);
        req.send();
      });
    }
  }, {
    key: "putData",
    value: function putData(data) {
      var _this3 = this;

      try {
        _classPrivateMethodGet(this, _validate, _validate2).call(this, data);

        console.log('Good');
      } catch (err) {
        alert(err);
        throw new Error(err);
      }

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();

        req.onload = function () {
          resolve(req.response);
        };

        req.onerror = function () {
          reject(req.statusText);
        };

        req.open('PUT', _this3.url + "/".concat(data['ProductRowId']), true);
        req.setRequestHeader("Content-Type", "application/json");
        console.log(JSON.stringify(data));
        req.send(JSON.stringify(data));
      });
    }
  }, {
    key: "deleteData",
    value: function deleteData(data) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();

        req.onload = function () {
          resolve(req.response);
        };

        req.onerror = function () {
          reject(req.statusText);
        };

        req.open('DELETE', _this4.url + "/".concat(data['ProductRowId']));
        req.send();
      });
    }
  }]);

  return Task;
}();

var _validate2 = function _validate2(validateDdata) {
  var _this5 = this;

  var data = {
    ProductRowId: '',
    ProductId: '',
    ProductName: '',
    CategoryName: '',
    Manufacturer: '',
    Description: '',
    BasePrice: 0
  };
  var flag = true;
  this.pxy = new Proxy(data, {
    set: function set(target, prop, value) {
      if (value.length > 0 || value > 0 || prop == 'ProductRowId') {
        flag = true;

        if (prop == 'ProductId' && value.toLowerCase().match(/[a-z]/i)) {
          flag = true;
          target[prop] = value;
        } else if (prop == 'ProductName' && value.length < 30) {
          flag = true;
          target[prop] = value;
        } else if (prop == 'BasePrice' && typeof value == 'number') {
          flag = true;
          target[prop] = value;
        } else if (prop == 'Manufacturer' || prop == 'Description' || prop == 'CategoryName' || prop == 'ProductRowId') {
          target[prop] = value;
          flag = true;
        } else {
          flag = false;
        }
      } else {
        flag = false;
      }

      if (flag) {
        return flag;
      }
    }
  });
  Object.keys(validateDdata).forEach(function (v, i) {
    _this5.pxy[v] = validateDdata[v];
  });
};

window.addEventListener('load', function () {
  var testVariable = new Task();
  document.getElementById('get_items').addEventListener('click', function () {
    document.getElementById('data').innerHTML = '';
    document.getElementById('loadingImg').style.display = '';
    testVariable.getData().then(function (sucess) {
      sucess = JSON.parse(sucess);
      sucess = sucess.reverse();
      var th = '';
      sucess.forEach(function (v, i) {
        th += "<tr id=".concat(v['ProductRowId'], ">");
        Object.keys(v).forEach(function (v2, i2) {
          th += "<td>".concat(v[v2], "</td>");
        });
        th += "</tr>";
      });
      document.getElementById('data').innerHTML = th;
      document.getElementById('loadingImg').style.display = 'none';
    })["catch"](function (err) {
      alert("Error : ".concat(err));
      document.getElementById('loadingImg').style.display = 'none';
    });
  });
  document.getElementById('Update_Input_Delete').addEventListener('click', function (event) {
    var prdData = {};

    var _iterator = _createForOfIteratorHelper(document.getElementsByTagName('input')),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var x = _step.value;

        if (x.id == 'BasePrice') {
          prdData[x.id] = parseInt(x.value);
        } else {
          prdData[x.id] = x.value;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    console.log(prdData);

    if (event.srcElement.value == 'inp') {
      testVariable.postData(prdData).then(function (success) {
        document.getElementById('get_items').click();
      })["catch"](function (err) {
        alert("POST of data is Uncessfull due to error : ".concat(err));
      });
    } else if (event.srcElement.value == 'update') {
      testVariable.putData(prdData).then(function (success) {
        document.getElementById('get_items').click();
      })["catch"](function (err) {
        alert("Update of data is Uncessfull due to error : ".concat(err));
      });
    } else if (event.srcElement.value == 'del') {
      testVariable.deleteData(prdData).then(function (success) {
        document.getElementById('get_items').click();
      })["catch"](function (err) {
        alert("Delete of data is Uncessfull due to error : ".concat(err));
      });
    }
  });
  document.getElementById('selectOption').addEventListener('change', function () {
    var _iterator2 = _createForOfIteratorHelper(document.getElementsByTagName('input')),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _x = _step2.value;
        _x.disabled = false;
        _x.value = '';
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    if (document.getElementById('selectOption').value == 'input') {
      document.getElementById('ProductRowId').disabled = true;
      document.getElementById('Update_Input_Delete').value = 'inp';
      document.getElementById('Update_Input_Delete').innerHTML = 'Input Data';
    } else if (document.getElementById('selectOption').value == 'update') {
      document.getElementById('ProductRowId').disabled = false;
      document.getElementById('Update_Input_Delete').value = 'update';
      document.getElementById('Update_Input_Delete').innerHTML = 'Update Data';
    } else if (document.getElementById('selectOption').value == 'del') {
      var _iterator3 = _createForOfIteratorHelper(document.getElementsByTagName('input')),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var x = _step3.value;
          x.disabled = true;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      document.getElementById('ProductRowId').disabled = false;
      document.getElementById('Update_Input_Delete').value = 'del';
      document.getElementById('Update_Input_Delete').innerHTML = 'Delete Data';
    }
  });
  document.getElementById('ProductRowId').addEventListener('change', function () {
    setValue(document.getElementById('ProductRowId').value);
  });

  function setValue(id) {
    document.getElementById('ProductRowId').value = document.getElementById(id).querySelectorAll('td')[0].innerHTML;
    document.getElementById('ProductId').value = document.getElementById(id).querySelectorAll('td')[1].innerHTML;
    document.getElementById('ProductName').value = document.getElementById(id).querySelectorAll('td')[2].innerHTML;
    document.getElementById('CategoryName').value = document.getElementById(id).querySelectorAll('td')[3].innerHTML;
    document.getElementById('Manufacturer').value = document.getElementById(id).querySelectorAll('td')[4].innerHTML;
    document.getElementById('Description').value = document.getElementById(id).querySelectorAll('td')[5].innerHTML;
    document.getElementById('BasePrice').value = document.getElementById(id).querySelectorAll('td')[6].innerHTML;
  }
});
