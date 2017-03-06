"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Prototype pour la création de plugins jQuery
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Yannick Bochatay
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plugin = function () {
    function Plugin() {
        _classCallCheck(this, Plugin);
    }

    _createClass(Plugin, [{
        key: "set",
        value: function set(options) {

            if (!_jquery2.default.isPlainObject(options)) throw new Error("l'argument de la méthode set n'est pas un objet conforme");

            for (var n in options) {
                if (n in this) this[n] = options[n];
            }
        }
    }]);

    return Plugin;
}();

/**
 * Transforme le constructeur en plugin jQuery
 * @param {Object} Constructor Objet constructeur à binder
 * @returns {Object} le plugin jQuery
 */


exports.default = Plugin;
Plugin.bind2jQuery = function (Constructor) {
    var $ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _jquery2.default;


    var name = Constructor.name.charAt(0).toLowerCase() + Constructor.name.slice(1);
    var dataName = "yb." + name;

    function checkMethod(methode) {

        return typeof methode == "string" && methode in Constructor.prototype && methode.charAt(0) !== "_";
    }

    $.fn[name] = function execPluginMethod() {

        var methode = void 0,
            options = void 0;

        if ($.isPlainObject(arguments.length <= 0 ? undefined : arguments[0]) || (arguments.length <= 0 ? undefined : arguments[0]) == null) {

            methode = "enable";
            options = arguments.length <= 0 ? undefined : arguments[0];
        } else {

            methode = arguments.length <= 0 ? undefined : arguments[0];
            options = arguments.length <= 1 ? undefined : arguments[1];
        }

        if (!checkMethod(methode)) throw new Error(methode + " : méthode incorrecte");

        return this.each(function applyMethod() {

            var $this = $(this);
            var data = $this.data(dataName);

            if (!data) {

                data = new Constructor(this);
                $this.data(dataName, data);
            }

            data[methode](options);
        });
    };

    $.fn[name].constructor = Constructor;

    return $.fn[name];
};