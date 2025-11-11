import { MessageSquare, User, Clock, ChevronDown } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useState } from 'react';

export function RemarksCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  const communicationLog = [
    {
      type: 'reminder',
      message: 'Quarterly compliance review scheduled',
      date: '10 Nov 2024',
      user: 'System'
    },
    {
      type: 'note',
      message: 'Discussed portfolio diversification strategy',
      date: '05 Nov 2024',
      user: 'Rajesh Kumar (RM)'
    },
    {
      type: 'alert',
      message: 'Documentation update required for Q4',
      date: '01 Nov 2024',
      user: 'Compliance Team'
    },
    {
      type: 'note',
      message: 'Partnership performance review completed',
      date: '28 Oct 2024',
      user: 'Priya Sharma (RM)'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="mb-6">Remarks & Communication</h2>
      
      <div className="space-y-6">
        {/* Relationship Manager Notes */}
        <div>
          <h3 className="text-sm mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-[#007BC3]" />
            Relationship Manager Notes
          </h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              Strong partnership with consistent performance. NBFC demonstrates excellent risk management 
              and compliance adherence. Portfolio quality remains high with minimal delinquency rates. 
              Recommended for increased co-lending allocation.
            </p>
          </div>
        </div>

        {/* Internal Comments */}
        <div>
          <h3 className="text-sm mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#007BC3]" />
            Internal Comments
          </h3>
          <Textarea 
            placeholder="Add internal notes or comments..."
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">Last updated by: Amit Desai on 08 Nov 2024, 2:30 PM</span>
            <Button size="sm" className="bg-[#007BC3] hover:bg-[#005A8F]">
              Save Note
            </Button>
          </div>
        </div>

        {/* Communication Log */}
        <div>
          <div 
            className="flex items-center justify-between cursor-pointer mb-3"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h3 className="text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#007BC3]" />
              Communication Log ({communicationLog.length})
            </h3>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
          
          {isExpanded && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {communicationLog.map((log, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      log.type === 'reminder' ? 'bg-blue-100 text-blue-700' :
                      log.type === 'alert' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">{log.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{log.message}</p>
                  <p className="text-xs text-gray-500">by {log.user}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
