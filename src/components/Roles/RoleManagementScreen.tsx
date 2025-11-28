import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import {
  Plus,
  Edit,
  Copy,
  Trash2,
  Users,
  Check,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { RolePermissionEditor } from './RolePermissionEditor';
import type { Role, RolePermission } from '../../lib/user-mocks';

interface RoleManagementScreenProps {
  roles: Role[];
  onCreateRole: () => void;
  onEditRole: (roleId: string) => void;
  onDeleteRole: (roleId: string) => void;
  onDuplicateRole: (roleId: string) => void;
  onSaveRole: (role: Role) => void;
}

export function RoleManagementScreen({
  roles,
  onCreateRole,
  onEditRole,
  onDeleteRole,
  onDuplicateRole,
  onSaveRole,
}: RoleManagementScreenProps) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(roles[0]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  const handleCreateRole = () => {
    setEditingRole(null);
    setEditorOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setEditorOpen(true);
  };

  const handleSaveRole = (role: Role) => {
    onSaveRole(role);
    setEditorOpen(false);
    setEditingRole(null);
    setSelectedRole(role);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Role Management</h2>
          <p className="text-gray-600 mt-1">Define roles and their permission levels</p>
        </div>
        <Button onClick={handleCreateRole}>
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Roles</CardDescription>
            <CardTitle className="text-3xl">{roles.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">
              {roles.reduce((sum, role) => sum + role.userCount, 0)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Custom Roles</CardDescription>
            <CardTitle className="text-3xl">
              {roles.filter(r => !['Admin', 'Maker', 'Checker', 'Auditor', 'Viewer'].includes(r.name)).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>System Roles</CardDescription>
            <CardTitle className="text-3xl">
              {roles.filter(r => ['Admin', 'Maker', 'Checker', 'Auditor', 'Viewer'].includes(r.name)).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Roles List */}
        <Card className='px-6'>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>Select a role to view permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedRole?.id === role.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium">{role.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{role.description}</div>
                  </div>
                  {['Admin', 'Maker', 'Checker', 'Auditor', 'Viewer'].includes(role.name) && (
                    <Badge variant="outline" className="text-xs">System</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{role.userCount} users</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditRole(role);
                    }}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicateRole(role.id);
                    }}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Duplicate
                  </Button>
                  {!['Admin', 'Maker', 'Checker', 'Auditor', 'Viewer'].includes(role.name) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-red-600 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteRole(role.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Permissions Matrix */}
        <Card className="col-span-2 px-6">
          <CardHeader>
            <CardTitle>Permission Matrix</CardTitle>
            <CardDescription>
              {selectedRole ? `Permissions for ${selectedRole.name}` : 'Select a role to view permissions'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedRole ? (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-medium">{selectedRole.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{selectedRole.description}</div>
                    </div>
                    <Badge variant="outline">
                      {selectedRole.userCount} {selectedRole.userCount === 1 ? 'user' : 'users'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-3">
                    Last updated: {new Date(selectedRole.updatedAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                <div className="overflow-x-auto p-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Module</TableHead>
                        <TableHead className="text-center">View</TableHead>
                        <TableHead className="text-center">Create</TableHead>
                        <TableHead className="text-center">Edit</TableHead>
                        <TableHead className="text-center">Delete</TableHead>
                        <TableHead className="text-center">Approve</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedRole.permissions.map((permission, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{permission.module}</TableCell>
                          <TableCell className="text-center">
                            {permission.actions.view ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {permission.actions.create ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {permission.actions.edit ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {permission.actions.delete ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {permission.actions.approve ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Select a role from the list to view its permissions
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Role Permission Editor */}
      <RolePermissionEditor
        open={editorOpen}
        role={editingRole}
        onSave={handleSaveRole}
        onClose={() => {
          setEditorOpen(false);
          setEditingRole(null);
        }}
      />
    </div>
  );
}