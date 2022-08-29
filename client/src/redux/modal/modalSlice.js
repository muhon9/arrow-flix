import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalOpen: false,
  modalData: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, { payload }) {
      state.modalOpen = true;
      state.modalData = payload;
    },
    hideModal(state) {
      state.modalOpen = false;
      state.modalData = {};
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
