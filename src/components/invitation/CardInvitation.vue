<template>
    <v-list-item class="pa-0 mb-3">
        <v-card 
            :loading="isProcessing"
            variant="tonal"
            :color="getCardColor" 
            class="w-100"
        >
            <v-card-title class="text-subtitle-1 pb-1">
                <v-icon start size="small">mdi-email-send-outline</v-icon>
                دعوة مشروع: **{{ invitation.project.name }}**
            </v-card-title>
            
            <v-card-subtitle class="text-wrap">
                من: {{ invitation.sender.name }} ({{ invitation.sender.email }})
            </v-card-subtitle>
            
            <v-card-text class="pt-2 pb-1 text-caption text-medium-emphasis">
                {{ formatCreationDate(invitation.createdAt) }}
            </v-card-text>

            <v-card-actions v-if="invitation.status === 'PENDING'">
                <v-spacer></v-spacer>
                
                <v-btn 
                    size="small" 
                    color="success" 
                    variant="flat" 
                    :disabled="isProcessing"
                    @click="handleAccept"
                >
                    قبول
                </v-btn>

                <v-btn 
                    size="small" 
                    color="error" 
                    variant="outlined" 
                    :disabled="isProcessing"
                    @click="handleReject"
                >
                    رفض
                </v-btn>
            </v-card-actions>

            <v-card-actions v-else>
                <v-chip :color="getStatusChipColor(invitation.status)" size="small">
                    {{ getStatusText(invitation.status) }}
                </v-chip>
            </v-card-actions>

        </v-card>
    </v-list-item>
</template>

<script>
import { useInvitationsStore } from '@/stores/invitations';

export default {
    // 1. تعريف الـ Prop
    props: {
        invitation: {
            type: Object,
            required: true,
        },
    },
    
    // 2. إعداد الحالة المحلية
    data() {
        return {
            isProcessing: false, // حالة التحميل المحلية
            invitationsStore: useInvitationsStore(), // تهيئة الـ Store
        };
    },
    
    // 3. الدوال المحسوبة
    computed: {
        // لتلوين البطاقة بناءً على الحالة
        getCardColor() {
            return this.invitation.status === 'PENDING' ? 'info' : 'surface-variant';
        },
    },

    // 4. الدوال المساعدة ومعالجات الأفعال
    methods: {
        // لتهيئة التاريخ
        formatCreationDate(dateString) {
            if (!dateString) return 'تاريخ غير معروف';
            const date = new Date(dateString);
            return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
        },

        // لعرض نص الحالة
        getStatusText(status) {
            switch (status) {
                case 'APPROVED': return 'تم القبول';
                case 'REJECTED': return 'تم الرفض';
                default: return 'معلقة';
            }
        },

        // لتلوين شريحة الحالة
        getStatusChipColor(status) {
            switch (status) {
                case 'APPROVED': return 'success';
                case 'REJECTED': return 'error';
                default: return 'warning';
            }
        },
        
        // معالج القبول
        async handleAccept() {
            this.isProcessing = true;
            try {
                // استدعاء أكشن Pinia
                await this.invitationsStore.acceptInvitation(this.invitation.id);
            } catch (error) {
                alert('فشل في قبول الدعوة: ' + error.message);
            } finally {
                this.isProcessing = false;
            }
        },

        // معالج الرفض
        async handleReject() {
            this.isProcessing = true;
            try {
                // استدعاء أكشن Pinia
                await this.invitationsStore.rejectInvitation(this.invitation.id);
            } catch (error) {
                alert('فشل في رفض الدعوة: ' + error.message);
            } finally {
                this.isProcessing = false;
            }
        },
    },
};
</script>

<style scoped>
.text-wrap {
    white-space: normal;
}
</style>