import "../styles/Help.css"

function Help() {
    return (
        <div className="help-container">
            <h2>Help & Frequently Asked Questions 🐾</h2>
            <section className="help-section">
                <h3>How to Use FureverHomes</h3>
                <p>
                    Welcome to FureverHomes! Our platform helps you find and adopt pets in your area. 
                    Keep reading forward to see how to get started with signing in or making an account, and how to find and view local pets. 
                    You also will find answers to common questions you may have.
                </p>
            </section>
            <section className="help-section">
                <h3>Getting Started</h3>
                <p>The tabs on the top of the page will help you navigate through the different features of FureverHomes.</p>
                <ul>
                    <li><strong>Profile:</strong> Create an account to save your favorite pets and manage your adoption preferences.</li>
                    <li><strong>Search:</strong> Use the search feature to find pets by type, breed, location, and more.</li>
                    <li><strong>Favorites:</strong> Save pets you're interested in to your favorites list.</li>
                </ul>
            </section>
            
            <section className="help-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-item">
                    <h4>How do I adopt a pet?</h4>
                    <p>Browse available pets, and select any that you're interested in, and follow the adoption process instructions. Leave comments on the pet's page for others to see!</p>
                </div>
                <div className="faq-item">
                    <h4>Can I save multiple pets?</h4>
                    <p>Yes! Use the favorites feature to save as many pets as you'd like. They are saved to your profile!</p>
                </div>
                <div className="faq-item">
                    <h4>Who can see my comments?</h4>
                    <p>Comments on pet pages are visible to all users. Please be kind and honest, but also mindful of the information you share!</p>
                </div>
            </section>
            
            <section className="help-section">
                <h3>Need More Help?</h3>
                <p>If you have additional questions, please contact our support team, as we are ready and happy to help however we can!</p>
            </section>
        </div>
    );
}

export default Help;