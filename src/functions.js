
export const idade = 23;
export default class Usuario {
 static info() {
 console.log('Apenas teste');
 }
}


import axios from 'axios';

class Api {
  static async getUserInfo(username) {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    console.log(response);
  }
}

Api.getUserInfo('lucasflaquer');