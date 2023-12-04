import React ,{useEffect,useState} from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import "./Dashboard.css"
import vector from "../Asset/noto_hourglass-with-flowing-sand.png"
import { RiArrowDropDownLine } from "react-icons/ri";
import { getTotalllPermits } from "../Auth/auth";
const workArr = [
    "General Permit To Work(3)", "A1 - Hot Works(5)", "A2 - Confied Space(7)", "A3 - Lifting Space(0)", "A4 - Work at Height(3)", "Admin login successful"
]



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
    return (
        <div className="dashboard-main-container">
            <h1 className="welcome-heading">Welcome To ABCD,</h1>
            <ul className="dashboard-list-container">
                <li className="dashboard-list-item-container">
                    <div className="image-active-container">
                        <div className="vector-img-container">
                            <img src={vector} alt="vector" className="vector-img" />
                        </div>
                        <div>
                            <p className="total-desc">Total Active Permits</p>
                            <p className="general-desc">General Permit To Work</p>
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
                {workArr.map((eachWork) => <li className="work-list-item-container">
                    <p style={{ fontSize: "20px", color: "#000000", margin: "0px" }}>{eachWork}</p>
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