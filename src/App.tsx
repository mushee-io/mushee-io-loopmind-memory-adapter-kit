import React from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PhoneFrame } from "@/components/PhoneFrame";
import NotFound from "@/pages/not-found";
import Splash from "@/pages/Splash";
import Onboarding from "@/pages/Onboarding";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Vault from "@/pages/Vault";
import Proofs from "@/pages/Proofs";
import SDK from "@/pages/SDK";
import Settings from "@/pages/Settings";
import GrantMVP from "@/pages/GrantMVP";
import QRShare from "@/pages/QRShare";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const hasSession = localStorage.getItem("loopmind_session");
  if (!hasSession) return <Redirect to="/auth" />;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/auth" component={Auth} />
      <Route path="/home">
        {() => <ProtectedRoute component={Home} />}
      </Route>
      <Route path="/chat">
        {() => <ProtectedRoute component={Chat} />}
      </Route>
      <Route path="/vault">
        {() => <ProtectedRoute component={Vault} />}
      </Route>
      <Route path="/proofs">
        {() => <ProtectedRoute component={Proofs} />}
      </Route>
      <Route path="/sdk">
        {() => <ProtectedRoute component={SDK} />}
      </Route>
      <Route path="/settings">
        {() => <ProtectedRoute component={Settings} />}
      </Route>
      <Route path="/grant-mvp">
        {() => <ProtectedRoute component={GrantMVP} />}
      </Route>
      <Route path="/qr" component={QRShare} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PhoneFrame>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </PhoneFrame>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
