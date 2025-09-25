import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Loader, 
  Zap, 
  Thermometer, 
  Wifi, 
  Battery,
  Shield,
  Activity
} from 'lucide-react';

interface DiagnosticTest {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'warning';
  details?: string;
  icon: React.ComponentType<any>;
}

const Diagnostics: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [tests, setTests] = useState<DiagnosticTest[]>([
    {
      id: 'power',
      name: 'Power System',
      description: 'Check voltage, current, and power delivery systems',
      status: 'pending',
      icon: Zap
    },
    {
      id: 'thermal',
      name: 'Thermal Management',
      description: 'Verify temperature sensors and cooling systems',
      status: 'pending',
      icon: Thermometer
    },
    {
      id: 'connectivity',
      name: 'Network Connectivity',
      description: 'Test WiFi, cellular, and cloud connectivity',
      status: 'pending',
      icon: Wifi
    },
    {
      id: 'safety',
      name: 'Safety Systems',
      description: 'Verify ground fault protection and emergency stops',
      status: 'pending',
      icon: Shield
    },
    {
      id: 'communication',
      name: 'Vehicle Communication',
      description: 'Test communication protocols with connected vehicle',
      status: 'pending',
      icon: Activity
    },
    {
      id: 'battery',
      name: 'Internal Battery',
      description: 'Check backup battery and power management',
      status: 'pending',
      icon: Battery
    }
  ]);

  const runDiagnostics = async () => {
    setIsRunning(true);
    
    // Reset all tests to pending
    setTests(prev => prev.map(test => ({ ...test, status: 'pending' as const })));

    // Simulate running each test
    for (let i = 0; i < tests.length; i++) {
      // Set current test to running
      setTests(prev => prev.map((test, index) => 
        index === i ? { ...test, status: 'running' as const } : test
      ));

      // Wait for test duration
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Set test result
      setTests(prev => prev.map((test, index) => {
        if (index === i) {
          // Simulate test results
          const outcomes = ['passed', 'passed', 'passed', 'warning', 'failed'];
          const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
          
          let status: 'passed' | 'failed' | 'warning' = 'passed';
          let details = '';
          
          switch (test.id) {
            case 'power':
              status = 'passed';
              details = 'All power systems operating within normal parameters. Voltage: 240.1V, Current: 32.4A';
              break;
            case 'thermal':
              status = randomOutcome as any;
              if (status === 'warning') {
                details = 'Temperature slightly elevated at 42°C. Consider improving ventilation.';
              } else {
                details = 'Thermal management systems functioning correctly.';
              }
              break;
            case 'connectivity':
              status = 'passed';
              details = 'Strong WiFi signal (-45 dBm), cloud connectivity established.';
              break;
            case 'safety':
              status = 'passed';
              details = 'All safety systems operational. Ground fault protection active.';
              break;
            case 'communication':
              status = randomOutcome === 'failed' ? 'failed' : 'passed';
              if (status === 'failed') {
                details = 'Unable to establish communication with vehicle. Check connection.';
              } else {
                details = 'Vehicle communication protocols functioning normally.';
              }
              break;
            case 'battery':
              status = 'passed';
              details = 'Internal backup battery at 95% capacity. Estimated runtime: 2.5 hours.';
              break;
          }
          
          return { ...test, status, details };
        }
        return test;
      }));
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Loader className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-50 border-blue-200';
      case 'passed':
        return 'bg-green-50 border-green-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const completedTests = tests.filter(test => ['passed', 'failed', 'warning'].includes(test.status));
  const passedTests = tests.filter(test => test.status === 'passed');
  const failedTests = tests.filter(test => test.status === 'failed');
  const warningTests = tests.filter(test => test.status === 'warning');

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Diagnostics</h1>
        <p className="text-gray-600">Run comprehensive tests to ensure your charger is operating optimally</p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Diagnostic Tests</h3>
            <p className="text-gray-600">
              {isRunning 
                ? 'Running comprehensive system diagnostics...' 
                : 'Click "Run Diagnostics" to start a full system check'}
            </p>
          </div>
          <button
            onClick={runDiagnostics}
            disabled={isRunning}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Play className="h-5 w-5" />
            <span>{isRunning ? 'Running...' : 'Run Diagnostics'}</span>
          </button>
        </div>

        {/* Progress Summary */}
        {completedTests.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Passed</p>
                  <p className="text-xl font-bold text-green-700">{passedTests.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <div>
                  <p className="text-sm text-gray-600">Warnings</p>
                  <p className="text-xl font-bold text-amber-700">{warningTests.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <XCircle className="h-6 w-6 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Failed</p>
                  <p className="text-xl font-bold text-red-700">{failedTests.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Test Results */}
      <div className="space-y-4">
        {tests.map((test) => {
          const Icon = test.icon;
          return (
            <div
              key={test.id}
              className={`border-2 rounded-xl p-6 transition-all duration-300 ${getStatusColor(test.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                      {getStatusIcon(test.status)}
                    </div>
                    <p className="text-gray-600 mb-2">{test.description}</p>
                    {test.details && (
                      <p className="text-sm text-gray-700 bg-white bg-opacity-70 p-3 rounded-lg">
                        {test.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Recommendations */}
      {completedTests.length === tests.length && !isRunning && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
          <div className="space-y-3">
            {failedTests.length > 0 && (
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-700">Critical Issues Detected</p>
                  <p className="text-sm text-red-600">Immediate attention required for failed tests. Consider contacting support.</p>
                </div>
              </div>
            )}
            {warningTests.length > 0 && (
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-700">Optimization Opportunities</p>
                  <p className="text-sm text-amber-600">Address warnings to improve performance and prevent future issues.</p>
                </div>
              </div>
            )}
            {failedTests.length === 0 && warningTests.length === 0 && (
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-700">Excellent System Health</p>
                  <p className="text-sm text-green-600">Your charger is performing optimally. Continue regular monitoring.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Diagnostics;