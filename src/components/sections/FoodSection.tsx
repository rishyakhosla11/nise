import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FoodSection = () => { 
  const [foodItems, setFoodItems] = useState<string[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() === "") return;
    setFoodItems(prev => [...prev, newItem.trim()]);
    const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    unit: "pcs",
    expirationDate: "",
    category: "Produce"
  });
    setNewItem("");
  };

  const removeItem = (index: number) => {
    setFoodItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Fridge Inventory</h2>

      <div className="flex gap-2">
        <Input
          placeholder="Enter food item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button onClick={addItem}>Add</Button>
      </div>

      <ul className="list-disc pl-6 space-y-1">
        {foodItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{item}</span>
            <Button variant="ghost" onClick={() => removeItem(index)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodSection;
