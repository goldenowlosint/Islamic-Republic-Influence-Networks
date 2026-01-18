import React, { useMemo, useState } from 'react';
import rawData from '../Data/IR-Network.json';
import { Card, Title, Text, Metric, Badge, Button, Select, SelectItem } from '@tremor/react';
import { CalendarIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import TimelineGraphic from '../components/TimelineGraphic';

const CalendarIconFixed = (props) => <CalendarIcon {...props} className={`w-5 h-5 ${props.className || ''}`} />;
const LinkIconFixed = (props) => <ArrowTopRightOnSquareIcon {...props} className={`w-3 h-3 ${props.className || ''}`} />;

const TimelinePage = () => {
    const [selectedLocation, setSelectedLocation] = useState("All");

    const locations = useMemo(() => {
        const locs = new Set(rawData.map(u => u.account_based_in || "Unknown"));
        return ["All", ...Array.from(locs).sort()];
    }, []);

    const sortedUsers = useMemo(() => {
        // Filter users who have creation_date
        let filtered = rawData.filter(u => u.creation_date);

        if (selectedLocation !== "All") {
            if (selectedLocation === "Unknown") {
                filtered = filtered.filter(u => !u.account_based_in);
            } else {
                filtered = filtered.filter(u => u.account_based_in === selectedLocation);
            }
        }

        return filtered.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
    }, [selectedLocation]);

    if (sortedUsers.length === 0 && selectedLocation === "All") {
        return (
            <div className="h-full w-full bg-slate-950 p-8 flex items-center justify-center">
                <Text className="text-slate-400">No creation date data available in dataset.</Text>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-slate-950 flex flex-col overflow-hidden">
            <div className="flex-none p-6 md:p-10 pb-0 z-10 bg-slate-950 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <Title className="text-3xl text-slate-100">Community Timeline</Title>
                    <Text className="text-slate-400">Chronological history of account creations.</Text>
                </div>
                <div className="w-full md:w-64">
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        {locations.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                                {loc}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 pt-6 pb-20">
                <div className="w-full bg-slate-950 p-6 rounded-xl border border-slate-900/50 shadow-inner">
                    <TimelineGraphic data={sortedUsers} />
                </div>

                <div className="mt-6 text-center text-slate-500 text-sm pb-10">
                    Hover over points to see user details. Showing {sortedUsers.length} accounts.
                </div>
            </div>
        </div>
    );
};

export default TimelinePage;
