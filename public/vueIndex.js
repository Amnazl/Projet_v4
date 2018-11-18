

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
                        alert("Félicitations, vous êtes inscrits. Vous allez être redirigé vers la page d'authentification");
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
          this.$http.get('/users/'+this.username+'/comments/user').then(listOfCommentsByUsername => {
              console.log("1" + listOfCommentsByUsername.data[0].content);
              this.varListOfCommentsByUsername = listOfCommentsByUsername.data;
              console.log("2" + this.varListOfCommentsByUsername[0].content);
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
                    //document.location.reload(true);



                }
            })
        }
      },

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

      editComment(dataComment1){

        console.log("test1"+dataComment1.content);
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