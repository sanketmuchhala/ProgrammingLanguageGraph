import { useEffect } from 'react';
import { useGraphStore } from '../store/useGraphStore';
import { loadDataset } from '../data/loadDataset';
import { validateDataset } from '../data/validateDataset';
import { normalizeDataset } from '../data/normalizeDataset';
import { indexDataset } from '../data/indexDataset';
import { GraphView } from '../graph/GraphView';
import { MinimalPanel } from '../ui/MinimalPanel';
import { SideDrawer } from '../ui/SideDrawer';
import { Legend } from '../ui/Legend';
import './App.css';

function App() {
  const { setDataset, setDatasetIndex, setValidationReport } = useGraphStore();

  useEffect(() => {
    async function initializeDataset() {
      try {
        console.log('Loading dataset...');
        const rawDataset = await loadDataset('v1');

        console.log('Validating dataset...');
        const validationReport = validateDataset(rawDataset);
        setValidationReport(validationReport);

        console.log('Normalizing dataset...');
        const normalizedDataset = normalizeDataset(rawDataset);
        setDataset(normalizedDataset);

        console.log('Indexing dataset...');
        const datasetIndex = indexDataset(normalizedDataset);
        setDatasetIndex(datasetIndex);

        console.log('✅ Dataset loaded successfully');
      } catch (error) {
        console.error('Failed to load dataset:', error);
      }
    }

    initializeDataset();
  }, [setDataset, setDatasetIndex, setValidationReport]);

  return (
    <div className="app">
      <MinimalPanel />
      <div className="graph-container">
        <GraphView />
        <Legend />
      </div>
      <SideDrawer />
    </div>
  );
}

export default App;
