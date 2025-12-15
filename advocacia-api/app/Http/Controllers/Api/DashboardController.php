<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CaseDeadline;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function deadlinesWeek(Request $request)
    {
        // Semana (seg -> dom) no timezone do app
        $start = Carbon::now()->startOfWeek();   // Monday
        $end   = Carbon::now()->endOfWeek();     // Sunday

        $items = CaseDeadline::query()
            ->select(['id','case_id','title','due_date','status'])
            ->whereDate('due_date', '>=', $start->toDateString())
            ->whereDate('due_date', '<=', $end->toDateString())
            ->whereIn('status', ['pendente']) // dashboard: só pendentes
            ->orderBy('due_date')
            ->limit(200)
            ->get();

        return response()->json([
            'range' => [
                'from' => $start->toDateString(),
                'to' => $end->toDateString(),
            ],
            'data' => $items,
        ]);
    }
}
