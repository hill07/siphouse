<?php

use Illuminate\Support\Facades\Schedule;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('mf:sync-nav')
    ->dailyAt('22:30')
    ->timezone('Asia/Kolkata')
    ->appendOutputTo(storage_path('logs/nav-sync.log'));
