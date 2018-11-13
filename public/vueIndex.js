Vue.prototype.$http = axios
const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'index',
    filter: '',
    menu: '',
    name: '',
    statut : 'user',

  },
  /*created () {
    // Ici, l'utilisation d'une fonction flêchée () => {} plutôt que function () {} est primordial !
    // sans fonction fléchée, this.myList = ... ne fonctionnera pas comme prévu
    this.$http.get('/list')
      .then(list => {
        console.log('affichage de ma liste', list)
        this.filmsList = list.data
      })
      .catch(err => {
        console.log('error', err)
      })
  },*/
  methods: {
    /*sendNewElement () {
      this.$http.post('/users/login', {
        username : this.username,
        password : this.password,
      })
        .then(() => {
          this.myList.push({
            name: this.name
          })
        })
    },*/

    changePage (page) {
      this.currentPage = page;
    },

    inscription(dataInscriptionUser){

      this.$http.post('/users/register', dataInscriptionUser).then(() => {
          alert("2");
          this.changePage('index');
      });
    },


    connexionUser(identifiantsUser){

        alert("1");

        this.$http.post('/users/login', identifiantsUser).then(() => {
          alert("on est good");
          this.changePage('index');
      });
    },



  }
})