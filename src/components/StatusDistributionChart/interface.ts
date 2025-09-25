export interface StatusDistributionChartProps {
  statusDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}