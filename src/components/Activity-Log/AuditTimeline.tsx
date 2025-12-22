// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { ActivityRequest } from '../types/activity-request';
// import { format } from 'date-fns';
import { CheckCircle2, XCircle, Clock, Send } from 'lucide-react';

interface AuditTimelineProps {
  request: ActivityRequest;
}

export function AuditTimeline({ request }: AuditTimelineProps) {
  const events = [
    {
      action: 'Created',
      user: `${request.created_by.first_name} ${request.created_by.last_name}`,
      role: request.created_by.user_type,
      timestamp: request.created_at,
      status: 'draft' as const,
      icon: Clock
    },
    ...(request.submitted_at ? [{
      action: 'Submitted for Approval',
      user: `${request.created_by.first_name} ${request.created_by.last_name}`,
      role: request.created_by.user_type,
      timestamp: request.submitted_at,
      status: 'pending' as const,
      icon: Send
    }] : []),
    ...(request.reviewed_at && request.reviewed_by ? [{
      action: request.status === 'approved' ? 'Approved' : 'Rejected',
      user: `${request.reviewed_by.first_name} ${request.reviewed_by.last_name}`,
      role: request.reviewed_by.user_type,
      timestamp: request.reviewed_at,
      status: request.status,
      icon: request.status === 'approved' ? CheckCircle2 : XCircle,
      remarks: request.rejection_reason
    }] : [])
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Trail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6">
          {/* Timeline line */}
          <div className="absolute left-[15px] top-[30px] bottom-0 w-[2px] bg-gray-200" />
          
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <div key={index} className="relative flex gap-4">
                {/* Icon */}
                <div className={`relative z-10 flex size-8 items-center justify-center rounded-full ${getStatusColor(event.status)}`}>
                  <Icon className="size-4" />
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{event.action}</p>
                      <p className="mt-1 text-sm text-gray-600">
                        by <span className="font-medium">{event.user}</span> ({event.role})
                      </p>
                      {event.remarks && (
                        <div className="mt-2 rounded-md bg-red-50 p-3 border border-red-100">
                          <p className="text-sm text-red-800">
                            <span className="font-medium">Reason: </span>{event.remarks}
                          </p>
                        </div>
                      )}
                    </div>
                    <time className="text-sm text-gray-500">
                      {format(new Date(event.timestamp), 'MMM dd, yyyy HH:mm')}
                    </time>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
