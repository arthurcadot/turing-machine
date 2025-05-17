<?php
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if ($data) {
    file_put_contents('/assets/js/partie/classique_facile_6.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Invalid data"]);
}
?>
