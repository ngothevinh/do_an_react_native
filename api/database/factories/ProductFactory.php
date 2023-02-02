<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'price' => $this->faker->numberBetween($min = 0, $max = 1000000),
            'description' => $this->faker->text(),
            'isOff' => $this->faker->boolean(),
            'isAvailable' => $this->faker->boolean(),
            'offPercentage' => $this->faker->numberBetween($min = 1, $max = 100),
            'image' => $this->faker->imageUrl($width=400, $height=400),
            'imageList' => 'test image list',



        ];
    }
}
