
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Key, Bell, Shield } from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    toast.success("Profile updated successfully");
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (currentPassword === "") {
      toast.error("Current password is required");
      return;
    }
    
    // In a real app, this would make an API call
    toast.success("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>View and manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-medium">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                {user?.role === "admin" ? (
                  <>
                    <Shield className="mr-1 h-3 w-3" />
                    Administrator
                  </>
                ) : (
                  <>
                    <User className="mr-1 h-3 w-3" />
                    User
                  </>
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="account">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="account">
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="security">
                <Key className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-4 mt-6">
              <Card>
                <form onSubmit={handleProfileUpdate}>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account details and personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Changes</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 mt-6">
              <Card>
                <form onSubmit={handlePasswordUpdate}>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current Password</Label>
                      <Input 
                        id="current" 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new">New Password</Label>
                      <Input 
                        id="new" 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm">Confirm New Password</Label>
                      <Input 
                        id="confirm" 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Update Password</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive emails for important updates
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="email-notifications" 
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Product Updates</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about new features
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="product-updates" 
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Security Alerts</h4>
                        <p className="text-sm text-muted-foreground">
                          Get notified about security incidents
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="security-alerts" 
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
