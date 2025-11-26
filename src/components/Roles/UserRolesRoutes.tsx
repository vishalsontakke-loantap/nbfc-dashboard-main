import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import { RoleManagementScreen } from "./RoleManagementScreen";
import NotFound from "../NotFound";
import { useState } from "react";
import { mockRoles, Role } from "@/lib/user-mocks";
import { toast } from 'sonner';

const UserRolesRoutes = () => {
    const [roles, setRoles] = useState(mockRoles);
    const handleCreateRole = () => {
        toast.info('Opening create role dialog...');
    };

    const handleEditRole = (roleId: string) => {
        toast.info(`Opening edit dialog for role: ${roleId}`);
    };

    const handleDeleteRole = (roleId: string) => {
        const role = roles.find(r => r.id === roleId);
        if (role) {
            if (confirm(`Are you sure you want to delete the role "${role.name}"? This will affect ${role.userCount} users.`)) {
                setRoles(roles.filter(r => r.id !== roleId));
                toast.success(`Role "${role.name}" deleted successfully`);
            }
        }
    };

    const handleDuplicateRole = (roleId: string) => {
        const role = roles.find(r => r.id === roleId);
        if (role) {
            const newRole = {
                ...role,
                id: `ROLE-${Date.now()}`,
                name: `${role.name} (Copy)`,
                userCount: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setRoles([...roles, newRole]);
            toast.success(`Role "${role.name}" duplicated successfully`);
        }
    };

    const handleSaveRole = (role: Role) => {
        const existingIndex = roles.findIndex(r => r.id === role.id);
        if (existingIndex >= 0) {
            // Update existing role
            setRoles(roles.map(r => r.id === role.id ? role : r));
            toast.success(`Role "${role.name}" updated successfully`);
        } else {
            // Add new role
            setRoles([...roles, role]);
            toast.success(`Role "${role.name}" created successfully`);
        }
    };
    return (
        <>
            <Routes>
                <Route
                    path=""
                    element={
                        <Layout>
                            <RoleManagementScreen
                                roles={roles}
                                onCreateRole={handleCreateRole}
                                onEditRole={handleEditRole}
                                onDeleteRole={handleDeleteRole}
                                onDuplicateRole={handleDuplicateRole}
                                onSaveRole={handleSaveRole} />
                        </Layout>
                    }
                />

                {/* 404 PAGE */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default UserRolesRoutes;
