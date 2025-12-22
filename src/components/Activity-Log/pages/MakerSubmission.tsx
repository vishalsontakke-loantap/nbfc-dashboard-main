import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Send } from 'lucide-react';

export function MakerSubmission() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_name: '',
    product_code: '',
    interest_rate: '',
    tenure_min: '',
    tenure_max: '',
    loan_amount_min: '',
    loan_amount_max: '',
    processing_fee: '',
    collateral_type: '',
    ltv_ratio: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    const requestId = `ARQ-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    toast.success('Request submitted for approval', {
      description: `Request ${requestId} has been created. A checker will review your request.`
    });
    
    setTimeout(() => {
      navigate('/approvals');
    }, 2000);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/products')}>
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create Product Configuration</h1>
          <p className="text-sm text-gray-600 mt-1">Fill in the details and submit for approval</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product_name">Product Name *</Label>
                <Input
                  id="product_name"
                  value={formData.product_name}
                  onChange={(e) => updateField('product_name', e.target.value)}
                  placeholder="e.g., Gold Loan Premium"
                  required
                />
              </div>
              <div>
                <Label htmlFor="product_code">Product Code *</Label>
                <Input
                  id="product_code"
                  value={formData.product_code}
                  onChange={(e) => updateField('product_code', e.target.value)}
                  placeholder="e.g., GLP-001"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Enter product description"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Parameters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Financial Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="interest_rate">Interest Rate (%) *</Label>
                <Input
                  id="interest_rate"
                  type="number"
                  step="0.1"
                  value={formData.interest_rate}
                  onChange={(e) => updateField('interest_rate', e.target.value)}
                  placeholder="10.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="processing_fee">Processing Fee (%) *</Label>
                <Input
                  id="processing_fee"
                  type="number"
                  step="0.1"
                  value={formData.processing_fee}
                  onChange={(e) => updateField('processing_fee', e.target.value)}
                  placeholder="1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="ltv_ratio">LTV Ratio (%) *</Label>
                <Input
                  id="ltv_ratio"
                  type="number"
                  value={formData.ltv_ratio}
                  onChange={(e) => updateField('ltv_ratio', e.target.value)}
                  placeholder="75"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loan_amount_min">Min Loan Amount (₹) *</Label>
                <Input
                  id="loan_amount_min"
                  type="number"
                  value={formData.loan_amount_min}
                  onChange={(e) => updateField('loan_amount_min', e.target.value)}
                  placeholder="50000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="loan_amount_max">Max Loan Amount (₹) *</Label>
                <Input
                  id="loan_amount_max"
                  type="number"
                  value={formData.loan_amount_max}
                  onChange={(e) => updateField('loan_amount_max', e.target.value)}
                  placeholder="5000000"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collateral Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Collateral & Tenure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="collateral_type">Collateral Type *</Label>
                <Select 
                  value={formData.collateral_type} 
                  onValueChange={(value) => updateField('collateral_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select collateral type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Property">Property</SelectItem>
                    <SelectItem value="Vehicle">Vehicle</SelectItem>
                    <SelectItem value="Securities">Securities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tenure_min">Min Tenure (months) *</Label>
                <Input
                  id="tenure_min"
                  type="number"
                  value={formData.tenure_min}
                  onChange={(e) => updateField('tenure_min', e.target.value)}
                  placeholder="6"
                  required
                />
              </div>
              <div>
                <Label htmlFor="tenure_max">Max Tenure (months) *</Label>
                <Input
                  id="tenure_max"
                  type="number"
                  value={formData.tenure_max}
                  onChange={(e) => updateField('tenure_max', e.target.value)}
                  placeholder="36"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Send className="size-4 mr-2" />
            Submit for Approval
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/products')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
