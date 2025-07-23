
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Smartphone, ShoppingCart, Palette } from "lucide-react";

interface ServiceQuickButtonsProps {
  onServiceClick: (service: string) => void;
}

export const ServiceQuickButtons = ({ onServiceClick }: ServiceQuickButtonsProps) => {
  const services = [
    { name: "Website Development", icon: Globe, description: "Custom websites & web apps" },
    { name: "Mobile App Development", icon: Smartphone, description: "iOS & Android apps" },
    { name: "E-commerce Solutions", icon: ShoppingCart, description: "Online stores & payment integration" },
    { name: "UI/UX Design", icon: Palette, description: "Modern design & user experience" },
  ];

  return (
    <Card className="p-4 mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Get a quote for:</h3>
      <div className="grid grid-cols-2 gap-2">
        {services.map((service) => (
          <Button
            key={service.name}
            variant="outline"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto p-3 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => onServiceClick(service.name)}
          >
            <service.icon size={16} className="text-blue-600" />
            <span className="text-xs font-medium">{service.name}</span>
            <span className="text-xs text-gray-500">{service.description}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};
