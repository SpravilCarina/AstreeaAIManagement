import React, { useState, useEffect } from 'react';
import { 
  Battery, 
  ThermometerSun, 
  Zap, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Power,
  Gauge
} from 'lucide-react';

interface DashboardProps {
  chargerStatus: string;
  isConnected: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ chargerStatus, isConnected }) => {
  const [currentPower, setCurrentPower] = useState(47.2);
  const [voltage, setVoltage] = useState(240.1);
  const [current, setCurrent] = useState(32.4);
  const [temperature, setTemperature] = useState(42);
  const [sessionTime, setSessionTime] = useState(0);
  const [energyDelivered, setEnergyDelivered] = useState(23.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPower(prev => prev + (Math.random() - 0.5) * 2);
      setVoltage(prev => prev + (Math.random() - 0.5) * 0.5);
      setCurrent(prev => prev + (Math.random() - 0.5) * 1);
      setTemperature(prev => Math.max(35, Math.min(50, prev + (Math.random() - 0.5) * 2)));
      setSessionTime(prev => prev + 1);
      setEnergyDelivered(prev => prev + 0.02);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getStatusDetails = () => {
    switch (chargerStatus) {
      case 'optimal':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          message: 'All systems operating normally'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-amber-500',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          message: 'Minor issue detected - monitoring'
        };
      case 'maintenance':
        return {
          icon: AlertTriangle,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          message: 'Maintenance required'
        };
      default:
        return {
          icon: Activity,
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          message: 'Status unknown'
        };
    }
  };

  const statusDetails = getStatusDetails();
  const StatusIcon = statusDetails.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Charger Dashboard</h1>
        <p className="text-gray-600">Real-time monitoring and control for your Astreea EV charger</p>
      </div>

      {/* Status Card */}
      <div className={`mb-6 rounded-xl border-2 ${statusDetails.borderColor} ${statusDetails.bgColor} p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <StatusIcon className={`h-8 w-8 ${statusDetails.color}`} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
              <p className={`text-sm ${statusDetails.color}`}>{statusDetails.message}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Connection</div>
            <div className={`font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Power Output</p>
              <p className="text-2xl font-bold text-gray-900">{currentPower.toFixed(1)}</p>
              <p className="text-xs text-gray-400">kW</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentPower / 50) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Voltage</p>
              <p className="text-2xl font-bold text-gray-900">{voltage.toFixed(1)}</p>
              <p className="text-xs text-gray-400">V</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Gauge className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(voltage / 250) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Current</p>
              <p className="text-2xl font-bold text-gray-900">{current.toFixed(1)}</p>
              <p className="text-xs text-gray-400">A</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(current / 40) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="text-2xl font-bold text-gray-900">{temperature}</p>
              <p className="text-xs text-gray-400">°C</p>
            </div>
            <div className={`p-3 rounded-lg ${temperature > 45 ? 'bg-red-100' : 'bg-orange-100'}`}>
              <ThermometerSun className={`h-6 w-6 ${temperature > 45 ? 'text-red-600' : 'text-orange-600'}`} />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${temperature > 45 ? 'bg-red-600' : 'bg-orange-600'}`}
              style={{ width: `${(temperature / 60) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Session Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Session</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Duration</span>
              </div>
              <span className="font-medium text-gray-900">{formatTime(sessionTime)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Battery className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Energy Delivered</span>
              </div>
              <span className="font-medium text-gray-900">{energyDelivered.toFixed(1)} kWh</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Efficiency</span>
              </div>
              <span className="font-medium text-green-600">97.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-600">Charging pattern is optimal for battery health</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-600">Peak efficiency achieved at current settings</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-600">Consider maintenance check in 2 weeks</p>
            </div>
          </div>
          <button className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-800">
            View all recommendations →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-colors">
            <Power className="h-4 w-4" />
            <span>Stop Session</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg transition-colors">
            <Activity className="h-4 w-4" />
            <span>Run Diagnostics</span>
          </button>
          <button className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg transition-colors">
            <TrendingUp className="h-4 w-4" />
            <span>Optimize Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;