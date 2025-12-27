import { FileText, Download, Eye, CheckCircle, AlertCircle } from 'lucide-react';

export function Documents() {
  const documents = [
    {
      name: 'Customer KYC Document',
      type: 'PDF',
      size: '172.28 KB',
      uploadDate: 'May 24, 2019',
      status: 'uploaded',
      version: 1,
      icon: '📄',
      color: 'bg-red-100 text-red-600'
    },
    {
      name: 'CIBIL History',
      type: 'PDF',
      size: '172.28 KB',
      uploadDate: 'May 24, 2019',
      status: 'uploaded',
      version: 1,
      icon: '📊',
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Loan History',
      type: 'PDF',
      size: '172.28 KB',
      uploadDate: 'May 24, 2019',
      status: 'uploaded',
      version: 2,
      icon: '📈',
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Payment Schedule',
      type: 'PDF',
      size: '-',
      uploadDate: '-',
      status: 'missing',
      version: 0,
      icon: '📅',
      color: 'bg-gray-100 text-gray-400'
    },
    {
      name: 'Gold Valuation Report',
      type: 'PDF',
      size: '245.32 KB',
      uploadDate: 'Jun 15, 2019',
      status: 'uploaded',
      version: 1,
      icon: '💍',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      name: 'Loan Agreement',
      type: 'PDF',
      size: '385.67 KB',
      uploadDate: 'Jun 20, 2019',
      status: 'uploaded',
      version: 1,
      icon: '📝',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Disbursement Receipt',
      type: 'PDF',
      size: '128.45 KB',
      uploadDate: 'Jun 28, 2019',
      status: 'uploaded',
      version: 1,
      icon: '🧾',
      color: 'bg-purple-100 text-purple-600'
    },
  ];

  return (
    <div className="space-y-3">
      {/* Actions Bar */}
      <div className="bg-white border border-gray-200 p-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Document Repository</h3>
            <p className="text-sm text-gray-600 mt-1">
              {documents.filter(d => d.status === 'uploaded').length} of {documents.length} documents uploaded
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Download All</span>
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {documents.map((doc, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${doc.color}`}>
                {doc.icon}
              </div>

              {/* Document Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                  {doc.status === 'uploaded' ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  {doc.status === 'uploaded' ? (
                    <>
                      <span>Uploaded: {doc.uploadDate}</span>
                      {doc.version > 1 && (
                        <>
                          <span>•</span>
                          <span className="text-blue-600">v{doc.version}</span>
                        </>
                      )}
                    </>
                  ) : (
                    <span className="text-red-500">Not uploaded</span>
                  )}
                </div>

                {/* Actions */}
                {doc.status === 'uploaded' && (
                  <div className="flex items-center gap-2 mt-3">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-teal-50 text-teal-700 rounded hover:bg-teal-100 transition-colors">
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Statistics */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Document Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-900">6</p>
              <p className="text-sm text-green-700">Documents Uploaded</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-900">1</p>
              <p className="text-sm text-red-700">Missing Documents</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">1.4 MB</p>
              <p className="text-sm text-blue-700">Total Storage Used</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
