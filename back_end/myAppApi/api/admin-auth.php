<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require '../vendor/autoload.php';
use \Firebase\JWT\JWT;

$role = new RoleController;
$staff = new StaffController;

$data = [
    'status' => 'error',
    'message' => '',
    'jwt' => ''
];

if(isset($_POST['adminlogin'])) {
    $staff = new StaffController;
    $authorize = new AuthorizeUser;

    $email = $_POST['email'];
    $pass = $_POST['password'];

    

    if($staff->Login($email, $pass)) { // if true, credential exist
        
        $staffData = Staff::where('email', $email)->get()->first();
        $roleData = Role::where('id', $staffData->id)->first();
        
        $data['status'] = 'success';
        $data['message'] = ['staffData' => $staffData, 'roleData' => $roleData];
        $data['jwt'] = $authorize->jwtAuth($email);

        echo json_encode($data);

    } else {
        $data['message'] = 'Email/Password is incorrect';
        echo json_encode($data);
    }
}

if(isset($_POST['changePassword'])) {
    $email = $_POST['email'];
    $curr_pass = $_POST['curr_pass'];
    $new_pass = $_POST['new_pass'];

    $staff->changePassword($email, $curr_pass, $new_pass);
}

if(isset($_POST['changeEmail'])) {
    $id = $_POST['id'];
    $email = $_POST['email'];
    $staff->changeEmail($id, $email);
}

if(isset($_POST['changePicture'])) {
    $oldfile = $_POST['oldFile'];
    $newfile = $_FILES['newFile'];
    $userId = $_POST['userId'];

    $staff->changeProfilePicture($userId, $oldfile, $newfile);
}

?>