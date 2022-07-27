<template>
    <div class="user-profile">
        <template v-if="!loading">
            <h2 class="mt-0">Your profile info</h2>
            <div class="grid">
                <div class="col-12 xl:col-5">
                    <div class="flex align-items-center mb-6">
                        <div class="mr-3 avatar_container">
                            <div @click="activateInput" @mouseover="switchUploadModeOn" @mouseleave="switchUploadModeOff" class="img_container">
                                <Avatar :image="userAvatar" class="avatar-img" size="large" shape="circle" />
                                <input @change="sendAvatarToServer" ref="fileAvatar" class="choose-new-avatar" type="file" name="img" id="chooser_avatar" accept="image/*">
                            </div>
                            <i class="pi pi-cloud-upload avatar-upload-img"></i>
                        </div>
                        <div>
                            <h3 class="mt-0 mb-1">{{ currentUser.first_name }} {{ currentUser.middle_name }} {{ currentUser.last_name }}</h3>
                            <span>{{ currentUser.email }}</span>
                        </div>
                        <div class="ml-8">
                            <span class="text-sm block mb-1">Registration date: {{ currentUser.created_at }}</span>
                            <span class="text-sm block">Last update: {{ currentUser.updated_at }}</span>
                        </div>
                    </div>
                    <h4>Edit profile:</h4>
                    <Divider align="left" type="dashed">
                        Personal info
                    </Divider>
                    <label for="first_name" class="mb-1 block">First name</label>
                    <InputText id="first_name" v-model="form.first_name" class="block w-full mb-4" />
                    <label for="first_name" class="mb-1 block">Middle name</label>
                    <InputText id="first_name" v-model="form.middle_name" class="block w-full mb-4" />
                    <label for="first_name" class="mb-1 block">Last name</label>
                    <InputText id="first_name" v-model="form.last_name" class="block w-full mb-5" />
                    <Divider align="left" type="dashed">
                        Credentials
                    </Divider>
                    <label for="first_name" class="mb-1 block">Password</label>
                    <InputText id="first_name" v-model="form.password" class="block w-full mb-4" />
                    <label for="first_name" class="mb-1 block">Repeat password</label>
                    <InputText id="first_name" v-model="form.repeat_password" class="block w-full mb-5" />
                </div>
            </div>
        </template>
        <template v-else>
            <div class="flex justify-content-center">
                <ProgressSpinner />
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Avatar from 'primevue/avatar';
    import InputText from 'primevue/inputtext';
    import Divider from 'primevue/divider';
    import ProgressSpinner from 'primevue/progressspinner';

    export default {
        components: {
            Avatar, InputText, Divider, ProgressSpinner
        },
        data () {
            return {
                form: {
                    first_name: '',
                    last_name: '',
                    middleName: '',
                    confirm_password: '',
                    phone_number: '',
                    email: '',
                    password: '',
                    repeat_password: '',
                },
                loading: true,
                uploadAvatar: {},
                isMousOnAvatar: false
            }
        },
        methods: {
            ...mapActions({
                getCurrentUser: 'users/getCurrentUser',
                updateUser: 'users/updateUser',
                updateUserAvatar: 'users/updateAvatar',
                
            }),
            async updateProfile() {
                const requestBody = form
                await this.updateUser(requestBody)
            },
            async updateUser() {
                await this.$store.dispatch('users/getCurrentUser')
            },
            activateInput() {
                document.getElementById('chooser_avatar').click()
            },
            async sendAvatarToServer() {
                this.uploadAvatar = this.$refs.fileAvatar.files[0];
                this.updateUserAvatar({profile_picture: this.uploadAvatar})
            },
            switchUploadModeOn() {
                this.isMousOnAvatar = true
            },
            switchUploadModeOff() {
                this.isMousOnAvatar = false
            },
        },
        computed: {
            ...mapGetters({
                currentUser: 'users/currentUser',
                updateErrors: 'users/registrationErrors',
            }),
            userAvatar() {
                return this.currentUser.profile_picture_path
            }
        },

        async created () {
            await this.$store.dispatch('users/getCurrentUser')
            
            setTimeout(() => {
                    this.loading = false
            }, 600)

            this.form = this.currentUser
            this.form.password = ''
        }
    }
</script>

<style scoped>
.choose-new-avatar {
    width: 0;
    height: 0;
}

.img_container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 50%;
    z-index: 100;
}

.avatar_container {
    position: relative;
    user-select: none;
}

.avatar-img {
    cursor: pointer;
    width: 150px;
    height: 150px;
    box-shadow: 0 2px 10px rgb(57 54 77 / 30%);
}

.avatar-img:hover{
    opacity: 0.6;
}

.avatar-upload-img {
    width: 25%;
    height: 25%;
    font-size: 2.5rem;
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    display: none;
}

.img_container:hover ~ .avatar-upload-img {
    display: block;
    opacity: 0.8;
}
</style>