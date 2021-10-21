<template>
    <div>
        <Table border ref="selection" size="large" 
            :columns="columns4" 
            :data="data1"
            :height="fixedHeader ? 350 : ''" >
        </Table>
    </div>
</template>

<script>
export default {
    name: 'RoleList',
    props: ['fixedHeader'],
    data() {
        return {
            columns4: [
              {
                  type: 'selection',
                  width: 40,
                  align: 'center'
              },
              {
                  title: 'Role',
                  key: 'role'
              },
              {
                  title: 'Total',
                  key: 'total'
              }
          ],
          data1: [
            {
                role: 'Admin',
                total: 1,
            },
            {
                role: 'Manager',
                total: 1,
            },
            {
                role: 'Receptionist',
                total: 1,
            },
            {
                role: 'Kitchen',
                total: 10,
            },
            {
                role: 'Cleaning',
                total: 25,
            },
            {
                role: 'Secretary',
                total: 2,
            },
          ]
        }
    }
}
</script>
