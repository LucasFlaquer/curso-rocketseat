import api from './api';

class App {
  constructor() {
    this.repositories = [];
    this.formElm = document.getElementById('repo-form');
    this.listElm = document.getElementById('repo-list');
    this.inputElm = document.querySelector('input[name=repository]');
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
    
    const response = await api.get(`/repos/${repoInput}`);
    const {name, description, html_url, owner:{avartar_url}} = response;
    this.repositories.push({
      name,
      description,
      avartar_url,
      html_url
    });
    this.inputElm.value = '';
    console.log(this.repositories);
    
    this.render();
  }
  render() {
    this.listElm.innerHTML = '';
    this.repositories.forEach(repo => {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avartar_url);

      let titleEl = document.createElement('h2');
      titleEl.appendChild(document.createTextNode(repo.name));
      
      let descriptionEl = document.createElement('p');
      descriptionEl.appendChild(document.createTextNode(repo.description));
      
      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('href', repo.html_url);
      linkEl.appendChild(document.createTextNode('Acessar'));

      let listItem = document.createElement('li');
      listItem.appendChild(imgEl);
      listItem.appendChild(titleEl);
      listItem.appendChild(descriptionEl);
      listItem.appendChild(linkEl);
      this.listElm.appendChild(listItem);
    });
  }
}

new App();