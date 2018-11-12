Vue.prototype.$http = axios
const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'index',
    filter: '',
    menu: '',
    name: '',
    statut : 'user'
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

    inscription(){
          this.$http.post('/users/register').then(() => {
              this.changePage('index')
              alert('Vous êtes désormais inscrit !')
          })


      }




    // Films
    /*viewFilm (indexFilm) {
      this.currentFilmId = indexFilm;
      this.changePage("viewFilm");
    },
    editFilm (indexFilm) {
      this.currentFilmId = indexFilm;
      this.changePage("editFilm");
    },
    createFilm (film) {
      if (film.Title == "") {
          alert('Veuillez indiquer le titre')
      }
      else {
        film['Index'] = this.filmsList.length
        this.$http.post('/add',film).then(() =>{
            this.filmsList.push(film)
            this.changePage('listeDesFilms')
            alert('Votre film a bien été créé')
        })
      }
    },

    modifyFilm (film) {

      console.log(film)

      if (film.Title == "") {
            alert('Veuillez indiquer le titre')
      }
      else {
          //film['Index'] = this.filmsList.length
          this.$http.post('/edit',film).then(() => {
              //this.filmsList.push(film)
              //console.log(this.filmsList[film.Index])
              this.filmsList[film.Index] = film
              this.changePage('listeDesFilms')
              alert('Votre film a bien été modifié')
          })
      }
    },


    // User
    changeuser(user){
      console.log('iciiiiii')
      this.pseudo = user
      this.changePage("connexion")
    },
    */
  }
})