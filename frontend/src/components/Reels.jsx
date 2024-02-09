import { useDispatch, useSelector } from "react-redux";
import { addReelGroup, removeReelGroup } from "../reducers/selectedReelGroupsReducer";

const groupReels = (reels, properties) => {
    const grouped = {};

    reels.forEach(item => {
        const key = properties.map(property => item[property]).join('-');

        if (!grouped[key]) {
            grouped[key] = [];
        }

        grouped[key].push(item);
    });

    return Object.values(grouped);
}

const Reels = ({ reels }) => {
    const dispatch = useDispatch();
    const selectedReelGroups = useSelector(state => state.selectedReelGroups);

    const selectReelGroup = (reelGroup, event) => {
        if(event.target.parentElement.classList.contains('selectedReelGroupTH')) {            
            event.target.parentElement.classList.remove('selectedReelGroupTH');

            dispatch(removeReelGroup({ reelGroup }));

            // const reelGroupSignature = `${reelGroup[0]['gsm']}${reelGroup[0]['bf']}${reelGroup[0]['size']}${reelGroup[0]['shade']}`;

            // setSelectedReelGroups(selectedReelGroups => {
            //     return selectedReelGroups.filter((selectedReelGroup) => {
            //         const selectedReelGroupSignature = `${selectedReelGroup[0]['gsm']}${selectedReelGroup[0]['bf']}${selectedReelGroup[0]['size']}${selectedReelGroup[0]['shade']}`;

            //         if(selectedReelGroupSignature === reelGroupSignature) {
            //             return false;
            //         }

            //         return true;
            //     });
            // });
        } else {
            event.target.parentElement.classList.add('selectedReelGroupTH');
            dispatch(addReelGroup({ reelGroup }));
            // setSelectedReelGroups(selectedReelGroups => [reelGroup, ...selectedReelGroups]);
        }
    }

    const setCSSIfReelGroupIsSelected = (toSetReelGroup) => {
        let bool = false;
        const toSetReelGroupSignature = `${toSetReelGroup[0]['gsm']}${toSetReelGroup[0]['bf']}${toSetReelGroup[0]['size']}${toSetReelGroup[0]['shade']}`;

        selectedReelGroups.forEach((selectedReelGroup) => {
            const selectedReelGroupSignature = `${selectedReelGroup[0]['gsm']}${selectedReelGroup[0]['bf']}${selectedReelGroup[0]['size']}${selectedReelGroup[0]['shade']}`;

            if(toSetReelGroupSignature === selectedReelGroupSignature){
                bool = true;
            }
        });

        if(bool){
            return 'selectedReelGroupTH'
        }

        return '';
    }

    return (
        <table className="pure-table pure-table-bordered">
            <thead>
                <tr>
                    <th>S.no</th>
                    <th>Size</th>
                    <th>GSM</th>
                    <th>BF</th>
                    <th>Shade</th>
                    <th>Qty.</th>
                </tr>
            </thead>
            <tbody>
                {reels ? groupReels(reels, ['gsm', 'size', 'shade', 'bf']).map((reelGroup, index) => {
                    return (
                        <tr className={`${setCSSIfReelGroupIsSelected(reelGroup)}`} onClick={(event) => selectReelGroup(reelGroup, event)}>
                            <td>{index+1}</td>
                            <td>{reelGroup[0].size}</td>
                            <td>{reelGroup[0].gsm}</td>
                            <td>{reelGroup[0].bf}</td>
                            <td>{reelGroup[0].shade}</td>
                            <td>{reelGroup.length}</td>
                        </tr>
                    )
                }) : <></>}
            </tbody>
        </table>
    )
}

export default Reels;