/* eslint-disable no-unused-vars */
import React from "react";

const FooterPage = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return (
        <footer className="text-center text-white mt-5" style={{backgroundColor: '#f1f1f1'}}>
            <div className="text-center text-dark p-4 pt-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                © {today} Management By: 
                <a className="text-dark" href="#">FoodNutrition.com</a>
            </div>
        </footer>
    )
}

export default FooterPage