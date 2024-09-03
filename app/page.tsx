//@ts-nocheck
"use client";
import MyButton from "@/components/my-button";
import TimeFilter from "@/components/time-selector";
import { EllipsisVertical, Plus, RefreshCcw, X } from "lucide-react";
import datas from "@/data.json";
import { DrawChart } from "@/components/charts/donut";
import g from "@/public/graph.png";
import Image from "next/image";
import AddWidget from "@/components/add-widget";
import { useState } from "react";

const generateConfig = (widgetData) => {
  // Generate dynamic config based on widget data
  const config = widgetData.data.reduce((acc, curr) => {
    acc[curr.name] = {
      label: curr.name,
      color: curr.color,
    };
    return acc;
  }, {});

  return config;
};

export default function Home() {
  const [data, setData] = useState(datas);

  const removeWidget = (categoryIndex, widgetIndex) => {
    const newDashboard = { ...data.dashboard };
    newDashboard.categories[categoryIndex].widgets.splice(widgetIndex, 1);
    setData({ dashboard: newDashboard });
  };

  const addNewWidget = (categoryIndex, widgetData) => {
    const newDashboard = { ...data.dashboard };
  
    if (
      categoryIndex >= 0 &&
      categoryIndex < newDashboard.categories.length &&
      newDashboard.categories[categoryIndex]
    ) {
      newDashboard.categories[categoryIndex].widgets.push({ ...widgetData });
      setData({ dashboard: newDashboard });
    } else {
      console.error("Invalid category index:", categoryIndex);
    }
  };

  return (
    <main className="bg-gray-100 px-6 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">CNAPP Dashboard</h1>
        <div className="flex gap-3">
          <AddWidget addWidget={addNewWidget} removeWidget={removeWidget}>
            <MyButton>
              Add Widget
              <Plus className="size-4 ml-2" />
            </MyButton>
          </AddWidget>
          <MyButton>
            <RefreshCcw className="size-4" />
          </MyButton>
          <MyButton>
            <EllipsisVertical className="size-4" />
          </MyButton>
          <TimeFilter />
        </div>
      </div>

      {data.dashboard.categories.map((category, index1) => {
        const widgets = category.widgets;
        const widgetsCount = widgets.length;
        const placeholdersCount = (3 - (widgetsCount % 3)) % 3;

        return (
          <section key={category.title} className="px-2 mt-2">
            <h1 className="text-lg font-semibold">{category.title}</h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {widgets.map((widget, index2) => (
                <div
                  key={widget.title}
                  className="bg-white h-[300px] p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">{widget.title}</h1>
                    <X
                      className="text-gray-400 size-4 cursor-pointer"
                      onClick={() => removeWidget(index1, index2)}
                    />
                  </div>
                  {widget.data && widget.data.length > 0 ? (
                    <DrawChart
                      name={widget.title}
                      type={widget.type}
                      data={widget.data.map((item) => ({
                        status: item.name,
                        count: item.count,
                        fill: item.color,
                      }))}
                      config={generateConfig(widget)}
                    />
                  ) : (
                    <div className="h-[300px] flex flex-col justify-center items-center">
                      <Image src={g.src} width={64} height={64} alt="graph" />
                      <p>No graph data available!</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Add placeholders to complete the row */}
              {Array.from({ length: placeholdersCount }).map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="h-[300px] p-4 rounded-lg shadow-md bg-white flex flex-col justify-center items-center"
                >
                  <AddWidget slug={category.title} addWidget={addNewWidget} removeWidget={removeWidget}>
                    <MyButton>
                      <Plus className="size-4 mr-2" />
                      Add Widget
                    </MyButton>
                  </AddWidget>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
