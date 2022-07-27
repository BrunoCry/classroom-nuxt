<template>
    <div>
        <div class="flex align-items-center mb-3">
            <Button
                icon="pi pi-arrow-left"
                class="p-button-rounded p-button-text p-button-plain mr-2"
                @click="goBack"
            />
            <h2 class="my-0">{{ $t('Assigned homeworks') }} </h2>
        </div>
        <div class="grid">
            <div class="col-12 xl:col-5" v-if="assignments.count">
                <DataTable :value="assignments.items">
                    <ColumnGroup>
                        <Column field="author.first_name" header="First Name"></Column>
                        <Column field="author.last_name" header="Last Name"></Column>
                        <Column field="author.middle_name" header="Middle Name"></Column>
                    </ColumnGroup>
                    <Column field="status" header="Status"></Column>
                    <Column field="rate" header="Rate"></Column>
                    <Column field="rate" header="Rate"></Column>
                    <Column header="Navigation">
                    </Column>
                </DataTable>
            </div>
            <div class="col-12 xl:col-5" v-else>
                {{ $t('No assigned homeworks for now') }}
            </div>
        </div>
    </div>
</template>

<script>
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import Message from 'primevue/message';
    import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
    import Row from 'primevue/row';                     //optional for row
    import { mapGetters } from 'vuex';
    import Button from 'primevue/button';
    import Divider from 'primevue/divider';

    export default {
        components: {
            Button, Divider,
            DataTable, Column,
            Message, ColumnGroup,
        },
        computed: {
            ...mapGetters({
                assignments: 'assignments/items'
            })
        },
        methods: {
            async goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>