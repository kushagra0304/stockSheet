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

        const reelGroupSignature = `${reelGroup[0]['gsm']}${reelGroup[0]['bf']}${reelGroup[0]['size']}${reelGroup[0]['shade']}`;

        return state.filter((selectedReelGroup) => {
            const selectedReelGroupSignature = `${selectedReelGroup[0]['gsm']}${selectedReelGroup[0]['bf']}${selectedReelGroup[0]['size']}${selectedReelGroup[0]['shade']}`;

            if(selectedReelGroupSignature === reelGroupSignature) {
                return false;
            }

            return true;
        });
    }
  },
});

export const { addReelGroup, removeReelGroup  } = selectedReelGroupsSlice.actions;

export default selectedReelGroupsSlice.reducer;