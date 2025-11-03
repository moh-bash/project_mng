import { defineStore } from "pinia";
import { apiurl, getHeader } from "./api"; 

export const useInvitationsStore = defineStore("invitations", {
    state: () => ({
        myInvitations: [],
        invitationsLoading: false,
        invitationsError: null, 
    }),

    getters: {
        pendingInvitations: (state) => {
            return state.myInvitations.filter(inv => inv.status === 'PENDING');
        },
        pendingCount() {
            return this.pendingInvitations.length;
        }
    },

    actions: {
        async fetchInvitations() {
            this.invitationsLoading = true;
            this.invitationsError = null;
            try {
                const res = await fetch(`${apiurl}/invitations`, {
                    method: "GET",
                    headers: getHeader(),
                });

                if (!res.ok) {
                    throw new Error(`Failed invitations: ${res.statusText}`);
                }

                let data = await res.json();
                this.myInvitations = data;
                
            } catch (error) {
                this.invitationsError = error.message;
                console.error("Error fetching my invitations:", error);
            } finally {
                this.invitationsLoading = false;
            }
        },

        async sendInvitation(invitationData) {
            this.invitationsLoading = true;
            this.invitationsError = null;
            try {
                const res = await fetch(`${apiurl}/invitations`, {
                    method: 'POST',
                    headers: {
                        ...getHeader(),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(invitationData),
                });

                if (!res.ok) {
                    throw new Error(`Failed to send invitation: ${res.statusText}`);
                }

                let newInvitation = await res.json();
                
                console.log("Invitation sent successfully:", newInvitation);
                
                return newInvitation;

            } catch (error) {
                this.invitationsError = error.message;
                console.error("Error sending invitation:", error);
                throw error; 
            } finally {
                this.invitationsLoading = false;
            }
        },

        async approveInvitation(invitationId) {
            this.invitationsLoading = true;
            this.invitationsError = null;
            try {
                const res = await fetch(`${apiurl}/invitations/${invitationId}/approve`, {
                    method: 'PATCH',
                    headers: getHeader(),
                });

                if (!res.ok) {
                    throw new Error(`Failed to approve invitation: ${res.statusText}`);
                }

                let updatedInvitation = await res.json();
                
                this.myInvitations = this.myInvitations.filter(inv => inv.id !== invitationId);

                this.invitationsError = null; 
                return updatedInvitation;

            } catch (error) {
                this.invitationsError = error.message;
                console.error("Error approving invitation:", error);
                throw error;
            } finally {
                this.invitationsLoading = false;
            }
        },

        async rejectInvitation(invitationId) {
            this.invitationsLoading = true;
            this.invitationsError = null;
            try {
                const response = await fetch(`${apiurl}/invitations/${invitationId}/reject`, {
                    method: 'PATCH',
                    headers: getHeader(),
                });

                if (!response.ok) {
                    throw new Error(`Failed to reject invitation: ${response.statusText}`);
                }

                let updatedInvitation = await response.json();
                
                this.myInvitations = this.myInvitations.filter(inv => inv.id !== invitationId);

                this.invitationsError = null; 
                return updatedInvitation;

            } catch (error) {
                this.invitationsError = error.message;
                console.error("Error rejecting invitation:", error);
                throw error;
            } finally {
                this.invitationsLoading = false;
            }
        },
    },
});