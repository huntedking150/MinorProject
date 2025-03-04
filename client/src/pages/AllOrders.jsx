import { useSelector } from 'react-redux';
import NoData from '../components/NoData';

const MyOrders = () => {
  const allOrders = useSelector((state) => state.allOrders.allOrders);

  // console.log("order Items",orders)
  console.log('from all orders page', allOrders);
  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold">
        <h1>All Orders</h1>
      </div>
      {!allOrders[0] && <NoData />}
      {allOrders.map((order, index) => {
        // Ensure product_details exists before accessing its properties
        const product = order?.product_details || {};
        const imageUrl = product?.image?.[0] || 'fallback-image-url.jpg'; // Use a default image

        return (
          <div
            key={order?._id + index + 'order'}
            className="order rounded p-4 text-sm"
          >
            <p>Order No : {order?.orderId || 'N/A'}</p>
            <div className="flex gap-3">
              <img src={imageUrl} className="w-14 h-14" alt="Product" />
              <p className="font-medium">
                {product?.name || 'Unknown Product'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
