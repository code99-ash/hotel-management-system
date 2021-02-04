<?php
 class StaffController extends UploadPicture {
    public $staff = [];
    protected $id;
    protected $title = null,
            $fname = null,
            $lname = null,
            $email = null,
            $gender = null,
            $address = null,
            $phoneNo = null,
            $password = null,
            $isVerified = null,
            $token = null,
            $rememberToken = null,
            $roleIid = null,
            $files = null,
            $accountNo = null,
            $accountName = null,
            $bankName = null,
            $active = null;
    

    protected function checkStaff()
    {
        $staff = Staff::where('email', $this->email)->get();
        return count($staff) == 0 ? false : true; //false if not exist
    }

    public function newStaff($title, $fname, $lname, $email, $gender, $address, $phoneNo, $password, $roleId, $files, $accountNo, $accountName, $bankName, $active) 
    {
        $this->title = $title;
        $this->fname = $fname;
        $this->lname = $lname;
        $this->email = $email;
        $this->gender = $gender;
        $this->password = $password;
        $this->address = $address;
        $this->phoneNo = $phoneNo;
        $this->isVerified = 'true';
        $this->roleId = $roleId;
        $this->files = $files;
        $this->accountNo = $accountNo;
        $this->accountName = $accountName;
        $this->bankName = $bankName;
        $this->active = $active;

        if (!$this->checkStaff()) {
            try {
                if($this->uploadProfilePicture($this->files)) {
                    Staff::create([
                        'role_id'       => $this->roleId,
                        'title'         => $this->title,
                        'fname'         => $this->fname,
                        'lname'         => $this->lname,
                        'email'         => $this->email,
                        'gender'        => $this->gender,
                        'password'      => password_hash(
                                            $this->password,
                                            PASSWORD_BCRYPT
                                        ),
                        'address'       => $this->address,
                        'phone_no'      => $this->phoneNo,
                        'is_verified'   => $this->isVerified,
                        'token'         => mt_rand(100000, 999999),
                        'remember_token' => SHA1($this->email),
                        'profile_img'         => $this->fileName,
                        'account_no'         => $this->accountNo,
                        'account_name'         => $this->accountName,
                        'bank_name'         => $this->bankName,
                    ]);
                    echo 'Successfully created staff';
                } else {
                    echo "Could not upload file";
                }

            } catch (Exception $e) {
                echo $e;
            }
        } else {
            echo 'Credentials already exist';
        }
    }


    public function Login($email, $pass) {
        $this->email = $email;
        $this->password = $pass;
        $isVerified = $hash = null;
        
        $staff = Staff::where('email', $email)->get();

        if(count($staff) > 0) {
            $isVerified = $staff->first()->is_verified;
            $hash = $staff->first()->password;
        }

        $isValidPassword = password_verify($pass, $hash);

        if((count($staff) == 0) || !$isValidPassword) {
            return false; // Email/Password Incorrect
        } else {
            return true; //Email && password is valid
        }
    }

    public function selectStaff($email, $pass) {
        $staff = Staff::where('active', 'true')->get();
        if(count($staff) > 0) {
            $this->staff = $staff;
        } else {
            return false;
        }
    }

    public function changePassword($email, $currPass, $newPass) {
        $staff = Staff::where('email', $email)->get()->first();
        $hash = $staff->password;
        $isValidPassword = password_verify($currPass, $hash);

        if(!$isValidPassword) {
            $res = [
                'status' => 'error',
                'message' => 'Incorrect Password'
            ];
        } else {
            if(
                Staff::where('email', $email)->update([
                    'password' => password_hash($newPass,PASSWORD_BCRYPT)
                ])
            ) {
                $res = [
                    'status' => 'success',
                    'message' => 'Password successfully changed'
                ];
            } else {
                $res = [
                    'status' => 'error',
                    'message' => 'There is a problem changing password'
                ];
            }
        }

        echo json_encode($res);
    }

    public function changeEmail($id, $email) {
        if(Staff::where('id', $id)->update([
            'email' => $email
        ])) {
            $res = [
                'status' => 'success',
                'message' => 'Email successfully changed',
                'email' => $email
            ];
        } else {
            $res = [
                'status' => 'error',
                'message' => 'There is a problem changing email'
            ];
        }

        echo json_encode($res);
        
    }

    public function changeProfilePicture($userId, $oldfile, $newfile) {
        $this->changePicture($userId, $oldfile, $newfile);
        
    }

   

 }
 
?>