<?php
use Illuminate\Database\Eloquent\Model;

class Customer extends Model {
    // protected $fillable = ['name'];
    protected $guarded = [];


    public function bookings() {
        return $this->hasMany(Booking::class);
    }
}

?>