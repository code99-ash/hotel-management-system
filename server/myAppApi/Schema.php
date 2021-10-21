<?php
require 'vendor/autoload.php';

use Illuminate\Database\Capsule\Manager;

Manager::schema()->dropIfExists('customers');
Manager::schema()->create('customers', function($table) {
    $table->increments('id');
    $table->string('fullname');
    $table->string('email');
    $table->string('address')->nullable();
    $table->string('phone_no')->nullable();
    $table->string('password');
    $table->enum('is_verified', ['true', 'false'])->default('false');
    $table->integer('token')->nullable();
    $table->string('remember_token')->nullable();
    $table->timestamps();
});

Manager::schema()->dropIfExists('roles');
Manager::schema()->create('roles', function($table) {
    $table->increments('id');
    $table->enum('department', ['Administrative', 'Non Administrative']);
    $table->string('role');
    $table->timestamps();
});


Manager::schema()->dropIfExists('staffs');
Manager::schema()->create('staffs', function($table) {
    $table->increments('id');
    $table->integer('role_id')->unsigned();
    $table->string('title');
    $table->string('fname');
    $table->string('lname');
    $table->enum('gender', ['male', 'female']);
    $table->string('email')->nullable();
    $table->string('address');
    $table->string('phone_no')->nullable();
    $table->string('account_no')->nullable();
    $table->string('account_name')->nullable();
    $table->string('bank_name')->nullable();
    $table->string('profile_img')->nullable();
    $table->enum('active', ['true', 'false'])->default('true');
    $table->string('password')->nullable();
    $table->enum('is_verified', ['true', 'false'])->default('true');
    $table->integer('token')->nullable();
    $table->string('remember_token')->nullable();
    $table->timestamps();
    $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
});

Manager::schema()->dropIfExists('categories');
Manager::schema()->create('categories', function($table) {
    $table->increments('id');
    $table->string('name');
    $table->float('price', 7, 2);
    $table->integer('quantity');
    $table->timestamps();
});


Manager::schema()->dropIfExists('bookings');
Manager::schema()->create('bookings', function($table) {
    $table->increments('id');
    $table->integer('customer_id')->unsigned();
    $table->integer('category_id')->unsigned();
    $table->string('payment_reference');
    $table->string('transaction_id');
    $table->integer('quantity');
    $table->float('amount', 7, 2);
    $table->integer('nights');
    $table->enum('status', ['booked', 'expired'])->default('booked');
    $table->enum('paid_with', ['paypal', 'credit card']);
    $table->integer('released_by')->unsigned();
    $table->timestamps();
    $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
});

Manager::schema()->dropIfExists('gallery');
Manager::schema()->create('gallery', function($table) {
    $table->increments('id');
    $table->integer('category_id')->unsigned();
    $table->string('image');
    $table->timestamps();
    $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
});


?>