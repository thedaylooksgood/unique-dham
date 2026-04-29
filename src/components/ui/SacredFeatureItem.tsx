import React from 'react';

// Define the properties this component will accept
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  iconBgColor: string;
  iconTextColor: string;
}

export function SacredFeatureItem({ 
  icon, title, description, time, iconBgColor, iconTextColor 
}: FeatureItemProps) {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex-1 group">
      
      {/* Dynamic Icon Wrapper */}
      <div className={`p-3 rounded-full border transition-transform group-hover:scale-110 ${iconBgColor} ${iconTextColor}`}>
        {icon}
      </div>
      
      {/* Text Content */}
      <div className="flex-1">
        <h4 className="text-gray-900 font-semibold text-sm flex items-center gap-2">
          {title}
          <span className="text-[10px] text-gray-500 font-normal bg-gray-100/80 px-2 py-0.5 rounded-full">
            {time}
          </span>
        </h4>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      
    </div>
  );
}
