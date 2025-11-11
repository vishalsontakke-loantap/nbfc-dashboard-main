import { ActionBar } from "./ActionBar";
import { BatchOverviewCard } from "./BatchOverviewCard";
import { BREUnderwritingCard } from "./BREUnderwritingCard";
import { ComplianceAuditCard } from "./ComplianceAuditCard";
import { DisbursementSummaryCard } from "./DisbursementSummaryCard";
import { KPISummaryStrip } from "./KPISummaryStrip";
import { PoolBatchHeader } from "./PoolBatchHeader";
import { RiskAnalyticsCard } from "./RiskAnalyticsCard";


export default function PoolBatchView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9F7FF] via-[#B8E6FF] to-[#007BC3]/30 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <PoolBatchHeader />
        <KPISummaryStrip />
        <BatchOverviewCard />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BREUnderwritingCard />
          <DisbursementSummaryCard />
        </div>
        
        {/* <NBFCPerformanceTable /> */}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RiskAnalyticsCard />

          </div>
          <ComplianceAuditCard />
        </div>
        
        <ActionBar />
      </div>
    </div>
  );
}
