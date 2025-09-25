import React from 'react';
import { 
  Zap, 
  Activity, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Wifi, 
  WifiOff,
  Bell
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  chargerStatus: string;
  isConnected: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, chargerStatus, isConnected }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'warning': return 'bg-amber-500';
      case 'maintenance': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'diagnostics', label: 'Diagnostics', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Astreea AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-2 ml-4">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(chargerStatus)}`}></div>
              <span className="text-sm text-gray-600 capitalize">{chargerStatus}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              <span className="hidden md:inline text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Offline'}
              </span>
            </div>
            <Bell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center py-2 text-xs ${
                  activeTab === tab.id
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="h-4 w-4 mb-1" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;