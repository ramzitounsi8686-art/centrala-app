import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-surface/30 to-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <header className="h-16 border-b border-border/40 bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 shadow-sm">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden hover:bg-accent/50 transition-colors" />
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher dans l'administration..."
                    className="pl-9 bg-background/50 border-border/40 focus:border-primary/40 focus:bg-background transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative hover:bg-accent/50 transition-colors">
                      <Bell className="h-5 w-5" />
                      <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs animate-pulse">
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 animate-scale-in">
                    <div className="p-4 border-b border-border/40">
                      <h4 className="text-sm font-semibold">Notifications</h4>
                      <p className="text-xs text-muted-foreground">3 nouvelles</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      <DropdownMenuItem className="p-4 hover:bg-accent/50">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium">Nouvelle exception critique détectée</p>
                            <p className="text-xs text-muted-foreground">Module de connexion DB - Il y a 5 minutes</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-4 hover:bg-accent/50">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium">Utilisateur en attente de validation</p>
                            <p className="text-xs text-muted-foreground">sophie.bernard@example.com - Il y a 10 minutes</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-4 hover:bg-accent/50">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium">Sauvegarde automatique terminée</p>
                            <p className="text-xs text-muted-foreground">Base de données - Il y a 1 heure</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                    <div className="p-3 border-t border-border/40">
                      <Button variant="outline" size="sm" className="w-full">
                        Voir toutes les notifications
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-accent/50 transition-colors">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 animate-scale-in">
                    <div className="flex items-center space-x-2 p-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">Admin</p>
                        <p className="text-xs text-muted-foreground">admin@example.com</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-accent/50">
                      <User className="mr-2 h-4 w-4" />
                      Mon profil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-accent/50">
                      <span className="mr-2 h-4 w-4">⚙️</span>
                      Paramètres
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                      <span className="mr-2 h-4 w-4">🚪</span>
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Enhanced Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="min-h-full bg-gradient-to-br from-surface/20 via-background to-surface/10">
              <div className="p-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}