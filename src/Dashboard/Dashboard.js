
import React, { useEffect, useState } from "react";

import React ,{useEffect,useState} from "react";

import { connect } from "react-redux";
import Cookies from "js-cookie";
import "./Dashboard.css"
import vector from "../Asset/noto_hourglass-with-flowing-sand.png"
import { RiArrowDropDownLine } from "react-icons/ri";

import { getAllPermitsCreatedByAllUsers } from "../Auth/auth";


import { getTotalllPermits } from "../Auth/auth";

const workArr = [
    "General Permit To Work",
    "A1 - Hot Works",
    "A2 - Confined Space",
    "A3 - Lifting Space",
    "A4 - Work at Height"
]


const Dashboard = ({ state, index, user }) => {


const Dashboard = (state) => {


    const [permits, setPermits] = useState([]);
    const User = JSON.parse(localStorage.getItem('user'));
    const userId = User.uid

    useEffect(() => {
        const fetchPermits = async () => {
          try {
            const permitsData = await getTotalllPermits();
            setPermits(permitsData);
            console.log('Permits:', permitsData);
          } catch (error) {
            console.error('Error fetching permits:', error);
          }
        };
    
        fetchPermits();
      }, [userId]); 
    const token = Cookies.get("accessToken")
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser ? storedUser.uid : null;
    const [userPermits, setUserPermits] = useState([]);  
    const [workArrCounts, setWorkArrCounts] = useState(Array(workArr.length).fill(0));

    useEffect(() => {
        const fetchPermits = async () => {
            try {
                if (userId) {
                    const permitsData = await getAllPermitsCreatedByAllUsers(userId);
                    setUserPermits(permitsData);

                    // Update counts based on permits
                    const newCounts = Array(workArr.length).fill(0);

                    permitsData.forEach((permit) => {
                        workArr.forEach((work, index) => {
                            if (permit.permitNumber.includes(`${index + 1}`)) {
                                newCounts[index]++;
                            }
                        });
                    });

                    setWorkArrCounts(newCounts);
                }
            } catch (error) {
                console.error("Error fetching permits:", error.message);
            }
        };

        fetchPermits();
    }, [userId]);


    return (
        <div className="dashboard-main-container">
            <h1 className="welcome-heading">Welcome To JCET,</h1>
            <ul className="dashboard-list-container">
                <li className="dashboard-list-item-container">
                    <div className="image-active-container">
                        <div className="vector-img-container">
                            <img src={vector} alt="vector" className="vector-img" />
                        </div>
                        <div>
                            <p className="total-desc">Total Active Permits</p>
                            <p className="general-desc">General Permit To Work</p>

                            <h1 style={{ textAlign: "center", marginTop: "5px", fontSize: "55px", color: "#022088", marginBottom: "0px" }}>{userPermits.length}</h1>

                            <h1 style={{ textAlign: "center", marginTop: "5px", fontSize: "55px", color: "#022088", marginBottom: "0px" }}>{permits.length}</h1>

                        </div>
                    </div>
                    <div className="view-btn-container">
                        <button type="button" className="view-btn">View</button>
                    </div>
                </li>
                <li className="dashboard-list-item-container">
                    <div className="image-active-container">
                        <div className="vector-img-container2">
                            <img src={vector} alt="vector" className="vector-img" />
                        </div>
                        <div>
                            <p className="total-desc">Total Active Permits</p>
                            <p className="general-desc">Hot works</p>
                            <h1 style={{ textAlign: "center", marginTop: "5px", fontSize: "55px", color: "#022088", marginBottom: "0px" }}>5</h1>
                        </div>
                    </div>
                    <div className="view-btn-container">
                        <button type="button" className="view-btn">View</button>
                    </div>
                </li>
                <li className="dashboard-list-item-container">
                    <div className="image-active-container">
                        <div className="vector-img-container3">
                            <img src={vector} alt="vector" className="vector-img" />
                        </div>
                        <div>
                            <p className="total-desc">Total Active Permits</p>
                            <p className="general-desc">Lifting Space</p>
                            <h1 style={{ textAlign: "center", marginTop: "5px", fontSize: "55px", color: "#022088", marginBottom: "0px" }}>7</h1>
                        </div>
                    </div>
                    <div className="view-btn-container">
                        <button type="button" className="view-btn">View</button>
                    </div>
                </li>
                <li className="dashboard-list-item-container">
                    <div className="image-active-container">
                        <div className="vector-img-container4">
                            <img src={vector} alt="vector" className="vector-img" />
                        </div>
                        <div>
                            <p className="total-desc">Total Active Permits</p>
                            <p className="general-desc">Work at height</p>
                            <h1 style={{ textAlign: "center", marginTop: "5px", fontSize: "55px", color: "#022088", marginBottom: "0px" }}>3</h1>
                        </div>
                    </div>
                    <div className="view-btn-container">
                        <button type="button" className="view-btn">View</button>
                    </div>
                </li>
            </ul>
            <ul className="work-list-container">
                {workArr.map((eachWork, index) => <li key={index} className="work-list-item-container">
                    <p style={{ fontSize: "20px", color: "#000000", margin: "0px" }}>{eachWork}{` (${workArrCounts[index]})`}</p>
                    <button type="button" className="drop-btn"><RiArrowDropDownLine /></button>
                </li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
})
export default connect(mapStateToProps)(Dashboard);