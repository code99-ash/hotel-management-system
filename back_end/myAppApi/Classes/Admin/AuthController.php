<?php
// $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
// $dotenv->load();
use \Firebase\JWT\JWT;

class AuthorizeUser {
    public function jwtAuth($email) {
        $details = [
            'iss' => 'localhost:3000',
            'iat' => time(),
            'nbt' => time(),
            'exp' => time() + 3600,
            'info'=> [
                'email' => $email
            ]
        ];

        $jwt = JWT::encode($details, '12345');
        if($jwt) {
            return $jwt;
        }
    }

    public function jwtCheck($email, $token) {
        $check = \JWT::decode($token, '12345', ["HS256"]);
        return ($check->info->email == $email)? true:false;
    }
}

?>