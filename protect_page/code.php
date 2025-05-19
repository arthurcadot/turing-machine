<?php
// Clé secrète (identique à celle de secret.php)
define('CLE_SECRETE', 'C7tu2Y*p2rKZ!gV9');
$mot_de_passe_correct = 'labo25!';

// Jeton attendu
$token_attendu = hash('sha256', $mot_de_passe_correct . CLE_SECRETE);

// Vérification du cookie uniquement
if (!isset($_COOKIE['mdp_cookie_client']) || $_COOKIE['mdp_cookie_client'] !== $token_attendu) {
    // Supprime le cookie
    setcookie('mdp_cookie_client', '', time() - 3600, "/", "", false, true);

    // Redirection
    if ((array_reverse(explode("/", getcwd())))[0] == "protect_page") {
        header('Location: index.php');
        exit();
    } else {
        header('Location: protect_page/code.php');
        exit();
    }
}
