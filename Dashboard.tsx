import { useState } from "react";
import { BudgetOverview } from "./BudgetOverview";
import { ExpenseForm } from "./ExpenseForm";
import { TransactionList } from "./TransactionList";
import { BudgetCategories } from "./BudgetCategories";
import { SpendingChart } from "./SpendingChart";
import { Button } from "./ui/button";
import { Plus, Settings } from "lucide-react";

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
  color: string;
}

export const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      category: "Food & Dining",
      amount: 45.50,
      description: "Grocery shopping",
      date: new Date(2025, 9, 15),
    },
    {
      id: "2",
      category: "Transportation",
      amount: 30.00,
      description: "Gas",
      date: new Date(2025, 9, 14),
    },
    {
      id: "3",
      category: "Entertainment",
      amount: 65.00,
      description: "Movie tickets",
      date: new Date(2025, 9, 13),
    },
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { category: "Food & Dining", limit: 500, spent: 245.50, color: "hsl(142 70% 45%)" },
    { category: "Transportation", limit: 300, spent: 180.00, color: "hsl(185 70% 45%)" },
    { category: "Entertainment", limit: 200, spent: 165.00, color: "hsl(35 100% 55%)" },
    { category: "Shopping", limit: 400, spent: 420.00, color: "hsl(0 72% 60%)" },
    { category: "Utilities", limit: 250, spent: 120.00, color: "hsl(280 65% 60%)" },
  ]);

  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([newTransaction, ...transactions]);

    // Update budget spent amount
    setBudgets(budgets.map(budget => 
      budget.category === transaction.category
        ? { ...budget, spent: budget.spent + transaction.amount }
        : budget
    ));

    setShowExpenseForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FinSmart
              </h1>
              <p className="text-sm text-muted-foreground">Your Personal Finance Guardian</p>
            </div>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Budget Overview */}
        <BudgetOverview totalBudget={totalBudget} totalSpent={totalSpent} />

        {/* Quick Actions */}
        <div className="flex gap-4">
          <Button 
            onClick={() => setShowExpenseForm(true)}
            className="flex-1 h-14 text-lg font-semibold"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Expense
          </Button>
        </div>

        {/* Expense Form Modal */}
        {showExpenseForm && (
          <ExpenseForm
            categories={budgets.map(b => b.category)}
            onSubmit={addTransaction}
            onCancel={() => setShowExpenseForm(false)}
          />
        )}

        {/* Budget Categories */}
        <BudgetCategories budgets={budgets} />

        {/* Charts and Transactions */}
        <div className="grid lg:grid-cols-2 gap-8">
          <SpendingChart budgets={budgets} />
          <TransactionList transactions={transactions.slice(0, 10)} />
        </div>
      </main>
    </div>
  );
};
