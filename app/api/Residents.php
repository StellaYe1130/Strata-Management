<?php
header('Content-Type: application/json');

$Residents = [
    [
        "name" => "Stella",
        "unit" => "807",
        "email" => "stella@gmail.com",
        "phone" => "0412345678"
    ],
    [
        "name" => "Zimo",
        "unit" => "805",
        "email" => "Zimo@outlook.com",
        "phone" => "0498763524"
    ],
    [
        "name" => "Hiky",
        "unit" => "803",
        "email" => "Hiky@qq.com",
        "phone" => "0475622713"
    ]
];

echo json_encode($Residents);
?>
