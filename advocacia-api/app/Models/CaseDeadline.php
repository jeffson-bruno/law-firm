<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CaseDeadline extends Model
{
    protected $fillable = [
        'case_id',
        'title',
        'due_date',
        'status',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'date:Y-m-d',
        ];
    }
}
