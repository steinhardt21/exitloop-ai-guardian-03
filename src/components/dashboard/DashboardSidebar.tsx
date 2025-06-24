import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Home, 
  FileText, 
  Search, 
  Settings, 
  HelpCircle, 
  LogOut,
  Zap,
  Briefcase,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  BookTemplate
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick, collapsed }) => {
  const buttonContent = (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-3 rounded-lg text-left transition-all duration-200 ${
        active 
          ? 'bg-exitloop-purple text-white shadow-md' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-exitloop-purple'
      }`}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
    </button>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {buttonContent}
        </TooltipTrigger>
        <TooltipContent side="right" className="ml-2">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return buttonContent;
};

interface DashboardSidebarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  onNavigate, 
  currentPage = 'home' 
}) => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(true);

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ease-in-out`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-exitloop-purple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-lg truncate">{user?.name || 'User'}</span>
          </div>
        )}
        
        {collapsed && (
          <div className="w-8 h-8 bg-exitloop-purple rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">E</span>
          </div>
        )}
        
        {!collapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 h-8 w-8"
          >
            <ChevronLeft size={16} />
          </Button>
        )}
      </div>

      {/* Expand button for collapsed state */}
      {collapsed && (
        <div className="p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                className="w-full p-2 h-10"
              >
                <ChevronRight size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>Expand sidebar</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        <SidebarItem 
          icon={<Home size={20} />} 
          label="Home" 
          active={currentPage === 'home'}
          onClick={() => handleNavigation('home')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<FileText size={20} />} 
          label="Handovers" 
          active={currentPage === 'handovers'}
          onClick={() => handleNavigation('handovers')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<BookTemplate size={20} />} 
          label="Template" 
          active={currentPage === 'templates'}
          onClick={() => handleNavigation('templates')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Search size={20} />} 
          label="Search" 
          active={currentPage === 'search'}
          onClick={() => handleNavigation('search')}
          collapsed={collapsed}
        />
        
        {!collapsed && <div className="h-4" />}
        
        <SidebarItem 
          icon={<Zap size={20} />} 
          label="Integrations" 
          active={currentPage === 'integrations'}
          onClick={() => handleNavigation('integrations')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Briefcase size={20} />} 
          label="Template Setup" 
          active={currentPage === 'template-setup'}
          onClick={() => handleNavigation('template-setup')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Settings size={20} />} 
          label="Workspace Settings" 
          active={currentPage === 'settings'}
          onClick={() => handleNavigation('settings')}
          collapsed={collapsed}
        />

        {!collapsed && <div className="h-4" />}

        <SidebarItem 
          icon={<HelpCircle size={20} />} 
          label="Support" 
          active={currentPage === 'support'}
          onClick={() => handleNavigation('support')}
          collapsed={collapsed}
        />
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200 space-y-3">
        {!collapsed && (
          <div className="bg-purple-50 p-3 rounded-lg mx-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Free Plan</span>
              <Button size="sm" className="bg-exitloop-purple hover:bg-exitloop-purple/90 text-xs px-2 py-1">
                Upgrade
              </Button>
            </div>
            <div className="text-xs text-gray-600">
              0 of 60 mins recorded
            </div>
          </div>
        )}

        {collapsed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="mx-2 p-2 bg-purple-50 rounded-lg flex justify-center">
                <BarChart3 size={20} className="text-exitloop-purple" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>Free Plan - Upgrade available</p>
            </TooltipContent>
          </Tooltip>
        )}

        {!collapsed && (
          <div className="flex items-center gap-3 mx-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">My profile</div>
            </div>
          </div>
        )}

        {collapsed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center mx-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>My profile</p>
            </TooltipContent>
          </Tooltip>
        )}

        <div className="mx-2">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="w-full p-2 h-10 text-gray-600 hover:text-gray-900"
                >
                  <LogOut size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="w-full justify-start text-gray-600 hover:text-gray-900"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};