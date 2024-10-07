import { create } from "zustand";
const useReviewModal = create((set) => ({
  isOpen: false,
  reviewerData: {},
  onOpen: (data) => set({ isOpen: true, reviewerData: data }),
  onClose: () => set({ isOpen: false }),
}));

export default useReviewModal;
