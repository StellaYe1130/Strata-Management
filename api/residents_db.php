<?php
$servername = "localhost";
$username = "root";
$password = "720608Sy"; 
$dbname = "strata_management";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM residents";
$result = $conn->query($sql);

$residents = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $residents[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($residents);

$conn->close();
?>
