import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import type { Role, RolePermission } from '../../lib/user-mocks';

interface RolePermissionEditorProps {
  open: boolean;
  onClose: () => void;
  role: Role | null;
  onSave: (role: Role) => void;
}

const DEFAULT_MODULES = [
  'User Management',
  'Pool Buyout',
  'Loans',
  'Reports',
  'Audit Trail',
  'PII Data',
  'Co-Lending Module',
  'BRE Configuration',
  'Document Management',
  'Settlement',
];

export function RolePermissionEditor({
  open,
  onClose,
  role,
  onSave,
}: RolePermissionEditorProps) {
  const [loading, setLoading] = useState(false);
  const [roleName, setRoleName] = useState(role?.name || '');
  const [roleDescription, setRoleDescription] = useState(role?.description || '');
  const [permissions, setPermissions] = useState<RolePermission[]>(
    role?.permissions || []
  );
  const [newModuleName, setNewModuleName] = useState('');
  const [showAddModule, setShowAddModule] = useState(false);

  const handlePermissionChange = (
    moduleIndex: number,
    action: keyof RolePermission['actions'],
    value: boolean
  ) => {
    setPermissions(prev =>
      prev.map((perm, index) =>
        index === moduleIndex
          ? {
              ...perm,
              actions: { ...perm.actions, [action]: value },
            }
          : perm
      )
    );
  };

  const handleAddModule = () => {
    if (!newModuleName.trim()) {
      toast.error('Please enter a module name');
      return;
    }

    if (permissions.some(p => p.module.toLowerCase() === newModuleName.toLowerCase())) {
      toast.error('Module already exists');
      return;
    }

    const newPermission: RolePermission = {
      module: newModuleName,
      actions: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
      },
    };

    setPermissions(prev => [...prev, newPermission]);
    setNewModuleName('');
    setShowAddModule(false);
    toast.success('Module added successfully');
  };

  const handleAddPredefinedModule = (moduleName: string) => {
    if (permissions.some(p => p.module === moduleName)) {
      toast.error('Module already exists');
      return;
    }

    const newPermission: RolePermission = {
      module: moduleName,
      actions: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
      },
    };

    setPermissions(prev => [...prev, newPermission]);
    toast.success(`${moduleName} added`);
  };

  const handleRemoveModule = (moduleIndex: number) => {
    const moduleName = permissions[moduleIndex].module;
    if (confirm(`Are you sure you want to remove "${moduleName}" module?`)) {
      setPermissions(prev => prev.filter((_, index) => index !== moduleIndex));
      toast.success('Module removed');
    }
  };

  const handleSave = async () => {
    if (!roleName.trim()) {
      toast.error('Please enter a role name');
      return;
    }

    if (!roleDescription.trim()) {
      toast.error('Please enter a role description');
      return;
    }

    if (permissions.length === 0) {
      toast.error('Please add at least one module permission');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const updatedRole: Role = {
        id: role?.id || `ROLE-${Date.now()}`,
        name: roleName,
        description: roleDescription,
        userCount: role?.userCount || 0,
        permissions: permissions,
        createdAt: role?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      onSave(updatedRole);
      setLoading(false);
      onClose();
      toast.success(role ? 'Role updated successfully' : 'Role created successfully');
    }, 1000);
  };

  const availableModules = DEFAULT_MODULES.filter(
    module => !permissions.some(p => p.module === module)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl border-solid border-5 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {role ? 'Edit Role Permissions' : 'Create New Role'}
          </DialogTitle>
          <DialogDescription>
            {role
              ? 'Modify role details and permission settings'
              : 'Define a new role with custom permissions'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Role Details */}
          <Card>
            <CardContent className="p-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roleName">Role Name *</Label>
                  <Input
                    id="roleName"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="e.g., Senior Manager, Credit Head"
                  />
                </div>
                <div>
                  <Label>User Count</Label>
                  <Input
                    value={role?.userCount || 0}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="roleDescription">Description *</Label>
                <Textarea
                  id="roleDescription"
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  placeholder="Describe the purpose and responsibilities of this role..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Module Section */}
          <Card>
            <CardContent className="p-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Module Permissions</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModule(!showAddModule)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
              </div>

              {showAddModule && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={newModuleName}
                      onChange={(e) => setNewModuleName(e.target.value)}
                      placeholder="Enter custom module name"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddModule()}
                    />
                    <Button onClick={handleAddModule} size="sm">
                      Add
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowAddModule(false);
                        setNewModuleName('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>

                  {availableModules.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <div className="text-xs font-medium text-gray-700 mb-2">
                          Quick Add Modules:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {availableModules.map((module) => (
                            <Badge
                              key={module}
                              variant="outline"
                              className="cursor-pointer hover:bg-blue-100"
                              onClick={() => handleAddPredefinedModule(module)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              {module}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Permissions Table */}
              {permissions.length === 0 ? (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                  <p>No modules added yet</p>
                  <p className="text-sm mt-2">Click "Add Module" to start</p>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Module</TableHead>
                        <TableHead className="text-center w-[100px]">View</TableHead>
                        <TableHead className="text-center w-[100px]">Create</TableHead>
                        <TableHead className="text-center w-[100px]">Edit</TableHead>
                        <TableHead className="text-center w-[100px]">Delete</TableHead>
                        <TableHead className="text-center w-[100px]">Approve</TableHead>
                        <TableHead className="text-center w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {permissions.map((permission, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {permission.module}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={permission.actions.view}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(index, 'view', checked)
                                }
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={permission.actions.create}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(index, 'create', checked)
                                }
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={permission.actions.edit}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(index, 'edit', checked)
                                }
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={permission.actions.delete}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(index, 'delete', checked)
                                }
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={permission.actions.approve}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(index, 'approve', checked)
                                }
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveModule(index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Permission Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-sm">
                <div className="font-medium mb-2">Permission Summary:</div>
                <div className="grid grid-cols-5 gap-2">
                  <div>
                    <span className="text-gray-600">Total Modules:</span>{' '}
                    <span className="font-medium">{permissions.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">View:</span>{' '}
                    <span className="font-medium">
                      {permissions.filter(p => p.actions.view).length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Create:</span>{' '}
                    <span className="font-medium">
                      {permissions.filter(p => p.actions.create).length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Edit:</span>{' '}
                    <span className="font-medium">
                      {permissions.filter(p => p.actions.edit).length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Delete:</span>{' '}
                    <span className="font-medium">
                      {permissions.filter(p => p.actions.delete).length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {role ? 'Update Role' : 'Create Role'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
