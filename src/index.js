/**
 * Prototype pour la création de plugins jQuery
 * @author Yannick Bochatay
 */

import $ from "jquery"

export default class Plugin {

  set(options) {

    if (!$.isPlainObject(options) ) throw new Error("l'argument de la méthode set n'est pas un objet conforme")

    for (const n in options) if (n in this) this[n] = options[n]

  }

}

/**
 * Transforme le constructeur en plugin jQuery
 * @param {Object} Constructor Objet constructeur à binder
 * @returns {Object} le plugin jQuery
 */
Plugin.bind2jQuery = (Constructor) => {

  const name = Constructor.name.charAt(0).toLowerCase() + Constructor.name.slice(1)
  const dataName = "yb." + name

  function checkMethod(methode) {

    return typeof methode == "string" && methode in Constructor.prototype && methode.charAt(0) !== "_"

  }

  $.fn[name] = function execPluginMethod(...args) {

    let methode, options

    if ($.isPlainObject(args[0] ) || args[0] == null) {

      methode = "enable"
      options = args[0]

    } else {

      methode = args[0]
      options = args[1]

    }

    if (!checkMethod(methode) ) throw new Error(methode + " : méthode incorrecte")

    return this.each(function applyMethod() {

      const $this = $(this)
      let data = $this.data(dataName)

      if (!data) {

        data = new Constructor(this)
        $this.data(dataName, data)

      }

      data[methode](options)

    })

  }

  $.fn[name].constructor = Constructor

  return $.fn[name]

}

