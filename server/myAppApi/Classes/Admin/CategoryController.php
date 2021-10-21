<?php
class CategoryController
{
    private $id;
    private $name;
    private $price;
    private $quantity;

    private function checkCategory()
    {
        $categ = Category::where('name', $this->name)->get();
        return count($categ) == 0 ? false : true; // false if not exist
    }

    public function addCategory($name, $price, $quantity)
    {
        $this->name = $name;
        $this->price = $price;
        $this->quantity = $quantity;

        if (!$this->checkCategory()) {
            // if false
            try {
                Category::create([
                    'name' => $this->name,
                    'price' => $this->price,
                    'quantity' => $this->quantity,
                ]);

                echo "Category $this->name is added successfully";
            } catch (Exception $e) {
                echo $e;
            }
        } else {
            echo "Catgeory $this->name already exist";
        }
    }

    public function editCategory($id)
    {
        $categ = Category::where('id', $id)->get();
        return $categ;
    }

    public function updateCategory($id, $name, $price, $quantity)
    {
        Category::where('id', $id)->update([
            'name' => $name,
            'price' => $price,
            'quantity' => $quantity,
        ]);

        echo 'Successfully updated Catgory';
    }

    public function deleteCategory($id)
    {
        $this->id = $id;
        if (is_array($this->id)) {
            Category::whereIn('id', $this->id)->delete();
        } else {
            Category::where('id', $this->id)->delete();
        }
        echo 'successfully deleted category';
    }
}
?>
