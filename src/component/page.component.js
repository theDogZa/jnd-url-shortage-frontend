import * as React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { getOriginal } from "../service/shorten.service"
import { getIPv4 } from "../service/ip.service"

function Pages () {

    const { handle } = useParams()
    const navigate = useNavigate();

    React.useEffect(() => {

        const fetchData = async () => {
            const ip = await getIPv4()
            let data = {}
            data.ip = ip
            data.url = handle
            const response = await getOriginal(data)
            if (response.status.code === 200) {
                const originalUrl = response.data;
                console.log(originalUrl);
                // window.location.href = originalUrl;
                return null;
            } else {
                navigate('/404')
            }
        }
        fetchData().catch(console.error);

    }, [handle])

    return (
        <div></div>
    )
}

export default Pages;