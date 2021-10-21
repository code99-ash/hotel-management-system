<?php
require '../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable('../');
$dotenv->load();
use Firebase\JWT\JWT;

class CustomerController
{
    protected $id,
        $fullname = null,
        $address = null,
        $phoneNo = null,
        $password = null,
        $isVerified = null;

    public $email = null;
    public $token = null;
    public $rememberToken = null;
    public $jwt = null;

    public function checkCustomer()
    {
        $customer = Customer::where('email', $this->email)->get();
        return count($customer) == 0 ? false : true; //false if not exist
    }

    public function newCustomer(
        $fullname,
        $email,
        $address,
        $phoneNo,
        $password
    ) {
        $this->fullname = $fullname;
        $this->email = $email;
        $this->password = $password;
        $this->address = $address;
        $this->phoneNo = $phoneNo;
        $this->isVerified = 'false';

        $options = [
            'cost' => 10,
        ];

        if (!$this->checkCustomer()) {
            $newToken = mt_rand(100000, 999999);
            $rememberToken = SHA1($this->email);

            try {
                Customer::create([
                    'fullname' => $this->fullname,
                    'email' => $this->email,
                    'password' => password_hash(
                        $this->password,
                        PASSWORD_DEFAULT
                    ),
                    'address' => $this->address,
                    'phone_no' => $this->phoneNo,
                    'is_verified' => $this->isVerified,
                    'token' => $newToken,
                    'remember_token' => $rememberToken,
                ]);
                $this->token = $newToken;
                $this->rememberToken = $rememberToken;
                return true;
            } catch (Exception $e) {
                echo $e;
            }
        } else {
            echo 'Credentials already exist';
        }
    }

    public function Login($email, $pass)
    {
        $this->email = $email;
        $this->password = $pass;
        $isVerified = $hash = null;

        $customer = Customer::where('email', $email)
            ->where('is_verified', 'true')
            ->get();

        if (count($customer) > 0) {
            $isVerified = $customer->first()->is_verified;
            $hash = $customer->first()->password;
        }

        $isValidPassword = password_verify($pass, $hash);

        if ($isValidPassword && !empty($isValidPassword)) {
            $user = $customer->first();
            $secret_key = $_ENV['SECRET_KEY'];
            $issuer_claim = $_ENV['ISSUER_CLAIM']; // this can be the servername
            $audience_claim = $_ENV['AUDIENCE_CLAIM'];
            $issuedat_claim = time(); // issued at
            $expire_claim = $issuedat_claim + 30 * 60; // expire time in seconds

            $token = [
                'iss' => $issuer_claim,
                'aud' => $audience_claim,
                'iat' => $issuedat_claim,
                'exp' => $expire_claim,
                'data' => [
                    'email' => $email,
                ],
            ];
            http_response_code(200);

            $jwt = JWT::encode($token, $secret_key);
            $this->jwt = $jwt;
            echo json_encode([
                'message' => 'success',
                'token' => $jwt,
                'user' => $user,
                'expiresIn' => $expire_claim,
            ]);
        } else {
            echo json_encode([
                'message' => 'failed',
                'content' => 'incorrect Email/Password'
                ]);
        }
    }

    public function refreshTo($token)
    {
        $secret_key = $_ENV['SECRET_KEY'];
        $issuer_claim = $_ENV['ISSUER_CLAIM']; // this can be the servername
        $audience_claim = $_ENV['AUDIENCE_CLAIM'];
        $issuedat_claim = time() + 30 * 60; // issued at
        $expire_claim = $issuedat_claim + 60; // expire time in seconds

        $decoded = JWT::decode($token, $_ENV['SECRET_KEY'], ['HS256']);
        $email = $decoded['data']['email'];
        $customer = Customer::where('email', $email)
            ->where('is_verified', 'true')
            ->get();
        $user = $customer->first();

        if ($decoded) {
            $token = [
                'iss' => $issuer_claim,
                'aud' => $audience_claim,
                'iat' => $issuedat_claim,
                'exp' => $expire_claim,
                'data' => [
                    'email' => $email,
                ],
            ];
            http_response_code(200);

            $jwt = JWT::encode($token, $secret_key);
            return response(
                [
                    'message' => 'success',
                    'token' => $jwt,
                    'user' => $user,
                    'expiresIn' => $expire_claim,
                ],
                200
            );
        }
    }
}

?>
