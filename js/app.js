'use strict';

// data
const sort_brand = {};
const sort_color = {};
const sort_size = {};
const data = [{
        brand: 'adidas',
        color: 'red',
        size: 8,
        price: 2500,
        in_stock: 12
    },
    {
        brand: 'nike',
        color: 'blue',
        size: 9,
        price: 1900,
        in_stock: 25
    },
    {
        brand: 'mizuno',
        color: 'black',
        size: 10,
        price: 3000,
        in_stock: 45
    },
    {
        brand: 'under armor',
        color: 'blue',
        size: 7,
        price: 1400,
        in_stock: 12
    },
    {
        brand: 'new balance',
        color: 'pink',
        size: 4,
        price: 1400,
        in_stock: 31
    },
    {
        brand: 'umbro',
        color: 'yellow',
        size: 5,
        price: 1400,
        in_stock: 5
    },
    {
        brand: 'puma',
        color: 'orange',
        size: 8,
        price: 2400,
        in_stock: 2
    },
    {
        brand: 'new balance',
        color: 'lime',
        size: 9,
        price: 3400,
        in_stock: 1
    },
    {
        brand: 'mizuno',
        color: 'pink',
        size: 10,
        price: 4000,
        in_stock: 20
    },
    {
        brand: 'adidas',
        color: 'black',
        size: 9,
        price: 3000,
        in_stock: 10
    }
];

// CONTROLLER FUNCTIONS

// filter function
// description: should return JSON with specified brand, size and color
var filteredItem = []

function filterData(brand, size, color) {
    filteredItem = [];
    let con = false;
    for (let i = 0; i < data.length; i++) {
        let curItem = data[i];
        if (sort_brand[brand] === curItem.brand && sort_size[size] === curItem.size && sort_color[color] === curItem.color) {
            filteredItem.push(curItem);
            con = true;
        }
    }
    if (con == true) {
        return filteredItem;
    } else {
        return "no stock";
    }
}

// ADD stock function
// description: pushes new adde item to the existing stock
function addData(newBrand, newSize, newColor, newPrice, newStockNo) {
    if (newBrand !== '' && newSize !== '' && newColor !== '' && newPrice !== '') {
        var newItem = {
            brand: newBrand,
            color: newColor,
            size: newSize,
            price: newPrice,
            in_stock: newStockNo
        };
        data.push(newItem);
    }
}

// filter function
// description: returnss table of specified filter
var filteredItems = [];

function filterStock(name) {
    filteredItems = [];
    for (let i = 0; i < data.length; i++) {
        let curItem = data[i];
        if (sort_brand[name] === curItem.brand || sort_size[name] === curItem.size || sort_color[name] === curItem.color) {
            filteredItems.push(curItem);
        }
    }
    return filteredItems;
}

// sort data function
function sortData(data) {
    for (let i = 0; i < data.length; i++) {
        let curElem = data[i];
        if (sort_brand[curElem.brand] === undefined || sort_size[curElem.size] === undefined || sort_color[curElem.color] === undefined) {
            sort_brand[curElem.brand] = curElem.brand;
            sort_size[curElem.size] = curElem.size;
            sort_color[curElem.color] = curElem.color;
        }
    }
}

// call the sort function
sortData(data);

// display variables
const brand_display = document.querySelector('#brand');
const color_display = document.querySelector('#color');
const size_display = document.querySelector('#size');
const filter_display = document.querySelector('.display-table');
const all_stock_display = document.querySelector('.all-stock');
const stock_updater_display = document.querySelector('.stock-updater');

// COMPILE TEMPLATES
// filter template
const filter_template = document.querySelector('.filter-template').innerHTML;
const filter_instance = Handlebars.compile(filter_template);

// all stock template
const stock_template = document.querySelector('.stock-template').innerHTML;
const display_stock = Handlebars.compile(stock_template);

// brand template
const brand_template = document.querySelector('.brand-template').innerHTML;
const brand_instance = Handlebars.compile(brand_template);

// color template
const color_template = document.querySelector('.color-template').innerHTML;
const color_instance = Handlebars.compile(color_template);

// size template
const size_template = document.querySelector('.size-template').innerHTML;
const size_instance = Handlebars.compile(size_template);

// send data to the dom
brand_display.innerHTML = brand_instance({
    sort_brand
});
color_display.innerHTML = color_instance({
    sort_color
});
size_display.innerHTML = size_instance({
    sort_size
});

// required fields for filtering
const sBrand = document.querySelector('.brand');
const sSize = document.querySelector('.size');
const sColor = document.querySelector('.color');
const find = document.querySelector('.find-btn');

// required fields for adding new stock
const new_brand = document.querySelector('.new_brand');
const new_color = document.querySelector('.new_color');
const new_size = document.querySelector('.new_size');
const new_price = document.querySelector('.new_price');
const new_stock_no = document.querySelector('.no-instock');
const add = document.querySelector('.add-btn');

// required fields to filter through shown stock
const filter_field = document.querySelector('.function-fields');
const filterItem = document.querySelector('.filter');
const filter_btn = document.querySelector('.filter-btn');

// show and hide all stock
const show_stock = document.querySelector('.show-stock');
const hide_stock = document.querySelector('.hide-stock');

find.addEventListener('click', function() {
    let newData = filterData(sBrand.value, sSize.value, sColor.value);
    if (newData !== "no stock") {
        filter_display.innerHTML = filter_instance({
            data: newData
        });
    } else {
        filter_display.innerHTML = "Sorry we currently do not have that available in stock at the moment!";
    }
});

add.addEventListener('click', function() {
    let newItem = addData(new_brand.value, new_size.value, new_color.value, new_price.value, new_stock_no.value);

    // call sort function
    sortData(data);

    // send table to the DOM
    all_stock_display.innerHTML = display_stock({
        data: data
    });

    // send data to the dom
    brand_display.innerHTML = brand_instance({
        sort_brand
    });
    color_display.innerHTML = color_instance({
        sort_color
    });
    size_display.innerHTML = size_instance({
        sort_size
    });

    // clear text fields
    new_brand.value = "";
    new_color.value = "";
    new_size.value = "";
    new_price.value = "";
    new_stock_no.value = "";
    filter_field.style.display = 'inline-block';
});

show_stock.addEventListener('click', function() {
    // send table to the DOM
    all_stock_display.innerHTML = display_stock({
        data: data
    });
    filter_field.style.display = 'inline-block';
});

hide_stock.addEventListener('click', function() {
    all_stock_display.innerHTML = "";
    filter_field.style.display = 'none';
});

filter_btn.addEventListener('click', function(){
    let theItems = filterStock(filterItem.value);
    if (filterItem.value !== '') {
        all_stock_display.innerHTML = display_stock({
            data: theItems
        });
    } else {
        all_stock_display.innerHTML = display_stock({
            data: data
        });
    }
});
