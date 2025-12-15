<?php

namespace App\Support;

class Normalizer
{
    public static function onlyDigits(?string $value): ?string
    {
        if ($value === null) return null;

        $digits = preg_replace('/\D+/', '', $value);
        return $digits === '' ? null : $digits;
    }

    public static function email(?string $value): ?string
    {
        if ($value === null) return null;

        $email = mb_strtolower(trim($value));
        return $email === '' ? null : $email;
    }
}
