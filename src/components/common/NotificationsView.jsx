import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowLeft, Check, AlertTriangle, Info, ShieldAlert, Megaphone } from 'lucide-react';
import { notificationService } from '../../services/notificationService';
import CustomAlert from './CustomAlert';

const NotificationsView = ({ basePath }) => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const loadNotifs = async () => {
            try {
                const data = await notificationService.getNotifications();
                setNotifications(data || []);
            } catch (error) {
                console.error("Loading error:", error);
                setAlert({ type: 'error', title: 'Error', message: 'Failed to load notifications.' });
            } finally {
                setIsLoading(false);
            }
        };

        loadNotifs();
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            await notificationService.markAsRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        } catch (error) {
            console.error("Failed to mark read", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch (error) {
            console.error("Failed to mark all read", error);
        }
    };

    const getIcon = (title) => {
        const t = title.toLowerCase();

        // 🟢 Catches Class Announcements
        if (t.includes('announcement')) {
            return <div className="p-3 bg-purple-500/10 text-purple-500 rounded-2xl"><Megaphone size={24} /></div>;
        }
        if (t.includes('warning') || t.includes('proctoring') || t.includes('security')) {
            return <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl"><AlertTriangle size={24} /></div>;
        }
        if (t.includes('reply') || t.includes('update') || t.includes('reviewed')) {
            return <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl"><ShieldAlert size={24} /></div>;
        }
        return <div className="p-3 bg-examsy-primary/10 text-examsy-primary rounded-2xl"><Info size={24} /></div>;
    };

    if (isLoading) return <div className="p-10 text-center font-bold text-examsy-muted">Loading notifications...</div>;

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="max-w-4xl mx-auto pb-10 animate-fade-in px-4 md:px-0">
            {alert && <CustomAlert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert(null)} />}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
                <div>
                    <button
                        onClick={() => navigate(basePath)}
                        className="md:hidden flex items-center gap-2 text-xs font-black uppercase tracking-widest text-examsy-muted hover:text-examsy-primary transition-colors mb-4"
                    >
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                    <h1 className="text-3xl md:text-4xl font-black text-examsy-text flex items-center gap-3">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="text-sm px-3 py-1 bg-red-500 text-white rounded-full">
                                {unreadCount} New
                            </span>
                        )}
                    </h1>
                </div>

                {unreadCount > 0 && (
                    <button
                        onClick={handleMarkAllAsRead}
                        className="px-6 py-3 bg-examsy-bg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-2xl font-black text-sm transition-all flex items-center gap-2 border border-zinc-200 dark:border-zinc-800"
                    >
                        <Check size={18} /> Mark all as read
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <div className="py-20 text-center bg-examsy-surface rounded-[2rem] border border-zinc-200 dark:border-zinc-800 border-dashed">
                        <Bell size={48} className="mx-auto text-examsy-muted mb-4 opacity-30" />
                        <h3 className="text-xl font-black text-examsy-text">You're all caught up!</h3>
                        <p className="text-examsy-muted font-bold mt-2">No new notifications right now.</p>
                    </div>
                ) : (
                    notifications.map(notif => (
                        <div
                            key={notif.id}
                            onClick={() => !notif.isRead && handleMarkAsRead(notif.id)}
                            className={`p-6 rounded-[2rem] border transition-all duration-300 flex flex-col sm:flex-row gap-6 ${
                                notif.isRead
                                    ? 'bg-examsy-surface border-zinc-200 dark:border-zinc-800 opacity-70 hover:opacity-100'
                                    : 'bg-examsy-surface border-examsy-primary shadow-xl cursor-pointer hover:scale-[1.01]'
                            }`}
                        >
                            <div className="shrink-0">{getIcon(notif.title)}</div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                                    <h3 className={`text-lg font-black ${notif.isRead ? 'text-examsy-text' : 'text-examsy-primary'}`}>
                                        {notif.title}
                                    </h3>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 shrink-0">
                                        {new Date(notif.createdAt).toLocaleDateString()} • {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-examsy-muted leading-relaxed">
                                    {notif.message}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationsView;