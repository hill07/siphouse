<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FundController;

Route::get('/', [FundController::class, 'index'])->name('home');
Route::get('/search', [FundController::class, 'search'])->name('search');
Route::get('/fund/{scheme_code}', [FundController::class, 'show'])->name('fund.show');
