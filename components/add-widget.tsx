"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircleIcon, MinusCircleIcon } from "lucide-react";
import data from "@/data.json";

type AddWidgetProps = {
  children: React.ReactNode;
  removeWidget?: (categoryIndex: number, widgetIndex: number) => void;
  addWidget: (categoryIndex: number, widgetData: any) => void;
  slug?: string;
};

type DataPoint = {
  name: string;
  count: number;
  color: string;
};

export default function AddWidget({
  children,
  removeWidget,
  addWidget,
  slug,
}: AddWidgetProps) {
  const [showInput, setShowInput] = useState(false);
  const [newWidgetName, setNewWidgetName] = useState("");
  const [widgetType, setWidgetType] = useState("donut");
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { name: "", count: 0, color: "#000000" },
  ]);
  const [activeTab, setActiveTab] = useState(slug || data.dashboard.categories[0].title);

  const handleAddWidget = () => {
    if (newWidgetName.trim() && dataPoints.every(dp => dp.name && dp.count)) {
      const categoryIndex = data.dashboard.categories.findIndex(
        (category) => category.title === activeTab
      );
      const newWidget = {
        type: widgetType,
        title: newWidgetName.trim(),
        data: dataPoints,
      };
      console.log(categoryIndex, newWidget);
      addWidget(categoryIndex, newWidget);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewWidgetName("");
    setWidgetType("donut");
    setDataPoints([{ name: "", count: 0, color: "#000000" }]);
    setShowInput(false);
  };

  const handleDataPointChange = (index: number, field: keyof DataPoint, value: string | number) => {
    const newDataPoints = [...dataPoints];
    newDataPoints[index] = { ...newDataPoints[index], [field]: value };
    setDataPoints(newDataPoints);
  };

  const addDataPoint = () => {
    setDataPoints([...dataPoints, { name: "", count: 0, color: "#000000" }]);
  };

  const removeDataPoint = (index: number) => {
    if (dataPoints.length > 1) {
      const newDataPoints = dataPoints.filter((_, i) => i !== index);
      setDataPoints(newDataPoints);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>

      <SheetContent className="space-y-2 p-0 border-0 min-w-[600px] overflow-y-auto">
        <p className="mx-4 text-sm">
          Personalize your dashboard by adding the following widget
        </p>

        <Tabs 
          defaultValue={activeTab} 
          className="w-full px-4"
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="flex justify-between items-center">
            <TabsList>
              {data.dashboard.categories.map((category) => (
                <TabsTrigger key={category.title} value={category.title}>
                  {category.title.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button onClick={() => setShowInput(true)}>Add</Button>
          </div>
          {showInput && (
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="widget-name">Widget Name</Label>
                <Input
                  id="widget-name"
                  value={newWidgetName}
                  onChange={(e) => setNewWidgetName(e.target.value)}
                  placeholder="Enter new widget name"
                />
              </div>
              <div>
                <Label>Widget Type</Label>
                <RadioGroup value={widgetType} onValueChange={setWidgetType} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="donut" id="donut" />
                    <Label htmlFor="donut">Donut</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bar" id="bar" />
                    <Label htmlFor="bar">Bar</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Data Points</Label>
                {dataPoints.map((dp, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Name"
                      value={dp.name}
                      onChange={(e) => handleDataPointChange(index, "name", e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Count"
                      value={dp.count}
                      onChange={(e) => handleDataPointChange(index, "count", parseInt(e.target.value) || 0)}
                    />
                    <Input
                      type="color"
                      value={dp.color}
                      onChange={(e) => handleDataPointChange(index, "color", e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDataPoint(index)}
                      disabled={dataPoints.length === 1}
                    >
                      <MinusCircleIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addDataPoint} className="w-full">
                  <PlusCircleIcon className="h-4 w-4 mr-2" />
                  Add Data Point
                </Button>
              </div>
              <Button onClick={handleAddWidget}>Submit</Button>
            </div>
          )}
          {data.dashboard.categories.map((category, index1) => (
            <TabsContent
              className="w-full"
              key={category.title}
              value={category.title}
            >
              {category.widgets.map((widget, index2) => (
                <div
                  key={widget.title}
                  className="flex items-center mt-2 p-2 border rounded-md w-full space-x-2"
                >
                  <Checkbox
                    onCheckedChange={() => {
                      if (removeWidget) {
                        removeWidget(index1, index2);
                      }
                    }}
                    id={`widget-${index1}-${index2}`}
                    defaultChecked={true}
                  />
                  <label
                    htmlFor={`widget-${index1}-${index2}`}
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {widget.title}
                  </label>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}