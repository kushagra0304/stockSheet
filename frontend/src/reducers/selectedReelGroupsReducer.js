import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const selectedReelGroupsSlice = createSlice({
  name: 'selectedReelGroups',
  initialState,
  reducers: {
    addReelGroup(state, action) {
        const { reelGroup } = action.payload;

        return [reelGroup, ...state];
    },
    removeReelGroup(state, action) {
        const { reelGroup } = action.payload;

        const reelGroupSignature = `${reelGroup['gsm']}${reelGroup['bf']}${reelGroup['size']}${reelGroup['shade']}`;

        return state.filter((selectedReelGroup) => {
            const selectedReelGroupSignature = `${selectedReelGroup['gsm']}${selectedReelGroup['bf']}${selectedReelGroup['size']}${selectedReelGroup['shade']}`;

            if(selectedReelGroupSignature === reelGroupSignature) {
                return false;
            }

            return true;
        });
    },
    clearReelGroups(state, action) {
      return [];
    }
  },
});

export const { addReelGroup, removeReelGroup, clearReelGroups  } = selectedReelGroupsSlice.actions;

export default selectedReelGroupsSlice.reducer;