<template>
    <v-card class="mb-3" elevation="2">
        <v-card-title class="text-subtitle-1">
            Invitation to **{{ invitation.project.name }}**
        </v-card-title>
        <v-card-subtitle>
            Sent by: {{ invitation.sender.name }}
        </v-card-subtitle>

        <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn 
                color="red-darken-1" 
                variant="text" 
                @click="reject"
                :loading="loading"
            >
                Reject
            </v-btn>
            <v-btn 
                color="green-darken-1" 
                variant="flat" 
                @click="approve"
                :loading="loading"
            >
                Accept
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapActions } from 'pinia';
import { useInvitationsStore } from '@/stores/invitations';

export default {
    props: {
        invitation: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        // ✅ جلب دوال القبول والرفض من المتجر
        ...mapActions(useInvitationsStore, ['approveInvitation', 'rejectInvitation']),

        async approve() {
            this.loading = true;
            try {
                // استدعاء دالة القبول من المتجر
                await this.approveInvitation(this.invitation.id);
                // 💡 هنا يمكنك عرض رسالة نجاح للمستخدم
                // الإزالة من القائمة يتم تلقائيًا عبر منطق الـ filter في المتجر
            } catch (error) {
                // 💡 هنا يمكنك عرض رسالة خطأ للمستخدم
                console.error('Approval failed:', error);
            } finally {
                this.loading = false;
            }
        },
        
        async reject() {
            this.loading = true;
            try {
                // استدعاء دالة الرفض من المتجر
                await this.rejectInvitation(this.invitation.id);
                // 💡 هنا يمكنك عرض رسالة نجاح للمستخدم
            } catch (error) {
                // 💡 هنا يمكنك عرض رسالة خطأ للمستخدم
                console.error('Rejection failed:', error);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>