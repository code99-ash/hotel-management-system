<template>
    <Form ref="checkerForm" :model="checkerForm">
        <Row :gutter="16">
            <Col :xs="8">
                <FormItem label="CheckIn" class="room-checker">
                    <Input type="date" v-model="checkerForm.checkIn" />
                </FormItem>
            </Col>
            <Col :xs="8">
                <FormItem label="Quantity" class="room-checker">
                    <Input type="number" v-model="checkerForm.quantity" />
                </FormItem>
            </Col>
            <Col :xs="8">
                <FormItem label="Category" class="room-checker">
                    <Select v-model="checkerForm.category" filterable>
                        <Option 
                            v-for="cat in $store.state.data.categories" 
                            :key="cat._id"
                            :value="cat._id"
                        >{{cat.name}}</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col :xs="24">
                <Button 
                    class="bg-light-blue border-0 p-3" 
                    @click.prevent="handleSubmit"
                >Check Availability</Button>
            </Col>
        </Row>
    </Form>
</template>

<script>
export default {
    name: 'RoomChecker',
    data() {
        return {
            loading: false,
            checkerForm: {
                checkIn: null,
                quantity: 1,
                category: '',
            }
        }
    },
    methods: {
        async handleSubmit() {
            const {checkIn, quantity, category} = this.checkerForm;
            if(!checkIn || quantity < 1 || !category) {
                this.$Message.error('Fill all fields');
                return;
            }

            const checkInDate = new Date(checkIn);
            const today = new Date();

            if(checkInDate.getDate() < today.getDate() && checkInDate.getMonth() <= today.getMonth()) {
                this.$Message.error('You can only reserve for today and after');
            }else {
                const response = await this.$axios.post(`/api/booking/availables`, {category});
                const data = response.data;
                if(data.length === 0) {
                    this.$Modal.error({
                        title: 'No room Available !!',
                        content: 'We are sorry to inform you that there is no room available in this category'
                    });
                }else if(data.length < quantity) {
                    this.$Modal.warning({
                        title: 'Room available is less than youe request',
                        content: 'We are sorry to inform you that you wont meet the number of rooms you requested for in this category.'
                    });
                }else {
                    this.$Modal.success({
                        title: 'Congratulations !!!',
                        content: 'Will you like to continue before you miss out??'
                    });
                }
            }
        },

        // getNumberOfDays(start, end) {
        //     const date1 = new Date(start);
        //     const date2 = new Date(end);

        //     // One day in milliseconds
        //     const oneDay = 1000 * 60 * 60 * 24;

        //     // Calculating the time difference between two dates
        //     const diffInTime = date2.getTime() - date1.getTime();

        //     // Calculating the no. of days between two dates
        //     const diffInDays = Math.round(diffInTime / oneDay);

        //     return diffInDays;
        // }
    }
}
</script>

<style>
    .ivu-form-item-label {
        color: #ddd !important;
    }
</style>