import { useState } from "react";
import { 
  Settings, 
  Server, 
  Database, 
  Shield, 
  Mail, 
  Globe, 
  Save, 
  RotateCcw,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Users,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

interface ConfigSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: "active" | "warning" | "error";
}

const configSections: ConfigSection[] = [
  {
    id: "general",
    title: "Configuration générale",
    description: "Paramètres globaux de la plateforme",
    icon: Settings,
    status: "active"
  },
  {
    id: "database",
    title: "Base de données",
    description: "Configuration de la base de données",
    icon: Database,
    status: "active"
  },
  {
    id: "security",
    title: "Sécurité",
    description: "Paramètres de sécurité et authentification",
    icon: Shield,
    status: "warning"
  },
  {
    id: "email",
    title: "Configuration email",
    description: "Serveur SMTP et templates",
    icon: Mail,
    status: "active"
  },
  {
    id: "localization",
    title: "Localisation",
    description: "Langues et fuseau horaire",
    icon: Globe,
    status: "active"
  },
  {
    id: "performance",
    title: "Performance",
    description: "Cache et optimisations",
    icon: Zap,
    status: "active"
  }
];

export default function SystemConfig() {
  const [selectedTab, setSelectedTab] = useState("general");
  const [showPasswords, setShowPasswords] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="status-success">Actif</Badge>;
      case "warning":
        return <Badge className="status-warning">Attention</Badge>;
      case "error":
        return <Badge className="status-error">Erreur</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            Configuration Système
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez les paramètres globaux de votre plateforme d'administration
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setHasChanges(false)}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Annuler
          </Button>
          <Button 
            className="bg-primary hover:bg-primary-dark"
            disabled={!hasChanges}
          >
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {configSections.map((section) => (
          <Card key={section.id} className="card-hover border border-border/40">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <section.icon className="h-5 w-5 text-muted-foreground" />
                {getStatusIcon(section.status)}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{section.title}</p>
                {getStatusBadge(section.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Configuration Tabs */}
      <Card className="shadow-lg border-border/40">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <CardHeader className="pb-4">
            <TabsList className="grid w-full grid-cols-6 bg-surface/50">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Général</span>
              </TabsTrigger>
              <TabsTrigger value="database" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">BDD</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Sécurité</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
              </TabsTrigger>
              <TabsTrigger value="localization" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Local.</span>
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Perf.</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* General Configuration */}
            <TabsContent value="general" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="app-name">Nom de l'application</Label>
                    <Input 
                      id="app-name" 
                      defaultValue="Admin SaaS Platform" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="app-url">URL de base</Label>
                    <Input 
                      id="app-url" 
                      defaultValue="https://admin.example.com" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="app-description">Description</Label>
                    <Textarea 
                      id="app-description" 
                      defaultValue="Plateforme d'administration complète avec gestion des utilisateurs et monitoring"
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Switch id="maintenance-mode" onCheckedChange={() => setHasChanges(true)} />
                      <span className="text-sm text-muted-foreground">Activer le mode maintenance</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="debug-mode">Mode debug</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Switch id="debug-mode" onCheckedChange={() => setHasChanges(true)} />
                      <span className="text-sm text-muted-foreground">Afficher les erreurs détaillées</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="registration">Inscription ouverte</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Switch id="registration" defaultChecked onCheckedChange={() => setHasChanges(true)} />
                      <span className="text-sm text-muted-foreground">Permettre les nouvelles inscriptions</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Database Configuration */}
            <TabsContent value="database" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="db-host">Hôte de la base de données</Label>
                    <Input 
                      id="db-host" 
                      defaultValue="localhost" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="db-port">Port</Label>
                    <Input 
                      id="db-port" 
                      defaultValue="5432" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="db-name">Nom de la base</Label>
                    <Input 
                      id="db-name" 
                      defaultValue="admin_saas" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="db-user">Utilisateur</Label>
                    <Input 
                      id="db-user" 
                      defaultValue="admin_user" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="db-password">Mot de passe</Label>
                    <div className="relative">
                      <Input 
                        id="db-password" 
                        type={showPasswords ? "text" : "password"}
                        defaultValue="••••••••" 
                        onChange={() => setHasChanges(true)}
                        className="mt-1 pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1 h-8 w-8"
                        onClick={() => setShowPasswords(!showPasswords)}
                      >
                        {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="db-pool">Pool de connexions</Label>
                    <Input 
                      id="db-pool" 
                      type="number"
                      defaultValue="10" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center p-4 bg-surface/30 rounded-lg border border-border/40">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium">Connexion à la base de données</p>
                    <p className="text-sm text-muted-foreground">Dernière vérification: Il y a 2 minutes</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Database className="mr-2 h-4 w-4" />
                  Tester la connexion
                </Button>
              </div>
            </TabsContent>

            {/* Security Configuration */}
            <TabsContent value="security" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="session-timeout">Timeout de session (minutes)</Label>
                    <Input 
                      id="session-timeout" 
                      type="number"
                      defaultValue="30" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-login-attempts">Tentatives de connexion max</Label>
                    <Input 
                      id="max-login-attempts" 
                      type="number"
                      defaultValue="5" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password-policy">Politique de mot de passe</Label>
                    <Select defaultValue="strong" onValueChange={() => setHasChanges(true)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weak">Faible (6 caractères min)</SelectItem>
                        <SelectItem value="medium">Moyen (8 caractères + majuscule)</SelectItem>
                        <SelectItem value="strong">Fort (12 caractères + symboles)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="2fa-required">Authentification à deux facteurs</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Switch id="2fa-required" onCheckedChange={() => setHasChanges(true)} />
                      <span className="text-sm text-muted-foreground">Obligatoire pour les admins</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="ip-restriction">Restriction IP</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Switch id="ip-restriction" onCheckedChange={() => setHasChanges(true)} />
                      <span className="text-sm text-muted-foreground">Limiter l'accès par IP</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="audit-logs">Logs d'audit</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Switch id="audit-logs" defaultChecked onCheckedChange={() => setHasChanges(true)} />
                      <span className="text-sm text-muted-foreground">Enregistrer toutes les actions</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium text-warning">Attention</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      La politique de mot de passe faible est actuellement active. Il est recommandé d'utiliser une politique plus stricte.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Email Configuration */}
            <TabsContent value="email" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="smtp-host">Serveur SMTP</Label>
                    <Input 
                      id="smtp-host" 
                      defaultValue="smtp.example.com" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-port">Port SMTP</Label>
                    <Input 
                      id="smtp-port" 
                      defaultValue="587" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-user">Utilisateur SMTP</Label>
                    <Input 
                      id="smtp-user" 
                      defaultValue="noreply@example.com" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="from-email">Email expéditeur</Label>
                    <Input 
                      id="from-email" 
                      defaultValue="admin@example.com" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="from-name">Nom expéditeur</Label>
                    <Input 
                      id="from-name" 
                      defaultValue="Admin Platform" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-security">Sécurité</Label>
                    <Select defaultValue="tls" onValueChange={() => setHasChanges(true)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="tls">TLS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Localization Configuration */}
            <TabsContent value="localization" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="default-language">Langue par défaut</Label>
                    <Select defaultValue="fr" onValueChange={() => setHasChanges(true)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select defaultValue="europe/paris" onValueChange={() => setHasChanges(true)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe/paris">Europe/Paris</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="america/new_york">America/New_York</SelectItem>
                        <SelectItem value="asia/tokyo">Asia/Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date-format">Format de date</Label>
                    <Select defaultValue="dd/mm/yyyy" onValueChange={() => setHasChanges(true)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Devise</Label>
                    <Select defaultValue="eur" onValueChange={() => setHasChanges(true)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eur">Euro (€)</SelectItem>
                        <SelectItem value="usd">Dollar ($)</SelectItem>
                        <SelectItem value="gbp">Livre (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Performance Configuration */}
            <TabsContent value="performance" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cache-enabled">Cache activé</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Switch id="cache-enabled" defaultChecked onCheckedChange={() => setHasChanges(true)} />
                      <span className="text-sm text-muted-foreground">Activer le cache Redis</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cache-ttl">Durée de vie du cache (secondes)</Label>
                    <Input 
                      id="cache-ttl" 
                      type="number"
                      defaultValue="3600" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-upload-size">Taille max upload (MB)</Label>
                    <Input 
                      id="max-upload-size" 
                      type="number"
                      defaultValue="10" 
                      onChange={() => setHasChanges(true)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="compression">Compression GZIP</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Switch id="compression" defaultChecked onCheckedChange={() => setHasChanges(true)} />
                      <span className="text-sm text-muted-foreground">Compresser les réponses</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="rate-limiting">Limitation de débit</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Switch id="rate-limiting" defaultChecked onCheckedChange={() => setHasChanges(true)} />
                      <span className="text-sm text-muted-foreground">100 req/min par IP</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cdn-enabled">CDN activé</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Switch id="cdn-enabled" onCheckedChange={() => setHasChanges(true)} />
                      <span className="text-sm text-muted-foreground">Utiliser CloudFlare</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/20 bg-primary/5 card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Server className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Statut du serveur</h3>
                <p className="text-sm text-muted-foreground">Tout fonctionne normalement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-success/20 bg-success/5 card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="font-medium">1,247 utilisateurs</h3>
                <p className="text-sm text-muted-foreground">156 connectés maintenant</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5 card-hover">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Bell className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h3 className="font-medium">8 notifications</h3>
                <p className="text-sm text-muted-foreground">3 nécessitent attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}