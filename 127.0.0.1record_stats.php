<?php
// 127.0.0.1record_stats.php - Proxy para GitHub Pages
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Simular respuesta exitosa
$response = array(
    "status" => "success",
    "message" => "Stats recorded via PHP proxy",
    "timestamp" => time(),
    "player" => "ZTK",
    "session" => "empire_game"
);

echo json_encode($response);
?>