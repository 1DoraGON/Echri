<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\Rule;

class PaymentMethodValidationRule implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $allowedStatuses = ['CIB', 'EDAHABIA', 'POSTE'];

        return in_array($value, $allowedStatuses);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be one of: CIB, EDAHABIA, Algeria Poste Payment';
    }
}
