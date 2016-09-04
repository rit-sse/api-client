import qs from 'qs';

class API {
  constructor(core, resource) {
    this.core = core;
    this.resource = resource;
  }

  all(query, actuallyAll){
    if (actuallyAll) { // Quick way to get everything unpaginated
      query.page = 1;
      return this.core.get(this.resource + '?' + qs.stringify(query)).then(results => {
          const pages = Math.ceil(results.total/results.perPage);
          const r = [results];
          for (let i = 2; i <= pages; i++) {
            query.page = i;
            r.push(this.core.get(this.resource + '?' + qs.stringify(query)));
          }
          return Promise.all(r);
        })
        .then(results => {
          return results.reduce((data, cur) => {
            return data.concat(cur.data);
          }, []);
        });
    }
    return this.core.get(this.resource + '?' + qs.stringify(query));
  }

  one(id) {
    return this.core.get(this.resource + '/' + id);
  }

  create(body) {
    return this.core.post(this.resource, body);
  }

  update(id, body) {
    return this.core.put(this.resource + '/' + id, body);
  }

  destroy(id) {
    return this.core.delete(this.resource + '/' + id);
  }
}

export default API;
