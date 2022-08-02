<template>
    <div>
        <div class="flex align-items-center mb-3">
            <Button
                icon="pi pi-arrow-left"
                class="p-button-rounded p-button-text p-button-plain mr-2"
                @click="goBack"
            />
            <h2 class="my-0">{{ $t('Assigned homeworks') }} ({{assignments.total}})</h2>
        </div>
        <Dialog
            :visible="displayAssignment"
            :style="{width: '100%'}"
            :modal="true"
            @update:visible="changeAssignmentVisibility"
            @show="fetchAssignment"
        >
            <template #header>
                <h3>
                    {{ assignment.post.title + $t(` assignment` )}}
                </h3>
            </template>
            <AssignmentCreate />
        </Dialog>
        <div class="grid">
            <div class="col-12 xl:col-5" v-if="assignments.total">
                <DataTable :value="assignments.items">
                    <Column header="">
                        <template #body="assignment">
                            <Avatar :image="assignment.data.author.profile_picture_path"
                                class="mr-3"
                                size="large"
                                shape="circle"
                            />
                        </template>
                    </Column>
                    <Column
                        field="author.first_name"
                        header="First Name"
                        :sortable="true"
                    >
                    </Column>
                    <Column field="author.last_name" header="Last Name" :sortable="true"></Column>
                    <Column field="author.middle_name" header="Middle Name" :sortable="true"></Column>
                    <Column field="status" header="Status" :sortable="true">
                        <template #body="assignment">
                            <Badge
                                :value="assignment.data.status"
                                :severity="statusState(assignment.data)"
                            >
                            </Badge>
                        </template>
                    </Column>
                    <Column field="rate" header="Rate" :sortable="true"></Column>
                    <Column header="Action" :sortable="true">
                        <template #body="">
                            <Badge
                            value="Open"
                            severity="info"
                            style="cursor: pointer;"
                            >
                            </Badge>
                        </template>
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
    import Avatar from 'primevue/avatar';
    import Badge from 'primevue/badge';
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
            Button, Divider, Avatar,
            DataTable, Column, Badge,
            Message, ColumnGroup, Row,
        },
        computed: {
            ...mapGetters({
                assignments: 'assignments/items'
            })
        },
        methods: {
            async goBack() {
                this.$router.go(-1)
            },
            statusState(assignment) {
                if(Object.keys(assignment).length === 0)
                    return 'danger'
                else if(assignment.status_assigned)
                    return 'info'
                else if(assignment.status_request_changes)
                    return 'danger'
                else if(assignment.status_done)
                    return 'success'
            }
        }
    }
</script>