<?php
class BookingController
{
    public function addBookings(
        $customerId,
        $categoryId,
        $quantity,
        $amount,
        $paidWith,
        $paymentReference,
        $transactionId
    ) {
        if($this->reduceQuantity($quantity, $categoryId)) {
            if(
                Booking::create([
                    'customer_id' => $customerId,
                    'category_id' => $categoryId,
                    'payment_reference' => $paymentReference,
                    'transaction_id' => $transactionId,
                    'quantity' => $quantity,
                    'amount' => $amount,
                    'paid_with' => $paidWith
                ])
            ) {
                return true;
            } else {
                return false;
        }
        }
    }

    public function reduceQuantity($qty, $cat_id) {
        if(Category::where('id', $cat_id)->decrement('quantity', $qty)) {
            return true;
        } else {
            return false;
        }
    }

    public function allBookings() {
        echo Booking::select('bookings.*', 'categories.name as cat_name', 'customers.fullname as cust_name')
                    ->join('categories', 'categories.id', '=', 'bookings.category_id')
                    ->join('customers', 'customers.id', '=', 'bookings.customer_id')
                    ->get();
    }

    public function countBookings() {
        Booking::select(count('bookings.*'), count('categories.quantity'))
                ->join('categories', 'categories.id', '=', 'bookings.category_id')
                ->groupBy('category_id')
                ->get();
    }


}
?>
