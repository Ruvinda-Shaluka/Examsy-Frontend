// components/common/CustomAlert.jsx
import { CheckCircle, AlertOctagon, AlertTriangle, Info } from 'lucide-react';

const CustomAlert = ({ type, title, message, onClose }) => {
    const styles = {
        success: { icon: CheckCircle, color: 'bg-emerald-500', border: 'border-emerald-200' },
        error:   { icon: AlertOctagon, color: 'bg-red-500',     border: 'border-red-200' },
        warning: { icon: AlertTriangle,color: 'bg-amber-500',   border: 'border-amber-200' },
        info:    { icon: Info,         color: 'bg-blue-500',    border: 'border-blue-200' }
    };

    const Style = styles[type] || styles.info;
    const Icon = Style.icon;

    return (
        <div className={`fixed top-4 right-4 z-[200] flex gap-4 p-4 rounded-2xl border-4 ${Style.border} bg-white shadow-xl animate-in slide-in-from-right`}>
            <div className={`p-2 rounded-xl text-white ${Style.color}`}>
                <Icon size={20} />
            </div>
            <div>
                <h4 className="font-black text-sm">{title}</h4>
                <p className="text-xs text-zinc-500 font-bold">{message}</p>
            </div>
            <button onClick={onClose} className="text-zinc-400 hover:text-zinc-800">×</button>
        </div>
    );
};

export default CustomAlert;