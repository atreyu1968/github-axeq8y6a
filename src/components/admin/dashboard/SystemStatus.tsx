import React from 'react';
import { Server, Database, Network, AlertCircle, CheckCircle } from 'lucide-react';
import { useSystemStatus } from '../../../hooks/useSystemStatus';
import { useDatabaseConfigStore } from '../../../stores/databaseConfigStore';

const SystemStatus = () => {
  const { status, lastCheck, checkStatus } = useSystemStatus();
  const { status: dbStatus } = useDatabaseConfigStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img 
            src="https://postimg.cc/tZZkBdCm" 
            alt="Logo" 
            className="h-12 w-auto"
          />
          <h3 className="text-lg font-medium">Estado del Sistema</h3>
        </div>
        <button
          onClick={checkStatus}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Actualizar Estado
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Application Status */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Server className="w-5 h-5 text-gray-400 mr-2" />
              <span className="font-medium">Aplicación</span>
            </div>
            {status.application ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {status.application ? 'Funcionando correctamente' : 'Error en el servicio'}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            Versión: {process.env.npm_package_version || '1.0.0'}
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Database className="w-5 h-5 text-gray-400 mr-2" />
              <span className="font-medium">Base de Datos</span>
            </div>
            {dbStatus.connected ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {dbStatus.connected ? 'Conectada' : 'Error de conexión'}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            Conexiones activas: {dbStatus.activeConnections}/{dbStatus.poolSize}
          </div>
        </div>

        {/* Network Status */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Network className="w-5 h-5 text-gray-400 mr-2" />
              <span className="font-medium">Red</span>
            </div>
            {status.network ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {status.network ? 'Conectividad OK' : 'Problemas de red'}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            IP: {window.location.hostname}
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Última comprobación: {new Date(lastCheck).toLocaleString()}
      </div>
    </div>
  );
};

export default SystemStatus;