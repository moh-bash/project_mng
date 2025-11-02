import { defineStore } from "pinia";
import { apiurl, getHeader } from "./api";

export const useInvitationsStore = defineStore('invitations', {
    state: () => ({
        invitations: [],
        invitationsLoading: false,
        invitationsError: null,
    }),

    getters: {
        pendingCount: (state) => {
            return state.invitations.filter(invite => invite.status === 'PENDING').length;
        },
        
        pendingInvitations: (state) => {
            return state.invitations.filter(invite => invite.status === 'PENDING');
        }
    },

    actions: {
        async fetchInvitations() {
            this.invitationsLoading = true;
            this.invitationsError = null;
            try {
                const res = await fetch( `${apiurl}/invitations`, {
                    method: "GET",
                    headers: { ...getHeader() }
                });
                let data = await res.json();
                console.log(data);
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch invitations');
                }
                this.invitations = data;
            } catch (error) {
                this.invitationsError = error.message;
                this.invitations = [];
            } finally {
                this.invitationsLoading = false;
            }
        }
    },
});