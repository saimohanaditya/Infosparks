import { Card } from "./ui/card";
import { AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import type { Budget } from "./Dashboard";

interface BudgetCategoriesProps {
  budgets: Budget[];
}

export const BudgetCategories = ({ budgets }: BudgetCategoriesProps) => {
  const getStatusIcon = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) {
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    } else if (percentage >= 75) {
      return <TrendingUp className="h-5 w-5 text-warning" />;
    }
    return <CheckCircle className="h-5 w-5 text-success" />;
  };

  const getStatusColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return "text-destructive";
    if (percentage >= 75) return "text-warning";
    return "text-success";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Budget Categories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          return (
            <Card key={budget.category} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{budget.category}</h3>
                  <p className="text-sm text-muted-foreground">
                    {budget.spent.toFixed(2)} / {budget.limit.toFixed(2)}
                  </p>
                </div>
                {getStatusIcon(budget.spent, budget.limit)}
              </div>
              
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `{Math.min(percentage, 100)}%`,
                      backgroundColor: budget.color,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className={`font-medium {getStatusColor(budget.spent, budget.limit)}`}>
                  {percentage.toFixed(0)}% used
                </span>
                <span className="text-muted-foreground">
                  {(budget.limit - budget.spent).toFixed(2)} left
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
