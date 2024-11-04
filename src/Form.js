import React, { useState } from "react";

function Form(props) {
    const [product, setProduct] = useState(props.data);
    const [submitted, setSubmitted] = useState(false);

    // Function to handle changes in form inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        // Validate form fields and add/update product if valid
        if (!!product.name && !!product.price && !!product.category && !!product.link) {
            props.addProduct(product);
        }
    };

    // Function to handle form cancellation
    const handleCancel = (event) => {
        event.preventDefault();
        props.closeForm();
    };

    return (
        <div className="form-overlay">
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        className="form-control mt-2"
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                    {submitted && product.name.length < 5 && (
                        <span className="text-danger">Product name must be at least 5 characters</span>
                    )}
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        className="form-control mt-2"
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Enter Price"
                    />
                    {submitted && product.price === "" && (
                        <span className="text-danger">Product Price required</span>
                    )}
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select
                        className="form-control mt-2"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                    >
                        <option value="-1"></option>
                        <option value={'mobiles'}>Mobiles</option>
                        <option value={'laptops'}>Laptops</option>
                        <option value={'tv'}>TV's</option>
                    </select>
                    {submitted && product.category === "" && (
                        <span className="text-danger">Product category required</span>
                    )}
                </div>
                <div className='form-group'>
                    <label>Link</label>
                    <input
                        className="form-control mt-2"
                        type='text'
                        name='link'
                        value={product.link}
                        onChange={handleChange}
                        placeholder="Enter URL"
                    />
                    {submitted && product.link === "" && (
                        <span className='text-danger'>Link is required</span>
                    )}
                </div>

                <button className="btn btn-primary float-end" onClick={handleSubmit}>
                    Send
                </button>
                <button className="btn btn-danger float-end" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default Form;
