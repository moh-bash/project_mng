<template>
  <v-card class="mb-4" elevation="2">
    <v-card-title class="d-flex justify-space-between">
      <div>
        <strong>{{ invitation.project.name }}</strong>
        <div class="text-caption text-medium-emphasis">
         {{ invitation.sender.name }}
        </div>
      </div>
      <v-chip color="orange" label>{{ invitation.status }}</v-chip>
    </v-card-title>

    <v-card-actions>
      <v-btn 
        color="success" 
        variant="flat" 
        @click="handleApprove(invitation.id)" 
        :loading="loadingId === invitation.id && loadingAction === 'approve'"
      >
        Accept
      </v-btn>
      <v-btn 
        color="error" 
        variant="flat" 
        @click="handleReject(invitation.id)"
        :loading="loadingId === invitation.id && loadingAction === 'reject'"
      >
        Reject
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useInvitationsStore } from '@/stores/invitations';

export default {
  name: 'CardInvitation',

  props: {
    invitation: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loadingId: null,
      loadingAction: null,
      invitationsStore: useInvitationsStore(),
    };
  },

  methods: {
    async handleApprove(id) {
      try {
        this.loadingId = id;
        this.loadingAction = 'approve';
        await this.invitationsStore.approveInvitation(id);
      } catch (err) {
        console.error('Error approving invitation:', err);
      } finally {
        this.loadingId = null;
        this.loadingAction = null;
      }
    },

    async handleReject(id) {
      try {
        this.loadingId = id;
        this.loadingAction = 'reject';
        await this.invitationsStore.rejectInvitation(id);
      } catch (err) {
        console.error('Error rejecting invitation:', err);
      } finally {
        this.loadingId = null;
        this.loadingAction = null;
      }
    },
  },
};
</script>

<style scoped>
.text-caption {
  font-size: 0.85rem;
}
</style>
