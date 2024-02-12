import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import "../styles/pages/createOrder.css"
import { useCallback, useEffect, useState } from "react";
import { createOrder } from "../services/order";
import ReactSearchBox from "react-search-box";

const RateTable = ({ setRateInOrderReelGroup, index }) => {
    const [rate, setRate] = useState(30.00);

    useEffect(() => {
        setRateInOrderReelGroup(rate, index)
    }, [rate, index, setRateInOrderReelGroup])

    return (
        <table className='pure-table pure-table-bordered rateTable'>
            <thead>
                <tr>
                    <th>Rate</th>
                </tr> 
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input inputMode="numeric" step="0.25" type="number" value={rate} onChange={(event) => setRate(event.target.value)}/>
                        <button onClick={() => setRate(rate => rate - 0.25)}>&lt;</button>
                        <button onClick={() => setRate(rate => rate + 0.25)}>&gt;</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

const QtyTable = ({ stock, setQtyInOrderReelGroup, index }) => {
    const [qty, setQty] = useState(1);

    useEffect(() => {
        setQtyInOrderReelGroup(qty, index)
    }, [qty, index, setQtyInOrderReelGroup])

    return (
        <>
            <table className='pure-table pure-table-bordered qtyTable'>
                <thead>
                    <tr>
                        <th>Qty.</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input inputMode="numeric" step="1" type="number" readOnly value={qty} onChange={(event) => setQty(event.target.value)}/>
                            <button onClick={() => ((qty - 1) < 1) ? {} : setQty(rate => (rate - 1))}>&lt;</button>
                            <button onClick={() => ((qty + 1) > stock) ? {} : setQty(rate => (rate + 1))}>&gt;</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

const initOrderReelGroups = (selectedReelGroup) => {
    return selectedReelGroup.map((orderReelGroup) => {
        return {
            gsm: orderReelGroup[0].gsm,
            size: orderReelGroup[0].size,
            shade: orderReelGroup[0].shade,
            bf: orderReelGroup[0].bf,
            qty: 1,
            rate: 30,
        }
    })
}

const CreateOrder = () => {
    const selectedReelGroups = useSelector(state => state.selectedReelGroups);

    const [orderReelGroups, setOrderReelGroups] = useState(initOrderReelGroups(selectedReelGroups)) 
    const [companies, setCompanies] = useState([
        {key: 'Deoria', value: 'Deoria'},
        {key: 'Devrishi', value: 'Devrishi'},
    ]);
    const [orderCompany, setOrderCompany] = useState("");

    const setRateInOrderReelGroup = useCallback((rate, index) => setOrderReelGroups(state => {
        state[index].rate = rate;
        return structuredClone(state);
    }), [])

    const setQtyInOrderReelGroup = useCallback((qty, index) => setOrderReelGroups(state => {
        state[index].qty = qty;
        return structuredClone(state);
    }), [])

    const handleCreateOrder = async () => {
        if(!companies.find((company) => company === orderCompany)){
            // Implement error handling
            return;
        }

        const createOrderReq = await createOrder({
            customerName: orderCompany,
            orderReelGroups: orderReelGroups
        });

        const createdOrder = createOrderReq.data

        console.log(createdOrder);
    }

    if(selectedReelGroups.length === 0) {
        return (<Navigate to={"/"}></Navigate>)
    }

    return (
        <>
            <div id="createOrder">
                <div id="orderCustomerName">
                    <ReactSearchBox type="text" onSelect={(record) => setOrderCompany(record.item)}  placeholder="Company" data={companies}/>
                </div>
                <div id="orderReelGroups" style={{ overflow: "auto" }}>
                    <table id="selectedReelGroupsTable" className='pure-table pure-table-bordered'>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedReelGroups ? selectedReelGroups.map((reelGroup, index) => {
                                return (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>
                                            <table className='pure-table pure-table-bordered detailsTable'>
                                                <thead>
                                                    <tr>
                                                        <th>Size</th>
                                                        <th>GSM</th>
                                                        <th>BF</th>
                                                        <th>Shade</th>
                                                        <th>Stock</th>
                                                    </tr> 
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{reelGroup[0].size}</td>
                                                        <td>{reelGroup[0].gsm}</td>
                                                        <td>{reelGroup[0].bf}</td>
                                                        <td>{reelGroup[0].shade}</td>
                                                        <td>{reelGroup.length}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <RateTable setRateInOrderReelGroup={setRateInOrderReelGroup} index={index} />
                                            <QtyTable stock={reelGroup.length} setQtyInOrderReelGroup={setQtyInOrderReelGroup} index={index}/>
                                        </td>
                                    </tr>
                                )
                            }) : <></>}
                        </tbody>
                    </table>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <button 
                        id="createOrderConfirmButton" 
                        className="pure-button" 
                        onClick={handleCreateOrder}
                    >confirm</button>
                </div>
            </div>
        </>
    )
}

export default CreateOrder;