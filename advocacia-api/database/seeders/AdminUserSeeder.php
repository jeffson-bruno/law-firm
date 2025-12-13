<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['username' => 'admin01'],
            [
                'email' => 'admin@local.test',
                'password' => Hash::make('Admin1234'),
                'role' => 'admin',
                'can_access_finance' => true,
            ]
        );
    }
}
