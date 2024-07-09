$(document).ready(function() {
    $("#shop_form").submit(function(event) {
        event.preventDefault();
        invoice();
        
    });
});

function validate(){
    console.log("validate access");

    errors=[];

    const cust_name = document.getElementById("customer_name").value;
    const cust_number = document.getElementById("customer_number").value;

    const dresses_no_input = document.getElementById ("dresses").value;
    const jackets_no_input= document.getElementById ("jackets").value;
    const shirts_no_input = document.getElementById ("shirts").value;

    const dresses_no = parseInt(document.getElementById ("dresses").value)|| 0;
    const jackets_no = parseInt(document.getElementById ("jackets").value)|| 0;
    const shirts_no = parseInt(document.getElementById ("shirts").value)|| 0;

    const cust_name_regex = /^[a-zA-z/s]+$/;
    const cust_number_regex = /^\d{3}-\d{3}-\d{4}$/;
    
    if (!cust_name) errors.push("Name is required");
    if (cust_name && !cust_name_regex.test(cust_name)) errors.push("Name is in the wrong format");
    
    if (!cust_number) errors.push("Number is required");
    if (cust_number && !cust_number_regex.test(cust_number)) errors.push("Number is in the wrong format");

    if (isNaN(dresses_no_input)|| isNaN(jackets_no_input) || isNaN(shirts_no_input)) errors.push("Enter a valid Quantity");
    
    const total_value =  dresses_no + jackets_no + shirts_no;
    if( total_value === 0) errors.push("Must buy atleast one item");

return errors;
}

function invoice(){
    const errors =validate();

    const errors_section = document.getElementById('errors_div');

    errors_section.innerHTML = '';

    if (errors.length > 0) {
        errors_section.innerHTML = errors.join('<br>');
        return;
    }

    const cust_name = document.getElementById("customer_name").value;
    const cust_number = document.getElementById('customer_number').value;

    const dresses = parseInt(document.getElementById ("dresses").value)|| 0;
    const jackets = parseInt(document.getElementById ("jackets").value)|| 0;
    const shirts = parseInt(document.getElementById ("shirts").value)|| 0;

    const dresses_price = 35;
    const jackets_price = 75;
    const shirts_price = 15;
    const tax_rate = 0.13;
    
    const dresses_total = dresses * dresses_price;
    const jackets_total = jackets * jackets_price;
    const shirts_total = shirts * shirts_price;
    
    const sub_total = dresses_total + jackets_total + shirts_total;
    const total_tax = sub_total * tax_rate;
    const sales_total = sub_total + total_tax;

    let invoice = `<h2>Invoice</h2>`;
invoice += `<table border="1" cellspacing="0" cellpadding="5">
    <thead>
        <tr>
            <th>Name</th>
            <th>Item Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
        </tr>
    </thead>
    <tbody>`;

if (dresses > 0) {
    invoice += `<tr>
        <td>Dresses</td>
        <td>${dresses}</td>
        <td>$${dresses_price}</td>
        <td>$${dresses_total.toFixed(2)}</td>
    </tr>`;
}

if (jackets > 0) {
    invoice += `<tr>
        <td>Jackets</td>
        <td>${jackets}</td>
        <td>$${jackets_price}</td>
        <td>$${jackets_total.toFixed(2)}</td>
    </tr>`;
}

if (shirts > 0) {
    invoice += `<tr>
        <td>Shirts</td>
        <td>${shirts}</td>
        <td>$${shirts_price}</td>
        <td>$${shirts_price.toFixed(2)}</td>
    </tr>`;
}


invoice += `</tbody>
    <tfoot>
        <tr>
            <td colspan="3">Subtotal</td>
            <td>$${sub_total.toFixed(2)}</td>
        </tr>
        <tr>
            <td colspan="3">Tax (13%)</td>
            <td>$${total_tax.toFixed(2)}</td>
        </tr>
        <tr>
            <td colspan="3">Total</td>
            <td>$${sales_total.toFixed(2)}</td>
        </tr>
        <tr>
            <td colspan="3">Customer Name</td>
            <td>${cust_name}</td>
        </tr>
        <tr>
            <td colspan="3">Customer Number</td>
            <td>${cust_number}</td>
        </tr>
    </tfoot>
</table>`;

$("#invoice").html(invoice);
}

