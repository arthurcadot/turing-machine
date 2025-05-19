<?php
// Supprime le cookie
setcookie('mdp_cookie_admin', '', time() - 3600, "/", "", false, true);
header("Location: index.php");
exit();
