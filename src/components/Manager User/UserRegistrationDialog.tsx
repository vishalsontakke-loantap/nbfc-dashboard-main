import React, { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import type { User } from '../../lib/user-mocks';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useCreateUserMutation, useUpdateUserMutation } from '@/redux/features/user/userApi';
import { extractApiErrors } from '@/utils/errorHelpers';

interface UserRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (userData: Partial<User>) => void; // optional callback to parent
  existingUser?: User | null;
}

export default function UserRegistrationDialog({
  open,
  onClose,
  existingUser = null,
  onSubmit,
}: UserRegistrationDialogProps) {
  // Partner options - could come from props or from api in future
  interface PartnerOptions {
    readonly value: string;
    readonly label: string;
  }

  const partnerOptions: readonly PartnerOptions[] = [
    { value: '1', label: 'Partner 1' },
    { value: '2', label: 'Partner 2' },
    { value: '3', label: 'Partner 3' },
    { value: '4', label: 'Partner 4' },
    { value: '5', label: 'Partner 5' },
  ];

  const animatedComponents = makeAnimated();
  console.log('ex', existingUser)
  const initData = useMemo(() => ({
    first_name: existingUser?.first_name || '',
    last_name: existingUser?.last_name || '',
    email: existingUser?.email || '',
    mobile: existingUser?.mobile || '',
    dob: existingUser?.dob || '',
    gender: existingUser?.gender || '',
    role: existingUser?.role || '',
    department: existingUser?.department || '',
    designation: existingUser?.designation || '',
    status: existingUser?.status || 'active',
    pf_no: existingUser?.pf_no || '',
    user_type: existingUser?.user_type || '',
    // keep partner_id as string[] internally
    partner_id: Array.isArray(existingUser?.partner_id)
      ? (existingUser!.partner_id as string[])
      : existingUser?.partner_id
        ? [String(existingUser.partner_id)]
        : [],
  }), [existingUser]);

  const [formData, setFormData] = useState(initData);
  const [step, setStep] = useState(1);

  // RTK Query mutations - note hooks return tuples
  const [createUser, createResult] = useCreateUserMutation();
  const [updateUser, updateResult] = useUpdateUserMutation();

  // keep formData in sync when existingUser changes (e.g., opening dialog to edit a different user)
  useEffect(() => {
    setFormData(initData);
    setStep(1);
  }, [initData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // helper to get react-select value objects from stored partner ids
  const selectedPartnerOptions = useMemo(() => {
    return partnerOptions.filter((p) => (formData.partner_id || []).includes(p.value));
  }, [formData.partner_id]);

  const totalSteps = 2;

  const handleSubmit = async () => {
    // local loading handled from mutation states
    // Validation
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.mobile ||
      !formData.pf_no ||
      !formData.user_type ||
      !formData.role ||
      (Array.isArray(formData.partner_id) && formData.partner_id.length === 0)
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(String(formData.mobile).replace(/\s/g, ''))) {
      toast.error('Please enter a valid phone number');
      return;
    }

    const payload: Partial<User> = {
      id: existingUser?.id || undefined,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      mobile: formData.mobile,
      gender: formData.gender,
      dob: formData.dob,
      pf_no: formData.pf_no,
      role: formData.role,
      department: formData.department,
      user_type: formData.user_type,
      designation: formData.designation,
      partner_id: formData.partner_id,
    };

    try {
      if (existingUser && existingUser.id) {
        // update
        await updateUser({ id: existingUser.id, ...payload }).unwrap();
        toast.success('User updated successfully');
        if (onSubmit) onSubmit(payload);
      } else {
        // create
        await createUser(payload).unwrap();
        toast.success('User created successfully');
        if (onSubmit) onSubmit(payload);
        // reset only when creating
        setFormData(initData);
      }
      onClose();
    } catch (err: any) {
      console.error('Save user error', err);
      const { errors, message } = extractApiErrors(err);


      // if validation errors object exists, iterate and show them
      if (errors && typeof errors === 'object') {
        // Example: { email: ['Email already exists'], role: ['invalid role'] }
        Object.entries(errors).forEach(([field, msgs]) => {
          // msgs could be an array or string
          const text = Array.isArray(msgs) ? msgs.join(', ') : String(msgs);
          toast.error(`${field}: ${text}`);
        });
      }
      else {
        if (message) toast.error(message);
      }
    }
  };

  // derive loading state from either mutation
  const loading = createResult.isLoading || updateResult.isLoading;

  return (
    <Dialog open={open} onOpenChange={(openState) => !openState && onClose()}>
      <DialogContent className="w-[60vw] max-w-6xl sm:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{existingUser ? 'Edit User' : 'Register New User'}</DialogTitle>
          <DialogDescription>
            {existingUser ? 'Update user information and permissions' : 'Fill in the details to create a new user account'}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`h-2 flex-1 rounded-full transition-colors ${s <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
              {s < totalSteps && <div className="w-2" />}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <Card>
              <CardContent className="p-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Personal Information</h3>
                  <Badge variant="outline">Step 1 of {totalSteps}</Badge>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input id="first_name" value={formData.first_name} onChange={(e) => handleInputChange('first_name', e.target.value)} placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name *</Label>
                    <Input id="last_name" value={formData.last_name} onChange={(e) => handleInputChange('last_name', e.target.value)} placeholder="Enter last name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="user@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="mobile">Phone Number *</Label>
                    <Input id="mobile" value={formData.mobile} onChange={(e) => handleInputChange('mobile', e.target.value)} placeholder="Mobile Number" />
                  </div>

                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" value={formData.dob} onChange={(e) => handleInputChange('dob', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <UiSelect value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </UiSelect>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Official Information */}
          {step === 2 && (
            <Card>
              <CardContent className="p-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Official Information</h3>
                  <Badge variant="outline">Step 2 of {totalSteps}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pf_no">Employee ID</Label>
                    <Input id="pf_no" value={formData.pf_no} onChange={(e) => handleInputChange('pf_no', e.target.value)} placeholder="EMP-Code" disabled={!!existingUser} />
                  </div>

                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" value={formData.designation} onChange={(e) => handleInputChange('designation', e.target.value)} placeholder="Enter designation" />
                  </div>
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <UiSelect value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Credit">Credit</SelectItem>
                        <SelectItem value="Risk">Risk</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Compliance">Compliance</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                        <SelectItem value="HR">Human Resources</SelectItem>
                      </SelectContent>
                    </UiSelect>
                  </div>
                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <UiSelect value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Admin</SelectItem>
                        <SelectItem value="2">Maker</SelectItem>
                        <SelectItem value="3">Checker</SelectItem>
                        <SelectItem value="4">Auditor</SelectItem>
                        <SelectItem value="5">Viewer</SelectItem>
                      </SelectContent>
                    </UiSelect>
                  </div>
                  <div>
                    <Label htmlFor="user_type">User Type</Label>
                    <UiSelect value={formData.user_type} onValueChange={(value) => handleInputChange('user_type', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select User Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nbfc">Partner</SelectItem>
                        <SelectItem value="bank">Bank</SelectItem>
                      </SelectContent>
                    </UiSelect>

                  </div>
                  <div>
                    <Label htmlFor="partner_id"> Select Partner</Label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      value={selectedPartnerOptions}
                      isMulti
                      onChange={(options: any) => {
                        const values = options?.map((o: any) => o.value) || [];
                        handleInputChange('partner_id', values);
                      }}
                      options={partnerOptions}
                    />
                  </div>


                </div>
              </CardContent>
            </Card>
          )}

        </div>

        <DialogFooter className="flex items-center justify-between">
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {step < totalSteps ? (
              <Button onClick={() => setStep(step + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {existingUser ? 'Update User' : 'Register User'}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
