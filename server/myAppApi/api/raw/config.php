<?php
require '../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable('../../');
$dotenv->load();

$host = $_ENV['DATABASE_HOST'];
$user = $_ENV['DATABASE_USER'];
$pass = $_ENV['DATABASE_PASSWORD'];
$name = $_ENV['DATABASE_NAME'];

$dbc = mysqli_connect($host, $user, $pass, $name) or die('There is a problem conecting to the server');

?>