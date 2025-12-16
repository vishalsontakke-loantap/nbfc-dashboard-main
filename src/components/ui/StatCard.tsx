import { LucideIcon } from 'lucide-react';
import { Card } from './card';
// import { Card } from './ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive';
}

export function StatCard({ title, value, icon: Icon, trend, color = 'primary' }: StatCardProps) {
  const colorClasses = {
    primary: 'border-l-[#0B5FFF] bg-gradient-to-br from-blue-50 to-white',
    secondary: 'border-l-[#00A676] bg-gradient-to-br from-teal-50 to-white',
    accent: 'border-l-[#FFB020] bg-gradient-to-br from-amber-50 to-white',
    success: 'border-l-[#10B981] bg-gradient-to-br from-green-50 to-white',
    warning: 'border-l-[#FFB020] bg-gradient-to-br from-orange-50 to-white',
    destructive: 'border-l-[#EF4444] bg-gradient-to-br from-red-50 to-white',
  };

  const iconColorClasses = {
    primary: 'text-[#0B5FFF] bg-blue-100',
    secondary: 'text-[#00A676] bg-teal-100',
    accent: 'text-[#FFB020] bg-amber-100',
    success: 'text-[#10B981] bg-green-100',
    warning: 'text-[#FFB020] bg-orange-100',
    destructive: 'text-[#EF4444] bg-red-100',
  };

  return (
    <Card className={`p-3 border-l-4 ${colorClasses[color]} shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground mb-2">{title}</p>
          <h3 className="mb-1">{value}</h3>
          {trend && (
            <p className={`${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconColorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
