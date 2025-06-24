import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  ArrowRight, 
  FileText, 
  Zap, 
  CheckCircle,
  Calendar,
  Briefcase
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  const handovers = [
    {
      id: 1,
      title: "Alex's Handover",
      status: "In-progress",
      updatedAt: "51 minutes ago",
      avatar: user?.avatar
    },
    {
      id: 2,
      title: "Alex's First Job",
      status: "In-progress", 
      updatedAt: "1 hour ago",
      avatar: user?.avatar
    },
    {
      id: 3,
      title: "How to use Handover",
      status: "Completed",
      updatedAt: "2 days ago",
      avatar: user?.avatar
    }
  ];

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hello, {user?.name?.split(' ')[0] || 'User'} 👋
            </h1>
          </div>
          <Button className="bg-exitloop-purple hover:bg-exitloop-purple/90">
            Create Handover
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complete Handover Card */}
            <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={16} className="text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">In-progress</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Complete your Handover
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Pass on your valuable knowledge in no time.
                    </p>
                    <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                      View Handover <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                  <div className="hidden lg:block">
                    <div className="w-48 h-32 bg-white/50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Avatar className="w-12 h-12 mx-auto mb-2">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium">{user?.name || 'User'}'s Handover</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Templates Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Start with a template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase size={24} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Job Handover</h4>
                        <p className="text-sm text-gray-600">
                          Document key responsibilities, tools, and processes
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Zap size={24} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Test out Handover</h4>
                        <p className="text-sm text-gray-600">
                          Try Handover with a simple template to see the magic in action
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Explore templates <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>

            {/* Recent Handovers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Recent Handovers</h3>
                <Button variant="ghost" className="text-exitloop-purple">
                  View all
                </Button>
              </div>

              <div className="space-y-3">
                {handovers.map((handover) => (
                  <Card key={handover.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            {handover.id === 3 ? (
                              <Zap size={20} className="text-blue-600" />
                            ) : (
                              <FileText size={20} className="text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{handover.title}</h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={handover.avatar} />
                            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                          </Avatar>

                          <div className="flex items-center gap-2">
                            {handover.status === 'Completed' ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <CheckCircle size={12} className="mr-1" />
                                Completed
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-orange-200 text-orange-800">
                                <Clock size={12} className="mr-1" />
                                In-progress
                              </Badge>
                            )}
                          </div>

                          <div className="text-sm text-gray-500">
                            Updated {handover.updatedAt}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="hidden lg:block">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-3">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="text-lg">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="font-semibold text-gray-900">{user?.name || 'User'}'s Handover</div>
                      <div className="text-sm text-gray-600 mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-exitloop-purple h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        75% Complete
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};