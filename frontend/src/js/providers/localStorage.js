export default function localStorageProvider() {
  let prefix = '';

  function setPrefix(_prefix) {
    prefix = _prefix;
  }

  this.setPrefix = setPrefix;

  function factoryFn() {
    function setItem(itemName, value) {
      return localStorage.setItem(prefix + itemName, value);
    }

    function getItem(itemName) {
      return localStorage.getItem(prefix + itemName);
    }

    function removeItem(itemName) {
      return localStorage.removeItem(prefix + itemName);
    }

    function saveObject(itemName, value) {
      return setItem(itemName, JSON.stringify(value));
    }

    function getObject(itemName) {
      const value = getItem(itemName);
      return JSON.parse(value);
    }

    function saveArray(itemName, value) {
      return saveObject(itemName, value);
    }

    function getArray(itemName) {
      return getObject(itemName);
    }

    return {
      setItem,
      getItem,
      removeItem,
      saveArray,
      getArray,
      saveObject,
      getObject,
    };
  }

  this.$get = [factoryFn];
}
