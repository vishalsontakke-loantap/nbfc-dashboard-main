import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Code, 
  Copy, 
  Check,
  FileText,
  Database,
  User,
  Download,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';

export function ApiDocumentationScreen() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const ApiSection = ({ 
    title, 
    description, 
    method, 
    endpoint, 
    icon: Icon,
    requestExample,
    responseExample,
    parameters,
  }: {
    title: string;
    description: string;
    method: string;
    endpoint: string;
    icon: React.ElementType;
    requestExample: string;
    responseExample: string;
    parameters: Array<{ name: string; type: string; required: boolean; description: string }>;
  }) => {
    const getMethodColor = (method: string) => {
      switch (method.toUpperCase()) {
        case 'POST': return 'bg-green-100 text-green-800';
        case 'GET': return 'bg-blue-100 text-blue-800';
        case 'PUT': return 'bg-yellow-100 text-yellow-800';
        case 'DELETE': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <CardTitle>{title}</CardTitle>
              <CardDescription className="mt-2">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-2">
          {/* Endpoint */}
          <div>
            <div className="text-sm font-medium mb-2">Endpoint</div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
              <Badge className={getMethodColor(method)}>{method}</Badge>
              <code className="text-sm flex-1">{endpoint}</code>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => copyToClipboard(endpoint, `endpoint-${title}`)}
              >
                {copiedCode === `endpoint-${title}` ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Parameters */}
          <div>
            <div className="text-sm font-medium mb-3">Request Parameters</div>
            <div className="space-y-2">
              {parameters.map((param, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-start gap-2">
                    <code className="text-sm font-medium text-blue-600">{param.name}</code>
                    <Badge variant="outline" className="text-xs">{param.type}</Badge>
                    {param.required && (
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{param.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Request Example */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">Request Example</div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => copyToClipboard(requestExample, `request-${title}`)}
              >
                {copiedCode === `request-${title}` ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="relative">
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-xs">
                <code>{requestExample}</code>
              </pre>
            </div>
          </div>

          {/* Response Example */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">Response Example</div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => copyToClipboard(responseExample, `response-${title}`)}
              >
                {copiedCode === `response-${title}` ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="relative">
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-xs">
                <code>{responseExample}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">API Documentation</h2>
          <p className="text-gray-600 mt-1">Integration APIs for NBFC Partners</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success('Downloading Postman collection...')}>
            <Download className="h-4 w-4 mr-2" />
            Postman Collection
          </Button>
          
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total APIs</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Authentication</CardDescription>
            <CardTitle className="text-xl">OAuth 2.0</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>API Version</CardDescription>
            <CardTitle className="text-xl">v1.0</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Authentication Info */}
      <Card className="border-blue-200 bg-blue-50 p-2">
        <CardHeader>
          <CardTitle className="text-blue-900">Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-blue-900">
            All API requests require authentication using OAuth 2.0 bearer tokens. Include the token in the Authorization header:
          </div>
          <div className="p-3 bg-white rounded-lg border border-blue-200">
            <code className="text-sm text-blue-600">Authorization: Bearer YOUR_ACCESS_TOKEN</code>
          </div>
          <div className="text-sm text-blue-900">
            Contact your system administrator to obtain API credentials and access tokens.
          </div>
        </CardContent>
      </Card>

      {/* API Tabs */}
      <Tabs defaultValue="lead" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lead">Lead Data Collection</TabsTrigger>
          <TabsTrigger value="document">Document Collection</TabsTrigger>
          <TabsTrigger value="cif">CIF & Loan A/c Creation</TabsTrigger>
        </TabsList>

        {/* Lead Data Collection API */}
        <TabsContent value="lead" className="space-y-6">
          <ApiSection
            title="Lead Data Collection API"
            description="This API collects lead data for BRE evaluation and customer onboarding. All collected data will be processed through the Business Rules Engine (BRE) and used for creating customer profiles in the Co-lending Module 1 system."
            method="POST"
            endpoint="https://api.colending.com/v1/nbfc/leads"
            icon={User}
            parameters={[
              {
                name: 'nbfc_partner_id',
                type: 'string',
                required: true,
                description: 'Unique identifier for the NBFC partner',
              },
              {
                name: 'lead_data',
                type: 'object',
                required: true,
                description: 'Complete lead information including personal, financial, and KYC details',
              },
              {
                name: 'lead_data.personal_info',
                type: 'object',
                required: true,
                description: 'Personal information: name, DOB, PAN, mobile, email, address',
              },
              {
                name: 'lead_data.financial_info',
                type: 'object',
                required: true,
                description: 'Financial details: monthly income, employment type, company name, salary account',
              },
              {
                name: 'lead_data.loan_request',
                type: 'object',
                required: true,
                description: 'Loan requirements: amount, tenure, purpose',
              },
              {
                name: 'lead_data.bureau_consent',
                type: 'boolean',
                required: true,
                description: 'Customer consent for bureau check',
              },
            ]}
            requestExample={`{
  "nbfc_partner_id": "NBFC-12345",
  "lead_data": {
    "personal_info": {
      "full_name": "Rajesh Kumar Sharma",
      "date_of_birth": "1990-05-15",
      "pan_number": "ABCDE1234F",
      "mobile": "+919876543210",
      "email": "rajesh.kumar@example.com",
      "current_address": {
        "line1": "123, MG Road",
        "line2": "Koramangala",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560034"
      }
    },
    "financial_info": {
      "monthly_income": 75000,
      "employment_type": "salaried",
      "company_name": "Tech Solutions Pvt Ltd",
      "designation": "Senior Software Engineer",
      "years_of_employment": 5,
      "salary_account_bank": "HDFC Bank",
      "salary_account_number": "50100123456789"
    },
    "loan_request": {
      "amount": 500000,
      "tenure_months": 24,
      "purpose": "home_renovation"
    },
    "bureau_consent": true,
    "reference_id": "NBFC-LEAD-2024-001"
  }
}`}
            responseExample={`{
  "status": "success",
  "message": "Lead data received and processed",
  "data": {
    "lead_id": "LEAD-2024-001234",
    "application_number": "APP-2024-001234",
    "bre_status": "pending",
    "bre_reference_id": "BRE-2024-001234",
    "customer_id": null,
    "next_steps": [
      "Bureau verification in progress",
      "BRE evaluation pending",
      "Document upload required after BRE approval"
    ],
    "estimated_processing_time": "2-4 hours"
  },
  "timestamp": "2025-11-24T10:30:00Z"
}`}
          />
        </TabsContent>

        {/* Document Collection API */}
        <TabsContent value="document" className="space-y-6">
          <ApiSection
            title="Document Collection API"
            description="This API enables collection and storage of borrower and loan-related documents. Supports multiple document types including KYC documents, income proofs, bank statements, and loan agreements. All documents are encrypted and stored securely."
            method="POST"
            endpoint="https://api.colending.com/v1/nbfc/documents"
            icon={FileText}
            parameters={[
              {
                name: 'nbfc_partner_id',
                type: 'string',
                required: true,
                description: 'Unique identifier for the NBFC partner',
              },
              {
                name: 'application_number',
                type: 'string',
                required: true,
                description: 'Application number from lead data collection',
              },
              {
                name: 'borrower_id',
                type: 'string',
                required: true,
                description: 'Borrower unique identifier',
              },
              {
                name: 'documents',
                type: 'array',
                required: true,
                description: 'Array of document objects with metadata',
              },
              {
                name: 'documents[].document_type',
                type: 'string',
                required: true,
                description: 'Type: pan_card, aadhaar_front, aadhaar_back, bank_statement, salary_slip, etc.',
              },
              {
                name: 'documents[].file_base64',
                type: 'string',
                required: true,
                description: 'Base64 encoded document file (PDF, JPG, PNG)',
              },
              {
                name: 'documents[].file_name',
                type: 'string',
                required: true,
                description: 'Original filename with extension',
              },
              {
                name: 'documents[].file_size',
                type: 'number',
                required: true,
                description: 'File size in bytes (max 5MB per document)',
              },
            ]}
            requestExample={`{
  "nbfc_partner_id": "NBFC-12345",
  "application_number": "APP-2024-001234",
  "borrower_id": "BORR-2024-001234",
  "documents": [
    {
      "document_type": "pan_card",
      "document_category": "kyc",
      "file_base64": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFI...",
      "file_name": "pan_card.pdf",
      "file_size": 245678,
      "mime_type": "application/pdf"
    },
    {
      "document_type": "aadhaar_front",
      "document_category": "kyc",
      "file_base64": "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDA...",
      "file_name": "aadhaar_front.jpg",
      "file_size": 312456,
      "mime_type": "image/jpeg"
    },
    {
      "document_type": "bank_statement",
      "document_category": "financial",
      "file_base64": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago...",
      "file_name": "bank_statement_6months.pdf",
      "file_size": 1024567,
      "mime_type": "application/pdf",
      "statement_period": {
        "from_date": "2024-05-01",
        "to_date": "2024-10-31"
      }
    },
    {
      "document_type": "salary_slip",
      "document_category": "income_proof",
      "file_base64": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago...",
      "file_name": "salary_slip_oct2024.pdf",
      "file_size": 156789,
      "mime_type": "application/pdf",
      "month": "2024-10"
    }
  ]
}`}
            responseExample={`{
  "status": "success",
  "message": "Documents uploaded successfully",
  "data": {
    "application_number": "APP-2024-001234",
    "borrower_id": "BORR-2024-001234",
    "upload_batch_id": "BATCH-2024-001234",
    "documents_processed": [
      {
        "document_id": "DOC-2024-001234-001",
        "document_type": "pan_card",
        "status": "verified",
        "verification_details": {
          "pan_number": "ABCDE1234F",
          "name_on_pan": "RAJESH KUMAR SHARMA",
          "verified_at": "2025-11-24T10:32:15Z"
        }
      },
      {
        "document_id": "DOC-2024-001234-002",
        "document_type": "aadhaar_front",
        "status": "verified",
        "verification_details": {
          "aadhaar_masked": "XXXX-XXXX-1234",
          "name_on_aadhaar": "Rajesh Kumar Sharma",
          "verified_at": "2025-11-24T10:32:18Z"
        }
      },
      {
        "document_id": "DOC-2024-001234-003",
        "document_type": "bank_statement",
        "status": "processing",
        "message": "Bank statement analysis in progress"
      },
      {
        "document_id": "DOC-2024-001234-004",
        "document_type": "salary_slip",
        "status": "verified",
        "verification_details": {
          "employer_name": "Tech Solutions Pvt Ltd",
          "net_salary": 75000,
          "month": "October 2024",
          "verified_at": "2025-11-24T10:32:20Z"
        }
      }
    ],
    "total_documents": 4,
    "verified_count": 3,
    "pending_count": 1,
    "rejected_count": 0
  },
  "timestamp": "2025-11-24T10:32:00Z"
}`}
          />
        </TabsContent>

        {/* CIF & Loan A/c Creation API */}
        <TabsContent value="cif" className="space-y-6">
          <ApiSection
            title="CIF & Loan Account Creation API"
            description="This API creates Customer Information File (CIF) and Loan Account in the Core Banking System (CBS). It processes all borrower data from NBFC to establish the customer profile and loan account with complete details including repayment schedule, collateral information, and account configurations."
            method="POST"
            endpoint="https://api.colending.com/v1/nbfc/cif-loan-creation"
            icon={Database}
            parameters={[
              {
                name: 'nbfc_partner_id',
                type: 'string',
                required: true,
                description: 'Unique identifier for the NBFC partner',
              },
              {
                name: 'application_number',
                type: 'string',
                required: true,
                description: 'Application number from approved loan',
              },
              {
                name: 'cif_data',
                type: 'object',
                required: true,
                description: 'Customer information file data',
              },
              {
                name: 'loan_account_data',
                type: 'object',
                required: true,
                description: 'Loan account setup details',
              },
              {
                name: 'loan_account_data.sanctioned_amount',
                type: 'number',
                required: true,
                description: 'Final sanctioned loan amount',
              },
              {
                name: 'loan_account_data.tenure_months',
                type: 'number',
                required: true,
                description: 'Loan tenure in months',
              },
              {
                name: 'loan_account_data.interest_rate',
                type: 'number',
                required: true,
                description: 'Annual interest rate (percentage)',
              },
              {
                name: 'loan_account_data.disbursement_details',
                type: 'object',
                required: true,
                description: 'Bank account details for disbursement',
              },
            ]}
            requestExample={`{
  "nbfc_partner_id": "NBFC-12345",
  "application_number": "APP-2024-001234",
  "cif_data": {
    "customer_type": "individual",
    "personal_details": {
      "full_name": "Rajesh Kumar Sharma",
      "father_name": "Ramesh Kumar Sharma",
      "date_of_birth": "1990-05-15",
      "gender": "male",
      "marital_status": "married",
      "nationality": "Indian",
      "pan_number": "ABCDE1234F",
      "aadhaar_number": "XXXX-XXXX-1234",
      "mobile": "+919876543210",
      "email": "rajesh.kumar@example.com"
    },
    "address_details": {
      "permanent_address": {
        "line1": "123, MG Road",
        "line2": "Koramangala",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560034",
        "country": "India"
      },
      "communication_address": {
        "same_as_permanent": true
      }
    },
    "employment_details": {
      "employment_type": "salaried",
      "employer_name": "Tech Solutions Pvt Ltd",
      "designation": "Senior Software Engineer",
      "years_of_employment": 5,
      "monthly_income": 75000,
      "company_address": {
        "line1": "Tech Park, Phase 2",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560100"
      }
    },
    "bank_details": {
      "primary_account": {
        "account_number": "50100123456789",
        "account_holder_name": "Rajesh Kumar Sharma",
        "bank_name": "HDFC Bank",
        "branch": "Koramangala Branch",
        "ifsc_code": "HDFC0001234"
      }
    }
  },
  "loan_account_data": {
    "product_code": "PL-24M",
    "product_name": "Personal Loan - 24 Months",
    "sanctioned_amount": 500000,
    "tenure_months": 24,
    "interest_rate": 12.50,
    "interest_type": "reducing",
    "repayment_frequency": "monthly",
    "first_emi_date": "2025-01-05",
    "loan_purpose": "home_renovation",
    "processing_fee": 5000,
    "insurance_charges": 2500,
    "disbursement_details": {
      "disbursement_mode": "neft",
      "account_number": "50100123456789",
      "account_holder_name": "Rajesh Kumar Sharma",
      "bank_name": "HDFC Bank",
      "ifsc_code": "HDFC0001234",
      "branch": "Koramangala Branch"
    },
    "repayment_details": {
      "repayment_mode": "enach",
      "emandate_reference": "ENACH-2024-001234",
      "emandate_amount": 25000,
      "debit_account_number": "50100123456789",
      "debit_ifsc_code": "HDFC0001234"
    },
    "collateral_details": {
      "collateral_type": "none",
      "is_secured": false
    }
  }
}`}
            responseExample={`{
  "status": "success",
  "message": "CIF and Loan Account created successfully",
  "data": {
    "cif_number": "CIF-2024-123456",
    "loan_account_number": "LA-2024-123456",
    "application_number": "APP-2024-001234",
    "customer_details": {
      "cif_number": "CIF-2024-123456",
      "customer_name": "Rajesh Kumar Sharma",
      "pan_number": "ABCDE1234F",
      "mobile": "+919876543210",
      "email": "rajesh.kumar@example.com",
      "cif_created_at": "2025-11-24T10:35:00Z"
    },
    "loan_account_details": {
      "loan_account_number": "LA-2024-123456",
      "product_name": "Personal Loan - 24 Months",
      "sanctioned_amount": 500000,
      "net_disbursement_amount": 492500,
      "deductions": {
        "processing_fee": 5000,
        "insurance_charges": 2500,
        "total_deductions": 7500
      },
      "loan_terms": {
        "tenure_months": 24,
        "interest_rate": 12.50,
        "emi_amount": 23591,
        "first_emi_date": "2025-01-05",
        "last_emi_date": "2026-12-05"
      },
      "repayment_schedule": [
        {
          "installment_number": 1,
          "due_date": "2025-01-05",
          "principal": 18341,
          "interest": 5250,
          "emi_amount": 23591,
          "outstanding_balance": 481659
        },
        {
          "installment_number": 2,
          "due_date": "2025-02-05",
          "principal": 18533,
          "interest": 5058,
          "emi_amount": 23591,
          "outstanding_balance": 463126
        }
        // ... more installments
      ],
      "disbursement_status": "pending",
      "disbursement_reference": "DISB-2024-001234",
      "estimated_disbursement_date": "2025-11-25",
      "account_created_at": "2025-11-24T10:35:05Z"
    },
    "emandate_details": {
      "emandate_reference": "ENACH-2024-001234",
      "status": "active",
      "mandate_amount": 25000,
      "start_date": "2025-01-05",
      "end_date": "2026-12-05"
    },
    "next_steps": [
      "Loan agreement generation in progress",
      "E-sign required from borrower",
      "Disbursement will be initiated post e-sign completion"
    ]
  },
  "timestamp": "2025-11-24T10:35:10Z"
}`}
          />
        </TabsContent>
      </Tabs>

      {/* Additional Information */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-900">Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-amber-900 p-2">
          <div>• All API requests must include valid authentication tokens</div>
          <div>• Rate limiting: 100 requests per minute per partner</div>
          <div>• Maximum payload size: 10MB per request (5MB per document)</div>
          <div>• All timestamps are in ISO 8601 format (UTC timezone)</div>
          <div>• PII data is encrypted at rest and in transit</div>
          <div>• Webhook notifications available for asynchronous events</div>
          <div>• Support email: api-support@colending.com</div>
          <div>• API status page: https://status.colending.com</div>
        </CardContent>
      </Card>
    </div>
  );
}
