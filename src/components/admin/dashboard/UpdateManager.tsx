import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface Update {
  version: string;
  description: string[];
  size: string;
  status: 'available' | 'installing' | 'completed' | 'error';
  error?: string;
}

const UpdateManager = () => {
  const [checking, setChecking] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const checkForUpdates = async () => {
    setChecking(true);
    setError(null);

    try {
      // Fetch latest release info from GitHub
      const response = await fetch('https://api.github.com/repos/atreyu1968/ir-final-7/releases/latest');
      if (!response.ok) throw new Error('Error checking for updates');

      const release = await response.json();
      const currentVersion = process.env.npm_package_version || '1.0.0';
      
      if (release.tag_name > currentVersion) {
        setUpdates([{
          version: release.tag_name,
          description: release.body.split('\n').filter(Boolean),
          size: '~25MB',
          status: 'available'
        }]);
      } else {
        setUpdates([]);
      }
    } catch (err) {
      setError('Error al buscar actualizaciones');
      console.error(err);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkForUpdates();
  }, []);

  const installUpdate = async (version: string) => {
    try {
      setInstalling(true);
      const update = updates.find(u => u.version === version);
      if (!update) return;

      // Update status
      setUpdates(prev =>
        prev.map(update =>
          update.version === version
            ? { ...update, status: 'installing' }
            : update
        )
      );

      // Simulate installation progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 500);

      // Simulate installation
      await new Promise(resolve => setTimeout(resolve, 5000));

      clearInterval(interval);
      setProgress(100);

      setUpdates(prev =>
        prev.map(update =>
          update.version === version
            ? { ...update, status: 'completed' }
            : update
        )
      );
    } catch (err) {
      setUpdates(prev =>
        prev.map(update =>
          update.version === version
            ? { ...update, status: 'error', error: 'Error en la instalación' }
            : update
        )
      );
      setError('Error al instalar la actualización');
      console.error(err);
    } finally {
      setInstalling(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Actualizaciones del Sistema</h3>
        <button
          onClick={checkForUpdates}
          disabled={checking}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
          <span>{checking ? 'Buscando...' : 'Buscar Actualizaciones'}</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <XCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {updates.map((update) => (
          <div
            key={update.version}
            className="bg-white p-4 rounded-lg border"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Versión {update.version}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Tamaño: {update.size}
                </p>
              </div>

              {update.status === 'available' && (
                <button
                  onClick={() => installUpdate(update.version)}
                  disabled={installing}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>Instalar</span>
                </button>
              )}

              {update.status === 'installing' && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Instalando...</span>
                </div>
              )}

              {update.status === 'completed' && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Instalado</span>
                </div>
              )}

              {update.status === 'error' && (
                <div className="flex items-center space-x-2 text-red-600">
                  <XCircle className="w-4 h-4" />
                  <span className="text-sm">{update.error}</span>
                </div>
              )}
            </div>

            {update.status === 'installing' && progress > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progreso de instalación</span>
                  <span className="text-gray-700 font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-700">
                Cambios en esta versión:
              </h5>
              <ul className="mt-2 space-y-1">
                {update.description.map((change, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {change}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {updates.length === 0 && !checking && (
          <div className="text-center py-6 text-gray-500">
            No hay actualizaciones disponibles
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateManager;