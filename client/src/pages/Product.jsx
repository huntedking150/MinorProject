// import React, { useEffect, useState } from 'react';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import Axios from '../utils/Axios';

// const Product = () => {
//   const [productData, setProductData] = useState([]);
//   const [page, setPage] = useState(1);

//   const fetchProductData = async () => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.getProduct,
//         data: {
//           page: page,
//         },
//       });

//       const { data: responseData } = response;

//       // console.log("product page ",responseData)
//       if (responseData.success) {
//         setProductData(responseData.data);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   // console.log("product page")
//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   return <div>Product</div>;
// };

// export default Product;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import Axios from '../utils/Axios';
// import {
//   setRecommendations,
//   setLoading,
//   setError,
// } from '../redux/recommendationSlice';

// const Product = () => {
//   const [productData, setProductData] = useState(null);
//   const [page, setPage] = useState(1);
//   const dispatch = useDispatch();
//   const {
//     products: recommendations,
//     loading,
//     error,
//   } = useSelector((state) => state.recommendations);

//   // Fetch the main product details
//   const fetchProductData = async () => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.getProduct,
//         data: {
//           page: page,
//         },
//       });

//       if (response.data.success) {
//         setProductData(response.data.data);
//         fetchRelatedProducts(response.data.data._id); // Send the product ID for recommendations
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   // Fetch related products based on the product ID
//   const fetchRelatedProducts = async (productId) => {
//     dispatch(setLoading(true));
//     try {
//       const response = await Axios({
//         ...SummaryApi.getRecommendedProducts,
//         data: {
//           productId,
//         },
//       });

//       if (response.data.success) {
//         dispatch(setRecommendations(response.data.data));
//       }
//     } catch (error) {
//       dispatch(setError(error.message));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   return (
//     <div>
//       {/* Display the main product */}
//       {productData && (
//         <div className="product-details">
//           <h2>{productData.name}</h2>
//           <p>{productData.description}</p>
//         </div>
//       )}

//       {/* Display related products */}
//       <h3>Related Products</h3>
//       {loading && <p>Loading related products...</p>}
//       {error && <p>Error: {error}</p>}
//       <div className="related-products">
//         {recommendations.map((product) => (
//           <div key={product._id} className="related-product-card">
//             <h4>{product.name}</h4>
//             <p>{product.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Product;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import {
  setRecommendations,
  setLoading,
  setError,
} from '../redux/recommendationSlice';

const Product = () => {
  const { productId } = useParams(); // ✅ Get productId from URL
  const [productData, setProductData] = useState(null);
  const dispatch = useDispatch();

  const {
    products: recommendations,
    loading,
    error,
  } = useSelector((state) => state.recommendations);

  console.log('🔍 Debug: productId from URL:', productId); // ✅ Check if productId is received

  // ✅ Fetch single product details
  const fetchProductData = async () => {
    if (!productId) return; // Ensure productId exists

    try {
      console.log('📡 Fetching product details for:', productId);
      const response = await Axios.get(`${SummaryApi.getProduct}/${productId}`);

      console.log('✅ Product API Response:', response.data);

      if (response.data?.success && response.data?.data) {
        setProductData(response.data.data);
      } else {
        throw new Error('Invalid product data received');
      }
    } catch (error) {
      console.error('❌ Error fetching product:', error);
      AxiosToastError(error);
    }
  };

  // ✅ Fetch related products
  const fetchRelatedProducts = async () => {
    if (!productId) return;

    dispatch(setLoading(true));

    try {
      console.log('📡 Fetching recommendations for:', productId);
      const response = await Axios.get(`/api/recommend/${productId}`);

      console.log('✅ Related Products API Response:', response.data);

      if (response.data?.success && Array.isArray(response.data?.data)) {
        dispatch(setRecommendations(response.data.data));
      } else {
        throw new Error('Invalid related products data received');
      }
    } catch (error) {
      console.error('❌ Error fetching recommendations:', error);
      dispatch(setError(error.message || 'Failed to fetch recommendations'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductData();
      fetchRelatedProducts();
    }
  }, [productId]);

  console.log('🛠 Debug: Redux recommendations state:', recommendations);

  return (
    <div>
      {/* Display the main product */}
      {productData ? (
        <div className="product-details">
          <h2>{productData.name}</h2>
          <p>{productData.description}</p>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}

      {/* Display related products */}
      <h3>Related Products</h3>
      {loading && <p>Loading related products...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div className="related-products">
        {recommendations?.length > 0
          ? recommendations.map((product) => (
              <div key={product._id} className="related-product-card">
                <h4>{product.name}</h4>
                <p>{product.description}</p>
              </div>
            ))
          : !loading && <p>No related products found.</p>}
      </div>
    </div>
  );
};

export default Product;
