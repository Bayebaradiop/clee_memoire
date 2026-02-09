import { createContext, useContext, useState, ReactNode } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "message" | "feedback" | "validation" | "deadline" | "system" | "meeting";
  read: boolean;
  timestamp: string;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "read" | "timestamp">) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock notifications initiales
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nouvelle proposition de réunion",
    message: "Dr. Sophie Martin propose une réunion pour le 10 février 2026 à 14h00",
    type: "meeting",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    link: "/etudiant/visio"
  },
  {
    id: "2",
    title: "Nouveau feedback reçu",
    message: "Votre document 'Plan détaillé' a reçu un feedback de votre accompagnateur",
    type: "feedback",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    link: "/etudiant/documents"
  },
  {
    id: "3",
    title: "Document validé",
    message: "Félicitations ! Votre 'Recherche bibliographique' a été approuvée",
    type: "validation",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "4",
    title: "Échéance proche",
    message: "Il vous reste 3 jours pour soumettre votre 'Plan détaillé'",
    type: "deadline",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    link: "/etudiant/suivi"
  },
  {
    id: "5",
    title: "Nouveau message",
    message: "Dr. Sophie Martin vous a envoyé un message",
    type: "message",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    link: "/etudiant/messagerie"
  },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notification: Omit<Notification, "id" | "read" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
}
