/**
 * Affichage d'un élément pour revenir en haut de page
 * @author Yannick Bochatay
 */

import $ from "jquery"
import Plugin from "../src"

class BackToTop extends Plugin {

  constructor(el, opt) {

    super()

    this.checkScroll = this.checkScroll.bind(this)
    this.backToTop = this.backToTop.bind(this)

    this.$el = $(el)

    this.displayPoint = 300

    this.content = window

    if (opt) this.set(opt)

  }

  /**
   * Retour en haut de page
   * @returns {undefined}
   */
  backToTop() {

    $(this.content === window ? "html,body" : this.content).animate({ scrollTop : 0 }, 300)

  }

  /**
   * Teste si on a dépassé le point d'affichage de l'élément
   * @returns {Boolean} true si point dépassé
   */
  isScrolled() {

    return $(this.content).scrollTop() > this.displayPoint

  }
  /**
   * Affiche ou masque l'élément en fonction du scroll
   * @returns {undefined}
   */
  checkScroll() {

    this.$el["fade" + (this.isScrolled() ? "In" : "Out")]()

  }
  /**
   * Active le plugin
   * @returns {undefined}
   */
  enable() {

    $(this.content).on("scroll", this.checkScroll)

    this.$el.on("click", this.backToTop)

    this.$el[this.isScrolled() ? "show" : "hide"]()

  }
  /**
   * Désactive le plugin
   * @returns {undefined}
   */
  destroy() {

    $(this.content).off("scroll", this.checkScroll)

    this.$el.off("click", this.backToTop)

  }

}


// transformation du constructeur en plugin jQuery
export default Plugin.bind2jQuery(BackToTop)
