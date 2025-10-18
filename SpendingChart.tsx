import { Card } from "./ui/card";
import type { Budget } from "./Dashboard";

interface SpendingChartProps {
  budgets: Budget[];
}

export const SpendingChart = ({ budgets }: SpendingChartProps) => {
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Spending by Category</h2>
      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = (budget.spent / totalSpent) * 100;
          return (
            <div key={budget.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{budget.category}</span>
                <span className="text-muted-foreground">
                  ${budget.spent.toFixed(2)} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: budget.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Spending</span>
          <span className="text-2xl font-bold">${totalSpent.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
};
