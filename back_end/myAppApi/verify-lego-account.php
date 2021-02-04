<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require 'vendor/autoload.php';

if(isset($_GET['email']) && isset($_GET['token'])) {
    $email = $_GET['email'];
    $token = $_GET['token'];
    
    $account = Customer::where('email', $email)
                        ->where('remember_token', $token)
                        ->get();
    if(count($account) > 0) {
        if(
                Customer::where('email', $email)->update([
                    'is_verified' => 'true'
            ])
        ) {
            echo json_encode(array(
                'msg' => "Congratulations, your account has been successfully verified !!",
                'status' => 'success'
            ));
        } else {
            echo json_encode(array(
                'msg' => "",
                'status' => 'failes'
            ));
        }
    }

}

?>