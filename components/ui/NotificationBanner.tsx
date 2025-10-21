// components/ui/NotificationBanner.tsx
'use client';

import { Notification } from '@/lib/types';
import { AlertCircle, CheckCircle, Info, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

interface NotificationBannerProps {
  notifications: Notification[];
}

export default function NotificationBanner({ notifications }: NotificationBannerProps) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  if (notifications.length === 0) return null;
  const activeNotifications = notifications.filter((n) => !dismissed.includes(n._id));
  if (activeNotifications.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'warning':
        return <AlertCircle size={20} />;
      case 'promo':
        return <Sparkles size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'promo':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="space-y-2">
      {activeNotifications.map((notification) => (
        <div key={notification._id} className={`${getStyles(notification.type)} border px-4 py-3 rounded-lg flex items-center justify-between gap-3`}>
          <div className="flex items-center gap-3">{getIcon(notification.type)}<p className="font-medium text-sm">{notification.message}</p></div>
          <button onClick={() => setDismissed([...dismissed, notification._id])} className="hover:opacity-70 transition" aria-label="Fermer"><X size={18} /></button>
        </div>
      ))}
    </div>
  );
}