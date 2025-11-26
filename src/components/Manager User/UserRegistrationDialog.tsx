import { useState } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { Loader2, Upload, X } from 'lucide-react';
import type { User } from '../../lib/user-mocks';

interface UserRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: Partial<User>) => void;
  existingUser?: User | null;
}

export function UserRegistrationDialog({
  open,
  onClose,
  onSubmit,
  existingUser,
}: UserRegistrationDialogProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: existingUser?.name.split(' ')[0] || '',
    lastName: existingUser?.name.split(' ').slice(1).join(' ') || '',
    email: existingUser?.email || '',
    phone: existingUser?.phone || '',
    alternatePhone: '',
    dateOfBirth: '',
    gender: '',
    
    // Official Information
    employeeId: existingUser?.id || '',
    role: existingUser?.role || '',
    department: existingUser?.department || '',
    designation: '',
    reportingTo: existingUser?.reportingTo || '',
    joiningDate: '',
    
    // Location & Address
    location: existingUser?.location || '',
    officeAddress: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Additional Information
    panNumber: '',
    aadhaarNumber: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    
    // System Access
    status: existingUser?.status || 'active',
    permissions: existingUser?.permissions || [],
    notes: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error('Please fill all required fields');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Phone validation (Indian format)
    const phoneRegex = /^[+]?91[-\s]?[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const userData: Partial<User> = {
        id: existingUser?.id || `USR-${Date.now()}`,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        department: formData.department,
        status: formData.status as 'active' | 'inactive' | 'suspended',
        location: formData.location,
        reportingTo: formData.reportingTo || undefined,
        permissions: formData.permissions,
        createdAt: existingUser?.createdAt || new Date().toISOString(),
        lastLogin: existingUser?.lastLogin || new Date().toISOString(),
      };

      onSubmit(userData);
      setLoading(false);
      onClose();
      toast.success(existingUser ? 'User updated successfully' : 'User registered successfully');
      
      // Reset form
      setStep(1);
      setProfileImage(null);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', alternatePhone: '',
        dateOfBirth: '', gender: '', employeeId: '', role: '', department: '',
        designation: '', reportingTo: '', joiningDate: '', location: '',
        officeAddress: '', city: '', state: '', pincode: '', country: 'India',
        panNumber: '', aadhaarNumber: '', emergencyContactName: '',
        emergencyContactPhone: '', emergencyContactRelation: '', status: 'active',
        permissions: [], notes: '',
      });
    }, 1500);
  };

  const totalSteps = 4;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {existingUser ? 'Edit User' : 'Register New User'}
          </DialogTitle>
          <DialogDescription>
            {existingUser 
              ? 'Update user information and permissions' 
              : 'Fill in the details to create a new user account'}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
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

                {/* Profile Photo */}
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <Upload className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="profile-photo">Profile Photo</Label>
                    <Input
                      id="profile-photo"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Max 5MB, JPG/PNG format</p>
                  </div>
                  {profileImage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setProfileImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91-XXXXX-XXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alternatePhone">Alternate Phone</Label>
                    <Input
                      id="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                      placeholder="+91-XXXXX-XXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange('employeeId', e.target.value)}
                      placeholder="EMP-XXXXX"
                      disabled={!!existingUser}
                    />
                  </div>
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      placeholder="Enter designation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger>
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
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Maker">Maker</SelectItem>
                        <SelectItem value="Checker">Checker</SelectItem>
                        <SelectItem value="Auditor">Auditor</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="reportingTo">Reporting To</Label>
                    <Input
                      id="reportingTo"
                      value={formData.reportingTo}
                      onChange={(e) => handleInputChange('reportingTo', e.target.value)}
                      placeholder="Manager User ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="joiningDate">Joining Date</Label>
                    <Input
                      id="joiningDate"
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Location & Identity */}
          {step === 3 && (
            <Card>
              <CardContent className="p-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Location & Identity</h3>
                  <Badge variant="outline">Step 3 of {totalSteps}</Badge>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Work Location *</Label>
                      <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mumbai">Mumbai</SelectItem>
                          <SelectItem value="Delhi">Delhi</SelectItem>
                          <SelectItem value="Bangalore">Bangalore</SelectItem>
                          <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                          <SelectItem value="Pune">Pune</SelectItem>
                          <SelectItem value="Chennai">Chennai</SelectItem>
                          <SelectItem value="Kolkata">Kolkata</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="officeAddress">Office Address</Label>
                    <Textarea
                      id="officeAddress"
                      value={formData.officeAddress}
                      onChange={(e) => handleInputChange('officeAddress', e.target.value)}
                      placeholder="Enter complete office address"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="Enter pincode"
                        maxLength={6}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        disabled
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <Input
                        id="panNumber"
                        value={formData.panNumber}
                        onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                      />
                    </div>
                    <div>
                      <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                      <Input
                        id="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                        placeholder="XXXX-XXXX-1234"
                        maxLength={14}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Emergency Contact & System Access */}
          {step === 4 && (
            <Card>
              <CardContent className="p-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Emergency Contact & System Access</h3>
                  <Badge variant="outline">Step 4 of {totalSteps}</Badge>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Emergency Contact</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="emergencyContactName">Contact Name</Label>
                      <Input
                        id="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                      <Input
                        id="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                        placeholder="+91-XXXXX-XXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContactRelation">Relation</Label>
                      <Input
                        id="emergencyContactRelation"
                        value={formData.emergencyContactRelation}
                        onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                        placeholder="e.g., Spouse, Parent"
                      />
                    </div>
                  </div>

                  <Separator />

                  <h4 className="text-sm font-medium">System Access</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Account Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Any additional information about the user..."
                      rows={4}
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
