import TwemojiText from './TwemojiText';

const UserList = ({ region, onClose }) => {
    if (!region) return null;

    return (
        <div className="fixed right-0 top-0 h-full w-[400px] bg-slate-900/95 backdrop-blur-xl shadow-2xl z-[1000] overflow-y-auto border-l border-slate-700/50 transition-transform transform translate-x-0">
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-900/80 sticky top-0 z-10 backdrop-blur-md">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">{region.name}</h2>
                    <p className="text-sm text-slate-400 mt-1">{region.count} Users Active</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all transform hover:rotate-90 duration-300"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <div className="p-4 space-y-4">
                {region.users.map((user) => (
                    <div key={user.user_id} className="group p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="relative">
                                {user.profile_pic_url ? (
                                    <img src={user.profile_pic_url} alt={user.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-700 group-hover:ring-blue-500/50 transition-all" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 ring-2 ring-slate-700 group-hover:ring-blue-500/50 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                                        {user.name ? user.name[0].toUpperCase() : '?'}
                                    </div>
                                )}
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-100 truncate text-base">
                                    <TwemojiText text={user.name} />
                                </h3>
                                <p className="text-sm text-blue-400 font-medium truncate">@{user.username}</p>

                                {user.description && (
                                    <div className="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">
                                        <TwemojiText text={user.description} />
                                    </div>
                                )}

                                <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 font-medium border-t border-slate-700/50 pt-3">
                                    <span className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                                        {new Intl.NumberFormat('en-US', { notation: "compact" }).format(user.follower_count)}
                                    </span>
                                    <span className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path></svg>
                                        {new Intl.NumberFormat('en-US', { notation: "compact" }).format(user.number_of_tweets)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
