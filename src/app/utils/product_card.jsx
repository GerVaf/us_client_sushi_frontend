import React, { useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthStore";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Modal from "./modal";

const ProductCard = ({ product }) => {
  const addProduct = useProductStore((state) => state.addProduct);
  const removeProduct = useProductStore((state) => state.removeProduct);
  const cartProducts = useProductStore((state) => state.products);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check if product is in the cart
  const isProductInCart = cartProducts.some(
    (cartProduct) => cartProduct._id === product._id
  );

  // Handle button click to add/remove product or show login modal
  const handleButtonClick = () => {
    if (isAuthenticated) {
      if (isProductInCart) {
        removeProduct(product._id);
      } else {
        addProduct(product);
      }
    } else {
      setShowLoginModal(true); // Show login modal if not authenticated
    }
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    router.push("/auth/login");
  };

  return (
    <div
      key={product._id}
      className="border gap-2 transition duration-150 text-secondary shadow-lg w-full py-5 px-3 md:px-10 rounded-2xl h-[200px] bg-gradient-to-tr to-indigo-100 from-violet-100 flex justify-around items-center"
    >
      {/* card right side */}
      <div className="w-1/2 flex flex-col justify-between gap-3 items-start">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h1 className="text-2xl">{product.name}</h1>
            <span className="text-sm text-gray-500">{product.description}</span>
          </div>
          <span className="text-2xl">$ {product.price}</span>
        </div>
        <button
          onClick={handleButtonClick}
          className={`${
            isProductInCart
              ? "bg-red-600"
              : "bg-gradient-to-r from-violet-600 to-indigo-600"
          } shadow-lg rounded-xl text-white gap-3 p-2 flex px-5 items-center`}
        >
          {isProductInCart ? (
            <>
              <IconMinus size={15} /> Cancel
            </>
          ) : (
            <>
              <IconPlus size={15} /> Order
            </>
          )}
        </button>
      </div>
      <div className="rounded-2xl w-1/2 h-full overflow-hidden shadow-xl">
        <img
          className="object-cover w-full h-full"
          src="https://plus.unsplash.com/premium_photo-1712949154611-6fd79879f884?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={product.name}
        />
      </div>

      {/* Reusable Modal Component */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <p className="text-lg">You need to log in to perform this action.</p>
        <div>
          <button onClick={handleLoginRedirect} className="gradient-btn">
            Go to Login
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductCard;
