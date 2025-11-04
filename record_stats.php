<?php
// record_stats.php - Simulación para Empire & Allies
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Simular una respuesta exitosa
$response = array(
    "status" => "success",
    "message" => "Stats recorded successfully",
    "timestamp" => time()
);

echo json_encode($response);
?>