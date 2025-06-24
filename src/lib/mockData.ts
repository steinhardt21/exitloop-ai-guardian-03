// Mock data per simulare utenti con ruoli diversi per testing
export const mockUsers = [
  {
    id: 'admin-1',
    email: 'admin@techcorp.it',
    full_name: 'Alessandro Rossi',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alessandro',
    role: 'admin' as const,
    organization_id: 'org-1',
    department: 'HR',
    position: 'HR Director'
  },
  {
    id: 'outgoing-1',
    email: 'marco.bianchi@techcorp.it',
    full_name: 'Marco Bianchi',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marco',
    role: 'outgoing' as const,
    organization_id: 'org-1',
    department: 'Technology',
    position: 'CTO'
  },
  {
    id: 'incoming-1',
    email: 'sofia.ferrari@techcorp.it',
    full_name: 'Sofia Ferrari',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
    role: 'incoming' as const,
    organization_id: 'org-1',
    department: 'Technology',
    position: 'New CTO'
  }
];

// Funzione per simulare login con utenti mock
export const getMockUserByEmail = (email: string) => {
  return mockUsers.find(user => user.email === email);
};