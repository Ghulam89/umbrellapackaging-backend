import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdCategory, MdSupport } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { RiShoppingCartFill } from "react-icons/ri";
import BarChart from "../../chart/BarChart";
import LineChart from "../../chart/LineChart";
import { LuGitPullRequest } from "react-icons/lu";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { BaseUrl } from "../../utils/BaseUrl";
const Dashboard = () => {
  const [brand, setBrand] = useState(0);
  const [category, setCategory] = useState(0);
  const [product, setProduct] = useState(0);
  const [instant, setInstant] = useState(0);
  const [request, setRequest] = useState(0);
  const [checkout, setCheckout] = useState(0);
 
  useEffect(() => {
    axios
      .get(`${BaseUrl}/brands/getAll`)
      .then((res) => {
        console.log(res);
        setBrand(res.data.totalBrands);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BaseUrl}/category/getAll`)
      .then((res) => {
        console.log(res);
        setCategory(res.data.totalItems);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BaseUrl}/products/getAll`)
      .then((res) => {
        console.log(res);
        setProduct(res.data.totalProducts);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BaseUrl}/instantQuote/getAll`)
      .then((res) => {
        console.log(res);
        setInstant(res.data.pagination?.total);
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(`${BaseUrl}/requestQuote/getAll`)
      .then((res) => {
        console.log(res);
        setRequest(res.data.pagination?.total);
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(`${BaseUrl}/checkout/getAll`)
      .then((res) => {
        console.log(res);
        setCheckout(res.data.pagination?.total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(15);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchSizes();
  }, [currentPage, search]);

  const fetchSizes = () => {
    axios
      .get(
        `${BaseUrl}/user/get?page=${currentPage}&limit=${limit}&search=${search}`
      )
      .then((res) => {
        setUsers(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };


 
  return (
    <>
      <h2 className="main_title text-2xl">Dashboard</h2>

<section>
  <div className=" py-4  w-full grid  grid-cols-1  xl:grid-cols-3 md:grid-cols-2 gap-5">

    <div className=" w-full">
      <div className=" bg-white shadow-md  flex justify-between p-5 rounded-lg">
        <div>
          <h2 className=" text-secondary text-xl font-bold">Categories</h2>
          <div className=" pt-2 flex items-center gap-3">
            <h2 className=" text-3xl text-secondary">{brand}</h2>
          </div>
        </div>
        <div>
          <MdCategory     size={80} className="  text-[#4440E6]" />
        </div>
      </div>
    </div>
    <div className=" w-full">
      <div className=" bg-white shadow-md text-black flex justify-between p-5 rounded-lg">
        <div>
          <h2 className="  text-secondary text-xl font-bold">Sub Categories</h2>
          <div className=" pt-2 flex items-center gap-3">
            <h2 className="text-3xl text-secondary">{category}</h2>
          </div>
        </div>
        <div>
          <TbCategoryFilled size={80} className=" text-[#4440E6]" />
        </div>
      </div>
    </div>
    <div className=" w-full">
      <div className=" bg-white shadow-md text-black flex justify-between p-5 rounded-lg">
        <div>
          <h2 className="  text-secondary text-xl font-bold">Products</h2>
          <div className=" pt-2 flex items-center gap-3">
            <h2 className=" text-3xl text-secondary">{product}</h2>
          </div>
        </div>
        <div>
          <RiShoppingCartFill size={80} className=" text-[#4440E6]" />
        </div>
      </div>
    </div>
    <div className=" w-full">
      <div className=" bg-white shadow-md text-black flex justify-between p-5 rounded-lg">
        <div>
          <h2 className="  text-secondary text-xl font-bold">Orders</h2>
          <div className=" pt-2 flex items-center gap-3">
            <h2 className="text-3xl  text-secondary">{checkout}</h2>
          </div>
        </div>
        <div>
          <RiShoppingCartFill size={80} className=" text-[#4440E6]" />
        </div>
      </div>
    </div>
    <div className=" w-full">
      <div className=" bg-white shadow-md text-black flex justify-between p-5 rounded-lg">
        <div>
          <h2 className="  text-secondary text-xl font-bold">Total Instant Quote</h2>
          <div className=" pt-2 flex items-center gap-3">
            <h2 className="text-3xl  text-secondary">{instant}</h2>
          </div>
        </div>
        <div>
          <LuGitPullRequest          size={80} className=" text-[#4440E6]" />
        </div>
      </div>
    </div>
    <div className=" w-full">
      <div className=" bg-white shadow-md text-black flex justify-between p-5 rounded-lg">
        <div>
          <h2 className="  text-secondary text-xl font-bold">Total Request Quote</h2>
          <div className=" pt-2 flex items-center gap-3">
            <h2 className="text-3xl  text-secondary">{request}</h2>
          </div>
        </div>
        <div>
          <VscGitPullRequestGoToChanges size={80} className=" text-[#4440E6]" />
        </div>
      </div>
    </div>
  </div>


</section>

      <section className=" grid md:grid-cols-2 mt-2 grid-cols-1 gap-5">
        <div className="">
          <BarChart/>
        </div>
        <div className="">
          <LineChart/>
        </div>
      </section>

    </>
  );
};

export default Dashboard;
