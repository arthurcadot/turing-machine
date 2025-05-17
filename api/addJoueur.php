<?php
$file = "/assets/js/joueur.json";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input["id"]) || !isset($input["pseudo"])) {
        echo json_encode(["success" => false, "message" => "Données invalides."]);
        exit;
    }

    $id = strval($input["id"]);
    $pseudo = $input["pseudo"];

    $data = json_decode(file_get_contents($file), true);

    $data["joueur"][] = ["id" => $id, "pseudo" => $pseudo,"note" => "","signer" => "","bloquer" => false, "resultats" => []];

    if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'enregistrement."]);
    }
}
?>
