import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import rawData from '../Data/IR-Network.json';
import { Card, Grid, Title, Text, Metric, Flex, Icon, Button, Badge } from '@tremor/react';
import { UserIcon, MapPinIcon, CalendarIcon, ArrowLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

// Icon wrappers with explicit sizing
const MapPinIconFixed = (props) => <MapPinIcon {...props} className={`w-5 h-5 ${props.className || ''}`} />;
const CalendarIconFixed = (props) => <CalendarIcon {...props} className={`w-5 h-5 ${props.className || ''}`} />;
const ArrowLeftIconFixed = (props) => <ArrowLeftIcon {...props} className={`w-5 h-5 ${props.className || ''}`} />;
const LinkIconFixed = (props) => <ArrowTopRightOnSquareIcon {...props} className={`w-5 h-5 ${props.className || ''}`} />;

const UserDetailPage = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    const user = useMemo(() => {
        return rawData.find(u => u.username?.toLowerCase() === username?.toLowerCase());
    }, [username]);

    if (!user) {
        return (
            <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center p-10">
                <Text className="text-slate-400 mb-4">User not found</Text>
                <Button variant="secondary" onClick={() => navigate('/users')}>
                    Back to Directory
                </Button>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-slate-950 p-6 md:p-10 overflow-y-auto custom-scrollbar">
            <Button
                variant="light"
                icon={ArrowLeftIconFixed}
                className="mb-6 text-slate-400 hover:text-white"
                onClick={() => navigate(-1)}
            >
                Back
            </Button>

            <Grid numItems={1} numItemsLg={3} className="gap-6">

                {/* Profile Card */}
                <Card className="col-span-1 lg:col-span-1 bg-slate-900 ring-slate-800 flex flex-col items-center text-center p-8">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full"></div>
                        {user.profile_pic_url ? (
                            <img src={user.profile_pic_url} className="relative w-32 h-32 rounded-full border-4 border-slate-800 shadow-2xl" alt={user.name} />
                        ) : (
                            <div className="relative w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-700">
                                <UserIcon className="w-12 h-12 text-slate-500" />
                            </div>
                        )}
                    </div>

                    <Title className="text-2xl text-slate-100">{user.name}</Title>
                    <Text className="text-blue-400 font-mono">@{user.username}</Text>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <Badge icon={MapPinIconFixed} color="slate">
                            {user.account_based_in || "Unknown Location"}
                        </Badge>
                        {user.creation_date && (
                            <Badge icon={CalendarIconFixed} color="slate" variant="outline">
                                {new Date(user.creation_date).toLocaleDateString()}
                            </Badge>
                        )}
                    </div>

                    <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-xs">
                        {user.description || "No biography available."}
                    </p>

                    <a
                        href={`https://twitter.com/${user.username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 w-full"
                    >
                        <Button size="lg" variant="primary" icon={LinkIconFixed} className="w-full">
                            Open on Twitter
                        </Button>
                    </a>
                </Card>

                {/* Stats & Details */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <Grid numItems={1} numItemsSm={2} className="gap-6">
                        <Card className="bg-slate-900 ring-slate-800">
                            <Text className="text-slate-400">Followers</Text>
                            <Metric className="text-slate-100">{user.follower_count?.toLocaleString()}</Metric>
                        </Card>
                        <Card className="bg-slate-900 ring-slate-800">
                            <Text className="text-slate-400">Total Tweets</Text>
                            <Metric className="text-slate-100">{user.number_of_tweets?.toLocaleString()}</Metric>
                        </Card>
                        <Card className="bg-slate-900 ring-slate-800">
                            <Text className="text-slate-400">Following</Text>
                            <Metric className="text-slate-100">{user.following_count?.toLocaleString()}</Metric>
                        </Card>
                        <Card className="bg-slate-900 ring-slate-800">
                            <Text className="text-slate-400">User ID</Text>
                            <Metric className="text-slate-100 truncate text-xl mt-2">{user.user_id}</Metric>
                        </Card>
                    </Grid>

                    {/* Raw Data View (Optional) */}
                    <Card className="bg-slate-900 ring-slate-800">
                        <Title className="text-slate-100 mb-4">Raw Data</Title>
                        <pre className="text-xs text-slate-500 overflow-x-auto p-4 bg-slate-950 rounded-lg">
                            {JSON.stringify(user, null, 2)}
                        </pre>
                    </Card>
                </div>
            </Grid>
        </div>
    );
};

export default UserDetailPage;
