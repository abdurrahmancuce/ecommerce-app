import './styles.css'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Home from './Home'
import Orders from './Orders'
import Products from './Products'
import ProductDetail from './ProductDetail'
import NewProduct from './Products/new'

export default function Admin() {
    return (
        <div>
            <nav>
                <ul className='admin-menu'>
                    <li>
                        <Link to="/admin">Home</Link>
                    </li>
                    <li>
                        <Link to="/admin/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/admin/products">Products</Link>
                    </li>
                </ul>
            </nav>

            <Box mt="10">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='products' element={<Products />} />
                    <Route path='products/:product_id' element={<ProductDetail />} />
                    <Route path='products/new' element={<NewProduct />} />
                </Routes>
            </Box>
        </div>
    )
}
