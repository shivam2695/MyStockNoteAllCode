import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  TrendingUp,
  Activity,
  CheckCircle,
  Search,
  BarChart3,
  Target,
} from "lucide-react";

interface Stock {
  id: string;
  symbol: string;
  companyName: string;
  entryPrice: number;
  quantity: number;
  entryDate: string;
  status: "Active" | "Closed";
  return: number;
  returnPercentage: number;
}

const StockJournal = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock data
  const [stocks] = useState<Stock[]>([
    {
      id: "1",
      symbol: "TCS",
      companyName: "Tata Consultancy Services",
      entryPrice: 3800,
      quantity: 10,
      entryDate: "2024-01-15",
      status: "Active",
      return: 1200,
      returnPercentage: 3.2,
    },
    {
      id: "2",
      symbol: "INFY",
      companyName: "Infosys Limited",
      entryPrice: 1500,
      quantity: 20,
      entryDate: "2024-01-10",
      status: "Closed",
      return: 800,
      returnPercentage: 2.7,
    },
    {
      id: "3",
      symbol: "RELIANCE",
      companyName: "Reliance Industries",
      entryPrice: 2400,
      quantity: 5,
      entryDate: "2024-01-20",
      status: "Active",
      return: -200,
      returnPercentage: -1.7,
    },
  ]);

  const stats = {
    totalEntries: stocks.length,
    activeEntries: stocks.filter((s) => s.status === "Active").length,
    closedEntries: stocks.filter((s) => s.status === "Closed").length,
    totalReturn: stocks.reduce((acc, s) => acc + s.return, 0),
    totalReturnPercentage: 4.2, // Mock calculation
  };

  const filteredStocks = stocks.filter((stock) => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        stock.symbol.toLowerCase().includes(query) ||
        stock.companyName.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-slate-900">
                StockNote
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => navigate("/")}>
                Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Stock Journal
              </h1>
              <p className="text-muted-foreground mt-2">
                ✍️ One place for all your trading moves.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg px-5 py-3 min-w-[140px]">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs font-medium text-blue-700">Total</p>
                    <p className="text-xl font-bold text-blue-900">
                      {stats.totalEntries}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="bg-blue-100 px-2 py-1 rounded-md">
                        <span className="text-xs font-semibold text-blue-700">
                          {stats.totalReturnPercentage >= 0 ? "+" : ""}
                          {stats.totalReturnPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-blue-600">₹</span>
                        <span className="text-xs font-medium text-blue-800">
                          {Math.abs(stats.totalReturn).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg px-5 py-3 min-w-[140px]">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-xs font-medium text-green-700">Active</p>
                    <p className="text-xl font-bold text-green-900">
                      {stats.activeEntries}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg px-5 py-3 min-w-[140px]">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-xs font-medium text-purple-700">
                      Closed
                    </p>
                    <p className="text-xl font-bold text-purple-900">
                      {stats.closedEntries}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button className="gap-2 px-6 py-2 h-11 shadow-sm">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Trade Entries</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[200px] pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Stock Table */}
            <div className="space-y-4">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {stock.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {stock.symbol}
                      </div>
                      <div className="text-sm text-slate-500">
                        {stock.companyName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-sm text-slate-600">Entry Price</div>
                      <div className="font-medium">₹{stock.entryPrice}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-slate-600">Quantity</div>
                      <div className="font-medium">{stock.quantity}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-slate-600">Return</div>
                      <div
                        className={`font-medium ${stock.return >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {stock.return >= 0 ? "+" : ""}₹{stock.return}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-slate-600">Status</div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          stock.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {stock.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredStocks.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  {searchQuery
                    ? "No stocks found matching your search."
                    : "No trades logged yet. Add your first entry!"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StockJournal;
