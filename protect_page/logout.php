<?php
// Supprime le cookie
setcookie('mdp_cookie_client', '', time() - 3600, "/", "", false, true);
header("Location: index.php");
exit();
