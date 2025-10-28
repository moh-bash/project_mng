import { defineStore } from "pinia";
import InvitationList from '@/mock/invitationList.json'; 
// ملاحظة: تم تغيير اسم Action الرفض ليتطابق مع الـ API (reject)

export const useInvitationsStore = defineStore('invitations', {
    state: () => ({
        invitations: [],
        invitationsLoading: false,
        invitationsError: null,
    }),

    getters: {
        newInvitationsCount: (state) => {
            // عدّ الدعوات التي حالتها "PENDING"
            return state.invitations.filter(invite => invite.status === 'PENDING').length;
        },
        pendingInvitations: (state) => {
            return state.invitations.filter(invite => invite.status === 'PENDING');
        }
    },

    actions: {
        async delay() {
            return new Promise(resolve => setTimeout(resolve, 800));
        },

        async fetchInvitations() {
            this.invitationsLoading = true;
            this.invitationsError = null;
            try {
                // 1. محاكاة طلب GET /invitations
                await this.delay();
                this.invitations = InvitationList;
            } catch (error) {
                this.invitationsError = 'فشل في جلب الدعوات (Mock Error)';
            } finally {
                this.invitationsLoading = false;
            }
        },

        // ✅ التصحيح: تم تغليف منطق التحديث بـ try/catch/finally
        async acceptInvitation(invitationId) {
            this.invitationsLoading = true;
            this.invitationsError = null;
            try {
                // 1. محاكاة طلب PATCH /invitations/:id/approve
                await this.delay(); 

                // 2. تحديث حالة الدعوة في الـ State
                const index = this.invitations.findIndex(invite => invite.id === invitationId);
                if (index !== -1) {
                    this.invitations[index].status = 'APPROVED';
                } else {
                     throw new Error('لم يتم العثور على الدعوة لقبولها.');
                }
            } catch (error) {
                this.invitationsError = 'فشل في قبول الدعوة (Mock Error)';
                throw error; // إعادة رمي الخطأ للتعامل معه في الواجهة
            } finally {
                this.invitationsLoading = false;
            }
        },

        // ✅ إضافة Action الرفض (rejectInvitation)
        async rejectInvitation(invitationId) {
            this.invitationsLoading = true;
            this.invitationsError = null;
            try {
                // 1. محاكاة طلب PATCH /invitations/:id/reject
                await this.delay(); 
                
                // 2. تحديث حالة الدعوة في الـ State
                const index = this.invitations.findIndex(invite => invite.id === invitationId);
                if (index !== -1) {
                    this.invitations[index].status = 'REJECTED';
                } else {
                    throw new Error('لم يتم العثور على الدعوة لرفضها.');
                }
            } catch (error) {
                this.invitationsError = 'فشل في رفض الدعوة (Mock Error)';
                throw error;
            } finally {
                this.invitationsLoading = false;
            }
        },
    },
});