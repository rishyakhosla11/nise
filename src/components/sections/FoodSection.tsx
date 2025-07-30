import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


import { 
  Scan, 
  Plus, 
  Trash2, 
  Calendar,
  Package,
  AlertTriangle 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BarcodeScanner from "@/components/BarcodeScanner";

interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expirationDate: string;
  category: string;
  barcode?: string;
}

const FoodSection = () => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    unit: "pcs",
    expirationDate: "",
    category: "Produce"
  });

  const categories = [
    "Produce", 
    "Dairy", 
    "Meat & Seafood", 
    "Pantry", 
    "Frozen", 
    "Beverages", 
    "Snacks", 
    "Other"
  ];

  const getCategoryItems = (category: string) => {
    return items.filter(item => item.category === category);
  };

  const autoCategorizeFoodItem = (name: string): string => {
    const itemName = name.toLowerCase();
    
    if (itemName.includes('milk') || itemName.includes('cheese') || itemName.includes('yogurt') || itemName.includes('butter') || itemName.includes('cream')) {
      return 'Dairy';
    }
    if (itemName.includes('apple') || itemName.includes('banana') || itemName.includes('lettuce') || itemName.includes('tomato') || itemName.includes('carrot') || itemName.includes('onion') || itemName.includes('potato')) {
      return 'Produce';
    }
    if (itemName.includes('chicken') || itemName.includes('beef') || itemName.includes('fish') || itemName.includes('salmon') || itemName.includes('pork')) {
      return 'Meat & Seafood';
    }
    if (itemName.includes('bread') || itemName.includes('pasta') || itemName.includes('rice') || itemName.includes('flour') || itemName.includes('sugar') || itemName.includes('oil')) {
      return 'Pantry';
    }
    if (itemName.includes('juice') || itemName.includes('soda') || itemName.includes('water') || itemName.includes('coffee') || itemName.includes('tea')) {
      return 'Beverages';
    }
    if (itemName.includes('ice cream') || itemName.includes('frozen')) {
      return 'Frozen';
    }
    if (itemName.includes('chips') || itemName.includes('cookies') || itemName.includes('candy')) {
      return 'Snacks';
    }
    
    return 'Other';
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.expirationDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Auto-categorize if category is default and we can determine a better one
    const finalCategory = newItem.category === "Produce" ? autoCategorizeFoodItem(newItem.name) : newItem.category;
    
    const item: FoodItem = {
      id: Date.now().toString(),
      ...newItem,
      category: finalCategory
    };

    setItems(prev => [...prev, item]);
    setNewItem({
      name: "",
      quantity: 1,
      unit: "pcs",
      expirationDate: "",
      category: "Produce"
    });

    toast({
      title: "Item Added",
      description: `${item.name} has been added to your food inventory`,
    });
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your food inventory",
    });
  };

  const handleBarcodeScanned = (result: string) => {
    // Simple barcode to product mapping (in a real app, this would use an API)
    const productDatabase: { [key: string]: { name: string; category: string; unit: string } } = {
      "123456789": { name: "Organic Milk", category: "Dairy", unit: "L" },
      "987654321": { name: "Whole Wheat Bread", category: "Pantry", unit: "loaf" },
      "456789123": { name: "Greek Yogurt", category: "Dairy", unit: "cup" },
    };

    const product = productDatabase[result];
    if (product) {
      setNewItem(prev => ({
        ...prev,
        name: product.name,
        category: product.category,
        unit: product.unit
      }));
      
      toast({
        title: "Product Recognized",
        description: `Found ${product.name}! Please add expiration date and quantity.`,
      });
    } else {
      toast({
        title: "Product Not Found",
        description: "Please add the item details manually",
        variant: "destructive"
      });
    }
    
    setShowScanner(false);
  };

  const getDaysUntilExpiration = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const timeDiff = expiration.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const getExpirationStatus = (days: number) => {
    if (days < 0) return { label: "Expired", variant: "destructive" as const };
    if (days <= 2) return { label: "Expires Soon", variant: "destructive" as const };
    if (days <= 5) return { label: "Use Soon", variant: "secondary" as const };
    return { label: "Fresh", variant: "default" as const };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
        <h2 className="text-3xl font-elegant font-light tracking-wide text-nise-charcoal">
          Food Inventory
        </h2>
        <Button
          onClick={() => setShowScanner(true)}
          className="bg-nise-charcoal hover:bg-nise-charcoal/90 text-white shadow-elegant"
        >
          <Scan className="w-4 h-4 mr-2" />
          Scan Barcode
        </Button>
      </div>

      {/* Add Item Form */}
      <Card className="shadow-elegant border-border/50">
        <CardHeader>
          <CardTitle className="font-elegant font-normal">Add New Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
              className="font-elegant"
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Qty"
                value={newItem.quantity}
                onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                className="font-elegant w-20"
              />
              <select
                value={newItem.unit}
                onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                className="px-3 py-2 border border-input rounded-md font-elegant text-sm"
              >
                <option value="pcs">pcs</option>
                <option value="L">L</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="cup">cup</option>
                <option value="loaf">loaf</option>
                <option value="lb">lb</option>
                <option value="oz">oz</option>
              </select>
            </div>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border border-input rounded-md font-elegant text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Input
              type="date"
              value={newItem.expirationDate}
              onChange={(e) => setNewItem(prev => ({ ...prev, expirationDate: e.target.value }))}
              className="font-elegant"
            />
            <Button
              onClick={handleAddItem}
              className="bg-nise-charcoal hover:bg-nise-charcoal/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Items by Category */}
      <div className="space-y-6">
        {categories.map(category => {
          const categoryItems = getCategoryItems(category);
          const sortedCategoryItems = categoryItems.sort((a, b) => {
            const daysA = getDaysUntilExpiration(a.expirationDate);
            const daysB = getDaysUntilExpiration(b.expirationDate);
            return daysA - daysB;
          });

          if (sortedCategoryItems.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-xl font-elegant font-medium text-nise-charcoal mb-3 flex items-center gap-2">
                <Package className="w-5 h-5" />
                {category} ({sortedCategoryItems.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedCategoryItems.map((item) => {
                  const daysUntilExpiration = getDaysUntilExpiration(item.expirationDate);
                  const status = getExpirationStatus(daysUntilExpiration);

                  return (
                    <Card key={item.id} className="shadow-soft border-border/50 hover:shadow-elegant transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-elegant font-medium text-nise-charcoal">{item.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Package className="w-3 h-3" />
                            <span>{item.quantity} {item.unit}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>{item.expirationDate}</span>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
                            <Badge variant={status.variant} className="text-xs">
                              {status.label}
                            </Badge>
                            {daysUntilExpiration <= 2 && (
                              <AlertTriangle className="w-4 h-4 text-destructive" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Barcode Scanner Modal */}
      {showScanner && (
        <BarcodeScanner
          onResult={handleBarcodeScanned}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};

export default FoodSection;