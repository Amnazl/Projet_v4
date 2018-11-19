

axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;



const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'index',
    username : '',
    varListOfComments :[],
      varListOfCommentsByUsername: [],
  },


    //A chaque refresh de la page on va regarder si la session de l'utilisateur est encore valide coté serveur.
  created () {
      this.$http.get('/users/user')
          .then(user => {
              if(user.data){
                  this.username = user.data;
              }
          })
          .catch(err => {
              console.log('error', err)
          })
  },
  methods: {
      //Equivalent du redirect
      changePage (page) {
          this.currentPage = page;
      },


      /*Fonction qui va verifier les informations
      du formulaire d'inscription puis va requeter le serveur pour que le nouvel utilisateur
      soit enregistré dans le fichier json.
      */
      inscription(dataInscriptionUser){

      if((dataInscriptionUser.username !== '' && dataInscriptionUser.name !== '' && dataInscriptionUser.password !== '') || (dataInscriptionUser.password !== dataInscriptionUser.password2)) {
                this.$http.post('/users/register', dataInscriptionUser).then((req) => {
                    if (req.data === 'Inscription réussi') {
                        console.log("Reussi");
                        alert("Félicitations, vous êtes inscrits. Vous allez être redirigé vers la page d'authentification");
                        this.changePage('connexion');
                    }
                    if (req.data === "Nom d\'utilisateur déjà utilisé") {
                        alert(req.data);
                    }
                });
      }else{
        alert("Veuillez rentrer tous les champs et indiquer les mêmes mot de passes.");
      }

    },

      //route qui va requeter le serveur pour savoir si les données de connexion sont valides.
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

      //route qui va demander la destruction de la session auprès du serveur.

      logout(){
        this.$http.get('/users/logout').then(() => {
            this.username = '';
            this.changePage('index');
        })
      },

      //Récupère les commentaires par username
      getCommentByUsername(){
          this.$http.get('/users/'+this.username+'/comments/user').then(listOfCommentsByUsername => {
              this.varListOfCommentsByUsername = listOfCommentsByUsername.data;
          })

      },

      //Récupère les commentaires par id article
      getCommentByArticle(idArticle){


          this.$http.get('/users/'+idArticle+'/comments/article').then(listOfComments => {
              this.varListOfComments = listOfComments.data;

          })

      },

      //Ajout d'un nouveau commentaire sur le serveur
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
      },


      //Suppresion commentaire par son id sur le serveur

      deleteCommentById(id_comment){
          this.$http.post('/users/'+id_comment+'/comment/deleteComment', id_comment,{
              withCredentials : true,
              method : 'POST',
          }).then((req) => {
              for(i = 0; i < this.varListOfCommentsByUsername.length; i++){
                  if(this.varListOfCommentsByUsername[i]._id === id_comment){
                      this.varListOfCommentsByUsername.splice(i,1);
                      i--;
                  }
              }
              alert("Votre commentaire a été supprimé");
          })
      },

      //Modification commentaire sur le serveur
      editComment(dataComment1){

        var dataComment = [dataComment1.id,dataComment1.content];
          this.$http.post('/users/comment/editComment', dataComment,{
              withCredentials : true,
              method : 'POST',
          }).then((req) => {
              alert("Votre commentaire a été modifié");
          })
      }
  },



})