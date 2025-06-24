import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Home, 
  FileText, 
  MessageSquare,
  Bookmark,
  User,
  LogOut,
  Zap,
  ChevronRight,
  ChevronLeft,
  BarChart3
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

interface IncomingSidebarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export const IncomingSidebar: React.FC<IncomingSidebarProps> = ({ 
  onNavigate, 
  currentPage = 'dashboard' 
}) => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(true);

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
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
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg truncate">Exitloop</div>
              <div className="text-xs text-gray-500 truncate">Dipendente Entrante</div>
            </div>
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
              <p>Espandi sidebar</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        <SidebarItem 
          icon={<Home size={20} />} 
          label="Dashboard" 
          active={currentPage === 'dashboard'}
          onClick={() => handleNavigation('dashboard')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<FileText size={20} />} 
          label="I Miei Handover" 
          active={currentPage === 'handovers'}
          onClick={() => handleNavigation('handovers')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<MessageSquare size={20} />} 
          label="Chat AI" 
          active={currentPage === 'chat'}
          onClick={() => handleNavigation('chat')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Bookmark size={20} />} 
          label="Knowledge Hub" 
          active={currentPage === 'knowledge'}
          onClick={() => handleNavigation('knowledge')}
          collapsed={collapsed}
        />
        
        {!collapsed && <div className="h-4" />}
        
        <SidebarItem 
          icon={<Zap size={20} />} 
          label="Quick Access" 
          active={currentPage === 'quick-access'}
          onClick={() => handleNavigation('quick-access')}
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<User size={20} />} 
          label="Profilo" 
          active={currentPage === 'profile'}
          onClick={() => handleNavigation('profile')}
          collapsed={collapsed}
        />
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200 space-y-3">
        {!collapsed && (
          <div className="bg-green-50 p-3 rounded-lg mx-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Onboarding</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-green-600">75%</span>
              </div>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              3 di 4 handover esplorati
            </div>
          </div>
        )}

        {collapsed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="mx-2 p-2 bg-green-50 rounded-lg flex justify-center">
                <BarChart3 size={20} className="text-green-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>Onboarding 75% - 3 di 4 handover</p>
            </TooltipContent>
          </Tooltip>
        )}

        {!collapsed && (
          <div className="flex items-center gap-3 mx-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar_url} />
              <AvatarFallback>{user?.full_name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user?.full_name || 'Utente'}</div>
              <div className="text-xs text-gray-500 truncate">{user?.position || 'Nuovo Dipendente'}</div>
            </div>
          </div>
        )}

        {collapsed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center mx-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback>{user?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>{user?.full_name || 'Profilo utente'}</p>
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
                  onClick={handleLogout}
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
              onClick={handleLogout}
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