<?php

use App\Http\Controllers\Api\FundController;
use Illuminate\Support\Facades\Route;

Route::prefix('search')->group(function () {
    Route::get('/', [FundController::class, 'search']);
});

Route::prefix('scheme')->group(function () {
    Route::get('{code}', [FundController::class, 'show']);
    Route::get('{code}/latest', [FundController::class, 'latest']);
    Route::get('{code}/history', [FundController::class, 'history']);
});
