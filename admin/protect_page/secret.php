<?php
session_start();

if (isset($_POST['mot_de_passe']) && $_POST['mot_de_passe'] === "labo25!") { // Mot de passe à changer
    $_SESSION["mdp"] = true;
    header('Location: ../index.php');
    exit();
} else {
    session_unset();
    session_destroy();
    header('Location: index.php');
    exit();
}
?>

<!DOCTYPE html>
<html xml:lang="fr">
<head>
    <title>Mot de passe - Page sécurisée</title>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
</head>
<body>
</body>
</html>
