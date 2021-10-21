<?php
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model {
    protected $table = 'gallery';
    protected $guarded = [];


    public function category() {
        return $this->belongsTo(Category::class);
    }
}

?>