import { useParams } from "react-router";


const ProductPage = () => {

    const params = useParams();
    //const { id } = useParams();

    return (
        <div>
            <pre>{JSON.stringify(params, null, 2)}</pre>
            <h1>Product Page</h1>
            <p>producto ID: {params.id}</p>
            <p>producto name: {params.name}</p>
        </div>
    )
}

export default ProductPage