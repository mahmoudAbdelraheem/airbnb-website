import { create } from "zustand";

const useRentModal = create((set, get) => ({
  isOpen: false,
  listingToEdit: null,
  onOpen: (listingData = null) => {
    // Ensure listingData is properly structured before setting
    if (listingData) {
      console.log("Opening modal with listing data:", listingData);
    }
    set({
      isOpen: true,
      listingToEdit: listingData,
    });
  },
  onClose: () =>
    set({
      isOpen: false,
      listingToEdit: null,
    }),
  getListingToEdit: () => get().listingToEdit,
}));

export default useRentModal;
