class Motorcycle {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

class MotorcycleInventory {
    constructor() {
        this.motorcycles = [];
    }

    addMotorcycle(motorcycle) {
        this.motorcycles.push(motorcycle);
        this.displayMotorcycles();
    }

    editMotorcycle(index, newMotorcycle) {
        this.motorcycles[index] = newMotorcycle;
        this.displayMotorcycles();
    }

    deleteMotorcycle(index) {
        this.motorcycles.splice(index, 1);
        this.displayMotorcycles();
    }

    displayMotorcycles() {
        const motorcycleList = document.getElementById('motorcycleList');
        motorcycleList.innerHTML = '';

        this.motorcycles.forEach((motorcycle, index) => {
            const motorcycleCard = document.createElement('div');
            motorcycleCard.classList.add('col-md-4');
            motorcycleCard.innerHTML = `
                <div class="card">
                    <img src="${motorcycle.image}" class="card-img-top" alt="${motorcycle.name}">
                    <div class="card-body">
                        <h5 class="card-title">${motorcycle.name}</h5>
                        <p class="card-text">Цена: ${motorcycle.price} руб.</p>
                        <button class="btn btn-warning" onclick="editMotorcycle(${index})">Редактировать</button>
                        <button class="btn btn-danger" onclick="deleteMotorcycle(${index})">Удалить</button>
                    </div>
                </div>
            `;
            motorcycleList.appendChild(motorcycleCard);
        });
    }
}

const inventory = new MotorcycleInventory();

document.getElementById('motorcycleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];
    const editIndex = document.getElementById('editIndex').value;

    if (price < 0) {
        alert("Цена не может быть отрицательной");
        return;
    }

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = e.target.result;
            const motorcycle = new Motorcycle(name, price, image);

            if (editIndex === '') {
                inventory.addMotorcycle(motorcycle);
            } else {
                inventory.editMotorcycle(editIndex, motorcycle);
                document.getElementById('formSubmitButton').textContent = 'Добавить мотоцикл';
            }
        };
        reader.readAsDataURL(imageFile);
    }

    document.getElementById('motorcycleForm').reset();
    document.getElementById('editIndex').value = '';
});

function editMotorcycle(index) {
    const motorcycle = inventory.motorcycles[index];

    document.getElementById('name').value = motorcycle.name;
    document.getElementById('price').value = motorcycle.price;

    document.getElementById('editIndex').value = index;
    document.getElementById('formSubmitButton').textContent = 'Редактировать мотоцикл';
}

function deleteMotorcycle(index) {
    inventory.deleteMotorcycle(index);
}
