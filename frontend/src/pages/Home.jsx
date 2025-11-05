import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"

function Home() {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2>Welcome to Furever Homes! 🐾</h2>
                <p>
                    Find your new best friend today. Our application connects you to adoptable animals using the PetFinder API.
                </p>
            </div>
            <div style={{ 
                marginTop: '20px', 
                padding: '30px', 
                border: '1px solid #ccc', 
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
            }}>
                <h3>Start Your Search</h3>
                <p>Click the "Search" link above or use the form below to browse animals near you.</p>
                {/* TODO: You will replace this placeholder with a functional SearchForm component
                  that communicates with your Django API.
                */}
                <button 
                    style={{ padding: '10px 20px', fontSize: '1em', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => console.log('Navigate to search page')}
                >
                    Browse Adoptable Pets
                </button>
            </div>
            <div style={{
                marginTop: '40px',
                textAlign: 'left',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                <h2 style={{textAlign: 'center'}}>About Us and Our Vision! 🐾</h2>
                <p>Every year, about 6.5 million cats and dogs enter shelters in the United States.
                And only about 4.2 million of those cats and dogs get adopted.
                This means about 2.3 million dogs and cats are left in shelters each year and are not adopted.
                </p>
                <p>Because so many pets are left in shelters, many of these animals are euthanized because they will never be able to find a home.
                About 2 million healthy cats and dogs are euthanized in shelters each year in the US because of overcrowding and lack of resources.
                </p>
                <p>At FureverHomes, our mission is to help reduce the number of pets in shelters by making it easier than ever to find and adopt pets.
                As pet owners ourselves, we understand the joy and companionship that pets bring to our lives, and we want to help more animals find their forever homes.
                </p>
                <p>We know that we can help find more pets a loving home by connecting potential pet adopters with shelters and rescue organizations.
                By providing a user-friendly platform that showcases available pets, we aim to make the adoption process seamless and enjoyable for both the adopters and the animals.
                </p>
                <p>Have any questions? Click the help button at the top of the page to learn more and check out our Frequently Asked Questions!
                </p>
            </div>
        </div>
    );
}

export default Home;