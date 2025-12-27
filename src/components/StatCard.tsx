import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  label: string;
  value: string | number;
}

export function StatCard({ icon: Icon, iconBgColor, iconColor, label, value }: StatCardProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 border rounded-lg">
      <div className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center mb-2`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}
