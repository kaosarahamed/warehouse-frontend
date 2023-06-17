import PropTypes from 'prop-types';
import Style from "../styles/Global.module.css";

const Pagination = (props) => {

    let pages = [];

    for(let i = 1; i <= Math.ceil(props.totalPosts.length / props.postPerPage); i++){
        pages.push(i)
    }


    return (
        <div  className={Style.pagination}>
                           
                            {
                                pages.map((item, index) => {
                                    return(
                                        <button className={item == props.currentPage ? Style.active : ""} onClick={() => props.setCurrentPage(item)} key={index}>{item}</button>
                                    )
                                })
                            }
                          
                        </div>
    );
};

Pagination.propTypes = {
    totalPosts: PropTypes.any,
    postPerPage : PropTypes.any,
    setCurrentPage : PropTypes.any,
    currentPage : PropTypes.any,
  }


export default Pagination;