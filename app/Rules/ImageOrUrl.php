<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;

class ImageOrUrl implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Check if the value is a valid image file or a string
        if (is_string($value)) {
            return;
        }
        if ($value instanceof UploadedFile) {
            // The object is a file (including images)
            
            if ($value->isValid() && in_array($value->getMimeType(), ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'])) {
                // The object is a valid image file (JPEG, PNG, JPG, GIF)
                return;
            }
        }
        // If neither condition is met, the validation fails
        $fail("The $attribute must be a valid image file.");
    }

    
}
