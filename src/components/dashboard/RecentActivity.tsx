import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: Date;
  type: "success" | "warning" | "error";
}

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    user: "Marie Dubois",
    action: "Création d'utilisateur",
    target: "jean.martin@example.com",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: "success"
  },
  {
    id: "2",
    user: "Admin System",
    action: "Exception détectée",
    target: "Module de notification",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    type: "error"
  },
  {
    id: "3",
    user: "Pierre Lefebvre",
    action: "Modification de profil",
    target: "Profil Partenaire",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    type: "warning"
  },
  {
    id: "4",
    user: "Sophie Bernard",
    action: "Connexion",
    target: "Dashboard Admin",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    type: "success"
  },
  {
    id: "5",
    user: "Thomas Rousseau",
    action: "Email envoyé",
    target: "Template de bienvenue",
    timestamp: new Date(Date.now() - 67 * 60 * 1000),
    type: "success"
  }
];

export function RecentActivity() {
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "success":
        return "default";
      case "warning":
        return "secondary";
      case "error":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {getInitials(activity.user)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity.user}
                  </p>
                  <Badge variant={getBadgeVariant(activity.type)} className="text-xs px-2 py-0">
                    {activity.action}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground truncate">
                  {activity.target}
                </p>
                
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(activity.timestamp, { 
                    addSuffix: true, 
                    locale: fr 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}