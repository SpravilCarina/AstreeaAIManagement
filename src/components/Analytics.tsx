import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  BarChart3,
  Activity,
  Zap,
  Clock,
  DollarSign,
  Leaf
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Mock data for demonstration
  const generateChartData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      energy: Math.floor(Math.random() * 50) + 20,
      sessions: Math.floor(Math.random() * 8) + 2,
      efficiency: Math.floor(Math.random() * 5) + 95
    }));
  };

  const chartData = generateChartData();
  const totalEnergy = chartData.reduce((sum, day) => sum + day.energy, 0);
  const totalSessions = chartData.reduce((sum, day) => sum + day.sessions, 0);
  const avgEfficiency = chartData.reduce((sum, day) => sum + day.efficiency, 0) / chartData.length;

  const metrics = [
    {
      title: 'Total Energy Delivered',
      value: `${totalEnergy.toFixed(1)} kWh`,
      change: '+12.5%',
      trend: 'up',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Charging Sessions',
      value: totalSessions.toString(),
      change: '+8.3%',
      trend: 'up',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Average Efficiency',
      value: `${avgEfficiency.toFixed(1)}%`,
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Average Session Time',
      value: '2h 34m',
      change: '-5.2%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Energy Cost Saved',
      value: '$142.30',
      change: '+15.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      title: 'CO₂ Avoided',
      value: '89.2 kg',
      change: '+18.4%',
      trend: 'up',
      icon: Leaf,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your charging performance and optimize usage patterns</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{metric.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">{metric.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Energy Usage Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Daily Energy Usage</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64">
            <div className="h-full flex items-end justify-between space-x-2">
              {chartData.slice(-7).map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${(day.energy / 70) * 100}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    {day.date.split('/').slice(0, 2).join('/')}
                  </div>
                  <div className="text-xs font-medium text-gray-700">
                    {day.energy} kWh
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Efficiency Trend */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Efficiency Trend</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64">
            <div className="h-full relative">
              <svg className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  points={chartData.slice(-7).map((day, index) => 
                    `${(index * 100) / 6},${240 - ((day.efficiency - 90) * 24)}`
                  ).join(' ')}
                />
                {chartData.slice(-7).map((day, index) => (
                  <circle
                    key={index}
                    cx={(index * 100) / 6}
                    cy={240 - ((day.efficiency - 90) * 24)}
                    r="4"
                    fill="#10B981"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Patterns */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Usage Patterns & Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-900 mb-2">Peak Usage Hours</h4>
            <p className="text-sm text-gray-600 mb-2">6 PM - 10 PM weekdays</p>
            <p className="text-xs text-blue-700">💡 Consider shifting to off-peak hours for better rates</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-gray-900 mb-2">Optimal Charging Level</h4>
            <p className="text-sm text-gray-600 mb-2">75-85% for daily use</p>
            <p className="text-xs text-green-700">✓ Your current pattern is excellent for battery health</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-medium text-gray-900 mb-2">Energy Efficiency</h4>
            <p className="text-sm text-gray-600 mb-2">97.2% average efficiency</p>
            <p className="text-xs text-purple-700">🏆 Top 5% performance among all users</p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Recommendations</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Optimize Charging Schedule</h4>
              <p className="text-sm text-gray-600">Based on your usage pattern, scheduling charges between 11 PM - 5 AM could save you $23/month on electricity costs.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Performance Trending Up</h4>
              <p className="text-sm text-gray-600">Your charging efficiency has improved 12% over the last month. Keep maintaining your current practices.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Usage Insight</h4>
              <p className="text-sm text-gray-600">Your weekend charging sessions are 23% longer on average. Consider pre-conditioning to reduce session time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;