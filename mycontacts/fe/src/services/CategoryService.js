import HttpClient from './utils/HttpClient';

class CategoryService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  // eslint-disable-next-line class-methods-use-this
  async listCategories() {
    return this.httpClient.get('/categories');
  }
}

export default new CategoryService();
