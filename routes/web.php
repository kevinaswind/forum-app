<?php

use App\Http\Controllers\ForumSubmissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/forum/create', [ForumSubmissionController::class, 'create'])
    ->name('forum.create');

Route::post('/forum/validate-step', [ForumSubmissionController::class, 'validateStep'])
    ->name('forum.validate-step');

Route::post('/forum', [ForumSubmissionController::class, 'store'])
    ->name('forum.store');

Route::get('/forum/success', function () {
    return Inertia::render('form-submission/success');
})->name('forum.success');

require __DIR__.'/settings.php';
