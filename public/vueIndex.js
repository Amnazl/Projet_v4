

axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;



const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'index',
    username : '',
    varListOfComments :[],
  },

  created () {
      this.$http.get('/users/user')
          .then(user => {
              //alert("ca passe");
              if(user.data){
                  this.username = user.data;
              }
          })
          .catch(err => {
              console.log('error', err)
          })
  },
  methods: {



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

        this.$http.post('/users/login', identifiantsUser,{
            withCredentials : true,
            method : 'POST',
      }).then((req) => {
            if(req.data === ''){

                alert("Connexion impossible : Login ou Mot de passe mauvais.");
            }else{
                this.username = req.data.username;
                this.changePage('index');
            }
        })
      },

      logout(){
        this.$http.get('/users/logout').then(() => {
            this.username = '';
            this.changePage('index');
        })
      },


      getCommentByUsername(){
          this.$http.get('/users/'+this.username+'/comments/user').then(listOfComments => {
              //this.username = '';
              console.log(listOfComments);
              this.varListOfComments = listOfComments;
          })

      },


      getCommentByArticle(idArticle){


          this.$http.get('/users/'+idArticle+'/comments/article').then(listOfComments => {
              this.varListOfComments = listOfComments.data;

          })

      },


      postCommentByArticle(dataComment){

        if(dataComment.content === ''){
            alert("Veuillez saisir un commentaire.");
        }else{
            this.$http.post('/users/'+dataComment.id_article+'/comment/addComment', dataComment,{
                withCredentials : true,
                method : 'POST',
            }).then((req) => {
                if(req.data === 'erreur'){
                    alert("Attention, un problème est survenu, votre commentaire n'a pas été enregistré");
                }else if (req.data === 'OK') {
                    alert("Votre commentaire a été ajouté");
                    this.varListOfComments.push(dataComment);


                }
            })
        }
      }
  }
})