import { Link } from 'react-router-dom';
import styles from './Pager.module.css';


const Pager = ({ page, pages }) => {
    const linkToPrev = page !== 1 ? `/catalog?page=${page - 1}` : null;
    const linkToNext = page < pages ? `/catalog?page=${page + 1}` : null;
    
    const onClickPrev = (e) => {        
        if(page === 1) {            
            e.preventDefault();
        }
    };
    
    const onClickNext = (e) => {        
        if(page === pages) {            
            e.preventDefault();
        }
    };

    return (
        <div >
            <div className={`${styles["position-right"]} ${styles.numberOfPages}`}>Page {page} of {pages}</div>
            <div className={styles["position-right"]}>
                <Link to={linkToPrev} onClick={onClickPrev} className={`pageLink ${!linkToPrev ? "disabledCursor" : ''}`} >&lt; Prev</Link>
                <Link to={linkToNext} onClick={onClickNext} className={`pageLink ${!linkToNext ? "disabledCursor" : ''}`} >Next &gt;</Link>
            </div>
        </div>
    );
};

export default Pager;