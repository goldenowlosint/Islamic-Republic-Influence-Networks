import React, { useMemo } from 'react';
import rawData from '../Data/IR-Network.json';
import { Card, Title, Text, Metric, Badge, Button } from '@tremor/react';
import { CalendarIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const CalendarIconFixed = (props) => <CalendarIcon {...props} className={`w-5 h-5 ${props.className || ''}`} />;
const LinkIconFixed = (props) => <ArrowTopRightOnSquareIcon {...props} className={`w-3 h-3 ${props.className || ''}`} />;

const TimelinePage = () => {
    const sortedUsers = useMemo(() => {
        // Filter users who have creation_date
        const withDate = rawData.filter(u => u.creation_date);
        return withDate.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
    }, []);

    if (sortedUsers.length === 0) {
        return (
            <div className="h-full w-full bg-slate-950 p-8 flex items-center justify-center">
                <Text className="text-slate-400">No creation date data available in dataset.</Text>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-slate-950 p-6 md:p-10 overflow-y-auto custom-scrollbar">
            <div className="mb-10">
                <Title className="text-3xl text-slate-100">Community Timeline</Title>
                <Text className="text-slate-400">Chronological history of account creations.</Text>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-8 pb-10">
                {sortedUsers.slice(0, 100).map((user, idx) => (
                    <div key={idx} className="relative pl-8 md:pl-10">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

                        <Card className="bg-slate-900 ring-slate-800 hover:ring-blue-500/50 transition-all duration-300 group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                <div className="flex items-center gap-3">
                                    {user.profile_pic_url ? (
                                        <img src={user.profile_pic_url} className="w-10 h-10 rounded-full border border-slate-700" alt="avatar" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 border border-slate-700">
                                            {user.name?.[0]}
                                        </div>
                                    )}
                                    <div>
                                        <Text className="text-slate-200 font-bold">{user.name}</Text>
                                        <Text className="text-xs text-slate-500">@{user.username}</Text>
                                    </div>
                                </div>
                                <Badge icon={CalendarIconFixed} color="blue" size="xs">
                                    {new Date(user.creation_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </Badge>
                            </div>

                            <Text className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                                {user.description || "No bio available."}
                            </Text>

                            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                <a href={`https://twitter.com/${user.username}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 font-medium">
                                    View on Twitter <LinkIconFixed />
                                </a>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelinePage;
