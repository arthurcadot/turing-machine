<?php
// Clé secrète (personnalisée et confidentielle)
define('CLE_SECRETE', 'C7tu2Y*p2rKZ!gV9');

// Mot de passe à protéger
$mot_de_passe_correct = 'labo25!';

if (isset($_POST['mot_de_passe']) && $_POST['mot_de_passe'] === $mot_de_passe_correct) {
    // Crée un jeton sécurisé
    $token = hash('sha256', $mot_de_passe_correct . CLE_SECRETE);

    // Cookie valable 4 mois
    setcookie('mdp_cookie_admin', $token, time() + (1 * 3600), "/", "", false, true); // HTTPOnly = true

    header('Location: ../index.php');
    exit();
} else {
    // Supprime le cookie en cas d'échec
    setcookie('mdp_cookie_admin', '', time() - 3600, "/", "", false, true);
    header('Location: index.php');
    exit();
}
