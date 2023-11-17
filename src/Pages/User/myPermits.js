import { FaPlusCircle } from "react-icons/fa";
import "./userstyle.css"

const MyPermits = () => {

    return(
        <div className="mypermits-container">
            <div className="list-permits-top-container">
                <h2>List Of Permits</h2>
                <div className="permits-btn-search-container">
                    <button type="button" className="permits-btn">Create Permits <FaPlusCircle/></button>
                    <input type="text" placeholder="Search" className="search-input"/>
                </div>
            </div>
            <div>
            <table className="custom-table">
      <thead>
        <tr>
          <th>#</th>
          <th></th>
          <th>Header 2</th>
          <th>Header 2</th>
          <th>Header 2</th>
          <th>Header 2</th>
          <th>Header 2</th>
          <th>Header 2</th>
          <th>Header 2</th>
          <th>Header 2</th>
          <th>Header 2</th>
          <th>Header 2</th>
          <th>Header 13</th>
          <th>Header 14</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data 1-1</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-13</td>
          <td>Data 1-14</td>
        </tr>
        <tr>
          <td>Data 1-1</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-2</td>
          <td>Data 1-13</td>
          <td>Data 1-14</td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
            </div>
        </div>
    )
}

export default MyPermits