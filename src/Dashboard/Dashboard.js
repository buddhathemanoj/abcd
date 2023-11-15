import React from "react";
import { connect } from "react-redux";
const Dashboard = (state) => {
    
return(
    <div>
<h1>this is dashboard</h1>
        
    </div>
)
}

const mapStateToProps = (state) => ({
    user:state.auth.user,
   })
    export default connect(mapStateToProps)(Dashboard);