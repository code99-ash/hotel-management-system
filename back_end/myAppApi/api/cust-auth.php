<?php

require '../vendor/autoload.php';
require 'sendmail.php';

use \Firebase\JWT\JWT;
header("Access-Control-Allow-Origin: *");

$cust = new CustomerController();

if (isset($_POST['newCustomer'])) {
    $fullName = $_POST['fullName'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $phoneNo = $_POST['phoneNo'];
    $password = $_POST['password'];

    $cust->email = $email;
    if ($cust->checkCustomer()) {
        echo "$cust->email already exist";
    } else {
        if (
            $cust->newCustomer(
                $fullName,
                $cust->email,
                $address,
                $phoneNo,
                $password
            )
        ) {
            $token = Customer::where('email', $cust->email)
                ->select('remember_token')
                ->get()
                ->first()->token;

            $body = "<h4>Welcome to Lego Hotel</h4><p>You have successfully created an account with us, we need you to Verify your email by clicking the link <a href='localhost/api/myAppApi/verify-lego-account.php?email=$cust->email&&token=$cust->rememberToken'>verify email</a> or <br />
            copy the link below <br /> http://localhost:3000/verify-account/$cust->email/$cust->rememberToken";

            if (sendMail($cust->email, $body)) {
                echo 'Successfully created and a token is sent to your mail for verification';
            } else {
                $cust->deleteCustomer($email);
            }
        }
    }
}

if(isset($_POST['customerLogin'])) {
    $email = $_POST['email'];
    $pass = $_POST['password'];
    
    $cust->Login($email, $pass);
}

if(isset($_GET['decodeUser'])) {
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    $allHeaders = getallheaders();
    $jwt = $allHeaders['Authorization'];
    if($jwt) {
        try {
            $decoded = JWT::decode($jwt, $_ENV['SECRET_KEY'], array('HS256'));
            echo json_encode(array(
                'message' => 'success',
                'jwt' => $decoded
            ));
        } catch(Exception $e) {
            echo json_encode(array(
                "message" => "Access denied",
                "error" => $e->getMessage()
            ));
        }
    }
}

if(isset($_GET['refreshToken'])) {
    $token = $_GET['token'];
    $cust->refreshTo($token);
}

?>
