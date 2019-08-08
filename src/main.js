import api from './api';

class App {
  constructor() {
    this.users = [];
    this.formElm = document.getElementById('user-form');
    this.listElm = document.getElementById('user-list');
    this.inputElm = document.querySelector('input[name=user]');
    this.registerHandlers();
  }
  registerHandlers() {
    this.formElm.onsubmit = event => this.addRepository(event); 
  }
  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputElm.value;

    if(repoInput.length === 0)
      return;
    this.setLoading();
    try {
      const response = await api.get(`/users/${repoInput}`);
      const {name, bio, html_url, avatar_url} = response.data;
      this.users.push({
        name,
        bio,
        avatar_url,
        html_url
      });
      this.inputElm.value = '';
      console.log(this.users);
      this.render();
    } catch(err) {
      alert('repositorio nao existe');
    }
    this.setLoading(false);
  }
  render() {
    this.listElm.innerHTML = '';
    this.users.forEach(repo => {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);

      let titleEl = document.createElement('h2');
      titleEl.appendChild(document.createTextNode(repo.name));
      
      let biografyEl = document.createElement('p');
      biografyEl.appendChild(document.createTextNode(repo.bio));
      
      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('href', repo.html_url);
      linkEl.appendChild(document.createTextNode('Acessar'));

      let listItem = document.createElement('li');
      listItem.appendChild(imgEl);
      listItem.appendChild(titleEl);
      listItem.appendChild(biografyEl);
      listItem.appendChild(linkEl);
      this.listElm.appendChild(listItem);
    });
  }
  setLoading(loading = true) {
    if(loading === true) {
      let loadingElm = document.createElement('span');
      loadingElm.appendChild(document.createTextNode('Carregando'));
      loadingElm.setAttribute('id', 'loading');
      this.formElm.appendChild(loadingElm);
    } else {
      document.getElementById('loading').remove();
    }
  }
}

new App();