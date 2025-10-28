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

<script setup>
import { defineProps, ref, computed } from 'vue';
import { useInvitationsStore } from '@/stores/invitations';

// ------------------------------------
// 1. تعريف الـ Prop
const props = defineProps({
    invitation: {
        type: Object,
        required: true,
        // يمكن إضافة دالة تحقق إضافية هنا للتأكد من هيكل البيانات
    },
});

// ------------------------------------
// 2. إعداد المتجر والحالة المحلية
const invitationsStore = useInvitationsStore();
const isProcessing = ref(false); // حالة التحميل المحلية لضمان عدم الضغط مرتين

// ------------------------------------
// 3. الدوال المساعدة والمحسوبة

// لتلوين البطاقة
const getCardColor = computed(() => {
    return props.invitation.status === 'PENDING' ? 'info' : 'surface-variant';
});

// لتهيئة التاريخ
const formatCreationDate = (dateString) => {
    // يمكنك استخدام مكتبة مثل dayjs أو Moment.js هنا، لكن سنستخدم دالة JavaScript بسيطة
    if (!dateString) return 'تاريخ غير معروف';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
};

// لعرض نص الحالة (بعد القبول/الرفض)
const getStatusText = (status) => {
    switch (status) {
        case 'APPROVED': return 'تم القبول';
        case 'REJECTED': return 'تم الرفض';
        default: return 'معلقة';
    }
};

// لتلوين شريحة الحالة
const getStatusChipColor = (status) => {
     switch (status) {
        case 'APPROVED': return 'success';
        case 'REJECTED': return 'error';
        default: return 'warning';
    }
}

// ------------------------------------
// 4. معالجات الأفعال (Actions)

const handleAccept = async () => {
    isProcessing.value = true;
    try {
        await invitationsStore.acceptInvitation(props.invitation.id);
        // لا حاجة لعمل شيء إضافي، Pinia ستقوم بتحديث الحالة
    } catch (error) {
        alert('فشل في قبول الدعوة: ' + error.message);
    } finally {
        isProcessing.value = false;
    }
};

const handleReject = async () => {
    isProcessing.value = true;
    try {
        await invitationsStore.rejectInvitation(props.invitation.id);
    } catch (error) {
         alert('فشل في رفض الدعوة: ' + error.message);
    } finally {
        isProcessing.value = false;
    }
};
</script>

<style scoped>
.text-wrap {
    white-space: normal;
}
</style>