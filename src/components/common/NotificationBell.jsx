import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertTriangle, MessageSquare, Info } from 'lucide-react';
import { notificationService } from '../../services/notificationService';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Fetch data on mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const count = await notificationService.getUnreadCount();
            setUnreadCount(count);
        } catch (error) {
            console.error("Failed to load notification count", error);
        }
    };

    const handleOpen = async () => {
        setIsOpen(true);
        try {
            const data = await notificationService.getNotifications();
            setNotifications(data);
        } catch (error) {
            console.error("Failed to load notifications", error);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await notificationService.markAsRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Failed to mark read", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error("Failed to mark all read", error);
        }
    };

    // Helper to pick dynamic icons based on title
    const getIcon = (title) => {
        if (title.toLowerCase().includes('warning') || title.toLowerCase().includes('terminated')) return <AlertTriangle size={20} className="text-red-500" />;
        if (title.toLowerCase().includes('reply') || title.toLowerCase().includes('update')) return <MessageSquare size={20} className="text-blue-500" />;
        return <Info size={20} className="text-examsy-primary" />;
    };

    return (
        <>
            {/* The Bell Icon for your Navbar */}
            <button
                onClick={handleOpen}
                className="relative p-2 rounded-xl text-zinc-500 hover:text-examsy-text hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
            >
                <Bell size={22} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-white dark:border-zinc-950"></span>
                )}
            </button>

            {/* The Slide-Over Panel */}
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex justify-end">
                    {/* Dark Backdrop */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setIsOpen(false)} />

                    {/* Side Panel */}
                    <div className="relative w-full max-w-sm h-full bg-examsy-surface border-l border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">

                        {/* Header */}
                        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-examsy-bg/50">
                            <div>
                                <h2 className="text-xl font-black text-examsy-text">Notifications</h2>
                                <p className="text-xs font-bold text-examsy-muted mt-1">You have {unreadCount} unread</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-500 hover:text-examsy-text rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Mark All Read Action */}
                        {unreadCount > 0 && (
                            <div className="px-6 py-3 border-b border-zinc-100 dark:border-zinc-800/50">
                                <button onClick={handleMarkAllAsRead} className="text-xs font-black uppercase text-examsy-primary hover:text-blue-600 tracking-widest flex items-center gap-2">
                                    <Check size={14} /> Mark all as read
                                </button>
                            </div>
                        )}

                        {/* Notification List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {notifications.length === 0 ? (
                                <div className="text-center mt-20 text-examsy-muted">
                                    <Bell size={40} className="mx-auto mb-4 opacity-20" />
                                    <p className="font-bold">You're all caught up!</p>
                                </div>
                            ) : (
                                notifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        onClick={() => !notif.isRead && handleMarkAsRead(notif.id)}
                                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                                            notif.isRead
                                                ? 'bg-transparent border-zinc-200 dark:border-zinc-800/50 opacity-70'
                                                : 'bg-examsy-bg border-examsy-primary/20 shadow-sm shadow-examsy-primary/5'
                                        }`}
                                    >
                                        <div className="flex gap-4">
                                            <div className="mt-1 shrink-0">{getIcon(notif.title)}</div>
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className={`text-sm font-black ${notif.isRead ? 'text-zinc-500' : 'text-examsy-text'}`}>
                                                        {notif.title}
                                                    </h4>
                                                    {!notif.isRead && <div className="w-2 h-2 bg-examsy-primary rounded-full mt-1.5 shrink-0" />}
                                                </div>
                                                <p className="text-xs font-bold text-examsy-muted leading-relaxed line-clamp-3">
                                                    {notif.message}
                                                </p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-3">
                                                    {new Date(notif.createdAt).toLocaleDateString()} • {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default NotificationBell;