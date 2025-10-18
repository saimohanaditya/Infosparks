import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card } from "./ui/card";

interface BudgetOverviewProps {
  totalBudget: number;
  totalSpent: number;
}

export const BudgetOverview = ({ totalBudget, totalSpent }: BudgetOverviewProps) => {
  const remaining = totalBudget - totalSpent;
  const percentageSpent = (totalSpent / totalBudget) * 100;
  const isOverBudget = percentageSpent > 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary/20 border-primary/20">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Monthly Overview</p>
          <h2 className="text-3xl font-bold">${totalSpent.toFixed(2)}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            of ${totalBudget.toFixed(2)} budget
          </p>
        </div>
        <div className={`p-3 rounded-full ${isOverBudget ? 'bg-destructive/10' : 'bg-success/10'}`}>
          <Wallet className={`h-6 w-6 ${isOverBudget ? 'text-destructive' : 'text-success'}`} />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              percentageSpent > 90
                ? 'bg-gradient-to-r from-destructive to-destructive/80'
                : percentageSpent > 75
                ? 'bg-gradient-to-r from-warning to-warning/80'
                : 'bg-gradient-to-r from-success to-success/80'
            }`}
            style={{ width: `${Math.min(percentageSpent, 100)}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Remaining</p>
          <p className={`text-lg font-semibold ${isOverBudget ? 'text-destructive' : 'text-success'}`}>
            ${Math.abs(remaining).toFixed(2)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Progress</p>
          <div className="flex items-center gap-1">
            {isOverBudget ? (
              <TrendingUp className="h-4 w-4 text-destructive" />
            ) : (
              <TrendingDown className="h-4 w-4 text-success" />
            )}
            <p className={`text-lg font-semibold ${isOverBudget ? 'text-destructive' : 'text-success'}`}>
              {percentageSpent.toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Alert */}
      {isOverBudget && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive font-medium">
            ⚠️ You've exceeded your monthly budget by ${Math.abs(remaining).toFixed(2)}
          </p>
        </div>
      )}
    </Card>
  );
};
