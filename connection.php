<?php
require_once('protect_page/code.php');
?>

<div class="container container-connection">
    <h1>Connexion</h1>
    <div class="form">
        <p>Entrez votre identifiant à 7 chiffres :</p>
        <input class="btn" type="text" id="codeInput" maxlength="7" placeholder="XXXXXXX" inputmode="numeric" autofocus style="text-align: center">
        <button class="btn btn-blue" id="btn_submit">Valider</button>
    </div>
    <button class="btn btn-yellow" id="btn_accueil">Retour</button>
</div>