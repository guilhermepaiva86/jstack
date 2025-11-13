import HttpClient from './utils/HttpClient';

class ContactService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  // eslint-disable-next-line class-methods-use-this
  listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderby=${orderBy}`);
  }

  getContactById(id) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  createContact(contact) {
    return this.httpClient.post('/contacts', {
      body: contact,
    });
  }
}

export default new ContactService();
