<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require '../vendor/autoload.php';

$role = new RoleController();
$staff = new StaffController();
$cust = new CustomerController();
$categ = new CategoryController();
$book = new BookingController();
$gallery = new GalleryController();

$f = null;
if(isset($_GET['getRoles'])) {
    $roles = Role::where('role', '<>', 'Admin')->get();
    echo $roles;
}
if(isset($_GET['getCategories'])) {
    $categ = Category::all();
    echo $categ;
}
if(isset($_POST['newCategory'])) {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];
    $categ->addCategory($name, $price, $quantity);
}

if(isset($_POST['addRole'])) {
    $name = $_POST['name'];
    $dept = $_POST['department'];
    $role->addRole($name, $dept);
}

if(isset($_POST['addstaff'])) {
    $title = $_POST['title'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $files = $_FILES['file'];
    $phoneNo = $_POST['tel'];
    $password = $_POST['lname'];
    $address = $_POST['address'];
    $department = $_POST['department'];
    $roleId = $_POST['role'];
    $gender = $_POST['gender'];
    $accountNo = $_POST['accountNo'];
    $accountName = $_POST['accountName'];
    $bankName = $_POST['bankName'];
    $active = 'true';
    
    $staff->newStaff($title, $fname, $lname, $email, $gender, $address, $phoneNo, $password, $roleId, $files, $accountNo, $accountName, $bankName, $active); 
}

if(isset($_GET['getStaffs'])) {
    $staffs = Staff::select('*')
                    ->join('roles', 'roles.id', '=', 'staffs.role_id')->get();
    echo $staffs;
}

if(isset($_POST['newCustomer'])) {
    $fullname = $_POST['fullName'];
    $email = $_POST['email'];
    $phoneNo = $_POST['phoneNo'];
    $address = $_POST['address'];
    $password = $_POST['password'];

    $cust->newCustomer($fullname, $email, $address, $phoneNo, $password);
}

if(isset($_POST['bookRoom'])) {
    $customerId = $_POST['customerId'];
    $categoryId = $_POST['categoryId'];
    $quantity = $_POST['quantity'];
    $amount = $_POST['amount'];
    $paidWith = $_POST['paidWith'];
    $paymentReference = $_POST['paymentReference'];
    $transactionId = $_POST['transactionId'];

    if(
        $book->addBookings(
            $customerId,
            $categoryId,
            $quantity,
            $amount,
            $paidWith,
            $paymentReference,
            $transactionId
        )
    ) {
        echo 'Your booking is successful';
    } else {
        echo 'Booking failed';
    }
}

if(isset($_GET['allBookings'])) {
    $book->allBookings();
}

if(isset($_GET['getGallery'])) {
    $gallery->fetchGallery();
}

if(isset($_POST['newGalleryFile'])) {
    $catId = $_POST['categoryId'];
    $file = $_FILES['image'];
    $gallery->uploadGalleryFile($catId, $file);
}

if(isset($_GET['fetchCounts'])) {
    $revenue = Booking::whereRaw('year(`created_at`) = ?', array(date('Y')))->sum('bookings.amount');
    $customers = count(Customer::all());
    $bookings = count(Booking::all());

    echo json_encode([
        'revenue' => $revenue,
        'customers' => $customers,
        'bookings' => $bookings,
    ]);
}

if(isset($_GET['deleteFromGallery'])) {
    $ids = $_GET['selected'];
    $gallery->deleteFiles($ids);
}

if(isset($_GET['roomAvailability'])) {
    $checkIn = $_GET['checkIn'];
    $nights = $_GET['nights'];
    $categoryId = $_GET['categoryId'];
    $quantity = $_GET['quantity'];

    // $availability = Booking::where('category_id', $categoryId)
    //         ->where('quantity', '>', $quantity)
    //         ->get();
    // return $availability;
    $checkQuantity = Category::where('category_id', $categoryId)
                            ->where('quantity', '>', $quantity);
    if(count($checkQuantity) == 0) {
        echo 'We dont have that much rooms available';
    } else {
        
        // AFTER EXPIRATION
        // select sum(quantity) as sum from booking where category_id is ? and (current_time-created_at) > no-of-nights -- (ie after expiration)
        // CHECK AVAILABLE QUANTITY
        //return (sum >= $quantity)? 'room is available':'';
        
        // BEFORE EXPIRATION
        // select *, sum(quantity) as sum from booking where category_id is ? ($checkIn + $nights) < $available_checkIns before expiration
        // CHECK AVAILABLE QUANTITY
        // Now select sum of each booking where their quantities >= $quantity and (checkIn + nights) < $checkIn
    }
    
}



?>