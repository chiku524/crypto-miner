const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isDesktop: true,
  platform: process.platform,
  versions: process.versions,
  getAutoUpdateEnabled: () => ipcRenderer.invoke('getAutoUpdateEnabled'),
  setAutoUpdateEnabled: (enabled) => ipcRenderer.invoke('setAutoUpdateEnabled', enabled),
  getAppVersion: () => ipcRenderer.invoke('getAppVersion'),
  reload: () => ipcRenderer.invoke('reload'),
  checkForUpdates: () => ipcRenderer.invoke('checkForUpdates'),
  getUpdateDownloaded: () => ipcRenderer.invoke('getUpdateDownloaded'),
  getUpdateAvailableInfo: () => ipcRenderer.invoke('getUpdateAvailableInfo'),
  openExternal: (url) => ipcRenderer.invoke('openExternal', url),
  quitAndInstall: () => ipcRenderer.invoke('quitAndInstall'),
  installUpdateNow: () => ipcRenderer.invoke('installUpdateNow'),
  onUpdateDownloaded: (callback) => {
    ipcRenderer.on('update-downloaded', () => callback());
  },
  onUpdateAvailable: (callback) => {
    ipcRenderer.on('update-available', (_event, info) => callback(info));
  },
  onUpdateProgress: (callback) => {
    const handler = (_event, payload) => callback(payload);
    ipcRenderer.on('update-progress', handler);
    return () => ipcRenderer.removeListener('update-progress', handler);
  },
  // Real mining (desktop only) — XMRig auto-downloads on first use
  startRealMining: (opts) => ipcRenderer.invoke('startRealMining', opts),
  stopRealMining: (networkId, environment) => ipcRenderer.invoke('stopRealMining', networkId, environment),
  getRealMiningStats: (networkId, environment) => ipcRenderer.invoke('getRealMiningStats', networkId, environment),
  isRealMining: (networkId, environment) => ipcRenderer.invoke('isRealMining', networkId, environment),
  onMinerDownloadProgress: (callback) => {
    const handler = (_, payload) => callback(payload);
    ipcRenderer.on('miner-download-progress', handler);
    return () => ipcRenderer.removeListener('miner-download-progress', handler);
  },
  // Node running
  startNode: (opts) => ipcRenderer.invoke('startNode', opts),
  stopNode: (networkId, environment) => ipcRenderer.invoke('stopNode', networkId, environment),
  getNodeStatus: (networkId, environment) => ipcRenderer.invoke('getNodeStatus', networkId, environment),
  isNodeRunning: (networkId, environment) => ipcRenderer.invoke('isNodeRunning', networkId, environment),
  onNodeDownloadProgress: (callback) => {
    const handler = (_, payload) => callback(payload);
    ipcRenderer.on('node-download-progress', handler);
    return () => ipcRenderer.removeListener('node-download-progress', handler);
  },
});
