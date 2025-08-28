import { Users, Shield, AlertTriangle, Activity, TrendingUp, UserCheck } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Vue d'ensemble de votre plateforme d'administration
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Utilisateurs actifs"
          value="1,247"
          description="+12% ce mois"
          icon={Users}
          trend={{ value: 12, positive: true }}
        />
        
        <StatsCard
          title="Exceptions"
          value="23"
          description="3 critiques"
          icon={AlertTriangle}
          trend={{ value: -8, positive: true }}
          className="border-destructive/20"
        />
        
        <StatsCard
          title="Profils"
          value="8"
          description="3 types actifs"
          icon={Shield}
        />
        
        <StatsCard
          title="Vérifications"
          value="156"
          description="En attente: 12"
          icon={UserCheck}
          trend={{ value: 24, positive: true }}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart />
        <RecentActivity />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Gestion Utilisateurs</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Gérez les utilisateurs, profils et permissions de votre plateforme.
          </p>
          <div className="text-sm text-primary font-medium">
            12 utilisateurs en attente →
          </div>
        </div>

        <div className="bg-gradient-to-br from-warning/5 to-warning/10 border border-warning/20 rounded-lg p-6 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-warning/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <h3 className="font-semibold">Surveillance</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Surveillez les exceptions et les anomalies du système.
          </p>
          <div className="text-sm text-warning font-medium">
            3 exceptions critiques →
          </div>
        </div>

        <div className="bg-gradient-to-br from-success/5 to-success/10 border border-success/20 rounded-lg p-6 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-success/10 rounded-lg">
              <Activity className="h-5 w-5 text-success" />
            </div>
            <h3 className="font-semibold">Performance</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Analysez les performances et l'activité de la plateforme.
          </p>
          <div className="text-sm text-success font-medium">
            +15% d'activité →
          </div>
        </div>
      </div>
    </div>
  );
}