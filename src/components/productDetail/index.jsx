import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "./carousel.module.css";
import Navbar from "../navbar/Navbar";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineMessage,
} from "react-icons/ai";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetData } from "../../hooks/useFetch";
import RecommendedProductCard from "../recomendedProductSection";
const ProductDetails = () => {
  const Product = useSelector(
    (state) => state.product.selectedProductForDetail
  );
  const { data: products } = useGetData("/products/featured");
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = ""; // Chrome requires this to show the alert message
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <Swiper
              spaceBetween={30}
              rewind={true}
              pagination={{
                clickable: true,
              }}
              navigation={{
                prevEl: ".prev-button",
                nextEl: ".next-button",
              }}
              modules={[Pagination, Navigation]}
              className="rounded-lg swiper overflow-hidden"
            >
              {Product.selectedImages?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="w-96 h-96 mx-auto">
                    <img
                      src={image?.image}
                      className="w-full h-full object-contain"
                      alt={`Product ${index + 1}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex  w-full px-10 absolute mt-5 z-10  gap-4 justify-between">
              <button className="prev-button text-2xl text-[#1f1e1f] bg-gray-100  rounded-full  p-2 ">
                <AiOutlineArrowLeft />
              </button>
              <button className="next-button text-2xl text-[#1f1e1f]  bg-gray-100 rounded-full p-2 ">
                <AiOutlineArrowRight />
              </button>
            </div>
          </div>

          <div className="p-8 mt-10 md:mt-0 text-[#1f1e1f] bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-2">{Product.productName}</h1>
            <div className="text-xl font-semibold mb-4">${Product.price}</div>

            {/* Color options */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Colors:</h2>
              <div className="flex">
                <div
                  className="w-8 h-8 rounded-full bg-gray-400 mr-2"
                  style={{ backgroundColor: Product.colorVariation }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Category:</h2>
              <p>{Product?.categories}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                Seller Information:
              </h2>
              <p>Seller Name: {Product.seller?.userName}</p>
              <p>Email: {Product.seller?.email}</p>
              <p>Address: {Product.seller?.address}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Message to Seller:</h2>
              <textarea
                className="w-full p-2 border bg-gray-200 rounded"
                placeholder="Enter your message here..."
                rows="4"
              ></textarea>
            </div>
            <div className="flex cursor-pointer items-center mb-4">
              <AiOutlineMessage className="text-2xl text-gray-600 mr-2" />
              <p className="text-sm text-gray-600">
                Click here to message the seller
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Description:</h2>
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: Product.description }}
              ></div>
            </div>

            <button className="w-full flex items-center justify-center bg-[#1f1e1f] text-white p-3 rounded">
              Buy Now
              <IoIosArrowDroprightCircle className="text-xl ml-2" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="col-span-2 text-[#1f1e1f]">
            <h2 className="text-2xl font-semibold mb-4">
              Recommended Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.slice(0, 3)?.map((product) => (
                <RecommendedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;