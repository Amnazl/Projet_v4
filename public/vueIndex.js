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

      if((dataInscriptionUser.username !== '' && dataInscriptionUser.name !== '' && dataInscriptionUser.password !== '') || (dataInscriptionUser.password !== dataInscriptionUser.password2)) {
           /* if (!(dataInscriptionUser.password === dataInscriptionUser.password2)) {
                alert("Les mots de passe différents");
            } else {*/
                this.$http.post('/users/register', dataInscriptionUser).then((req) => {
                    if (req.data === 'Inscription réussi') {
                        console.log("Reussi");
                        console.log("Reussi");
                        this.changePage('connexion');
                    }
                    if (req.data === "Nom d\'utilisateur déjà utilisé") {
                        alert(req.data);
                    }
                });
           // }
      }else{
        alert("Veuillez rentrer tous les champs et indiquer les mêmes mot de passes.");
      }

    },


      connexionUser(identifiantsUser){
        this.$http.post('/users/login', identifiantsUser).then(() => {
          alert("on est good");
          this.changePage('index');
        })
      }



  }
})