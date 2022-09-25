
export default function QuoteswithKeywords({quotes}){
    return (
        <ul className='list-group'>
        {
            quotes.map( ({quote, author}) =>{
                return (
                    <li className='list-group-item'>
                        <p>"{quote}" - {author}</p>
                    </li>
                )
            })
        }
    </ul>
    )
}