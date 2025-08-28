import { useState } from "react";
import { AlertTriangle, Search, Filter, CheckCircle, Clock, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface Exception {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved";
  module: string;
  user?: string;
  timestamp: Date;
  stackTrace?: string;
}

const mockExceptions: Exception[] = [
  {
    id: "1",
    title: "Erreur de connexion à la base de données",
    description: "Timeout lors de la connexion à la base de données principale",
    severity: "critical",
    status: "open",
    module: "Database",
    user: "marie.dubois@example.com",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    stackTrace: "at Database.connect() line 42\nat UserService.login() line 18"
  },
  {
    id: "2",
    title: "Template email introuvable",
    description: "Le template 'welcome_partner' n'existe pas",
    severity: "medium",
    status: "in_progress",
    module: "Email Service",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
  },
  {
    id: "3",
    title: "Permission insuffisante",
    description: "L'utilisateur tente d'accéder à un menu non autorisé",
    severity: "low",
    status: "resolved",
    module: "Authorization",
    user: "pierre.lefebvre@example.com",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: "4",
    title: "Notification non envoyée",
    description: "Échec de l'envoi de notification push",
    severity: "medium",
    status: "open",
    module: "Notification Service",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];

export default function Exceptions() {
  const [exceptions] = useState<Exception[]>(mockExceptions);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedException, setSelectedException] = useState<Exception | null>(null);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critique</Badge>;
      case "high":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Élevée</Badge>;
      case "medium":
        return <Badge className="status-warning">Moyenne</Badge>;
      case "low":
        return <Badge variant="outline">Faible</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="status-error">Ouvert</Badge>;
      case "in_progress":
        return <Badge className="status-warning">En cours</Badge>;
      case "resolved":
        return <Badge className="status-success">Résolu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredExceptions = exceptions.filter(exception => {
    const matchesSearch = exception.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exception.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "all" || exception.severity === severityFilter;
    const matchesStatus = statusFilter === "all" || exception.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const criticalCount = exceptions.filter(e => e.severity === "critical").length;
  const openCount = exceptions.filter(e => e.status === "open").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            Gestion des Exceptions
          </h1>
          <p className="text-muted-foreground mt-1">
            Surveillez et résolvez les anomalies du système
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Actualiser
        </Button>
      </div>

      {/* Alert Banner */}
      {criticalCount > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div className="flex-1">
                <p className="font-medium text-destructive">
                  Attention: {criticalCount} exception{criticalCount > 1 ? 's' : ''} critique{criticalCount > 1 ? 's' : ''} nécessite{criticalCount > 1 ? 'nt' : ''} une intervention immédiate
                </p>
                <p className="text-sm text-destructive/80">
                  Ces erreurs peuvent affecter le fonctionnement de la plateforme
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par titre ou module..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par sévérité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les sévérités</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="open">Ouvert</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="resolved">Résolu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Exceptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Exceptions ({filteredExceptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exception</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Sévérité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Horodatage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExceptions.map((exception) => (
                <TableRow key={exception.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{exception.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {exception.description}
                      </div>
                      {exception.user && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Utilisateur: {exception.user}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{exception.module}</Badge>
                  </TableCell>
                  <TableCell>
                    {getSeverityBadge(exception.severity)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(exception.status)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(exception.timestamp, { 
                      addSuffix: true, 
                      locale: fr 
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedException(exception)}>
                            Détails
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-destructive" />
                              Détails de l'exception
                            </DialogTitle>
                          </DialogHeader>
                          {selectedException && (
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Titre</h4>
                                <p className="text-sm">{selectedException.title}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Description</h4>
                                <p className="text-sm">{selectedException.description}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Module</h4>
                                  <Badge variant="outline">{selectedException.module}</Badge>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Sévérité</h4>
                                  {getSeverityBadge(selectedException.severity)}
                                </div>
                              </div>
                              {selectedException.stackTrace && (
                                <div>
                                  <h4 className="font-medium mb-2">Stack Trace</h4>
                                  <pre className="text-xs bg-muted p-3 rounded border overflow-x-auto">
                                    {selectedException.stackTrace}
                                  </pre>
                                </div>
                              )}
                              <div>
                                <h4 className="font-medium mb-2">Actions de résolution</h4>
                                <Textarea placeholder="Décrivez les actions entreprises pour résoudre cette exception..." />
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" className="bg-success hover:bg-success/90">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Marquer comme résolu
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Clock className="mr-2 h-4 w-4" />
                                  En cours de traitement
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-destructive">Critiques</p>
                <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warning">Ouvertes</p>
                <p className="text-2xl font-bold text-warning">{openCount}</p>
              </div>
              <X className="h-8 w-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">En cours</p>
                <p className="text-2xl font-bold text-primary">
                  {exceptions.filter(e => e.status === "in_progress").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-success/20 bg-success/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-success">Résolues</p>
                <p className="text-2xl font-bold text-success">
                  {exceptions.filter(e => e.status === "resolved").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}