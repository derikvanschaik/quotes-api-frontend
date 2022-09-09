import Pagination from 'react-bootstrap/Pagination';

function AuthorsPagination({authors, authorsPerPage, active, handleClick}){
    const items = [];
    for(let number = 1; number < authors.length/authorsPerPage; number++){
        items.push(
            <Pagination.Item 
                key={number} 
                active={number === active} 
                onClick={()=> handleClick(number)}>
            {number}
            </Pagination.Item>
        );
    }
    return(
        <Pagination>{items}</Pagination>
    )
}
export default AuthorsPagination;