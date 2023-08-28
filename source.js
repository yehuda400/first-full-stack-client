// Getting Elements
const HOME = document.getElementById("homePage"); // Page 1 (home) Elements
const HOME_ALL_PRODUCTS = document.getElementById("products");
const ALL_FILTER = document.getElementById("all-products");
const MEN_FILTER = document.getElementById("men-filter");
const WOMEN_FILTER = document.getElementById("women-filter");
const JEWELRY_FILTER = document.getElementById("jewelry-filter");
const ELECTRIC_FILTER = document.getElementById("electronics-filter");
const SEARCH_BAR = document.getElementById("search-bar");
const PRODUCT_PAGE = document.getElementById("product-page"); // Page 2 (product-page) Elements
const EDIT_PAGE = document.getElementById("edit-product-page"); // Page 3 () Elements

// All Functions
const createNewElement = (tagName, father, content = "", className = "") => {
    const element = document.createElement(tagName);
    element.innerHTML = content;
    father.appendChild(element);
    if (className) {
        element.className = className;
    }
    return element;
};
const openEditProductPage = (thisObject) => {
    HOME.className = "d-none";
    PRODUCT_PAGE.className = "d-none";
    EDIT_PAGE.className = "d-block";

    // creating elements
    const pageContainer = createNewElement("div", EDIT_PAGE);
    const header = createNewElement("header", pageContainer);
    const title = createNewElement("h1", header, "Edit Product");
    const formContainer = createNewElement("div", pageContainer);
    const form = createNewElement("form", formContainer);
    const titleLabel = createNewElement("label", form, "Title");
    titleLabel.setAttribute("for", "title");
    createNewElement("br", form);
    const titleInput = createNewElement("input", form);
    titleInput.setAttribute("type", "text");
    titleInput.name = "title";
    titleInput.placeholder = thisObject.title;
    createNewElement("br", form);
    const categoryLabel = createNewElement("label", form, "Category");
    categoryLabel.setAttribute("for", "category");
    createNewElement("br", form);
    const categoryInput = createNewElement("input", form);
    categoryInput.setAttribute("type", "text");
    categoryInput.name = "category";
    categoryInput.placeholder = thisObject.category;
    createNewElement("br", form);
    const priceLabel = createNewElement("label", form, "Price");
    categoryLabel.setAttribute("for", "category");
    createNewElement("br", form);
    const priceInput = createNewElement("input", form);
    priceInput.setAttribute("type", "text");
    priceInput.name = "price";
    priceInput.placeholder = thisObject.price;
    createNewElement("br", form);
    const submit = createNewElement(`input`, form);
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    // <input type="submit" value="Submit">

    // setting id's and classes and attributes
    titleInput.id = "p3Input";
    categoryInput.id = "p3Input";
    priceInput.id = "p3Input";
};
const openProductPage = (rawId, productObj) => {
    // const thisObject = data.find((item) => item.id === rawId);
    HOME.className = "d-none";
    PRODUCT_PAGE.replaceChildren();
    PRODUCT_PAGE.className = "d-block";

    // crating elements
    const productPageContainer = createNewElement("div", PRODUCT_PAGE);
    const header = createNewElement("header", productPageContainer);
    const pageTitle = createNewElement("h1", header, "Product Page");
    const detailsContainer = createNewElement("div", productPageContainer);
    const picContainer = createNewElement("div", detailsContainer);
    const pic = createNewElement("img", picContainer);
    const textContainer = createNewElement("div", detailsContainer);
    const title = createNewElement("h3", textContainer, "Title");
    const productTitle = createNewElement("p", textContainer, productObj.title);
    const description = createNewElement("h3", textContainer, "Description");
    const productDescription = createNewElement(
        "p",
        textContainer,
        productObj.description
    );
    const category = createNewElement("h3", textContainer, "Category");
    const productCategory = createNewElement(
        "p",
        textContainer,
        productObj.category
    );
    const price = createNewElement("h3", textContainer, "Price");
    const productPrice = createNewElement("p", textContainer, productObj.price);

    // setting id's and classes and attributes
    productPageContainer.id = "p2Container";
    header.id = "p2header";
    detailsContainer.id = "p2-dts-Container";
    pic.setAttribute("src", productObj.image);
    pic.id = "p2Pic";
    textContainer.id = "p2TextContainer";
};
const createNewProduct = (productObj) => {
    const productContainer = createNewElement("div", HOME_ALL_PRODUCTS);
    productContainer.className = "product-container";
    const imageContainer = createNewElement("div", productContainer);
    imageContainer.className = "image-container";
    const image = createNewElement("img", imageContainer);
    image.setAttribute("src", productObj.image);
    image.className = "images";
    const title = createNewElement("h3", productContainer, productObj.title);
    const breakLine = createNewElement("hr", productContainer);
    const icons = createNewElement("div", productContainer);
    const deleteIcon = createNewElement("i", icons, "delete");
    deleteIcon.className = "material-icons";
    deleteIcon.style.cursor = "pointer";
    const editIcon = createNewElement("i", icons, "edit");
    editIcon.className = "material-icons";
    editIcon.style.cursor = "pointer";

    // listen to events
    productContainer.addEventListener("click", () =>
        openProductPage(productObj.id, productObj)
    );
    editIcon.addEventListener("click", (e) => {
        openEditProductPage(productObj);
        e.stopPropagation();
    });
};
const displayAllProducts = (rawData = []) => {
    PRODUCT_PAGE.className = "d-none";
    EDIT_PAGE.className = "d-none";
    HOME.className = "d-block";
    HOME_ALL_PRODUCTS.replaceChildren();
    rawData.forEach((product) => {
        createNewProduct(product);
    });
};
const allMenProducts = (data = []) => {
    const filtered = data.filter(
        (element) => element.category === "men's clothing"
    );
    console.log(filtered);
    displayAllProducts(filtered);
};
const allWomenProducts = (data = []) => {
    const filtered = data.filter(
        (element) => element.category === "women's clothing"
    );
    console.log(filtered);
    displayAllProducts(filtered);
};
const allJewelryProducts = (data = []) => {
    const filtered = data.filter((element) => element.category === "jewelry");
    console.log(filtered);
    displayAllProducts(filtered);
};
const allElectronicsProducts = (data = []) => {
    const filtered = data.filter(
        (element) => element.category === "electronics"
    );
    console.log(filtered);
    displayAllProducts(filtered);
};

const handleProducts = async () => {
    try {
        const response = await fetch(
            "https://my-first-server-iz6q.onrender.com"
        );
        const data = await response.json();

        displayAllProducts(data);

        // Listen to Events
        ALL_FILTER.addEventListener("click", () => displayAllProducts(data));
        MEN_FILTER.addEventListener("click", () => allMenProducts(data));
        WOMEN_FILTER.addEventListener("click", () => allWomenProducts(data));
        JEWELRY_FILTER.addEventListener("click", () =>
            allJewelryProducts(data)
        );
        ELECTRIC_FILTER.addEventListener("click", () =>
            allElectronicsProducts(data)
        );
    } catch (error) {
        console.log(error);
    }
};

addEventListener("load", handleProducts);
