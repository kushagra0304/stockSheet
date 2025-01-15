import { useDispatch, useSelector } from "react-redux";
import { removeReelGroup } from "../reducers/selectedReelGroupsReducer";

const SelectedReelGroups = () => {
    const selectedReelGroups = useSelector(state => state.selectedReelGroups);
    const dispatch = useDispatch();

    return (
        <>
            <table id="selectedReelGroupsTable" className='pure-table pure-table-bordered'>
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
                    {selectedReelGroups ? selectedReelGroups.map((reelGroup, index) => {
                        return (
                            <tr className='selectedReelGroupTH' onClick={() => dispatch(removeReelGroup({ reelGroup }))}>
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
        </>
    )
}

export default SelectedReelGroups;