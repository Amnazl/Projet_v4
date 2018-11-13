/* globals Vue */
;(function () {
    'use strict'
    
    Vue.component('navigation-bar', {
        props : ['username'],
        template : `

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/"><img src="images/logo.png" alt="logo"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" @click="$emit('change-page', 'index')">Accueil </a>
                </li>
                <li class="nav-item">
                    <li> <a class="nav-link" @click="$emit('change-page', 'liste-articles')">Articles</a></li>
                </li>

                <li class="nav-item">
                     <li> <a class="nav-link" @click="$emit('change-page', 'moncompte')">Mon compte</a></li>
                </li>
                
                <li class="nav-item">
                     <li> <a class="nav-link" @click="$emit('change-page', 'contact')">Contact</a></li>
                </li>



                </ul>
                <ul class="nav navbar-nav navbar-right">
                <li class="nav-item">
                    <li> <a class="nav-link" v-if="username === ''" @click="$emit('change-page', 'connexion')">Connexion</a></li>
                    <li> <a class="nav-link" v-if="username !== ''" @click="$emit('deconnexion')">Deconnexion</a></li>
                </li>
            </ul>
            </div>
    </nav>
    `
    });

    Vue.component('navigation-bar-invite', {

        template : `

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/"><img src="images/logo.png" alt="logo"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" @click="$emit('change-page', 'index')">Accueil </a>
                </li>
                <li class="nav-item">
                    <li> <a class="nav-link" @click="$emit('change-page', 'liste-articles')">Articles</a></li>
                </li>
                
                <li class="nav-item">
                     <li> <a class="nav-link" @click="$emit('change-page', 'contact')">Contact</a></li>
                </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                <li class="nav-item">
                    <li> <a class="nav-link" @click="$emit('change-page', 'connexion')">Connexion</a></li>
                </li>
            </ul>
            </div>
    </nav>
    `
    });


    /*Vue.component('inscription-form', {

        template : `
    <div class="panel panel-default">
        <div class="panel-heading">
            <h1 class="modal-title">Inscription </h1>
        </div>
        <div class="panel-body">
            <form>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label>Login</label>
                        <input type="text" class="form-control mesinputs"  v-model="user.login" placeholder="Login">
                    </div>
                </div>
    
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Mot de passe</label>
                        <input type="password" class="form-control"  v-model="user.password" placeholder="Mot de passe">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Repéter le mot de passe</label>
                        <input type="password" class="form-control" v-model="user.repeatpassword"  placeholder="Mot de passe">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <a @click="$emit('inscriptionuser', user)" class="btn btn-primary" role="button">S'inscrire </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    
    `,
      data: function () {
        return {
          user : {
            'login' : '',
            'password' :'',
            'repeatpassword' : ''
          }
        }
      },
    });
  */
    Vue.component('connexion', {
        template: `
    
    <div id="containerConnexion">

      <form id=formulaireConnexion>

          <h1>Connexion</h1>

        <div class="composantsConnexion" >
          <input id="identifiant" type="text" v-model="identifiantsUser.username" name="username" placeholder="Identifiant (email)">
        </div>
        <div class="composantsConnexion" >
          <input id="motDePasse" type="password" v-model="identifiantsUser.password" name="password" placeholder="Mot de passe">
        </div>
        <div class="composantsConnexion">
          <a class="btn btn-primary" @click="$emit('connexion-user', identifiantsUser)">Connexion</a>
        </div>
        <div class="composantsConnexion" id="nonInscrit_connexion">
          <b>Pas encore inscrit ? </b> <u><a@click="$emit('change-page', 'inscription')">Inscription</a></u>
        </div>
        <div class="composantsConnexion" id="invite_connexion">
          <a @click="$emit('change-page', 'index')">Se connecter en invité</a>
        </div>
      </form>
      

    </div>`,
        data: function () {
          return {
            identifiantsUser : {
                'username': this.username,
                'password': '',
            }
          }
        }

      });


    Vue.component('inscription', {
        template: `
    
        <div id=monForm>
    
            <div class="form-group">
                <label for="Nom">Nom :</label>
                <input type="text" class="form-control" id="Nom" name="name" v-model="dataInscriptionUser.name" placeholder="Votre nom" required="required">
            </div>
            
            <div class="form-group">
                <label for="Username">Username :</label>
                <input type="text" class="form-control" id="username" name="username" v-model="dataInscriptionUser.username" placeholder="Votre username" required="required">
                <small id=" usernameHelp " class=" form-text text-muted">Votre username sera votre identifiant de connexion.</em></small>

            </div>
            <div class="form-group">
                <label for="Password">Mot de passe :</label>
                <input type="password" class="form-control" id="Password" name="password" v-model="dataInscriptionUser.password" placeholder="Mot de passe" required="required">
            </div>
            <div class="form-group">
                <label for="Password2">Mot de passe (vérification) :</label>
                <input type="password" class="form-control" id="Password2" name="password2" v-model="dataInscriptionUser.password2" placeholder="Veuillez ressaisir votre mot de passe" required="required">
            </div>
            <a class="btn btn-primary" @click="$emit('inscription', dataInscriptionUser)">Submit</a>
        </div>`,

          data: function() {
            return {
              dataInscriptionUser : {
                'name': '',
                'username' : '',
                'password' :'',
                'password2' : ''
              }
            }
          },
    });


    Vue.component('plus-articles', {
      template: `
    <div id="plusdarticles">

    <div id="carouselArticles" class="carousel slide" data-ride="carousel" style="margin-top : -20px;">
        <!-- Indicators -->
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
      
        <!-- Wrapper for slides -->
        <div class="carousel-inner">
          <div class="item active" style="height:400px">
            <a @click="$emit('change-page', 'article8')">
                <h3>Réalité virtuelle : voici la chaise qui supprime les nausées</h3>
            <br/>
            <img class="imagesCaroussel" src="images/article8.jpg" width="500" height="200">
            </a>
          </div>
      
          <div class="item" style="height:400px">
            <a @click="$emit('change-page', 'article9')">
                <h3>Nous serions capables de reconnaître en moyenne 5 000 visages</h3>
                <br/>
                <img class="imagesCaroussel" src="images/article9.jpg" width="500" height="200">
            </a>
            
          </div>
      
          <div class="item" style="height:400px">
            <a @click="$emit('change-page', 'article10')">
                <h3>Mars : Voyager dans l’espace pourrait endommager les intestins</h3>
                <br/>
                <img class="imagesCaroussel" src="images/article10.jpg" width="500" height="200">
            </a>
            
          </div>
        </div>
      
        <!-- Left and right controls -->
        <a class="left carousel-control" href="#carouselArticles" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left"></span>
          <span class="sr-only">Précédent</span>
        </a>
        <a class="right carousel-control" href="#carouselArticles" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right"></span>
          <span class="sr-only">Suivant</span>
        </a>
    </div>user

    <div id="containerArticles">
        
        <h3>PLUS D'ARTICLES</h3>
        <br />

        <div class="articlesGauche">
            <div id="articles1">
                <a @click="$emit('change-page', 'article1')"">
                    <img class="imgArticlesGauche" src="images/article1.jpg" alt="article1" width="300" height="250">
                    <label class="titre" id="titreArticle1">
                            <b>userComment la 5G va-t-elle changer nos vies ?</b>
                    </label>
                </a>
                
            </div>

            <hr class="style2">
            

            <div id="articles2">
                <a @click="$emit('change-page', 'article2')"">
                    <img class="imgArticlesGauche" src="images/article2.png" alt="article2" width="300" height="250">
                    <label class="titre" id="titreArticle2">
                            <b>Mettez-vous dans la peau des personnes du 3e âge grâce à ce simulateur de vieillesse</b>
                    </label>
                </a>
            </div>

            <hr class="style2">
            

            <div id="articles3">
                <a @click="$emit('change-page', 'article3')">
                    <img class="imgArticlesGauche" src="images/article3.jpg" alt="article2" width="300" height="250">
                    <label class="titre" id="titreArticle3">
                            <b>Russie : le plus haut gratte-ciel d’Europe bientôt terminé !</b>
                    </label>
                </a>
            </div>
                
        </div>
            
        <div class="articlesDroite">
            <div id="articles4">
                <a @click="$emit('change-page', 'article4')">
                    <img class="imgArticlesDroite" src="images/article4.jpg" alt="article1" width="300" height="250">
                    <label class="titre" id="titreArticle4">
                        <b>Comment le nouveau robot du MIT fonctionne ?</b>
                    </label>
                </a>
            </div>
        
            <hr class="style2">
                
    
            <div id="articles5">
                <a @click="$emit('change-page', 'article5')">
                    <img class="imgArticlesDroite" src="images/article5.jpg" alt="article2" width="300" height="250">
                    <label class="titre" id="titreArticle5">
                        <b>La carte Vitale va-t-elle être remplacée par une puce sous-cutanée ?</b>
                    </label>
                </a>
            </div>

            <hr class="style2">

            <div id="articles6">
                <a @click="$emit('change-page', 'article6')">
                    <img class="imgArticlesDroite" src="images/article6.jpg" alt="article2" width="300" height="250">
                    <label class="titre" id="titreArticle6">
                        <b>Découvrez le camion autonome sans cabine pensé par Volvo !</b>
                    </label>
                </a>
            </div>
        </div>
        
        
    </div>

    </div>
      
    
    `
    });


    Vue.component('liste-articles', {
      template: `
      

        <div id="containerArticles">

            <h3>TOUS LES ARTICLES</h3>
            <br />

            <div id="articles1">
                <img class="imgArticles" src="images/article1.jpg" alt="article1" width="220" height="180">
                <label class="texte" id="texteArticle1">
                    <b>Prêts pour l’ultra haut débit ? La 5G frappe à nos portes. Et si cette nouvelle mise à niveau de nos
                        réseaux promet
                        une connexion beaucoup plus rapide, elle permettra également de nouveaux usages qui pourraient
                        bientôt changer nos vies...</b>
                    <a @click="$emit('change-page', 'article1')" class="lienLireSuite" >Lire la suite...</a>
                </label>

            </div>

            <hr class="style2">

            <div id="articles6">
                <img class="imgArticles" src="images/article6.jpg" alt="article6" width="220" height="180">
                <label class="texte" id="texteArticle6">
                    <b>Le constructeur suédois a publié il y a quelques jours une vidéo présentant son nouveau concept de
                        camion
                        autonome électrique : le Vera. Non seulement le véhicule ne comporte pas de volant, mais surtout,
                        celui-ci n’a pas non plus de cabine ! En revanche, ce nouveau véhicule ne devrait pas fréquenter
                        nos routes... </b>
                    <a class="lienLireSuite" @click="$emit('change-page', 'article6')">Lire la suite</a>
                </label>

            </div>

            <hr class="style2">

            <div id="articles2">
                <img class="imgArticles" src="images/article2.png" alt="article2" width="220" height="180">
                <label class="texte" id="texteArticle2">
                    <b>Aux quatre coins de la France, des expériences sont menées en réalité virtuelle pour permettre aux
                        personnels
                        de maison de retraite et autres étudiants de prendre conscience des difficultés quotidiennes
                        rencontrées
                        par les personnes âgées...</b>
                    <a class="lienLireSuite" @click="$emit('change-page', 'article2')">Lire la suite</a>
                </label>

            </div>

            <hr class="style2">

            <div id="articles4">
                <img class="imgArticles" src="images/article4.jpg" alt="article4" width="220" height="180">
                <label class="texte" id="texteArticle4">
                    <b>Une équipe de chercheurs du MIT est à l’origine d’une sérieuse avancée en matière d’intelligence
                        artificielle.
                        En effet, ces derniers ont mis au point un robot ayant la capacité d’identifier des objets que l’IA
                        n’avait jamais vus par le passé...</b>
                    <a class="lienLireSuite" @click="$emit('change-page', 'article4')">Lire la suite</a>
                </label>

            </div>

            <hr class="style2">

            <div id="articles7">
              <img class="imgArticles" src="images/article7.jpg" alt="article7" width="220" height="180">
              <label class="texte" id="texteArticle7">
                  <b>Et si des robots bricoleurs pouvaient intégrer des équipes de travailleurs sur
                      des chantiers importants ? Fabriqué au Japon, un nouveau robot pourrait
                      effectivement devenir un jour une véritable star sur des chantiers de
                      tous horizons...</b>
                  <a class="lienLireSuite" @click="$emit('change-page', 'article7')">Lire la suite</a>
              </label>

            </div>

            <hr class="style2">

            <div id="articles8">
                <img class="imgArticles" src="images/article8.jpg" alt="article8" width="220" height="180">
                <label class="texte" id="texteArticle8">
                    <b>Les utilisateurs de casques de réalité virtuelle le savent très bien,
                        le plus grand défaut de cette technologie est la quasi inévitable
                        sensation de nausée. Une start-up américaine a conçu un prototype de
                        chaise VR, dans laquelle l’utilisateur ne ressent pas cette désagréable
                        sensation...</b>
                    <a class="lienLireSuite" @click="$emit('change-page', 'article8')">Lire la suite</a>
                </label>

            </div>

            <hr class="style2">

            <div id="articles9">
                <img class="imgArticles" src="images/article9.jpg" alt="article9" width="220" height="180">
                <label class="texte" id="texteArticle9">
                    <b>Une récente étude suggère que nos cerveaux seraient capables de reconnaître
                        environ 5000 visages en moyenne. Certaines personnes peuvent même aller
                        jusqu’à 10 000. Une capacité de reconnaissance faciale que nous devons
                        en grande partie à notre histoire...</b>
                    <a class="lienLireSuite" @click="$emit('change-page', 'article9')"">Lire la suite</a>
                </label>

            </div>

            <hr class="style2">

            <div id="articles4">
                <img class="imgArticles" src="images/article10.jpg" alt="article10" width="220" height="180">
                <label class="texte" id="texteArticle10">
                    <b>Des simulations faites sur des souris destinées à refléter
                        l’exposition humaine au rayonnement cosmique suggèrent que
                        les voyages dans l’espace pourraient gravement endommager
                        les tissus gastro-intestinaux des astronautes.
                        Une problématique de plus pour les prochains vols
                        à destination de Mars...</b>
                    <a class="lienLireSuite" @click="$emit('change-page', 'article10')">Lire la suite</a>
                </label>

            </div>

            <hr class="style2">

            <div id="articles15">
            <img class="imgArticles" src="images/article15.jpg" alt="article15" width="220" height="180">
            <label class="texte" id="texteArticle15">
                <b>L’armée américaine a annoncé sa collaboration avec la société
                    Sonitus Technologies pour la création d’un dispositif
                    appelé “Molar Mic”, une sorte de talkie-walkie pouvant
                    être placé sur les dents des soldats...</b>
                <a class="lienLireSuite" @click="$emit('change-page', 'article15')">Lire la suite</a>
            </label>

            </div>

            <hr class="style2">

            <div id="articles16">
                <img class="imgArticles" src="images/article16.jpg" alt="article16" width="220" height="180">
                <label class="texte" id="texteArticle16">
                    <b>Le journal australien The Age a rapporté un fait divers
                        troublant ce jeudi 16 août 2018. Un adolescent a pendant
                        plus d’un an circulé dans le système central d’Apple.
                        L’année dernière, la police aurait finalement fait
                        une descente chez lui pour saisir son matériel et l’inculper.
                        L’affaire va se résoudre le mois prochain devant
                        le tribunal fédéral...</b>
                    <a class="lienLireSuite" @click="$emit('change-page', 'article16')">Lire la suite</a>
                </label>

            </div>

            <hr class="style2">

            <div id="articles3">
                <img class="imgArticles" src="images/article3.jpg" alt="article3" width="220" height="180">
                <label class="texte" id="texteArticle3">
                    <b>Le journal australien The Age a rapporté un fait divers
                        troublant ce jeudi 16 août 2018. Un adolescent a pendant
                        plus d’un an circulé dans le système central d’Apple.
                        L’année dernière, la police aurait finalement fait
                        une descente chez lui pour saisir son matériel et l’inculper.
                        L’affaire va se résoudre le mois prochain devant
                        le tribunal fédéral...</b>
                    <a class="lienLireSuite" @click="$emit('change-page', 'article3')">Lire la suite</a>
                </label>

            </div>

            <hr class="style2">

            <div id="articles5">
                <img class="imgArticles" src="images/article5.jpg" alt="article5" width="220" height="180">
                <label class="texte" id="texteArticle5">
                    <b>Depuis quelques mois, un hoax circule abondamment sur Internet :
                        la Sécurité sociale aurait lancé en France un vaste plan
                        d’implantation de puces RFID sous la peau, afin de remplacer
                        la célèbre carte Vitale...</b>
                    <a class="lienLireSuite" @click="$emit('change-page', 'article5')">Lire la suite</a>
                </label>

            </div>
        </div>
      `
    });


  Vue.component('article1',{
      template: `
        
        <div id="containerArticleEntier">
          <label id="titreArticleEntier">
              Comment la 5G va-t-elle changer nos vies ?
          </label>
          <img id="imageArticle" src="images/article1.jpg " width="600" height="250" style="margin-left : 24%;">
          <br /> <br />
          <div id="texteArticle">
              &nbsp&nbsp&nbsp Prêts pour l’ultra haut débit ? La 5G frappe à nos portes.
              Et si cette nouvelle mise à niveau de nos réseaux promet une connexion beaucoup plus rapide,
              elle permettra également de nouveaux usages qui pourraient bientôt changer nos vies.
              Après la 2G (1991), la 3G (2001), et enfin la 4G (2009), nous nous apprêtons à consommer Internet de
              manière
              beaucoup plus rapide et plus fluide pour un maximum de données. Un véritable bond en avant jugé « aussi
              transformateur que l’automobile et l’électricité » par Qualcomm, la célèbre société américaine spécialisée
              en télécommunications. La 5 G promet une connexion et un débit plus rapides que la précédente génération
              (neuf à 20 fois plus rapides selon les zones) en s’appuyant sur les « fréquences millimétriques »
              (26 GHz) – portées des ondes moindre, mais bande passante bien supérieure. Mais elle ouvre également
              la porte à de nouveaux usages dont l’essor dépend d’une telle efficacité.

              <br /><br />

              &nbsp&nbsp&nbsp Outre les dizaines de milliers d’objets connectés au kilomètre carré,
              imaginez alors les usages dans les opérations de maintenance à distance,
              dans la télémédecine ou dans le domaine de la voiture autonome, qui requièrent une réactivité à la
              milliseconde.
              Un chirurgien à des milliers de kilomètres de distance pourrait alors commander un robot qui effectuerait
              l’opération
              à sa place. Des opérations complexes pourraient être faites par des secouristes, par exemple, en partageant
              des diagnostics en temps réel avec d’autres médecins dans le but de maximiser les chances de réussites de
              ces opérations.
              Les voitures autonomes, de leur côté, s’appuieront sur la 5G pour recevoir et transmettre des informations
              à
              la milliseconde près. Une réactivité extrême nécessaire si l’on veut un jour se passer de conduire.

              <br /><br />

              &nbsp&nbsp&nbsp La technologie 5G pourrait d’ores et déjà être disponible dans certaines mégalopoles d’ici
              à la fin de l’année.
              Les premiers smartphones compatibles devraient de leur côté être commercialisés au début de l’année
              prochaine.
              En France, la 5G devrait faire son apparition en 2020 dans les grandes villes, avant de s’étendre au reste
              du territoire en 2021.

              <br /><br />
          </div>

          <main id="saisieCommentaire">
              <div id="commentaire">
                  <img src="images/warning.png" width="40" height="40">
                  Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
              </div>

              <div >
                  <div id="listeCommentaire"></div>

                  <br />
                  <div id="commentaireUser">
                      <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                      <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                      <br />
                      <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                  </div>
              </div>
              
          </main>

      </div>
      `
    });


  Vue.component('article2',{
      template: `
        
        <div id="containerArticleEntier">
        <label id="titreArticleEntier">
            Mettez-vous dans la peau des personnes du 3e âge grâce à ce simulateur de vieillesse
        </label>
        <img id="imageArticle" src="images/article2.png " width="600" height="250" style="margin-left : 24%;">
        <br /> <br />
        <div id="texteArticle">
            &nbsp&nbsp&nbsp Aux quatre coins de la France, des expériences sont menées en réalité virtuelle pour
            permettre aux personnels de
            maison de retraite et autres étudiants de prendre conscience des difficultés quotidiennes rencontrées
            par les personnes âgées.

            <br /><br />


            &nbsp&nbsp&nbsp Se déplacer, s’habiller, se servir quelque chose à manger ou à boire, n’importe quelle
            action du quotidien
            peut s’avérer difficile à réaliser pour les personnes âgées, si bien que bon nombre d’entre elles ont
            besoin
            d’assistance. Or, il existe depuis quelque temps un simulateur de vieillesse permettant de se plonger dans
            leur quotidien.

            <br /><br />


            &nbsp&nbsp&nbsp Ces expériences sont pratiquées dans divers établissements d’hébergement pour personnes
            âgées dépendantes (EHPAD)
            et hôpitaux. C’est ce que montre par exemple la vidéo d’un atelier organisé par le pôle gérontologie du CHU
            de Montpellier (voir en fin d’article). Il s’agit d’un matériel créé par la société ALEP Prévention à
            destination
            des aides soignants, médecins ou encore étudiants amenés à travailler avec les personnes âgées.

            <br /><br />


            &nbsp&nbsp&nbsp Alors que les cas de maltraitance dans les établissements de prise en charge font depuis
            quelques années polémique
            dans notre pays, ce dispositif peut être un véritable moyen de faire prendre conscience des difficultés
            rencontrées
            par ces personnes. Il pourrait ainsi prévenir les violences et autres cas de négligence. Il s’agit
            également
            d’un dispositif qui peut très bien sensibiliser à la situation des personnes en situation de handicap.

            <br /><br />


            &nbsp&nbsp&nbsp Il faut savoir qu’il est ici question d’un équipement complet : mitaines, genouillères,
            guêtres et coque
            rigide au niveau du dos. Le but ? Faire ressentir à l’utilisateur la difficulté liée aux mouvements
            effectués
            par une personne âgée. En effet, cette “combinaison de vieillissement” restreint les mouvements en
            raidissant
            la colonne vertébrale, les mains ainsi que les membres supérieurs et inférieurs. Des lunettes et un casque
            font également partie de l’équipement afin de réduire la vue et l’ouïe.
            <br /><br />


        </div>

        <main id="saisieCommentaire">
                <div id="commentaire">
                    <img src="images/warning.png" width="40" height="40">
                    Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
                </div>
    
                <div>
                    <div id="listeCommentaire"></div>
    
                    <br />
                    <div id="commentaireUser">
                        <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                        <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                        <br />
                        <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                    </div>
                </div>
                
        </main>
      </div>
      `
    });

  Vue.component('article3',{
      template: `
        
        <div id="containerArticleEntier">
        <label id="titreArticleEntier">
            Un adolescent qui a piraté Apple pendant plus d’un an passe en justice
        </label>
        <img id="imageArticle" src="images/article3.jpg " width="600" height="250" style="margin-left : 24%;">
        <br /> <br />
        <div id="texteArticle">

            &nbsp&nbsp&nbsp Situé dans la ville de Saint-Pétersbourg, le Lakhta Center dépassera les 400 mètres de
            hauteur.
            L’édifice a été commandé par le géant de l’énergie russe Gazprom qui y installera ses locaux.
            Il s’agira alors de la plus grande tour du continent européen, mais elle sera en revanche exclue du Top 10
            mondial !


            <br /><br />
            &nbsp&nbsp&nbsp Pour l’instant, la plus haute tour d’Europe se trouve déjà en Russie. Il s’agit du Complexe
            de la Fédération (ou Vostok Tower) situé dans la capitale Moscou. Achevé en 2015, ce gratte-ciel culmine
            à 373 mètres de hauteur. Dans quelques semaines, une autre construction lui ravira ce titre :
            le Lakhta Center de Saint-Pétersbourg et ses 462 mètres.

            <br /><br />
            &nbsp&nbsp&nbsp Selon la page officielle du projet, il s’agira par ailleurs du premier « supertall
            building »
            (plus de 300 mètres de haut) de la ville historique de Saint-Pétersbourg, mais également du treizième
            bâtiment
            le plus grand du monde. Il sera situé dans le classement juste entre l’International Commerce Center de
            Hong Kong
            (2010 – 484 m) et le Landmark 81 de Hô Chi Minh-Ville au Vietnam (2018 – 461,2 m).

            <br /><br />
            &nbsp&nbsp&nbsp Le Lakhta Center est doté de 87 étages, alors que son design extérieur rappelle celui
            d’une sorte de crayon tordu. Il faut savoir que ses fondations ont été enfouies à plus de 80 mètres sous
            terre,
            et que la structure a été renforcée par une quinzaine de colonnes. Il s’agit ici de permettre au bâtiment
            de
            résister à des vents d’environ 135 km/h au niveau de son sommet.

            <br /><br />
            &nbsp&nbsp&nbsp Également, le gratte-ciel sera doté de pas moins de 16 500 vitres. Elles seront toutes
            équipées
            de volets automatiques dont le but est de réduire les pertes de chaleur. Une autre propriété a dimension
            écologique
            sera également présente : un système de réutilisation et de purification de l’eau.

            <br /><br />
            &nbsp&nbsp&nbsp Prévue pour 2019, l’inauguration du Lakhta Center précédera l’installation du nouveau siège
            social
            de la société Gazprom, le célèbre géant de l’énergie russe alimentant de nombreux pays européens.

            <br /><br />
            &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp Le journal australien The Age a rapporté un fait divers troublant ce jeudi
            16 août 2018.
            Un adolescent a pendant plus d’un an circulé dans le système central d’Apple. L’année dernière,
            la police aurait finalement fait une descente chez lui pour saisir son matériel et l’inculper. L’affaire va
            se
            résoudre le mois prochain devant le tribunal fédéral.

            <br /><br />
        </div>

        <main id="saisieCommentaire">
                <div id="commentaire">
                    <img src="images/warning.png" width="40" height="40">
                    Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
                </div>
    
                <div>
                    <div id="listeCommentaire"></div>
    
                    <br />
                    <div id="commentaireUser">
                        <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                        <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                        <br />
                        <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                    </div>
                </div>
                
            </main>
    </div>
      `
    });



  Vue.component('article4',{
      template: `
        
        <div id="containerArticleEntier">
        <label id="titreArticleEntier">
            Comment le nouveau robot du MIT fonctionne ?
        </label>
        <img id="imageArticle" src="images/article4.jpg " width="600" height="250" style="margin-left : 24%;">
        <br /> <br />
        <div id="texteArticle">

            &nbsp&nbsp&nbsp Une équipe de chercheurs du MIT est à l’origine d’une sérieuse avancée en matière
            d’intelligence
            artificielle. En effet, ces derniers ont mis au point un robot ayant la capacité d’identifier des objets
            que
            l’IA n’avait jamais vus par le passé.

            <br /><br />

            &nbsp&nbsp&nbsp Peut-être connaissez-vous la fonction Face ID de l’iPhone X, permettant de déverrouiller
            le smartphone après un rapide coup d’œil. Derrière cette fonction se cache la vision artificielle (ou
            vision
            par ordinateur), une branche de l’intelligence artificielle dont le principal attrait est de permettre à
            une machine d’analyser, de traiter ainsi que de comprendre une ou plusieurs images prises par un objectif.

            <br /><br />

            &nbsp&nbsp&nbsp Mais en ce qui concerne le robot Dense Objet Nets (DON), celui-ci n’a pas besoin d’avoir
            préalablement pris connaissance des objets afin de les reconnaître. Il a été mis au point par les
            chercheurs
            du Computer Science and Artificial Intelligence Laboratory du MIT (États-Unis). Selon l’étude disponible
            depuis le 7 septembre 2018 sur la plateforme de prépublication arXiv, le robot considère les objets comme
            des ensembles de points afin de former des cartes visuelles en 3D. Ceci permet entre autres d’éviter de
            constituer des bases de données conséquentes, comme c’est le cas des IA actuelles.

            <br /><br />

            &nbsp&nbsp&nbsp Lorsque le robot voit un objet assez proche d’un autre observé auparavant,
            celui-ci est capable de l’identifier. Les chercheurs ont par exemple appris à l’IA à identifier une
            chaussure
            par la languette. Le fait est que le robot est devenu capable d’identifier n’importe quelle autre chaussure
            après avoir vu la première ! La même expérience a été répétée avec plusieurs objets (chaussures, peluches,
            etc.),
            et ce peu importe l’orientation dans laquelle ces derniers se trouvaient.

            <br /><br />

            &nbsp&nbsp&nbsp Les chercheurs du MIT estiment qu’il s’agit ici d’une grande avancée en matière de vision
            par ordinateur, ce qui devrait permettre d’effectuer des tâches infaisables jusqu’à aujourd’hui.
            Un exemple semble pertinent : celui d’un robot capable de trier à la chaîne les déchets dans un centre de
            recyclage,
            sans avoir à consulter une lourde base de données pour les identifier.

            <br /><br />

        </div>

        <main id="saisieCommentaire">
                <div id="commentaire">
                    <img src="images/warning.png" width="40" height="40">
                    Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
                </div>
    
                <div>
                    <div id="listeCommentaire"></div>
    
                    <br />
                    <div id="commentaireUser">
                        <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                        <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                        <br />
                        <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                    </div>
                </div>
                
            </main>
    </div>
      `
    });



  Vue.component('article5',{
      template: `
        
        <div id="containerArticleEntier">
        <label id="titreArticleEntier">
            La carte Vitale va-t-elle être remplacée par une puce sous-cutanée ?
        </label>
        <img id="imageArticle" src="images/article5.jpg " width="600" height="250" style="margin-left : 24%;">
        <br /> <br />
        <div id="texteArticle">

            &nbsp&nbsp&nbsp Depuis quelques mois, un hoax circule abondamment sur Internet :
            la Sécurité sociale aurait lancé en France un vaste plan d’implantation de puces RFID sous la peau,
            afin de remplacer la célèbre carte Vitale.


            <br /><br />
            &nbsp&nbsp&nbsp Il est vrai qu’avec le progrès, notamment en matière d’intelligence artificielle et autres
            technologies annonçant un futur assez incertain, la population s’interroge. Certaines personnes profitent
            de
            cet état de questionnement pour lancer des rumeurs infondées. Les puces électroniques sous-cutanées –
            dont la puce RFID – en sont un exemple parmi tant d’autres.

            <br /><br />
            &nbsp&nbsp&nbsp En France, des sources douteuses ont alimenté la rumeur stipulant que la Sécu aurait mis
            sur
            pied pour 2019 un plan d’implantation à grande échelle de ces puces, pour assumer l’usage qui est
            actuellement
            celui de la carte Vitale. Si certaines plateformes sont ouvertement satiriques ou parodiques, d’autres se
            contentent de relayer la fausse information comme c’est le cas ici ou encore ici.

            <br /><br />
            &nbsp&nbsp&nbsp «Face au trop grand nombre de pertes de cartes vitales et face à leur coûteux remplacement,
            qui coûte des centaines de milliers d’euros à la Sécurité sociale chaque année, l’organisme met peu à peu
            en place
            les puces électroniques qui sont directement implantées dans le corps des assurés sociaux», peut-on lire
            dans
            un de ces articles.

            <br /><br />
            &nbsp&nbsp&nbsp Ce genre de rumeur est par ailleurs sûrement un copié-collé d’un hoax qui avait vu le jour
            aux États-Unis en 2010. En effet, à l’occasion de la mise en place du système de santé baptisé Obamacare,
            ses opposants n’avaient pas hésité à affirmer que le gouvernement voulait ficher tous les américains.
            Encore une fois, les “médias” publiant ce genre d’information étaient des sources douteuses.

            <br /><br />
            &nbsp&nbsp&nbsp En revanche, nous n’allons pas nier que les implantations de puce RFID n’existent pas ! En
            effet,
            un concept venant de Suède baptisé “Implant party” a eu son heure de gloire en 2015 en Europe. Des
            événements durant
            lesquels des personnes ont accepté de se faire implanter une puce dans une ambiance de fête.



            <br /><br />
        </div>

        <main id="saisieCommentaire">
                <div id="commentaire">
                    <img src="images/warning.png" width="40" height="40">
                    Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
                </div>
    
                <div>
                    <div id="listeCommentaire"></div>
    
                    <br />
                    <div id="commentaireUser">
                        <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                        <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                        <br />
                        <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                    </div>
                </div>
                
            </main>
    </div>      `
    });



  Vue.component('article6',{
      template: `
        
        <div id="containerArticleEntier">
        <label id="titreArticleEntier">
            Découvrez le camion autonome sans cabine pensé par Volvo !
        </label>
        <img id="imageArticle" src="images/article6.jpg " width="600" height="250" style="margin-left : 24%;">
        <br /> <br />
        <div id="texteArticle">
            &nbsp&nbsp&nbsp Le constructeur suédois a publié il y a quelques jours une vidéo présentant son nouveau
            concept de camion autonome
            électrique : le Vera. Non seulement le véhicule ne comporte pas de volant, mais surtout,
            celui-ci n’a pas non plus de cabine ! En revanche, ce nouveau véhicule ne devrait pas fréquenter nos
            routes.

            <br /><br />


            &nbsp&nbsp&nbsp Le concept Vera de Volvo a l’étonnante caractéristique d’avoir totalement fait disparaître
            la cabine habituellement
            réservée au chauffeur. Ainsi, ce camion entièrement autonome a une allure assez déroutante,
            et il faut savoir que ce dernier utilise les mêmes moteurs et batteries que les autres camions électriques
            de Volvo.

            <br /><br />


            &nbsp&nbsp&nbsp Côté usages, le constructeur estime que le camion Vera sera destiné à effectuer des trajets
            courts et assez lents.
            Il pourra transporter des charges lourdes au sein même des zones portuaires, des centres logistiques,
            des lieux de construction de grands édifices (comme les ponts) et autres usines. Volvo a même élaboré un
            scénario
            où tout serait automatisé et optimisé.

            <br /><br />


            &nbsp&nbsp&nbsp Des flottes de camions Vera assureraient des rotations en permanence, coordonnées par un
            poste de contrôle.
            Le but de ce dernier serait d’optimiser les flux tout en gardant un œil sur les chargements ainsi que sur
            les besoins de recharge en énergie des camions. Avec une telle méthode, le fabricant espèce pouvoir réduire
            les délais de livraison, mais aussi le volume des stocks tampons habituellement nécessaires entre
            plusieurs étapes d’une livraison.

            <br /><br />


            &nbsp&nbsp&nbsp Ainsi, Volvo désire donc développer une offre de camion autonome électrique collant
            parfaitement aux besoins de
            l’industrie. Le concept Vera fait tout de même penser à ce qu’a récemment fait le constructeur Einride,
            qui a décliné son camion autonome T-Pod en une version T-Log qualifiée de “camion-bûcheron”.
            En effet, ce dernier a pour but de travailler dans les exploitations forestières.

            <br /><br />


        </div>

        <main id="saisieCommentaire">
                <div id="commentaire">
                    <img src="images/warning.png" width="40" height="40">
                    Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
                </div>
    
                <div>
                    <div id="listeCommentaire"></div>
    
                    <br />
                    <div id="commentaireUser">
                        <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                        <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                        <br />
                        <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                    </div>
                </div>
                
            </main>
    </div>
      `
    });


  Vue.component('article7',{
      template: `
        
        <div id="containerArticleEntier">
        <label id="titreArticleEntier">
            Voici HRP-5P, le robot destiné à participer à d’importants chantiers !
        </label>
        <img id="imageArticle" src="images/article7.jpg " width="600" height="250" style="margin-left : 24%;">
        <br /> <br />
        <div id="texteArticle">

            &nbsp&nbsp&nbsp Et si des robots bricoleurs pouvaient intégrer des équipes de travailleurs sur des
            chantiers importants ?
            Fabriqué au Japon, un nouveau robot pourrait effectivement devenir un jour une véritable star sur des
            chantiers
            de tous horizons.

            <br /><br />

            &nbsp&nbsp&nbsp Avec son allure qui en impose, le robot humanoïde HRP-5P pourrait aisément être à l’affiche
            d’un film de science-fiction. Et pourtant, celui-ci a simplement pour mission d’effectuer des tâches
            manuelles de construction. Présenté dans un communiqué publié le 27 septembre 2018 par l’Advanced Institute
            of Industrial Technology (AIST) situé au Japon, le robot est pour l’instant capable de porter puis de fixer
            des cloisons.

            <br /><br />

            &nbsp&nbsp&nbsp Présenté comme un robot qui pourra à l’avenir réaliser d’importants travaux de
            construction,
            HRP-5P possède divers outils intégrés. Dans la vidéo visible en fin d’article, il est possible de le voir
            saisir une cloison sèche avec ses pinces, de faire pivoter cette dernière et de l’installer contre un mur
            avant
            de la fixer à l’aide de clous. Il faut savoir que pour effectuer ces tâches, la machine intègre un
            dispositif
            de détection des objets lui ayant permis de repérer la cloison, puis d’enclencher une série de mouvements
            planifiés.

            <br /><br />

            &nbsp&nbsp&nbsp Les scientifiques de l’AIST estiment que le robot HRP-5P pourrait sans doute se rentre
            utile sur des chantiers
            de construction. Ils n’ont pas hésité à évoquer des chantiers dont le but est de fabriquer des navires et
            des avions.
            Il s’agit donc de très gros œuvre ! Les chercheurs ont également soutenu que ce type de machine pourrait
            venir en
            aide aux entreprises qui seront (ou qui sont déjà) en proie à une pénurie de main-d’œuvre qualifiée.

            <br /><br />

            &nbsp&nbsp&nbsp Évidemment, ce type de machine ne fera pas l’unanimité tant l’automatisation des tâches
            fait craindre pour nos emplois.
            Cependant, des secteurs ayant besoin d’une main-d’œuvre qui se fait rare pourraient y trouver un intérêt.

            <br /><br />




        </div>

        <main id="saisieCommentaire">
                <div id="commentaire">
                    <img src="images/warning.png" width="40" height="40">
                    Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
                </div>
    
                <div>
                    <div id="listeCommentaire"></div>
    
                    <br />
                    <div id="commentaireUser">
                        <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                        <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                        <br />
                        <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                    </div>
                </div>
                
            </main>
    </div>
      `
    });


  Vue.component('article8',{
      template: `
        
        <div id="containerArticleEntier">
        <label id="titreArticleEntier">
            Réalité virtuelle : voici la chaise qui supprime les nausées !
        </label>
        <img id="imageArticle" src="images/article8.jpg " width="600" height="250" style="margin-left : 24%;">
        <br /> <br />
        <div id="texteArticle">


            &nbsp&nbsp&nbsp Les utilisateurs de casques de réalité virtuelle le savent très bien, le plus grand défaut
            de cette technologie est l
            a quasi inévitable sensation de nausée. Une start-up américaine a conçu un prototype de chaise VR, dans
            laquelle
            l’utilisateur ne ressent pas cette désagréable sensation !

            <br /><br />

            &nbsp&nbsp&nbsp Depuis que la réalité virtuelle est disponible pour le grand public, le défaut majeur n’a
            pas tardé à être pointé
            du doigt : la sensation de nausée (ou « motion sickness »). Disons-le, celle-ci impacte de manière non
            négligeable
            une expérience à l’origine pensée pour être ludique et agréable. Depuis des années, les développeurs de
            jeux vidéo
            et fabricants de casques VR tentent de trouver une solution à ce problème récurrent.

            <br /><br />

            &nbsp&nbsp&nbsp Justement, une start-up basée au Texas (États-Unis) et baptisée Cambrian vient de terminer
            le développement de
            son prototype de VR Chair, comme le montre la vidéo visible en fin d’article. Il s’agit d’une chaise plutôt
            spéciale
            dans sa forme : celle-ci permet à l’utilisateur de s’appuyer avec ses bras sur des accoudoirs pour faire
            pivoter
            le siège. La société Cambrian a expliqué que ce type de mouvement offrait à l’utilisateur une sensation
            plus naturelle
            au niveau de son cerveau, et supprimait ainsi le motion sickness.

            <br /><br />

            &nbsp&nbsp&nbsp Évidemment, chaque technologie a un défaut, et la VR Chair n’y échappe malheureusement pas.
            En effet,
            le fait que l’utilisateur soit contraint de poser ses bras sur les accoudoirs ne lui permet pas de les
            utiliser
            pour interagir dans son environnement virtuel. Les accoudoirs sont en revanche dotés de boutons, mais
            il s’agit d’un défaut qui a son importance.

            <br /><br />

            &nbsp&nbsp&nbsp Il faut savoir que la VR Chair est détectée comme une manette de jeu traditionnelle et non
            comme un contrôleur
            à détection de mouvement. De nombreux contrôleurs sont incompatibles avec ce dispositif. De plus, le point
            fort
            des casques Oculus Rift et HTC Vive est de pouvoir utiliser ces fameux contrôleurs pour bouger ses mains
            d’une
            façon plus naturelle.


            <br /><br />




        </div>

        <main id="saisieCommentaire">
                <div id="commentaire">
                    <img src="images/warning.png" width="40" height="40">
                    Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
                </div>
    
                <div>
                    <div id="listeCommentaire"></div>
    
                    <br />
                    <div id="commentaireUser">
                        <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                        <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                        <br />
                        <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                    </div>
                </div>
                
            </main>
    </div>
      `
    });


  Vue.component('article9',{
      template: `
        
         <div id="containerArticleEntier">
        <label id="titreArticleEntier">
            Nous serions capables de reconnaître en moyenne 5 000 visages
        </label>
        <img id="imageArticle" src="images/article9.jpg " width="600" height="250" style="margin-left : 24%;">
        <br /> <br />
        <div id="texteArticle">

            &nbsp&nbsp&nbsp Une récente étude suggère que nos cerveaux seraient capables de reconnaître environ 5000
            visages en moyenne. Certaines personnes peuvent même aller jusqu’à 10 000. Une capacité de reconnaissance
            faciale que nous devons en grande partie à notre histoire.

            <br /><br />

            &nbsp&nbsp&nbsp Combien de visages pourriez-vous reconnaître ? Des milliers, apparemment. Une capacité
            incroyable
            que nous devons à notre évolution. « Le vocabulaire des identités faciales est vaste compte tenu du
            contexte de
            l’histoire de notre espèce, explique à Newsweek Rob Jenkins, du département de psychologie de l’Université
            d’York
            (Canada) et principal auteur de l’étude. Pendant la majeure partie de cette période, les humains vivaient
            par groupes
            d’une centaine de personnes. Nous sommes aussi bombardés par les visages des médias. C’est pourquoi les
            exigences en
            matière de capacités de reconnaissance du visage humain se sont intensifiées de façon spectaculaire ».

            <br /><br />

            &nbsp&nbsp&nbsp Nous avons ainsi évolué avec la capacité de reconnaître beaucoup de visages. D’accord, mais
            dans
            quelle mesure exactement ? « Dans la vie de tous les jours, nous avons l’habitude d’identifier des amis,
            des collègues et des célébrités, ainsi que de nombreuses autres personnes, poursuit le chercheur. Mais
            personne
            n’a établi le nombre de visages que les gens connaissent réellement ».

            <br /><br />

            &nbsp&nbsp&nbsp Dans le cadre de cette étude, publiée dans le journal Proceedings de la Royal Society B,
            Rob Jenkins et son équipe ont demandé à des dizaines de participants de noter autant de visages qu’ils
            connaissaient
            en une heure. Ces derniers ont ensuite été invités à faire la même chose avec des personnalités reconnues
            et célèbres,
            mais sans les connaître personnellement.

            <br /><br />

            &nbsp&nbsp&nbsp Plus précisément, et dans un premier temps, les sujets ont identifié une moyenne de 362
            visages
            connus (de 167 à 524). Les participants devaient ici donner le nom ou une description claire de la
            personne.
            Concernant les visages de personnalités publiques, le taux d’identification était inférieur : 290 visages
            en
            moyenne (169 à 407). Dans les deux expériences, la vitesse des identifications a commencé fort, puis
            diminué.
            On arrêtait ici le chronomètre à une heure. Les chercheurs ont ainsi extrapolé ces chiffres pour déterminer
            que
            s’ils avaient eu plus de 60 minutes, les participants auraient pu reconnaître entre 1000 et 10 000 visages,
            soit un peu moins de 5 000 visages en moyenne.

            <br /><br />

            &nbsp&nbsp&nbsp Cette nouvelle étude permet ici d’entrevoir un large éventail de voies de recherche,
            notamment concernant la technologie de reconnaissance faciale dans les aéroports. « Une meilleure
            compréhension
            de la reconnaissance des visages chez l’Homme devrait éclairer une meilleure modélisation de ce processus
            dans les machines », conclut le chercheur.

            <br /><br />

        </div>

        <main id="saisieCommentaire">
                <div id="commentaire" v-if="statut === 'invite'">
                    <img src="images/warning.png" width="40" height="40">
                    Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
                </div>
    
                <div v-else-if="statut === 'user'">
                    <div id="listeCommentaire"></div>
    
                    <br />
                    <div id="commentaireUser">
                        <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                        <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                        <br />
                        <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                    </div>
                </div>
                
            </main>
    </div>

      `
    });
  Vue.component('article10',{
      template: `
        
        <div id="containerArticleEntier">
        <label id="titreArticleEntier">
            Mars : Voyager dans l’espace pourrait endommager les intestins
        </label>
        <img id="imageArticle" src="images/article10.jpg " width="600" height="250" style="margin-left : 24%;">
        <br /> <br />
        <div id="texteArticle">


            &nbsp&nbsp&nbsp Des simulations faites sur des souris destinées à refléter l’exposition humaine au
            rayonnement
            cosmique suggèrent que les voyages dans l’espace pourraient gravement endommager les tissus
            gastro-intestinaux
            des astronautes. Une problématique de plus pour les prochains vols à destination de Mars.

            <br /><br />

            &nbsp&nbsp&nbsp L’Homme ambitionne de poser le pied sur Mars d’ici les 10 prochaines années. Mais qu’il
            s’agisse
            de la NASA, de SpaceX, ou encore des autorités spatiales chinoises, toutes ces organisations vont devoir
            faire
            face à de nombreuses problématiques. Outre les défis techniques inhérents à un tel voyage (au moins six
            mois),
            se pose aujourd’hui la question tout aussi essentielle de la santé des astronautes. Et ce sont
            principalement
            les rayons cosmiques qui posent ici problème. Sur Terre, un bouclier nous protège de ces rayons
            dévastateurs,
            nous menant à évoluer sans. Mais dans l’espace comme sur Mars, les principaux intéressés vont devoir faire
            avec.

            <br /><br />

            &nbsp&nbsp&nbsp Outre les éventuels cancers et autres fonctions cognitives altérées découlant d’une
            exposition
            prolongée au rayonnement cosmique, une récente étude publiée dans les Actes de l’Académie nationale des
            sciences
            (PNAS) nous révèle que les fonctions intestinales pourraient, elles aussi, être gravement endommagées.
            La muqueuse (couche supérieure) des cellules, normalement remplacée tous les trois à cinq jours par une
            migration
            de nouvelles cellules venant des couches inférieures, ne pourrait ainsi se renouveler. S’ensuivrait un
            risque élevé
            de développement de tumeurs dans l’estomac et le côlon. C’est du moins ce qui ressort d’une étude menée sur
            les intestins grêles de souris exposées à des sources non létales de rayonnement cosmique simulé.

            <br /><br />


            &nbsp&nbsp&nbsp «Les ions lourds tels que le fer et le silicium sont dommageables en raison de leur plus
            grande
            masse comparée aux photons sans masse tels que les rayons X et les rayons gamma (γ) répandus sur Terre,
            explique Kamal Datta, du Département de biochimie de la NASA. Avec la technologie de blindage actuelle,
            il est difficile de protéger les astronautes contre les effets néfastes des rayonnements ionisants lourds.
            Bien qu’il existe un moyen d’utiliser des médicaments pour contrer ces effets, aucun agent réellement
            efficace n’a encore été développé ».

            <br /><br />

            &nbsp&nbsp&nbsp Bien que les données observées chez la souris ne se traduisent pas systématiquement chez
            l’Homme,
            celles-ci invitent les chercheurs à repenser de nouveaux moyens de contrer les effets du rayonnement.
            Inutile de dépenser des milliards pour un tel voyage si l’intégrité physique des astronautes n’est pas
            maintenue.
            « Il est important de comprendre ces effets à l’avance afin que nous puissions faire tout notre possible
            pour protéger
            nos futurs voyageurs spatiaux », conclut le chercheur.


            <br /><br />



        </div>

        <main id="saisieCommentaire">
                <div id="commentaire">
                    <img src="images/warning.png" width="40" height="40">
                    Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
                </div>
    
                <div>
                    <div id="listeCommentaire"></div>
    
                    <br />
                    <div id="commentaireUser">
                        <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                        <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                        <br />
                        <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                    </div>
                </div>
                
            </main>
    </div>
      `
    });
  Vue.component('article15',{
      template: `
        
        <div id="containerArticleEntier">
        <label id="titreArticleEntier">
            Les soldats américains utiliseront bientôt un talkie-walkie placé… sur la dent
        </label>
        <img id="imageArticle" src="images/article15.jpg " width="600" height="250" style="margin-left : 24%;">
        <br /> <br />
        <div id="texteArticle">

            &nbsp&nbsp&nbsp L’armée américaine a annoncé sa collaboration avec la société Sonitus Technologies pour
            la création d’un dispositif appelé “Molar Mic”, une sorte de talkie-walkie pouvant être placé sur les dents
            des soldats.


            <br /><br />
            &nbsp&nbsp&nbsp Qu’elle paraît lointaine l’époque où l’on utilisait encore les gros talkies-walkies pour
            communiquer
            en milieu hostile. La technologie évolue, rendant les systèmes de communication quasiment invisibles.
            En témoigne ce nouveau dispositif : Molar Mic, développé par la société Sonitus Technologies, s’appuyant
            sur un système de transmission du son par conduction. Le potentiel de ce dispositif est tel que l’armée
            américaine vient de signer un contrat à plusieurs millions de dollars.


            <br /><br />
            &nbsp&nbsp&nbsp “Sonitus Technologies est honoré de faire évoluer sa technologie vers les forces armées
            d’élite de notre pays, les rendant plus sûres et plus efficaces en leur permettant de communiquer
            clairement,
            même dans les situations les plus extrêmes“, a déclaré Peter Hadrovic, PDG de Sonitus.


            <br /><br />
            &nbsp&nbsp&nbsp L’idée consiste à placer le dispositif sur l’une des molaires de la mâchoire supérieure
            d’un soldat.
            Les instructions sont alors transmises vers le tympan en passant par les os. De son côté, le soldat pourra
            également
            parler, celui-ci étant relié aux réseaux de communication via une connexion sans fil. Le dispositif,
            waterproof,
            pourrait notamment permettre une communication claire en milieux extrêmes ou hostiles, en libérant les
            mains
            des soldats et en faisant abstraction des bruits environnants.


            <br /><br />
            &nbsp&nbsp&nbsp Si le dispositif n’est pour l’heure prévu que pour les forces armées américaines,
            la société envisage également, à l’avenir, de collaborer avec différents secteurs privés.

            <br /><br />


        </div>

        <main id="saisieCommentaire">
                <div id="commentaire">
                    <img src="images/warning.png" width="40" height="40">
                    Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
                </div>
    
                <div>
                    <div id="listeCommentaire"></div>
    
                    <br />
                    <div id="commentaireUser">
                        <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                        <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                        <br />
                        <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                    </div>
                </div>
                
            </main>
    </div>
      `
    });
  Vue.component('article16',{
      template: `
        
        <div id="containerArticleEntier">
        <label id="titreArticleEntier">
            Un adolescent qui a piraté Apple pendant plus d’un an passe en justice
        </label>
        <img id="imageArticle" src="images/article16.jpg " width="600" height="250" style="margin-left : 24%;">
        <br /> <br />
        <div id="texteArticle">

            &nbsp&nbsp&nbsp Le journal australien The Age a rapporté un fait divers troublant ce jeudi 16 août 2018. Un
            adolescent a pendant plus d’un an circulé dans le système central d’Apple. L’année dernière, la police
            aurait finalement fait une descente chez lui pour saisir son matériel et l’inculper. L’affaire va se
            résoudre le mois prochain devant le tribunal fédéral.

            <br /><br />

            &nbsp&nbsp&nbsp Pour des raisons légales et de sécurité, l’identité du jeune homme n’a pas été révélée à la
            presse selon The Age.

            <br /><br />

            <h3><b>Le déroulé des faits</b></h3>
            &nbsp&nbsp&nbsp Alors âgé de 16 ans, le jeune homme pénètre le système central d’Apple et accède à des
            fichiers sécurisés. Pendant plus d’un an, il a donc accédé à divers fichiers dont la nature n’a pas été
            communiquée. Sur son ordinateur, les enquêteurs ont retrouvé 90 GB de données téléchargées. L’année
            dernière, les policiers ont organisé une descente chez lui et ont saisi ses ordinateurs et son matériel
            informatique.


            <br /><br />
            &nbsp&nbsp&nbsp L’entreprise Apple a alors saisi le FBI, qui a passé le dossier à l’AFP (la police fédérale
            australienne) pour lancer une enquête internationale. La procédure a été très compliquée pour les agents,
            et le tribunal de Victoria vient de repousser d’un mois l’annonce du jugement.

            <br /><br />
            &nbsp&nbsp&nbsp Mais le jeune homme a reconnu les faits : l’enquête devrait donc bientôt s’achever.

            <br /><br />
            <h3><b>À quel contenu a-t-il accédé ?</b></h3>
            &nbsp&nbsp&nbsp Apple a déclaré aujourd’hui que l’adolescent n’avait pas eu accès aux fichiers des
            utilisateurs. Mais l’enquête semble bien prouver que si.

            <br /><br />
            &nbsp&nbsp&nbsp De plus, le jeune homme semble aussi avoir pu utiliser une clé sécurisée. Il s’agit d’un
            accès au système dans lequel il agissait. Ces clés sont très difficiles à obtenir – même légalement. Selon
            l’accusé, « l’accès a fonctionné sans problèmes » pendant plus d’un an.

            <br /><br />
            <h3><b>Pourquoi l’adolescent a-t-il agi comme cela ?</b></h3>
            &nbsp&nbsp&nbsp Par le biais de son avocat, celui-ci a déclaré être un fan d’Apple, et que son rêve aurait
            été de travailler pour eux. Cela peut sembler surprenant, mais pas tant que cela. Comme dans tous les
            milieux, il faut bien prouver ses compétences pour espérer être engagé.

            <br /><br />
            <h3><b>A-t-il agi seul ?</b></h3>
            &nbsp&nbsp&nbsp Selon son avocat, la renommée de son client dans le monde des pirates informatiques est
            telle que révéler son identité pourrait le mettre en danger.

            <br /><br />
            &nbsp&nbsp&nbsp Mais les enquêteurs sont sûrs d’une chose : le jeune homme communiquait régulièrement avec
            des personnes au sujet de son intrusion. Des traces de conversations WhatsApp ont été retrouvées, mais
            aussi des messages pour l’aider, ainsi qu’un carnet complet d’instructions que le jeune homme avait nommé
            « hacky hack hack ».

            <br /><br />
            <h3><b>Et ensuite ?</b></h3>
            &nbsp&nbsp&nbsp L’affaire a été reprise dans plusieurs médias anglophones. Mais plutôt que d’être choquées
            ou indignées, de nombreuses personnes ont affirmé qu’elles voudraient voir le jeune homme réinséré chez
            Apple, puisqu’il semble en connaître les failles. Il pourrait aider à sécuriser l’entreprise davantage.

            <br /><br />
            &nbsp&nbsp&nbsp Il est troublant de constater que la sécurité d’Apple vient d’être remise en question par
            des faits, juste après qu’un autre hacker ait dénoncé les failles de l’entreprise lors d’une conférence aux
            États-Unis.

            <br /><br />



        </div>

        <main id="saisieCommentaire">
                <div id="commentaire">
                    <img src="images/warning.png" width="40" height="40">
                    Pour écrire un commentaire vous devez être connecté. <a href="authentification.html">Se connecter</a>
                </div>
    
                <div>
                    <div id="listeCommentaire"></div>
    
                    <br />
                    <div id="commentaireUser">
                        <label id="labelCommentaire" for="labelCommentaire">Commentaire : </label>
                        <textarea class="form-control rounded-0" id="commentaireUserText" rows="10"></textarea>
                        <br />
                        <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Ajouter</button>
                    </div>
                </div>
                
            </main>
    </div>
      `
    });






    Vue.component('contact',{
      template: `
        
        <div class="containerContact">
          <div class="col-md-5">
              <div class="form-area">
                  <form action="" id="formContact" method="POST" role="form">
                      <br style="clear:both">
                      <h3 style="margin-bottom: 25px; text-align: center;">Besoin de nous contacter ?</h3>
                      <div class="form-group">
                          <input type="text" class="form-control" id="name" name="name" placeholder="Nom" required>
                      </div>
                      <div class="form-group">
                          <input type="text" class="form-control" id="email" name="email" placeholder="Email" required>
                      </div>
                      <div class="form-group">
                          <input type="text" class="form-control" id="telephone" name="telephone" placeholder="Téléphone mobile"
                              required>
                      </div>
                      <div class="form-group">
                          <input type="text" class="form-control" id="objet" name="objet" placeholder="Objet" required>
                      </div>
                      <div class="form-group">
                          <textarea class="form-control" type="textarea" id="message" placeholder="Message" rows="7"></textarea>
                      </div>

                      <button type="submit" id="submit" name="submit" class="btn btn-primary pull-right">Envoyer le
                          formulaire</button>
                        <br/>
                  </form>
              </div>
          </div>
        </div>
      `
    });

    

    Vue.component('footer-page', {
        template: `
     <div class="footer">
        © 2018 Copyright: Amine AZLOUK & Ilyess MAROUF
    </div>
    `
    });


})()