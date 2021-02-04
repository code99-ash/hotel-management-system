<template>
    <div>
        <ChangeEmail />

        <Divider />

        <ChangePass/>
    </div>
</template>

<script>
import ChangeEmail from '../../components/admin/profile/change-email.vue'
import ChangePass from '../../components/admin/profile/change-pass.vue'

export default {
    layout: 'Admin',
    components: {
        ChangeEmail,
        ChangePass,
    }
}
</script>