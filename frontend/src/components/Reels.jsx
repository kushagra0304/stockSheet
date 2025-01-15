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

    return grouped;
}

const Reels = ({ reelGroups }) => {
    const dispatch = useDispatch();
    const selectedReelGroups = useSelector(state => state.selectedReelGroups);

    const selectReelGroup = (reelGroup, event) => {
        if(event.target.parentElement.classList.contains('selectedReelGroupTH')) {            
            event.target.parentElement.classList.remove('selectedReelGroupTH');

            dispatch(removeReelGroup({ reelGroup }));
        } else {
            event.target.parentElement.classList.add('selectedReelGroupTH');
            dispatch(addReelGroup({ reelGroup }));
        }
    }

    const setCSSIfReelGroupIsSelected = (toSetReelGroup) => {
        let bool = false;
        const toSetReelGroupSignature = `${toSetReelGroup['gsm']}${toSetReelGroup['bf']}${toSetReelGroup['size']}${toSetReelGroup['shade']}`;

        selectedReelGroups.forEach((selectedReelGroup) => {
            const selectedReelGroupSignature = `${selectedReelGroup['gsm']}${selectedReelGroup['bf']}${selectedReelGroup['size']}${selectedReelGroup['shade']}`;

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
                {reelGroups ? reelGroups.map((reelGroup, index) => {
                    return (
                        <tr className={`${setCSSIfReelGroupIsSelected(reelGroup)}`} onClick={(event) => selectReelGroup(reelGroup, event)}>
                            <td>{index+1}</td>
                            <td>{reelGroup.size}</td>
                            <td>{reelGroup.gsm}</td>
                            <td>{reelGroup.bf}</td>
                            <td>{reelGroup.shade}</td>
                            <td>{reelGroup.qty}</td>
                        </tr>
                    )
                }) : <></>}
            </tbody>
        </table>
    )
}

export default Reels;