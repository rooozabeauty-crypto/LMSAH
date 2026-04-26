import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ChatBot from "./pages/ChatBot";
import Services from "./pages/Services";
import Register from "./pages/Register";
import Suppliers from "./pages/Suppliers";
import Support from "./pages/Support";
import Creative from "./pages/Creative";
import AbandonedCarts from "./pages/AbandonedCarts";
import Influencers from "./pages/Influencers";
import AdTracking from "./pages/AdTracking";
import Cashback from "./pages/Cashback";
import Loyalty from "./pages/Loyalty";
import Plans from "./pages/Plans";
import ServiceSEO from "./pages/ServiceSEO";
import ServiceAdvertising from "./pages/ServiceAdvertising";
import ServiceSocialMedia from "./pages/ServiceSocialMedia";
import ServiceContent from "./pages/ServiceContent";
import ServiceStore from "./pages/ServiceStore";
import ServiceIntegration from "./pages/ServiceIntegration";
import AdminDashboard from "./pages/AdminDashboard";
import NotificationDesigner from "./pages/NotificationDesigner";
import VideoGenerator from "./pages/VideoGenerator";
import FontGenerator from "./pages/FontGenerator";
import NotificationSystem from "./pages/NotificationSystem";
import AdvancedReports from "./pages/AdvancedReports";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/ "} component={Home} />
      <Route path={"/"} component={Home} />
      <Route path={"/chatbot"} component={ChatBot} />
      <Route path={"/services"} component={Services} />
      <Route path={"/register"} component={Register} />
      <Route path={"/suppliers"} component={Suppliers} />
      <Route path={"/support"} component={Support} />
      <Route path={"/creative"} component={Creative} />
      <Route path={"/abandoned-carts"} component={AbandonedCarts} />
      <Route path={"/influencers"} component={Influencers} />
      <Route path={"/ad-tracking"} component={AdTracking} />
      <Route path={"/cashback"} component={Cashback} />
      <Route path={"/loyalty"} component={Loyalty} />
      <Route path={"/plans"} component={Plans} />
      <Route path={"/service-seo"} component={ServiceSEO} />
      <Route path={"/service-advertising"} component={ServiceAdvertising} />
      <Route path={"/service-social-media"} component={ServiceSocialMedia} />
      <Route path={"/service-content"} component={ServiceContent} />
      <Route path={"/service-store"} component={ServiceStore} />
      <Route path={"/service-integration"} component={ServiceIntegration} />
      <Route path={"/admin-dashboard"} component={AdminDashboard} />
      <Route path={"/notification-designer"} component={NotificationDesigner} />
      <Route path={"/video-generator"} component={VideoGenerator} />
      <Route path={"/font-generator"} component={FontGenerator} />
      <Route path={"/notification-system"} component={NotificationSystem} />
      <Route path={"/advanced-reports"} component={AdvancedReports} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <div className="dark">
        <ThemeProvider
          defaultTheme="dark"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
