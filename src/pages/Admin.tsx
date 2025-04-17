
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { Shield, User, Search, Edit, Trash2, UserPlus } from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, 
  DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    lastActive: "2 hours ago",
    avatar: "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    status: "active",
    lastActive: "5 mins ago",
    avatar: "https://ui-avatars.com/api/?name=User&background=27AE60&color=fff"
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "inactive",
    lastActive: "3 days ago",
    avatar: "https://ui-avatars.com/api/?name=Jane&background=EB5757&color=fff"
  },
  {
    id: "4",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    lastActive: "1 day ago",
    avatar: "https://ui-avatars.com/api/?name=John&background=F2994A&color=fff"
  },
  {
    id: "5",
    name: "Sarah Connor",
    email: "sarah@example.com",
    role: "user",
    status: "active",
    lastActive: "Just now",
    avatar: "https://ui-avatars.com/api/?name=Sarah&background=9B51E0&color=fff"
  }
];

const AdminPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });

  // Check if current user is admin
  if (user?.role !== "admin") {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This area is restricted to administrators only.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href="/dashboard">Return to Dashboard</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addUser = () => {
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name)}&background=27AE60&color=fff`;
    
    const userToAdd = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastActive: "Just now",
      avatar
    };
    
    setUsers([...users, userToAdd]);
    setNewUser({ name: "", email: "", role: "user" });
    setIsAddUserOpen(false);
    toast.success("User added successfully");
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success("User deleted successfully");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Shield className="mr-2 h-6 w-6" /> Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage users and system settings</p>
        </div>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Enter details for the new user below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select 
                  id="role"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
              <Button onClick={addUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage system users and their permissions</CardDescription>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "admin" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "active" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteUser(user.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
