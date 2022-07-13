<template>
    <div class="dialogs-layout">
        <div>
            <h2 class="mt-0">List of your dialogs</h2>
            <p class="mb-4">12312312312</p>
        </div>
        <div class="grid">
            <div class="col-3">
                <Card>
                    <template #title>
                        <h4 class="m-0">List of dialogs</h4>
                    </template>
                    <template #content>
                        <NuxtLink to="/dialogs/show/3" class="flex align-items-center">
                            <Avatar label="U" class="mr-2" style="background-color:#9c27b0; color: #ffffff" />
                            <div class="ml-1">
                                <h4 class="my-0">Obama</h4>
                                <p class="gray-500 m-0">Last message</p>
                            </div>
                        </NuxtLink>
                    </template>
                </Card>
            </div>
            <div class="col-9">
                <Nuxt />
            </div>
        </div>
    </div>
</template>

<script>
    import Card from 'primevue/card';
    import Avatar from 'primevue/avatar';

    export default {
        name: 'DialogsLayoutPage',
        components: {
            Card, Avatar
        }
    }
</script>