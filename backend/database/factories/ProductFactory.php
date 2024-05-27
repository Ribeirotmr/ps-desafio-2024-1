<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'name' => $this->faker->name(),
            'amount' => $this->faker->randomNumber(2),
            'price' => $this->faker->randomFloat(2, 0, 8),
            'image' => $this->faker->imageUrl(),
            'category_id' => fn () => Category::factory()->create()->id,



        ];
    }
}
