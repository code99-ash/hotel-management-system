<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require 'config.php';

if(isset($_GET['categCounts'])) {
    $query = "SELECT categories.name as name, count(bookings.id) as count from bookings right join categories on categories.id = bookings.category_id group by categories.name";

    $result = mysqli_query($dbc, $query) or die('There is a problem making this query');
    if($result) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data);
    }
}

if(isset($_GET['bookingChartdata'])){
    $query = "SELECT sum(bookings.amount) as sum, DATE_FORMAT(created_At,'%M') as month FROM `bookings` where year(created_at) = year(CURDATE())";

    $result = mysqli_query($dbc, $query) or die('There is a problem making this query');
    if($result) {
        $chartData = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($chartData);
    }
}

?>