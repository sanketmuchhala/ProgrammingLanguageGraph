import type { RawDataset, DatasetVersion } from './types';

export const DATASET_VERSIONS: DatasetVersion[] = [
  { version: 'v1', path: 'dataset/v1/lineage.json', label: 'Version 1.0 (Initial)' },
  // Future versions can be added here
];

export async function loadDataset(version: string = 'v1'): Promise<RawDataset> {
  const versionConfig = DATASET_VERSIONS.find((v) => v.version === version);

  if (!versionConfig) {
    throw new Error(`Dataset version "${version}" not found`);
  }

  const basePath = import.meta.env.BASE_URL || '/';
  const fullPath = `${basePath}${versionConfig.path}`.replace(/\/+/g, '/');

  try {
    const response = await fetch(fullPath);

    if (!response.ok) {
      throw new Error(`Failed to fetch dataset: ${response.status} ${response.statusText}`);
    }

    const dataset: RawDataset = await response.json();
    return dataset;
  } catch (error) {
    console.error('Error loading dataset:', error);
    throw error;
  }
}
