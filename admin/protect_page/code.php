<?php
if ($_SESSION["mdp"] == false) // Si le mot de passe est mauvais
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
        session_unset();
    }
    if ((array_reverse(explode("/", getcwd())))[0] == "protect_page") {
        header('Location: index.php');
        exit();
    } else {
        header('Location: protect_page/code.php');
        exit();
    }
}
