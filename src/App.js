import React, { useEffect, useState } from "react";
import ProductList from "./productList";
import { deleteData, getData, putData, postData } from './api';
import ProductForm from "./Form";

const App = () => {
    const [products, setProducts] = useState([]);
    const [edit, setEdit] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [initialForm, setInitialForm] = useState({ name: '', price: '', category: '', link: '' });

    useEffect(() => {
        getAllProducts();
    }, []);

    async function getAllProducts() {
        try {
            const response = await getData();
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    async function addProduct(product) {
        let data = {
            name: product.name,
            price: product.price,
            category: product.category,
            link: product.link // Assuming link is part of the product object
        };

        try {
            if (edit) {
                await putData(product.id, data);
            } else {
                await postData(data);
            }
            getAllProducts();
            setOpenForm(false);
        } catch (error) {
            console.error("Error adding/updating product:", error);
        }
    }

    async function deleteProduct(id) {
        try {
            await deleteData(id);
            getAllProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    function editProduct(value) {
        setEdit(true);
        setOpenForm(true);
        setInitialForm(value);
    }

    function closeForm() {
        setOpenForm(false);
    }

    function showForm() {
        setInitialForm({ name: '', price: '', category: '', link: '' });
        setOpenForm(true);
        setEdit(false);
    }

    return (
        <div className="wrapper m-5 w-100" style={{ backgroundImage: 'url("https://wallpapers.com/images/high/indian-player-virat-kohli-am9zijshauyhh9i3.webp")', backgroundSize: 'cover',width:'100%' ,minHeight: '100vh' }}>
            <h2 className="text-primary text-center">CRUD Operations with React JS</h2>
            <button className="btn btn-primary float-end" onClick={() => showForm()}>Add new</button>
            <ProductList products={products} deleteProduct={deleteProduct} editProduct={editProduct} />
            {openForm && <ProductForm addProduct={addProduct} data={initialForm} closeForm={closeForm} />}
        </div>
    );
};

export default App;
