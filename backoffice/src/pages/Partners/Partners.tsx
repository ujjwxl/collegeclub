import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import axios, { AxiosError, AxiosResponse } from "axios";

const Partners = () => {
  const [partners, setPartners] = useState<any[]>([]);

  const getPartners = async (partnerType: string) => {
    await axios
      .get(`http://localhost:5000/admin/getpartners/${partnerType}`)
      .then((response: AxiosResponse) => {
        setPartners(response.data);
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        alert("Could not get partners");
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-5/6">
          <div className="flex w-full justify-around">
            <div
              className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl"
              onClick={() => getPartners("College")}
            >
              <p className="text-xl text-white">College</p>
            </div>

            <div
              className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl"
              onClick={() => getPartners("Company")}
            >
              <p className="text-xl text-white">Company</p>
            </div>

            <div
              className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl"
              onClick={() => getPartners("CC-Ambassador")}
            >
              <p className="text-xl text-white">CC-Ambassador</p>
            </div>
          </div>

          {partners && partners.length > 0 ? (
            <div className="m-4">
              <table className="min-w-full divide-y divide-gray-200 college-table">
                <thead className="bg-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      S.No.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Payment Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100 divide-y divide-gray-200">
                  {partners.map((partner, index) => (
                    <tr key={partner.userId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {partner.organizationName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {partner.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {partner.contactNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {partner.paymentStatus ? "Completed" : "Not Completed"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-gray-500 px-2 py-1 text-sm rounded-lg text-white">
                          View more
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No partners available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Partners;
