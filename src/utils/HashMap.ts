class HashMap {
  map: Map<string, number | string | object> = new Map();

  set = (key: object, value: number | string | object) => {
    return this.map.set(JSON.stringify(key), value);
  };
  get = (key: object) => {
    return this.map.get(JSON.stringify(key));
  };
  has = (key: object) => {
    return this.map.has(JSON.stringify(key));
  };
  delete = (key: object) => {
    this.map.delete(JSON.stringify(key));
  };
}

export default HashMap;
