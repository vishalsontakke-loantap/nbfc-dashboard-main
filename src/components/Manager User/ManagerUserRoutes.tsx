import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import { UserListingScreen } from "./ManagerUser";
import NotFound from "../NotFound";
import { mockUsers, mockRoles, User } from '../../lib/user-mocks';
import { useState } from "react";
import { toast } from 'sonner';
const ManagerUserRoutes = () => {
  const [users, setUsers] = useState(mockUsers);
  const handleEditUser = (userId: string) => {
    toast.info(`Opening edit dialog for user: ${userId}`);
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        setUsers(users.filter(u => u.id !== userId));
        toast.success(`User ${user.name} deleted successfully`);
      }
    }
  };

  const handleSuspendUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUsers(users.map(u =>
        u.id === userId ? { ...u, status: 'suspended' as const } : u
      ));
      toast.warning(`User ${user.name} has been suspended`);
    }
  };

  const handleActivateUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUsers(users.map(u =>
        u.id === userId ? { ...u, status: 'active' as const } : u
      ));
      toast.success(`User ${user.name} has been activated`);
    }
  };
  const handleAddUser = (userData: Partial<User>) => {
    const newUser = {
      ...userData,
      id: `USR-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    } as User;
    setUsers([...users, newUser]);
    toast.success('User registered successfully');
  };

  const handleUpdateUser = (userId: string, userData: Partial<User>) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, ...userData } : u
    ));
    toast.success('User updated successfully');
  };
  
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <UserListingScreen
                users={users}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
                onSuspendUser={handleSuspendUser}
                onActivateUser={handleActivateUser} 
                  onAddUser={handleAddUser}
                  onUpdateUser={handleUpdateUser}/>
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ManagerUserRoutes;
