import React, { useMemo } from 'react';
import rawData from '../Data/IR-Network.json';
import { Card, Grid, Title, Text, BarChart, Metric, Flex, BadgeDelta, DonutChart, Legend, LineChart } from '@tremor/react';

const AnalyticsPage = () => {

    // Process Data for Region Stats
    const regionStats = useMemo(() => {
        const counts = {};
        rawData.forEach(u => {
            const r = u.account_based_in || "Unknown";
            counts[r] = (counts[r] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10); // Top 10
    }, []);

    // Process Data for Top Influencers
    const topInfluencers = useMemo(() => {
        return [...rawData]
            .sort((a, b) => b.follower_count - a.follower_count)
            .slice(0, 8) // Top 8
            .map(u => ({ name: u.username, Followers: u.follower_count }));
    }, []);

    const totalUsers = rawData.length;
    const totalReach = rawData.reduce((acc, u) => acc + (u.follower_count || 0), 0);
    const avgTweets = Math.round(rawData.reduce((acc, u) => acc + (u.number_of_tweets || 0), 0) / rawData.length);

    const kpiData = [
        {
            title: "Total Users",
            description: "Unique accounts currently tracked in the database",
            metric: new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(totalUsers),
            raw: totalUsers.toLocaleString(),
            color: "blue"
        },
        {
            title: "Total Network Reach",
            description: "Sum of followers across all user accounts",
            metric: new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(totalReach),
            raw: totalReach.toLocaleString(),
            color: "orange"
        },
        {
            title: "Avg. Tweets / User",
            description: "Average number of tweets per tracked account",
            metric: new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(avgTweets),
            raw: avgTweets.toLocaleString(),
            color: "emerald"
        },
    ];

    const valueFormatter = (number) =>
        new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(number);

    return (
        <div className="h-full w-full bg-slate-950 p-6 md:p-10 overflow-y-auto custom-scrollbar">
            <div className="mb-10">
                <Title className="text-3xl text-slate-100">Network Insights</Title>
                <Text className="text-slate-400">Deep dive into community demographics and influence.</Text>
            </div>

            {/* KPI Cards */}
            <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mb-8">
                {kpiData.map((item) => (
                    <Card key={item.title} decoration="top" decorationColor={item.color} className="bg-slate-900 ring-slate-800 flex flex-col justify-between">
                        <div>
                            <Text className="text-slate-400 font-medium">{item.title}</Text>
                            <Metric className="text-slate-50 mt-2">
                                <div className="relative group inline-block cursor-help">
                                    <span className="border-b border-dotted border-slate-600 pb-0.5">{item.metric}</span>

                                    {/* Custom Tooltip */}
                                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-slate-100 text-sm font-mono rounded-lg border border-slate-700 shadow-xl z-50 whitespace-nowrap min-w-max pointer-events-none">
                                        {item.raw}
                                        {/* Arrow */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-800"></div>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-4 border-transparent border-t-slate-700 -z-10"></div>
                                    </div>
                                </div>
                            </Metric>
                        </div>
                        <Text className="mt-4 text-xs text-slate-500 leading-snug">{item.description}</Text>
                    </Card>
                ))}
            </Grid>

            <Grid numItems={1} numItemsLg={2} className="gap-8">
                {/* Regional Distribution */}
                <Card className="bg-slate-900 ring-slate-800">
                    <Title className="text-slate-100">Top Regions</Title>
                    <Text className="text-slate-400">Distribution of users by reported location</Text>
                    <div className="mt-6">
                        <BarChart
                            data={regionStats}
                            index="name"
                            categories={["value"]}
                            colors={["blue"]}
                            valueFormatter={valueFormatter}
                            yAxisWidth={80}
                            className="h-80"
                            layout="vertical"
                            showLegend={false}
                        />
                    </div>
                </Card>

                {/* Influencers */}
                <Card className="bg-slate-900 ring-slate-800">
                    <Title className="text-slate-100">Top Influencers</Title>
                    <Text className="text-slate-400">Accounts with highest follower counts</Text>
                    <div className="mt-6">
                        <BarChart
                            data={topInfluencers}
                            index="name"
                            categories={["Followers"]}
                            colors={["purple"]}
                            valueFormatter={valueFormatter}
                            yAxisWidth={100}
                            className="h-80"
                        />
                    </div>
                </Card>
            </Grid>

            {/* Additional Stats Section - Donut Chart for Top 5 Share */}
            <div className="mt-8">
                <Card className="bg-slate-900 ring-slate-800">
                    <Title className="text-slate-100">Regional Market Share</Title>
                    <div className="mt-6">
                        <DonutChart
                            data={regionStats.slice(0, 5)}
                            category="value"
                            index="name"
                            valueFormatter={valueFormatter}
                            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                            className="h-80"
                        />
                        <div className="flex justify-center mt-6">
                            <Legend
                                categories={regionStats.slice(0, 5).map(x => x.name)}
                                colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                                className="text-slate-300"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div >
    );
};

export default AnalyticsPage;
