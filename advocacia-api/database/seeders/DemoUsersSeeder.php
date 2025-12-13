<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUsersSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['username' => 'advogado01'],
            [
                'email' => 'adv1@local.test',
                'password' => Hash::make('Advogado12'),
                'role' => 'advogado',
                'can_access_finance' => false,
            ]
        );
    }
}
