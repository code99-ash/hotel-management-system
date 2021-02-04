<?php

class RoleController
{
    private $id;
    private $name;
    private $department;
    private $created_by;

    // private function confirmCreatorId($id) {
    //     $staff = Staffs::where('id', $id)->get();
    //     if(count($staff) > 0) {
    //         $this->created_by = $id;
    //         return true;
    //     }
    // }

    private function checkRole()
    {
        $role = Role::where('role', $this->name)
            ->where('department', $this->department)
            ->get();
        return count($role) == 0 ? true : false;
    }

    public function addRole($name, $department)
    {
        $this->name = $name;
        $this->department = $department;

        if ($this->checkRole()) {
            try {
                Role::create([
                    'department' => $this->department,
                    'role' => $this->name,
                ]);
                echo 'Successfully added role';
                
            } catch (Exception $e) {
                echo $e;
            }
        } else {
            echo 'Role ' .
                $this->name .
                ' already exist in ' .
                $this->department .
                ' department';
        }
    }

    public function editRole($id)
    {
        $role = Role::where('id', $id)->get();
        return $role;
    }

    public function updateRole($id, $name, $dept)
    {
        Role::where('id', $id)->update([
            'role' => $name,
            'department' => $dept,
        ]);

        echo 'Successfully update role ';
    }

    public function deleteRole($id)
    {
        $this->id = $id;
        if (is_array($this->id)) {
            Role::whereIn('id', $this->id)->delete();
        } else {
            Role::where('id', $this->id)->delete();
        }
        echo 'successfully deleted role';
    }
}

?>
