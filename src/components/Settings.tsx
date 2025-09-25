import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Wifi, 
  Shield, 
  Clock, 
  Zap, 
  Thermometer, 
  Bell,
  User,
  Key,
  Save,
  RotateCcw,
  Smartphone
} from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Network Settings
    wifiSSID: 'Home_Network_5G',
    wifiPassword: '••••••••••••',
    cloudSync: true,
    
    // Charging Settings
    maxCurrent: 32,
    autoStop: 80,
    scheduledCharging: false,
    scheduleStart: '23:00',
    scheduleEnd: '06:00',
    loadBalancing: true,
    
    // Safety Settings
    tempLimit: 50,
    groundFaultProtection: true,
    emergencyStop: true,
    
    // Notification Settings
    statusAlerts: true,
    maintenanceReminders: true,
    efficiencyReports: true,
    mobileNotifications: true,
    emailNotifications: false,
    
    // Display Settings
    displayBrightness: 80,
    sleepMode: true,
    language: 'en-US'
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setUnsavedChanges(true);
  };

  const saveSettings = () => {
    // Simulate saving settings
    setUnsavedChanges(false);
    // Show success message or handle save logic
  };

  const resetToDefaults = () => {
    // Reset to default settings
    setUnsavedChanges(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Charger Settings</h1>
        <p className="text-gray-600">Configure your Astreea charger for optimal performance and your preferences</p>
      </div>

      {/* Save Banner */}
      {unsavedChanges && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SettingsIcon className="h-5 w-5 text-amber-600" />
              <span className="text-amber-800 font-medium">You have unsaved changes</span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={resetToDefaults}
                className="text-amber-700 hover:text-amber-900 text-sm font-medium"
              >
                Discard
              </button>
              <button
                onClick={saveSettings}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Network Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Wifi className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Network Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">WiFi Network</label>
              <input
                type="text"
                value={settings.wifiSSID}
                onChange={(e) => handleSettingChange('wifiSSID', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">WiFi Password</label>
              <input
                type="password"
                value={settings.wifiPassword}
                onChange={(e) => handleSettingChange('wifiPassword', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Cloud Synchronization</h4>
                <p className="text-sm text-gray-600">Sync data with Astreea cloud services</p>
              </div>
              <button
                onClick={() => handleSettingChange('cloudSync', !settings.cloudSync)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.cloudSync ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.cloudSync ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Charging Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Charging Settings</h3>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Current (A)</label>
                <input
                  type="number"
                  min="6"
                  max="48"
                  value={settings.maxCurrent}
                  onChange={(e) => handleSettingChange('maxCurrent', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auto-stop at charge level (%)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={settings.autoStop}
                  onChange={(e) => handleSettingChange('autoStop', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Scheduled Charging</h4>
                <p className="text-sm text-gray-600">Automatically charge during off-peak hours</p>
              </div>
              <button
                onClick={() => handleSettingChange('scheduledCharging', !settings.scheduledCharging)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.scheduledCharging ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.scheduledCharging ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.scheduledCharging && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6 border-l-2 border-blue-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={settings.scheduleStart}
                    onChange={(e) => handleSettingChange('scheduleStart', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={settings.scheduleEnd}
                    onChange={(e) => handleSettingChange('scheduleEnd', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Load Balancing</h4>
                <p className="text-sm text-gray-600">Automatically adjust power based on grid conditions</p>
              </div>
              <button
                onClick={() => handleSettingChange('loadBalancing', !settings.loadBalancing)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.loadBalancing ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.loadBalancing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Safety Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-red-100 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Safety Settings</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Limit (°C)</label>
              <input
                type="number"
                min="40"
                max="60"
                value={settings.tempLimit}
                onChange={(e) => handleSettingChange('tempLimit', parseInt(e.target.value))}
                className="w-full md:w-48 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Ground Fault Protection</h4>
                <p className="text-sm text-gray-600">Automatic shutdown on electrical faults</p>
              </div>
              <button
                onClick={() => handleSettingChange('groundFaultProtection', !settings.groundFaultProtection)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.groundFaultProtection ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.groundFaultProtection ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Emergency Stop Function</h4>
                <p className="text-sm text-gray-600">Enable emergency stop button</p>
              </div>
              <button
                onClick={() => handleSettingChange('emergencyStop', !settings.emergencyStop)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emergencyStop ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emergencyStop ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Bell className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { key: 'statusAlerts', title: 'Status Alerts', description: 'Get notified of charging status changes' },
              { key: 'maintenanceReminders', title: 'Maintenance Reminders', description: 'Receive maintenance scheduling notifications' },
              { key: 'efficiencyReports', title: 'Efficiency Reports', description: 'Weekly performance and optimization reports' },
              { key: 'mobileNotifications', title: 'Mobile Push Notifications', description: 'Receive notifications on your mobile device' },
              { key: 'emailNotifications', title: 'Email Notifications', description: 'Receive notifications via email' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <button
                  onClick={() => handleSettingChange(item.key, !(settings as any)[item.key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    (settings as any)[item.key] ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      (settings as any)[item.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={resetToDefaults}
            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset to Defaults</span>
          </button>
          <button
            onClick={saveSettings}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;