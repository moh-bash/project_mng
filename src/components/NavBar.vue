<template>
    <v-app-bar 
        class="bg-primary px-6" 
        height="64" 
        elevation="4"
    >
        <div v-if="user" class="d-flex align-center">
        
            <v-menu
                offset-y
                location="bottom right"
            >
                <template v-slot:activator="{ props }">
                    <div v-bind="props" class="d-flex align-center cursor-pointer"> 
                        <v-avatar color="blue-lighten-2" size="36">
                            <span class="text-h6 text-white">{{ user.name ? user.name[0] : '' }}</span>
                        </v-avatar>
                        
                        <v-icon color="white" size="small" class="ms-1">mdi-chevron-down</v-icon>
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
                            @click="$router.push({ name: 'UserProfile' })"
                        >
                            <v-list-item-icon>
                                <v-icon>mdi-account-circle</v-icon>
                            </v-list-item-icon>
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
        <v-btn @click="$router.push({ name: 'login' })" v-else>Login</v-btn>

        <h1 class="text-h5 font-weight-bold text-white mx-2">project manager</h1>

        <v-spacer></v-spacer>

        <div class="d-flex align-center">
            
            <v-btn icon @click="toggleLanguage" class="mr-2">
                <v-icon color="white">mdi-web</v-icon>
            </v-btn>

            <v-btn icon @click="toggleTheme" class="mr-2">
                <v-icon color="white">{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
            </v-btn>

            <v-btn v-if="user" icon @click="invitationsDrawer = true">
                <v-badge 
                    :content="invitationCount" 
                    color="red" 
                    :value="invitationCount > 0"
                    overlap
                >
                    <v-icon color="white">mdi-bell-outline</v-icon>
                </v-badge>
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
                الدعوات الواردة ({{ invitationCount }})
            </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        
        <v-list v-if="invitations.length" class="pa-4">
            <InvitationCard 
                v-for="invite in invitations"
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
import CardInvitation from '@/components/CardInvitation.vue';

export default {
    components: {
        InvitationCard: CardInvitation
    },
    data() {
        return {
            invitationsDrawer: false, 
            // 💡 لتخزين كائن الثيم للوصول إليه بشكل صحيح في Options API
        theme: useTheme(),
        };
    },

    computed: {
        // ربط حالة المستخدم من متجر Auth
        ...mapState(useAuthStore, ['user']), 
        
        // ربط Getter و State من متجر Invitations
        ...mapState(useInvitationsStore, {
             invitationCount: 'newInvitationsCount',
             invitations: 'invitations' 
        }),
        
        // حساب حالة الثيم (Dark/Light)
        isDark() {
            return this.vuetifyTheme ? this.vuetifyTheme.global.name.value === 'dark' : false;
        }
    },

    methods: {
        // ربط Action تسجيل الخروج من متجر Auth
        ...mapActions(useAuthStore, ['logout']), 
        // ربط Action لقبول دعوة من متجر Invitations
        ...mapActions(useInvitationsStore, ['acceptInvitation']),

        // 💡 دالة تبديل الثيم (معالجة مشكلة السياق وحفظ LocalStorage)
        toggleTheme() {
           const theme = this.vuetifyTheme; 
           if (!theme) return;
           
           const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark';
           
           theme.global.name.value = newTheme; 
           localStorage.setItem('theme', newTheme);
        },

        handleLogout() {
            this.logout(); 
            // التوجيه إلى صفحة تسجيل الدخول
            this.$router.push({ name: 'Login' }); 
        },

        toggleLanguage() {
            alert('Toggle Language (Mock)');
        }
    },

    created() {
        // 💡 1. تهيئة Vuetify Theme مرة واحدة في السياق الصحيح
        this.vuetifyTheme = useTheme(); 

        // 2. جلب الدعوات عند إنشاء المكون (افتراضياً)
        const invitationsStore = useInvitationsStore();
        invitationsStore.fetchInvitations();
    }
};
</script>
<style scoped>
    .pinned-top {
        position: sticky;
        top: 0;
        z-index: 10;
    }
</style>