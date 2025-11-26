import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import {
  UserCheck,
  UserX,
  Lock,
  Unlock,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Shield,
  Activity,
  Edit,
} from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '../../lib/user-mocks';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface UserActivity {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  type: 'login' | 'approval' | 'edit' | 'create' | 'view';
}

interface UserProfileViewProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onActivate: (userId: string) => void;
  onSuspend: (userId: string) => void;
  onInactivate: (userId: string) => void;
  onEdit: (userId: string) => void;
}

const mockActivities: UserActivity[] = [
  {
    id: 'ACT-001',
    action: 'Login',
    description: 'Logged in from IP 192.168.1.100',
    timestamp: '2025-11-24T10:30:00Z',
    type: 'login',
  },
  {
    id: 'ACT-002',
    action: 'Pool Approved',
    description: 'Approved pool buyout POOL-2024-001 with 50 loans',
    timestamp: '2025-11-24T09:45:00Z',
    type: 'approval',
  },
  {
    id: 'ACT-003',
    action: 'User Updated',
    description: 'Updated role permissions for USR-002',
    timestamp: '2025-11-23T16:20:00Z',
    type: 'edit',
  },
  {
    id: 'ACT-004',
    action: 'Report Generated',
    description: 'Generated monthly loan performance report',
    timestamp: '2025-11-23T14:15:00Z',
    type: 'create',
  },
  {
    id: 'ACT-005',
    action: 'Loan Inspected',
    description: 'Viewed loan details for LN-2024-12345',
    timestamp: '2025-11-23T11:30:00Z',
    type: 'view',
  },
];

export function UserProfileView({
  user,
  open,
  onClose,
  onActivate,
  onSuspend,
  onInactivate,
  onEdit,
}: UserProfileViewProps) {
  const [activities] = useState<UserActivity[]>(mockActivities);

  if (!user) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getActivityIcon = (type: UserActivity['type']) => {
    switch (type) {
      case 'login':
        return <UserCheck className="h-4 w-4" />;
      case 'approval':
        return <Shield className="h-4 w-4" />;
      case 'edit':
        return <Edit className="h-4 w-4" />;
      case 'create':
        return <Activity className="h-4 w-4" />;
      case 'view':
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>User Profile</SheetTitle>
          <SheetDescription>
            View and manage user details and permissions
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-2">
              <div className="flex items-start gap-6">
                {/* Profile Photo */}
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(user.name)}
                  </div>
                  <div className={`absolute bottom-0 right-0 h-6 w-6 rounded-full border-4 border-white ${
                    user.status === 'active' ? 'bg-green-500' : 
                    user.status === 'suspended' ? 'bg-red-500' : 
                    'bg-gray-500'
                  }`} />
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                      <p className="text-xs text-gray-500 mt-1">ID: {user.id}</p>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(user.status)}
                      <Badge variant="outline">{user.role}</Badge>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(user.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.info(`Sending email to ${user.email}`)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>

              {/* Status Actions */}
              <Separator className="my-4" />
              <div className="flex gap-2">
                {user.status !== 'active' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onActivate(user.id)}
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <Unlock className="h-4 w-4 mr-2" />
                    Activate User
                  </Button>
                )}
                {user.status === 'active' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSuspend(user.id)}
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Suspend User
                  </Button>
                )}
                {user.status === 'active' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onInactivate(user.id)}
                    className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Mark Inactive
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* User Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Phone className="h-4 w-4" />
                    Phone
                  </div>
                  <div className="font-medium">{user.phone}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Briefcase className="h-4 w-4" />
                    Department
                  </div>
                  <div className="font-medium">{user.department}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <MapPin className="h-4 w-4" />
                    Location
                  </div>
                  <div className="font-medium">{user.location}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Shield className="h-4 w-4" />
                    Role
                  </div>
                  <div className="font-medium">{user.role}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Calendar className="h-4 w-4" />
                    Joined
                  </div>
                  <div className="font-medium">{formatDate(user.createdAt)}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Activity className="h-4 w-4" />
                    Last Login
                  </div>
                  <div className="font-medium">{formatDate(user.lastLogin)}</div>
                </div>
              </div>

              {user.reportingTo && (
                <>
                  <Separator />
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Reporting To</div>
                    <div className="font-medium">{user.reportingTo}</div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Permissions</CardTitle>
              <CardDescription>
                Access rights assigned to this user
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-2">
                {user.permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <Shield className="h-4 w-4 text-blue-600" />
                    <code className="text-sm">{permission}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Last 5 activities by this user</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={activity.id}>
                    <div className="flex gap-3">
                      <div className="mt-1">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{activity.action}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(activity.timestamp)}
                        </div>
                      </div>
                    </div>
                    {index < activities.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
