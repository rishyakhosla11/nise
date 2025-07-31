import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChefHat, 
  Refrigerator, 
  Shirt, 
  Sparkles, 
  Calendar,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [timeOfDay, setTimeOfDay] = useState('morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setTimeOfDay('morning');
    } else if (hour >= 12 && hour < 17) {
      setTimeOfDay('afternoon');
    } else if (hour >= 17 && hour < 20) {
      setTimeOfDay('sunset');
    } else {
      setTimeOfDay('night');
    }
  }, []);

  const getGradientClass = () => {
    switch (timeOfDay) {
      case 'morning': return 'bg-gradient-morning';
      case 'afternoon': return 'bg-gradient-afternoon';
      case 'sunset': return 'bg-gradient-sunset';
      case 'night': return 'bg-gradient-night';
      default: return 'bg-gradient-morning';
    }
  };


  const sections = [
    {
      id: "food",
      title: "Food",
      description: "Manage ingredients and track expiration dates",
      icon: Refrigerator,
      color: "from-nise-cream to-nise-warm-grey"
    },
    {
      id: "meal",
      title: "Meal",
      description: "Plan meals and create shopping lists",
      icon: ChefHat,
      color: "from-nise-warm-grey to-nise-cream"
    },
    {
      id: "clothing",
      title: "Clothing",
      description: "Organize your wardrobe and laundry",
      icon: Shirt,
      color: "from-nise-cream to-nise-warm-grey"
    },
    {
      id: "cleaning",
      title: "Cleaning",
      description: "Track tasks and share with roommates",
      icon: Sparkles,
      color: "from-nise-warm-grey to-nise-cream"
    },
    {
      id: "routine",
      title: "Routine",
      description: "Schedule and track daily routines",
      icon: Calendar,
      color: "from-nise-cream to-nise-warm-grey"
    }
  ];

  return (
    <div className={`min-h-screen ${getGradientClass()} relative overflow-hidden transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-8xl md:text-9xl font-elegant font-light text-black mb-6 tracking-wider">
            Nisé
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent mx-auto"></div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Card 
              key={section.id}
              className="group cursor-pointer transition-all duration-500 hover:shadow-elegant hover:-translate-y-2 border-border/30 bg-white/70 backdrop-blur-sm"
              onClick={() => navigate(`/app/${section.id}`)}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <section.icon className="w-8 h-8 text-black" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-elegant font-medium text-black mb-3">
                  {section.title}
                </h3>
                
                <p className="text-muted-foreground font-elegant mb-6 leading-relaxed">
                  {section.description}
                </p>
                
                <div className="flex items-center justify-center text-black group-hover:text-black/80 transition-colors">
                  <span className="font-elegant text-sm mr-2">Enter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Elegant footer */}
        <div className="text-center mt-20">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto mb-6"></div>
          <p className="text-sm font-elegant text-black/50">
            Crafted with elegance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;