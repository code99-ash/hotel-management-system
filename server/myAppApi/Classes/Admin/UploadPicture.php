<?php

class UploadPicture {
    public $path = ('../uploads/profile/');
    public $fileTmp;
    public $fileName;
  
    public function uploadProfilePicture($file) {
        if($file) {
            $this->fileTmp = $file['tmp_name'];
            $file_target = $this->path . basename($file['name']);
            $extension = strtolower(pathinfo($file_target, PATHINFO_EXTENSION));
            
            $this->fileName = time() . '.' . $extension;
            return (move_uploaded_file($this->fileTmp, $this->path.$this->fileName))? true:false;
        } else {
            echo "Not a file";
        }
        // if successful, return false
    }

    protected function unlinkFile($oldfile) { //Delete Picture
        if (file_exists($this->path . $oldfile)) {
            unlink($this->path . $oldfile);
        }
    }

    public function changePicture($userId, $oldfile, $newfile) { // Update Picture
        $this->path = '../uploads/profile/';
        $file_target = $this->path . basename($newfile['name']);
        $extension = strtolower(pathinfo($file_target, PATHINFO_EXTENSION));
        $this->fileName = time() . '.' . $extension;
        // echo json_encode($this->fileName);
            move_uploaded_file($newfile['tmp_name'], $this->path . $this->fileName);
            $this->unlinkFile('../'.$this->path . $oldfile);
            Staff::where('id', $userId)->update([
                'profile_img' => $this->fileName
            ]);
            echo $this->fileName;
        
        
    }

}

?>