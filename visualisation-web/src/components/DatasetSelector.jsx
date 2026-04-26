import React from 'react';
import { Select, SelectItem } from "@tremor/react";
import { useDataContext } from '../contexts/DataContext';

const DatasetSelector = () => {
    const { datasetId, setDatasetId, availableDatasets } = useDataContext();

    return (
        <div className="w-48">
            <Select
                value={datasetId}
                onValueChange={setDatasetId}
                className="bg-slate-900 border-slate-700 text-slate-200"
                placeholder="Select Dataset"
            >
                {availableDatasets.map((ds) => (
                    <SelectItem key={ds.id} value={ds.id}>
                        {ds.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};

export default DatasetSelector;
