<?php
setcookie('mdp_cookie_client', '', time() - 3600, "/", "", false, true);
?>
<!DOCTYPE html>
<html xml:lang="fr">
<head>
    <title>Formulaire - Page sécurisé</title>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <link rel="stylesheet" href="../../assets/css/style.css" />
</head>
<body>
    <form action="secret.php" method="post" class="container container-client">
        <h1>Connection a Client</h1>
        <p>Entrez votre mot de passe :</p>
        <input class="btn no-upercase"  type="password" name="mot_de_passe" maxlength="7" placeholder="Password" autocomplete="off" style="text-align: center;width: calc(100% - 32px);">
        <button class="btn btn-blue" type="submit">Valider</button>
    </form>
</body>

</html>
