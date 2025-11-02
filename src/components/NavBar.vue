<template>
    <v-app-bar 
        density="comfortable"
        class="bg-primary px-6" 
        height="64" 
        elevation="4"
    >
        <div v-if="Layoutppp && user" class="d-flex align-center">

            <v-menu
                offset-y
                location="bottom right"
            >
                <template v-slot:activator="{ props }">
                    <div v-bind="props" class="d-flex align-center cursor-pointer"> 
                        <v-avatar color="secondary" size="36">
                            <span class="text-h6 text-background">{{ user.name ? user.name[0] : '' }}</span>
                        </v-avatar>
                        
                    </div>
                </template>

                <v-card min-width="250" class="mt-2">
                    
                    <v-list-item class="bg-grey-lighten-4">
                        <template v-slot:prepend>
                            <v-avatar color="blue-lighten-2" size="40">
                                <span class="text-h6 text-white">{{ user.name ? user.name[0] : '' }}</span>
                            </v-avatar>
                        </template>
                        <v-list-item-title class="font-weight-bold">{{ user.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                    </v-list-item>
                    
                    <v-divider></v-divider>
                    
                    <v-list density="compact">
                        <v-list-item 
                            link 
                            @click="$router.go({ name: 'UserProfile' })"
                        >
                            <v-icon>mdi-account-circle</v-icon>
                            <v-list-item-title><pre>Profile</pre> </v-list-item-title>
                        </v-list-item> 
                    </v-list>
                    
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn 
                            color="error" 
                            variant="flat" 
                            block 
                            @click="handleLogout"
                        >
                            <v-icon start>mdi-logout</v-icon>
                            logout
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </div>
        <v-btn 
            class="bg-secondary text-primary"
            rounded="xl" 
            @click="$router.push({ name: 'login' })" v-else>Login</v-btn>

        <h1 class="text-h5 font-weight-bold text-white mx-2">project manager</h1>

        <v-spacer></v-spacer>

        <div class="d-flex align-center">
            
            <v-btn icon @click="toggleLanguage" class="mr-2">
                <v-icon color="white">mdi-web</v-icon>
            </v-btn>

            <v-btn icon @click="toggleTheme" class="mr-2">
                <v-icon color="white">{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
            </v-btn>

            <v-btn v-if="Layoutppp" icon @click="invitationsDrawer = true">
                <v-badge 
                    v-if="pendingCount > 0"
                    :content="pendingCount" 
                    color="red" 
                    overlap
                >
                    <v-icon color="white">mdi-bell-outline</v-icon>
                </v-badge>
                <v-icon 
                color="white"
                v-else >mdi-bell-outline</v-icon>
            </v-btn>
        </div>
    </v-app-bar>

    <v-navigation-drawer
        v-model="invitationsDrawer"
        location="right"
        temporary
    >
        <v-list-item class="bg-primary text-white">
            <v-list-item-title class="text-h6">
                <v-icon start>mdi-bell-outline</v-icon>
                invitations ({{ pendingCount }})
            </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        
        <v-list v-if="pendingInvitations.length" class="pa-4">
            <InvitationCard
                v-for="invite in pendingInvitations"
                :key="invite.id"
                :invitation="invite" 
            />
        </v-list>
        <div v-else class="pa-4 text-center text-medium-emphasis">
            no invitations found
        </div>
    </v-navigation-drawer>
</template>
<script>
import { useTheme } from 'vuetify';
import { useAuthStore } from '@/stores/auth';
import { useInvitationsStore } from '@/stores/invitations';
import { mapState, mapActions } from 'pinia';
import CardInvitation from '@/components/invitation/CardInvitation.vue';


export default {
    components: {
        InvitationCard: CardInvitation
    },
    data() {
        return {
            invitationsDrawer: false, 
            theme: useTheme(),
        };
    },

    computed: {
        ...mapState(useAuthStore, ['user']), 
        
        ...mapState(useInvitationsStore, [
            'invitations',
            'invitationsError', 
            'invitationsLoading', 
            'pendingInvitations',
            'pendingCount'
        ]),
        
        isDark() {
            return this.vuetifyTheme ? this.vuetifyTheme.global.name.value === 'dark' : false;
        },

        Layoutppp(){
           return this.$route.meta.layout;
        }
    },

    methods: {
        ...mapActions(useAuthStore, ['logout' , 'profile']), 
        ...mapActions(useInvitationsStore, ['fetchInvitations']),

        toggleTheme() {
           const theme = this.vuetifyTheme; 
           if (!theme) return;
           
           const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark';
           
           theme.global.name.value = newTheme; 
           localStorage.setItem('theme', newTheme);
        },

        handleLogout() {
            this.logout(); 
            this.$router.push({ name: 'login' }); 
        },

        toggleLanguage() {
            alert('Toggle Language (Mock)');
        }
    },
    
    created() {
        this.profile();
        this.vuetifyTheme = useTheme();    
        this.fetchInvitations();
        
    },
};
</script>
<style scoped>
    .pinned-top {
        position: sticky;
        top: 0;
        z-index: 10;
    }
</style>