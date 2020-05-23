import axios from 'axios';

class APIService {
  get(url, params, options) {
    
    return this.request('GET', url, null, params, options);
  }

  post(url, data, params, options) {
    
    return this.request('POST', url, data, params, options);
  }

  formData(url, data, params, options) {
    
    let formData = this._getFormData(data);
    return this.request('POST', url, formData, params, options);
  }

  put(url, data, params, options) {
    return this.request('PUT', url, data, params, options);
  }

  delete(url, data, params, options) {
    return this.request('DELETE', url, data, params, options);
  }

  _getFormData(dataObj) {
    let formData = new FormData();

    for (let field in dataObj) {
      let value = dataObj[field];
      formData.set(field, value);
    }

    return formData;
  }

  async request(method, url, data, params, options = {'Content-Type': 'application/json'}) {
    let config = {
      url: `${process.env.VUE_APP_BACKEND_URL}/${url}`,
      // url: `https://api.luckytruck.co/api/${url}`,
      data,
      method,
      params,
      withCredentials: false,
      crossdomain: true,
      ...options
    };

    try {
      const res = await axios(config);
      return res.data;
    } catch (error) {
      return error.response
    }
  }
}

export const API = new APIService();
