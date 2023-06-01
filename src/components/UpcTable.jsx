import Style from "../styles/UpcTable.module.css";
import PropTypes from 'prop-types';
const UpcTable = (props) => {
    return (
        <section className={Style.upcSection}>
        <div className={Style.upcContainer}>
            <h1>PACKAGES</h1>
            <div className={Style.upcTable}>
                <table>
                    <thead>
                    <tr>
                      <th>Package</th>
                      <th>Date</th>
                      <th>Tracking</th>
                      <th>RMA</th>
                      <th>UPC</th>
                      <th>SN</th>
                      <th>Quantity</th>
                      <th>SN Matched</th>
                      <th>Condition</th>
                      <th>Note</th>
                      <th>Item</th>
                      <th>SKU</th>
                      <th>length</th>
                      <th>Width</th>
                      <th>Height</th>
                      <th>Weight</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.getpackages ? props.getpackages.map((item, index) => {
                      return( 
                      <tr key={item._id}>
                      <td>{"P" + index}</td>
                      <td>{new Date(item.createdAt).getFullYear() + "-" + new Date(item.createdAt).getMonth() + "-" + new Date(item.createdAt).getDate()}</td>
                      <td>{item.tracking}</td>
                      <td>{item.rma}</td>
                      <td>{item.upc}</td>
                      <td>{item.sn}</td>
                      <td>{item.quantity}</td>
                      <td>{item.snmatched}</td>
                      <td>{item.condition}</td>
                      <td>{item.note}</td>
                      <td>{item.item}</td>
                      <td>{item.sku}</td>
                      <td>{item.length}</td>
                      <td>{item.width}</td>
                      <td>{item.height}</td>
                      <td>{item.weight}</td>
                    </tr>
                      )
                    }) : "Loading..."}
                    </tbody>
                    
                  </table>
            </div>
        </div>
    </section>
    );
};

UpcTable.propTypes = {
  getpackages: PropTypes.any,
  getAPiPackages: PropTypes.any,
}

export default UpcTable;

