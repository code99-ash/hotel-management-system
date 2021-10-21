<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require '../vendor/autoload.php';

if(isset($_GET['bookings'])) {
    $userId = $_GET['userId'];
    $cust_Bookings = Booking::where('customer_id', $userId)
                            ->select('bookings.*', 'categories.name as cat_name')
                            ->where('status', 'booked')
                            ->join('categories', 'categories.id', '=', 'bookings.category_id')
                            ->get();
    echo json_encode($cust_Bookings);
}

?>