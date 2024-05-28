import React from 'react'
//react quill to support rich text editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ProductForm.css'
import { Card } from 'react-bootstrap';

const ProductForm = ({ product, productImage, imagePreview, description, setDescription, handleInputChange, handleImageChange, saveProduct
}) => {
    return (
        <div className="add-product">
            <Card className={"card"}>
                <form name="addproduct" onSubmit={saveProduct}>
                    {/* product image card */}
                    <Card className={"group"}>
                        <label htmlFor="image">Product Image</label>
                        <code className="--color-dark">
                            Supported Formats: jpg, jpeg, png
                        </code>
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => handleImageChange(e)}
                        />

                        {imagePreview != null ? (
                            <div className="image-preview">
                                <img src={imagePreview} alt="product" />
                            </div>
                        ) : (
                            <p>No image set for this poduct.</p>
                        )}
                    </Card>
                    {/* product image card */}

                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        placeholder="Product name"
                        name="name"
                        value={product?.name}  //optional chaining
                        onChange={handleInputChange}
                    />

                    <label htmlFor="catagory">Product Category:</label>
                    <input
                        type="text"
                        placeholder="Product Category"
                        name="catagory"
                        value={product?.catagory}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="price">Product Price:</label>
                    <input
                        type="text"
                        placeholder="Product Price"
                        name="price"
                        value={product?.price}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="quantity">Product Quantity:</label>
                    <input
                        type="text"
                        placeholder="Product Quantity"
                        name="quantity"
                        value={product?.quantity}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="description">Product Description:</label>
                    <textarea
                        cols="97"
                        rows="10"
                        type="text"
                        name="message"
                        placeholder='Description Here..'
                        required
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    ></textarea>

                    {/* format from documentation */}
                    {/* <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        modules={ProductForm.modules}
                        formats={ProductForm.formats}
                    /> */}

                    <div className="--my">
                        <button type="submit" className="--btn --btn-primary">
                            Save Product
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

/* ProductForm.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["clean"],
    ],
};
ProductForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
]; */

export default ProductForm;