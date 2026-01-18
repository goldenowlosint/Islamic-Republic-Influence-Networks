import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useVirtualizer } from '@tanstack/react-virtual';
import rawData from '../Data/IR-Network.json';
import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Title,
    TextInput,
    Badge,
    Button,
    Select,
    SelectItem
} from "@tremor/react";
import {
    MagnifyingGlassIcon,
    ArrowTopRightOnSquareIcon,
    ChevronUpIcon,
    ChevronDownIcon
} from "@heroicons/react/24/outline";

// Helper for explicit sizing
const SearchIconFixed = (props) => <MagnifyingGlassIcon {...props} className={`w-5 h-5 ${props.className || ''}`} />;
const LinkIconFixed = (props) => <ArrowTopRightOnSquareIcon {...props} className={`w-5 h-5 ${props.className || ''}`} />;

const UsersPage = () => {
    // 1. URL Param Management
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get('search') || '';
    const locationFilter = searchParams.get('location') || '';
    const sortBy = searchParams.get('sort') || 'follower_count'; // default sort
    const sortOrder = searchParams.get('order') || 'desc'; // asc or desc

    const parentRef = useRef(null);

    // 2. Extract unique locations for filter
    const uniqueLocations = useMemo(() => {
        const locs = new Set(rawData.map(u => u.account_based_in || 'Unknown'));
        return Array.from(locs).sort();
    }, []);

    // 3. Filtering & Sorting Logic
    const processedUsers = useMemo(() => {
        let result = rawData;

        // Search Filter
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(user =>
                user.name?.toLowerCase().includes(lowerSearch) ||
                user.username?.toLowerCase().includes(lowerSearch) ||
                user.account_based_in?.toLowerCase().includes(lowerSearch)
            );
        }

        // Location Filter
        if (locationFilter && locationFilter !== 'All') {
            result = result.filter(user => (user.account_based_in || 'Unknown') === locationFilter);
        }

        // Sorting
        result = [...result].sort((a, b) => {
            let valA = a[sortBy];
            let valB = b[sortBy];

            // Handle potential nulls
            if (valA === undefined || valA === null) valA = '';
            if (valB === undefined || valB === null) valB = '';

            // Number vs String sorting
            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortOrder === 'asc' ? valA - valB : valB - valA;
            } else {
                return sortOrder === 'asc'
                    ? String(valA).localeCompare(String(valB))
                    : String(valB).localeCompare(String(valA));
            }
        });

        return result;
    }, [searchTerm, locationFilter, sortBy, sortOrder]);

    // 4. Virtualization
    const rowVirtualizer = useVirtualizer({
        count: processedUsers.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 65, // Approximation of row height
        overscan: 10,
    });

    // Handlers
    const handleSearch = (val) => {
        setSearchParams(prev => {
            if (val) prev.set('search', val);
            else prev.delete('search');
            return prev;
        }, { replace: true });
    };

    const handleLocationChange = (val) => {
        setSearchParams(prev => {
            if (val && val !== 'All') prev.set('location', val);
            else prev.delete('location');
            return prev;
        }, { replace: true });
    };

    const handleSort = (column) => {
        const isAsc = sortBy === column && sortOrder === 'asc';
        setSearchParams(prev => {
            prev.set('sort', column);
            prev.set('order', isAsc ? 'desc' : 'asc');
            return prev;
        }, { replace: true });
    };

    // Helper to render sort icon
    const SortIcon = ({ column }) => {
        if (sortBy !== column) return <div className="w-4 h-4 ml-1 inline-block opacity-20"><ChevronDownIcon /></div>;
        return sortOrder === 'asc'
            ? <ChevronUpIcon className="w-4 h-4 ml-1 inline-block text-blue-500" />
            : <ChevronDownIcon className="w-4 h-4 ml-1 inline-block text-blue-500" />;
    };

    return (
        <div className="h-full w-full bg-slate-950 p-6 md:p-10 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 shrink-0">
                <div>
                    <Title className="text-3xl text-slate-100">User Directory</Title>
                    <Text className="text-slate-400">Browsing {processedUsers.length.toLocaleString()} users in the network.</Text>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="w-full md:w-64">
                        <Select
                            value={locationFilter || 'All'}
                            onValueChange={handleLocationChange}
                            placeholder="Filter by Location"
                            className="bg-slate-900 border-slate-700 text-slate-200"
                        >
                            <SelectItem value="All">All Locations</SelectItem>
                            {uniqueLocations.map(loc => (
                                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="w-full md:w-80">
                        <TextInput
                            icon={SearchIconFixed}
                            placeholder="Search by name, handle, or location..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="bg-slate-900 border-slate-700 text-slate-200"
                        />
                    </div>
                </div>
            </div>

            <Card className="bg-slate-900 ring-slate-800 p-0 flex-1 overflow-hidden flex flex-col">
                {/* Fixed Header */}
                <Table className="w-full">
                    <TableHead>
                        <TableRow className="border-b border-slate-800 bg-slate-900">
                            <TableHeaderCell
                                onClick={() => handleSort('name')}
                                className="text-slate-300 cursor-pointer hover:bg-slate-800/50 transition-colors w-[30%]"
                            >
                                User <SortIcon column="name" />
                            </TableHeaderCell>
                            <TableHeaderCell
                                onClick={() => handleSort('account_based_in')}
                                className="text-slate-300 cursor-pointer hover:bg-slate-800/50 transition-colors w-[20%]"
                            >
                                Location <SortIcon column="account_based_in" />
                            </TableHeaderCell>
                            <TableHeaderCell
                                onClick={() => handleSort('follower_count')}
                                className="text-right text-slate-300 cursor-pointer hover:bg-slate-800/50 transition-colors w-[20%]"
                            >
                                Followers <SortIcon column="follower_count" />
                            </TableHeaderCell>
                            <TableHeaderCell
                                onClick={() => handleSort('number_of_tweets')}
                                className="text-right text-slate-300 cursor-pointer hover:bg-slate-800/50 transition-colors w-[15%]"
                            >
                                Tweets <SortIcon column="number_of_tweets" />
                            </TableHeaderCell>
                            <TableHeaderCell className="text-center text-slate-300 w-[15%]">
                                Action
                            </TableHeaderCell>
                        </TableRow>
                    </TableHead>
                </Table>

                {/* Virtualized Body */}
                <div
                    ref={parentRef}
                    className="overflow-y-auto w-full flex-1 custom-scrollbar"
                >
                    <div
                        style={{
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            width: '100%',
                            position: 'relative',
                        }}
                    >
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                            const user = processedUsers[virtualRow.index];
                            return (
                                <div
                                    key={virtualRow.key}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }}
                                    className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors flex items-center"
                                >
                                    {/* Manual Cell Layout to match Header Widths */}
                                    <div className="w-[30%] px-4 py-2 flex items-center gap-3">
                                        {user.profile_pic_url ? (
                                            <img src={user.profile_pic_url} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800 shrink-0" alt="avatar" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 border border-slate-700 shrink-0">
                                                {user.name?.[0]}
                                            </div>
                                        )}
                                        <div className="truncate">
                                            <Text className="font-medium text-slate-200 truncate">{user.name}</Text>
                                            <Text className="text-xs text-slate-500 truncate">@{user.username}</Text>
                                        </div>
                                    </div>

                                    <div className="w-[20%] px-4 py-2">
                                        <Badge size="xs" color="slate" className="rounded truncate max-w-full inline-block">
                                            {user.account_based_in || 'Unknown'}
                                        </Badge>
                                    </div>

                                    <div className="w-[20%] px-4 py-2 text-right">
                                        <Text className="font-mono text-slate-400">
                                            {new Intl.NumberFormat('en-US', { notation: "compact" }).format(user.follower_count)}
                                        </Text>
                                    </div>

                                    <div className="w-[15%] px-4 py-2 text-right">
                                        <Text className="font-mono text-slate-400">
                                            {new Intl.NumberFormat('en-US', { notation: "compact" }).format(user.number_of_tweets)}
                                        </Text>
                                    </div>

                                    <div className="w-[15%] px-4 py-2 flex items-center justify-center gap-2">
                                        <Link to={`/user/${user.username}`}>
                                            <Button size="xs" variant="secondary" className="px-3">
                                                View
                                            </Button>
                                        </Link>
                                        <a href={`https://twitter.com/${user.username}`} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors">
                                            <LinkIconFixed className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UsersPage;
