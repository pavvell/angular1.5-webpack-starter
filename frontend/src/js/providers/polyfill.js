export default function polyfillProvider() {
  /* Polyfill for Element.prototype.matches */
  function elementMatches() {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function matchesFn(s) {
          const matches = (this.document || this.ownerDocument).querySelectorAll(s);
          let i = matches.length;

          while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line

          return i > -1;
        };
    }
  }

  /* Element.remove() */
  function nodeRemove() {
    if (!('remove' in Element.prototype)) {
      Element.prototype.remove = function removePolyfill() {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      };
    }
  }

  function registerPolyfills() {
    elementMatches();
    nodeRemove();
  }

  this.registerPolyfills = registerPolyfills;

  function factoryFn() {
    return {};
  }

  this.$get = [factoryFn];
}
