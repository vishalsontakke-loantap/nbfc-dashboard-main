// import { ActivityStatus } from '../types/activity-request';
// import { Badge } from './ui/badge';

import { ActivityStatus } from "@/types/activity-request";
import { Badge } from "../ui/badge";

interface StatusBadgeProps {
  status: ActivityStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<ActivityStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    draft: { label: 'Draft', variant: 'outline' },
    pending: { label: '🟡 Pending Approval', variant: 'secondary' },
    approved: { label: '✅ Approved', variant: 'default' },
    rejected: { label: '❌ Rejected', variant: 'destructive' }
  };

  const { label, variant } = variants[status];

  return (
    <Badge variant={variant} className="font-medium">
      {label}
    </Badge>
  );
}
