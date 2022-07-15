<template>
    <div>
        <ConfirmDialog />
        <div class="flex align-items-center mb-3">
            <NuxtLink to="/rooms">
                <Button icon="pi pi-arrow-left" class="p-button-rounded p-button-text p-button-plain mr-2" />
            </NuxtLink>
            <h2 class="my-0">Room: {{ room.name }}</h2>
            <Button v-if="canModerate" type="button" label="Room manage" class="ml-auto" @click="toggleManageRoom" aria-haspopup="true" aria-controls="overlay_menu" />
            <Menu v-if="canModerate" id="overlay_menu" ref="menu" :model="items" :popup="true" />
        </div>
        <div class="grid">
            <div class="col-12 xl:col-8">
                <div class="text-sm">Creator: <b>{{ room.author.full_name }}</b></div>
                <span class="text-sm mb-1 mt-3 block">Description:</span>
                <p class="text-lg mt-0">{{ room.description }}</p>
                <div>
                    <span class="text-sm mb-2 block">Link to join:</span>
                    <div class="col-5 p-0 mb-4">
                        <div class="p-inputgroup">
                            <InputText placeholder="Link to join" v-model="joinLink" disabled />
                            <Button label="Copy to clipboard" @click.prevent="copyJoinLink()" />
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <Button v-if="canModerate" class="p-button-outlined">Show Homeworks (3)</Button>
                </div>
                <Divider />
                <div class="grid">
                    <div class="col-12 xl:col-6">
                        <div class="flex align-items-center">
                            <h3>Course materials</h3>
                            <NuxtLink v-if="canModerate" :to="'/rooms/add-attachment/' + room.id + '?type=material'">
                                <Button icon="pi pi-plus" class="p-button-rounded p-button-text p-button-sm ml-2" v-tooltip.top="'Add materials'" />
                            </NuxtLink>
                        </div>
                        <Attachments :type="'material'" />
                    </div>
                    <div class="col-12 xl:col-6">
                        <div class="flex align-items-center">
                            <h3>Homeworks</h3>
                            <NuxtLink v-if="canModerate" :to="'/rooms/add-attachment/' + room.id + '?type=homework'">
                                <Button icon="pi pi-plus" class="p-button-rounded p-button-text p-button-sm ml-2" v-tooltip.top="'Add homework'" />
                            </NuxtLink>
                        </div>
                        <Attachments :type="'homework'" />
                    </div>
                </div>
            </div>
            <div class="col-12 xl:col-4">
                <div class="bg-white border-solid border-1 p-3 border-round-lg border-300">
                    <h3 class="my-0">Members of the room</h3>
                    <Divider />
                    <Participants />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Menu from 'primevue/menu';
    import Button from 'primevue/button';
    import Divider from 'primevue/divider';
    import InputText from 'primevue/inputtext';
    import Participants from './Participants.vue';
    import ConfirmDialog from 'primevue/confirmdialog';
    import Attachments from './Attachments.vue';

    export default {
        components: {
            Button, Divider, InputText, Participants, Menu, ConfirmDialog, Attachments
        },
        computed: {
            ...mapGetters({
                canModerate: 'rooms/canModerate',
                room: 'rooms/item',
                currentUser: 'users/currentUser'
            }),
            joinLink() {
                return window.location.host + '/rooms/join/' + this.room.join_slug
            }
        },

        data () {
            return {
                items: [
                    {
                        label: 'Room manage',
                        items: [{
                            label: 'Edit',
                            icon: 'pi pi-pencil',
                            command: () => {
                                this.$router.push({ name: 'rooms.edit', params: { id: this.room.id } })
                            }
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-times',
                            command: () => {
                                this.$confirm.require({
                                    header: 'Confirm the action',
                                    message: 'Do you really want to delete a room?',
                                    icon: 'pi pi-exclamation-triangle',
                                    accept: () => {
                                        this.deleteRoomHelper()
                                    },
                                    reject: () => {}
                                });
                            }
                        }
                    ]}
                ]
            }
        },

        methods: {
            ...mapActions({
                deleteRoom: 'rooms/deleteRoom'
            }),
            toggleManageRoom(event) {
                this.$refs.menu.toggle(event);
            },
            async deleteRoomHelper() {
                await this.deleteRoom(this.room.id)

                this.$toast.add({
                    severity:'info',
                    summary:'Success',
                    detail:'You deleted the room',
                    life: 3000
                });

                this.$router.push({ name: 'rooms.list' });
            },
            async copyJoinLink() {
                try {
                    await navigator.clipboard.writeText(this.joinLink)
                    this.copied = true

                    this.$toast.add({
                        severity:'success',
                        summary:'Success',
                        detail:'Link copied!',
                        life: 3000
                    });
                } catch(e) {
                    console.error(e)
                }
            }
        }
    }
</script>