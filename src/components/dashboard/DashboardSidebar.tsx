import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  FileText, 
  Search, 
  Settings, 
  HelpCircle, 
  LogOut,
  Zap,
  Briefcase,
  BarChart3
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
      active 
        ? 'bg-exitloop-purple text-white' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export const DashboardSidebar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-exitloop-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-lg">{user?.name || 'User'}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem 
          icon={<Home size={18} />} 
          label="Home" 
          active={true}
        />
        <SidebarItem 
          icon={<FileText size={18} />} 
          label="Handovers" 
        />
        <SidebarItem 
          icon={<Search size={18} />} 
          label="Search" 
        />
        
        <div className="pt-4">
          <SidebarItem 
            icon={<Zap size={18} />} 
            label="Integrations" 
          />
          <SidebarItem 
            icon={<Briefcase size={18} />} 
            label="Template Setup" 
          />
          <SidebarItem 
            icon={<Settings size={18} />} 
            label="Workspace Settings" 
          />
        </div>

        <div className="pt-4">
          <SidebarItem 
            icon={<HelpCircle size={18} />} 
            label="Support" 
          />
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Free Plan</span>
            <Button size="sm" className="bg-exitloop-purple hover:bg-exitloop-purple/90 text-xs">
              Upgrade
            </Button>
          </div>
          <div className="text-xs text-gray-600">
            0 of 60 mins recorded
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">My profile</div>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={logout}
          className="w-full justify-start text-gray-600 hover:text-gray-900"
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};