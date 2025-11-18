<template>
    <v-row class="pa-5 mx-4">
        <v-col cols="3">
            <v-card class="mx-auto rounded-xl elevation-3" min-height="355">
                <v-card-text>
                    <div class="font-weight-bold text-h4 text-start ms-1 mb-2">
                        <v-icon class="me-1 text-success">mdi-account-details-outline</v-icon>
                        Members
                    </div>
                    <v-timeline align="start" density="compact" >
                    <v-timeline-item
                        v-for="(user, index) in currentProject?.assignedUsers || []"
                        :key="user.id"
                        size="small"
                        :dot-color="timelineColors[index % timelineColors.length]"
                        >

                        <div class="mb-4">
                            <div class="font-weight-normal">
                            <strong>{{ user.name }}</strong> 
                            </div>

                            <div>{{ user.email }}</div>
                        </div>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="mx-auto rounded-xl elevation-3" min-height="355">
                <v-card-text>
                    <div class="font-weight-bold text-h4 text-start ms-1 mb-2 ms-7">
                        <v-icon class="me-1 text-error">mdi-bookmark-multiple</v-icon>
                        Information
                    </div>
                    <div>
                        <v-avatar class="pa-0" size="90">
                            <v-icon style="font-size: 90px;">mdi-account-circle</v-icon>
                        </v-avatar>
                        <h3>Name user</h3>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card class="mx-auto rounded-xl elevation-3" min-height="355">
                <v-card-text >
                    <div class="font-weight-bold text-h4 text-start ms-1 mb-2">
                        <v-icon class="me-1 text-orange-darken-2">mdi-security</v-icon>
                        Admin
                    </div>
                    <div style="width: 100%;">
                        <v-card-title>send invitation</v-card-title>
                        <v-card-text >
                            <v-text-field
                                v-model="receiverEmail"
                                label="Enter email"
                                :rules="emailRules"
                                :loading="invitationsLoading"
                                :disabled="invitationsLoading"
                                placeholder="enter emaail"
                                required
                            ></v-text-field>
                            
                            <v-btn
                                color="primary"
                                variant="flat"
                                :disabled="!isFormValid || invitationsLoading"
                                :loading="invitationsLoading"
                                @click="handleSendInvitation"
                            >
                                Send
                            </v-btn>
                            <v-alert
                                v-if="alertMessage"
                                :type="alertType"
                                class="mt-4"
                                variant="tonal"
                                closable
                                @click:close="alertMessage = ''"
                                >
                                {{ alertMessage }}
                            </v-alert>

                            <div class="bg-surface mx-auto d-flex align-center px-3 pt-7 ps-9">
                                <v-btn density="compact" icon="mdi-pencil" class="elevat me-3"></v-btn>
                                <v-btn density="compact" icon="mdi-trash-can-outline" class="elevat me-3 text-error"></v-btn>
                                <v-btn density="compact" icon="mdi-dots-horizontal" class="elevat me-3"></v-btn>
                            </div>
    
                        </v-card-text>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import { useInvitationsStore } from '@/stores/invitations';
import { useProjectsStore } from '@/stores/projects';
import { mapActions, mapState } from 'pinia';
import { useInnerSlicePath } from 'vuetify/lib/labs/VPie/utils.mjs';

export default{
    name: 'details',

    props: {
        id: {
            type: [String, Number],
            required: true,
        },
    },

    data(){
        return{
            timelineColors: ['error', 'secondary', 'success', 'info', 'warning', 'error', 'blue-grey'],
            receiverEmail: '', 
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'ERROOR emdl',
            ],
            alertMessage: '',
            alertType: '',  
        }
    },

    computed: {
        ...mapState(useProjectsStore, ['currentProject','projectsLoading', 'projectsError']),
        ...mapState(useInvitationsStore, ['invitationsError', 'invitationsLoading']),
        isFormValid() {
            return this.emailRules.every(rule => rule(this.receiverEmail) === true);
        }

    },  
        

    methods: {
        ...mapActions(useProjectsStore, ['fetchProjectById']),
        ...mapActions(useInvitationsStore, ['sendInvitation']),
        async handleSendInvitation() {
        if (!this.isFormValid) return;

        const projectId = Number(this.$route.params.id); // id المشروع من الراوتر

        if (!projectId) {
            console.error("❌ Project ID is missing!");
            return;
        }

        const invitationData = {
            receiverEmail: this.receiverEmail,
            projectId
        };

        try {
            await this.sendInvitation(invitationData);
            this.receiverEmail = '';
        } catch (error) {
            console.error(" Error:", error);
        }
    }
    },

 

    

}

</script>