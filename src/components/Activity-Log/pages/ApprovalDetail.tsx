import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetActivityRequestByIdQuery, useApproveActivityMutation, useRejectActivityMutation } from '@/redux/features/activity/activityApi';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle2, XCircle, ArrowLeft, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '../StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PayloadViewer } from '../PayloadViewer';
import { AuditTimeline } from '../AuditTimeline';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';

export function ApprovalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading, isError } = useGetActivityRequestByIdQuery(id || '');
  const [approveActivity] = useApproveActivityMutation();
  const [rejectActivity] = useRejectActivityMutation();
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-600">Loading request...</p>
        </div>
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-600">Request not found</p>
          <Button onClick={() => navigate('/activity')} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const request = response.data;

  const handleApprove = async () => {
    try {
      await approveActivity({ id: request.id.toString(), remarks: '' }).unwrap();
      toast.success('Request approved successfully!', {
        description: `Request ${request.id} has been approved.`
      });
      setTimeout(() => navigate('/activity'), 1500);
    } catch (error) {
      toast.error('Failed to approve request', {
        description: 'Please try again later.'
      });
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Rejection reason is required');
      return;
    }
    
    try {
      await rejectActivity({ id: request.id.toString(), remarks: rejectionReason }).unwrap();
      toast.error('Request rejected', {
        description: `Request ${request.id} has been rejected.`
      });
      setRejectDialogOpen(false);
      setTimeout(() => navigate('/activity'), 1500);
    } catch (error) {
      toast.error('Failed to reject request', {
        description: 'Please try again later.'
      });
      setRejectDialogOpen(false);
    }
  };

  const isPending = request.status === 'pending';

  return (
    <div className="space-y-6 py-3 px-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/activity')}>
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Request Details</h1>
            <p className="text-sm text-gray-600 font-mono mt-1">{request.id}</p>
          </div>
        </div>
        <StatusBadge status={request.status} />
      </div>

      {/* Request Overview */}
      <Card >
        <CardHeader>
          <CardTitle>Request Information</CardTitle>
        </CardHeader>
        <CardContent className='px-3 py-3'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-600">Module</Label>
                <p className="mt-1 font-medium capitalize">{request.module_name.replace('_', ' ')}</p>
              </div>
              <div>
                <Label className="text-gray-600">Activity Type</Label>
                <p className="mt-1">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                    ${request.activity_type === 'insert' ? 'bg-blue-100 text-blue-800' : ''}
                    ${request.activity_type === 'update' ? 'bg-purple-100 text-purple-800' : ''}
                    ${request.activity_type === 'delete' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {request.activity_type?.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-600">Submitted Date</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Calendar className="size-4 text-gray-400" />
                  <span className="font-medium">
                    {request.created_at && format(new Date(request.created_at), 'PPpp')}
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Status</Label>
                <div className="mt-1">
                  <StatusBadge status={request.status} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maker Information */}
      <Card>
        <CardHeader>
          <CardTitle>Maker Information</CardTitle>
        </CardHeader>
        <CardContent className='px-3 py-3'>
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="size-6 text-blue-600" />
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-600">Name</Label>
                <p className="mt-1 font-medium">
                  {request.creator?.first_name} {request.creator?.last_name}
                </p>
              </div>
              <div>
                <Label className="text-gray-600">Email</Label>
                <p className="mt-1 font-medium">{request.creator?.email || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-gray-600">User Type</Label>
                <p className="mt-1 font-medium">{request.creator?.user_type || 'N/A'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Request Payload */}
      <PayloadViewer data={request.request_data} />

      {/* Audit Timeline */}
      {/* <AuditTimeline request={request} /> */}

      {/* Actions */}
      {isPending && (
        <Card>
          <CardHeader>
            <CardTitle>Approval Actions</CardTitle>
          </CardHeader>
          <CardContent className='px-3 py-3'>
            <div className="flex gap-4">
              <Button 
                onClick={handleApprove}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="size-4 mr-2" />
                Approve Request
              </Button>
              <Button 
                onClick={() => setRejectDialogOpen(true)}
                variant="destructive"
              >
                <XCircle className="size-4 mr-2" />
                Reject Request
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request. This will be visible to the maker.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rejection-reason">Rejection Reason *</Label>
            <Textarea
              id="rejection-reason"
              placeholder="Enter the reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
