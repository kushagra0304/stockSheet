import '../styles/pages/order.css'

const OrderDisplay = ({ order }) => {
    const createReelDS = () => {
        let reels = [];
        let qty = 0;

        order.orderReelGroups.forEach((orderReelGroup) => {
            for(let i = 0; i < orderReelGroup.qty; i++) {
                reels.push({
                    found: "No",
                    weight: "",
                    size: orderReelGroup.size,
                    gsm: orderReelGroup.gsm,
                    bf: orderReelGroup.bf,
                    shade: orderReelGroup.shade
                });
            };

            for(let i = qty; i < (qty+orderReelGroup.reels.length); i++) {
                reels[i].found = "Yes";
                reels[i].weight = orderReelGroup.reels[i-qty].weight;
            }

            qty += orderReelGroup.qty;
        });

        return reels;
    }

    return (
        <div className='order'>
            <details open>
                <summary><h2>{order.customerName}, {order.orderReelGroups.reduce((total, orderReelGroup) => total+orderReelGroup.qty, 0)}</h2></summary>
                <table className="pure-table pure-table-bordered">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Found</th>
                        <th>Weight</th>
                        <th>Size</th>
                        <th>GSM</th>
                        <th>BF</th>
                        <th>Shade</th>
                    </tr>
                </thead>
                <tbody>
                    {createReelDS().map((reel, index) => {
                        return (
                            <tr>
                                <td>{index+1}</td>
                                <td>{reel.found}</td>
                                <td>{reel.weight}</td>
                                <td>{reel.size}</td>
                                <td>{reel.gsm}</td>
                                <td>{reel.bf}</td>
                                <td>{reel.shade}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </details>
        </div>
    )

};

export default OrderDisplay;