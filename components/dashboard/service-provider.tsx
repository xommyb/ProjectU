import { Dots } from "@/service-provider";
import { usePortal } from "@ibnlanre/portal";
import axios from "axios";
import { ArrowRight2 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React, {useState, useEffect } from "react";



  // A preview of my list of Service providers on the dashboard

export const ServiceProvider = () => {
  const [sp, setSp] = useState<{name:string,url:string}[]>([])
  const [totalSp, setTotalSp] = usePortal('total-sp',0 )

  // Created this function as to not pass in async function to useEffect directly
  const getServiceProviders = async () => {
    // Got access tokon from my local storage at this point 
    // The tokon comes as json, had to make it a javascript object, thus i used json.parse to wrap the token
    const accessToken = JSON.parse(
      localStorage.getItem("login-user") as string
    )?.access;
    try {
      // Getting my data from backend with axios at this point
      const { data } = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}service_providers/all/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Setting my state to the data i received
    //  console.log(data)
      setSp(data.results);
      setTotalSp(data.count)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServiceProviders();
  }, []);

  return (
    <section className="bg-white py-8 px-4 flex flex-col gap-4 overflow-auto rounded-lg card-shadow">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className=" text-uacs-gray-900 text-base font-semibold">
            Service Providers
          </h2>
          <div className="flex gap-2">
            <Link href="/service-provider">
              <h3 className="text-xs font-medium text-uacs-ared-7">View all</h3>
            </Link>
            <ArrowRight2 size={14} color="#BF2018" />
          </div>
        </div>

        <p className="text-xs font-medium text-uacs-gray-500 ">
          List of recent service providers on the platform
        </p>
      </div>

      <div className="scroll-bar-hidden overflow-auto flex flex-col gap-4">
        {sp.map((item) => (
          <div
            key={item.name}
            className="border-b border-b-[#DADADD] px-4 py-3"
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-between ">
                <h2 className="text-sm text-uacs-eneutral-11 font-semibold">
                  {item.name}
                </h2>
                <span className=" rotate-90">
                <Dots  />
                </span>
              
              </div>
              <p className="text-xs font-normal text-uacs-eneutral-8 ">
               {item.url}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
