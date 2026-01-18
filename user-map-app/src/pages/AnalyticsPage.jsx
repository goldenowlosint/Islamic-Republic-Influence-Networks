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
        { title: "Total Users", metric: totalUsers.toLocaleString(), color: "blue" },
        { title: "Total Network Reach", metric: new Intl.NumberFormat('en-US', { notation: "compact" }).format(totalReach), color: "orange" },
        { title: "Avg. Tweets / User", metric: avgTweets.toLocaleString(), color: "emerald" },
    ];

    return (
        <div className="h-full w-full bg-slate-950 p-6 md:p-10 overflow-y-auto custom-scrollbar">
            <div className="mb-10">
                <Title className="text-3xl text-slate-100">Network Insights</Title>
                <Text className="text-slate-400">Deep dive into community demographics and influence.</Text>
            </div>

            {/* KPI Cards */}
            <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mb-8">
                {kpiData.map((item) => (
                    <Card key={item.title} decoration="top" decorationColor={item.color} className="bg-slate-900 ring-slate-800">
                        <Text className="text-slate-400">{item.title}</Text>
                        <Metric className="text-slate-50">{item.metric}</Metric>
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
