import { useEffect } from "react";
import { useParams } from "react-router-dom";
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from '../lib/api'

function QuoteDetail() {
    const params = useParams()

    const { quoteId } = params

    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true)

    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest, quoteId])
    
    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <p className='centered'>{error}</p>
    }

    if (!loadedQuote.text) {
        return <p>No quote found</p>
    }

    return (  
        <section>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
        </section>
    );
}

export default QuoteDetail;