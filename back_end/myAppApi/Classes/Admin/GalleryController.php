<?php

class GalleryController {
    public $path = ('../uploads/gallery/');
    public $fileTmp;
    public $fileName;
  
    public function fetchGallery() {
        echo Gallery::select('gallery.*', 'categories.name')
                    ->join('categories', 'categories.id', '=', 'gallery.category_id')
                    ->orderBy('categories.name')
                    ->get();
    }

    public function uploadGalleryFile($category_id, $file) {
        if($file) {
            $this->fileTmp = $file['tmp_name'];
            $file_target = $this->path . basename($file['name']);
            $extension = strtolower(pathinfo($file_target, PATHINFO_EXTENSION));
            
            $this->fileName = time() . '.' . $extension;
            if(move_uploaded_file($this->fileTmp, $this->path.$this->fileName)) {
                if(
                    Gallery::create([
                        'category_id' => $category_id,
                        'image' => $this->fileName
                    ])
                ) {
                    echo $this->fileName;
                }
            }
        } else {
            echo "Not a file";
        }
        // if successful, return false
    }

    protected function unlinkGalleryFile($oldfile) { //Delete Picture
        if (file_exists($this->path . $oldfile)) {
            unlink($this->path . $oldfile);
        }
    }

    public function deleteFiles($ids) {
        try {
            foreach($ids as $ids) {
                $this->unlinkGalleryFile($ids);
            }
            Gallery::whereIn('image', $ids)->delete();

        } catch(Exception $e) {
            echo $e;
        }
                
    }

}

?>