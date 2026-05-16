import RegisterForm from "./RegisterForm/RegisterForm";
import Image from "next/image";
import { FaStar, FaShieldAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex  justify-center py-10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-8">
        {/* container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <h1 className="text-[36px] leading-[40px] font-bold text-gray-800">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>

            <p className=" text-xl font-medium">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>

            {/* features */}
            <div className="space-y-5 mt-6">
              {/* item */}
              <div className="flex items-start gap-4">
                <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center">
                  <FaStar className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Premium Quality
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center">
                  <FaTruckFast className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Fast Delivery</h3>
                  <p className="text-gray-500 text-sm">
                    Same-day delivery available in most areas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 text-green-600  rounded-full w-12 h-12 flex items-center justify-center">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Secure Shopping
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Your data and payments are completely secure
                  </p>
                </div>
              </div>
            </div>

            {/* review */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className=" rounded-full overflow-hidden">
                  <Image
                    src="/assets/review.png"
                    alt="Sarah Johnson"
                    width={45}
                    height={45}
                    className="rounded-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <div className="flex gap-1 text-yellow-400 text-sm">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <FaStar key={i} />
                      ))}
                  </div>
                </div>
              </div>

              <p className=" italic">
                "FreshCart has transformed my shopping experience. The quality
                of the products is outstanding, and the delivery is always on
                time. Highly recommend!"
              </p>
            </div>
          </div>

          {/*RIGHT SIDE (FORM) */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-2">
              Create Your Account
            </h2>

            <p className="text-gray-500 text-center mb-6">
              Start your fresh journey with us today
            </p>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
