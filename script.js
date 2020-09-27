const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const show = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');


let data = [];

//Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000000)
    };
    addData(newUser);
};


// Add new obj to data arr

function addData(obj) {
    data.push(obj);

    updateDOM();
};

//Doubling money 

function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    });
    updateDOM();
}

//sort users by rishest

function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
};

//show millionaires btn

function showMillionaires() {
    data = data.filter(item => item.money > 1000000);
    updateDOM();
};

// calculate wealth

function calculateWealth() {
    let totalWealth = data.reduce((acc, item) => (acc + item.money), 0);

    const totalElement = document.createElement('div');
    totalElement.classList.add('h3');
    totalElement.innerHTML = `<h3><strong>Total Wealth:</strong>${formatMoney(totalWealth)}</h3>`;
    main.appendChild(totalElement);
};

//updateDOM

function updateDOM(providedDate = data) {
    //clear main div

    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedDate.forEach(function (item) {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);

    });
};

function formatMoney(number) {
    return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

//event listners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
show.addEventListener('click', showMillionaires);
calculateBtn.addEventListener('click', calculateWealth);