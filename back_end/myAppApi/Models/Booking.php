<?php
use Illuminate\Database\Eloquent\Model;

class Booking extends Model {
    // protected $fillable = ['name'];
    protected $guarded = [];


    public function customer() {
        return $this->belongsTo(Customer::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }
}

?>