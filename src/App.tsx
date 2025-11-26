import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare, 
  Settings, 
  TrendingUp,
  Battery,
  Wifi,
  ThermometerSun,
  Clock,
  User,
  Bell,
  BarChart3,
  Shield,
  Wrench,
  BotMessageSquare
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import ChatAssistant from './components/ChatAssistant';
import Diagnostics from './components/Diagnostics';
import Analytics from './components/Analytics';
import AppSettings from './components/Settings';
import Navbar from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chargerStatus, setChargerStatus] = useState('optimal');
  const [isConnected, setIsConnected] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate status changes
      const statuses = ['optimal', 'warning', 'maintenance'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setChargerStatus(randomStatus);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-500';
      case 'warning': return 'text-amber-500';
      case 'maintenance': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard chargerStatus={chargerStatus} isConnected={isConnected} />;
      case 'chat':
        return <ChatAssistant />;
      case 'diagnostics':
        return <Diagnostics />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <AppSettings />;
      default:
        return <Dashboard chargerStatus={chargerStatus} isConnected={isConnected} />;
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        chargerStatus={chargerStatus}
        isConnected={isConnected}
      />
      
      <main className="pt-16">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;