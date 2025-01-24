document.addEventListener('DOMContentLoaded', () => {
    const productTypeElement = document.querySelector('.product-type');

    // Only continue if the product-type element exists (meaning we're on product-template.html)
    if (!productTypeElement) {
        return; // Exit if no product type elements are found
    }

    const styles = {
        indica: { background: 'linear-gradient(to right, #FFD700, #B2F1FF, #A9F1A9)', textColor: 'white', bgColor: 'orange' },
        sativa: { background: 'linear-gradient(to right, #EAB8E4, #B2E0F8, #A8DAB7)', textColor: 'lightgreen', bgColor: 'purple' },
        hybrid: { background: 'linear-gradient(to right, #F7C8A7, #F9E79F, #C7EAC4)', textColor: '#9f67b0', bgColor: '#eef0ab' }
    };

    // Function to apply styles based on the product type
    function applyStyles(type) {
        const formattedType = type.toLowerCase(); // Normalize the type to lowercase

        const productInfoElement = document.querySelector('.product-price__info');
        const imageContainer = document.querySelector('.product-page__image-container');

        if (!productInfoElement || !imageContainer) {
            return; // Exit if required elements are not found
        }

        const style = styles[formattedType];
        if (style) {
            const { background, textColor, bgColor } = style;

            productInfoElement.style.background = background;
            imageContainer.style.background = background;
            productTypeElement.style.color = textColor;
            productTypeElement.style.backgroundColor = bgColor;
        }
    }

    // Listen for the custom event
    window.addEventListener('productLoaded', (event) => {
        const productType = event.detail.type; // Use the type directly from the event
        applyStyles(productType); // Pass the product type to the applyStyles function
    });
});