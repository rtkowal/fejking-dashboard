import StatsCards from './StatsCards';
import RankingTable from './RankingTable';
import ScoreDistribution from './ScoreDistribution';
import CategoryBreakdown from './CategoryBreakdown';
import VerdictOverview from './VerdictOverview';
import TechniqueChart from './TechniqueChart';

export default function DashboardTab() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <RankingTable />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreDistribution />
        <CategoryBreakdown />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VerdictOverview />
        <TechniqueChart />
      </div>
    </div>
  );
}
