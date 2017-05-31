import qs from 'qs';

class API {
  constructor(core, resource) {
    this.core = core;
    this.resource = resource;
    this.pageData = {};
    this.pageQuery = null;
  }

  getPageData(query) {
    if (query) {
      delete query.page; // eslint-disable-line no-param-reassign
    }

    const key = qs.stringify(query);
    if (this.pageQuery !== key) {
      this.pageQuery = key;
      this.pageData = {
        page: 0,
        totalPages: 999,
      };
    }
    return this.pageData;
  }

  setPageData(page, totalPages) {
    this.pageData = { page, totalPages };
  }

  pageInfo(query) {
    if (query) {
      delete query.page; // eslint-disable-line no-param-reassign
    }
    return this.getPageData(qs.stringify(query));
  }

  next(query) {
    const pageData = this.getPageData(query);
    if (pageData.page > pageData.totalPages) {
      return Promise.resolve([]);
    }
    const qString = qs.stringify({ ...query, page: pageData.page + 1 });
    return this.core.get(`${this.resource}?${qString}`).then((resp) => {
      this.setPageData(pageData.page + 1, Math.ceil(resp.total / resp.perPage));
      return resp.data;
    });
  }

  prev(query) {
    const pageData = this.getPageData(query);
    if (pageData.page === 1) {
      return Promise.resolve([]);
    }
    const qString = qs.stringify({ ...query, page: pageData.page - 1 });
    return this.core.get(`${this.resource}?${qString}`).then((resp) => {
      this.setPageData(pageData - 1, Math.ceil(resp.total / resp.perPage));
      return resp.data;
    });
  }

  /* eslint-disable no-param-reassign */
  all(query) {
    query.page = 1;
    return this.core.get(`${this.resource}?${qs.stringify(query)}`).then((results) => {
      const pages = Math.ceil(results.total / results.perPage);
      const r = [results];
      for (let i = 2; i <= pages; i++) { // eslint-disable-line no-plusplus
        query.page = i;
        r.push(this.core.get(`${this.resource}?${qs.stringify(query)}`));
      }
      return Promise.all(r);
    }).then(results => results.reduce((data, cur) => data.concat(cur.data), []));
  }
  /* eslint-enable no-param-reassign */

  one(id) {
    return this.core.get(`${this.resource}/${id}`);
  }

  create(body) {
    return this.core.post(this.resource, body);
  }

  update(id, body) {
    return this.core.put(`${this.resource}/${id}`, body);
  }

  destroy(id) {
    return this.core.delete(`${this.resource}/${id}`);
  }
}

export default API;
