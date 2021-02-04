<?php
use Illuminate\Database\Eloquent\Model;

class Category extends Model {
    // protected $fillable = ['name'];
    protected $guarded = [];

    public function bookings() {
        return $this->hasMany(Booking::class);
    }

    public function galleries() {
        return $this->hasMany(Gallery::class);
    }

}

?>