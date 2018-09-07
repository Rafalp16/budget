const budgetController = (() => {
    const Income = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };
    const Expense = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };
    const data = {
        items: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    return {
        addItem: (type, desc, val) => {
            let newItem, id;
            
            if(data.items[type].length > 0)
                id = data.items[type][data.items[type].length - 1].id + 1;
            else id = 0;
            
            if(type === 'inc')
                newItem = new Income(id, desc, val);
            else if(type=== 'exp') 
                newItem = new Expense(id, desc, val);
            data.items[type].push(newItem);
            return newItem;
        },
        calculateBudget: () => {
            const calc = obj => obj.reduce((total, current) => total + current.value, 0);
            data.totals.inc = calc(data.items.inc);
            data.totals.exp = calc(data.items.exp);
        },
        removeItem: (item) => {
            const type = item.slice(0, 3);
            const id = item.slice(4, 5);
            const index = data.items[type].reduce(function(total, current, i) {
            return current.id == id ? total + i : total + 0;
            }, 0);
            data.items[type].splice(index, 1);
        },
        getBudget: () => data.totals,
        getInc: () => data.items.inc
    }
})();

const UIController = (() => {
    const elementsDOM = {
        type: document.getElementById('add-type'),
        desc: document.getElementById('add-desc'),
        value: document.getElementById('add-value'),
        income: document.getElementById('income'),
        expenses: document.getElementById('expenses'),
        totalBudget: document.querySelector('.budget__value'),
        totalIncome: document.querySelector('.total-income__value'),
        totalExpenses: document.querySelector('.total-expenses__value')
    }
    return { 
        getInput: () => {
            return {
                type: elementsDOM.type.value,
                desc: elementsDOM.desc.value,
                value: parseFloat(elementsDOM.value.value)
            };
        },
        addListItem: (obj, type) => {
            let template;
            if(type === 'inc') {
                template = '<li id="inc-%id%" class="list-item"><span class="item-desc">%desc%</span><span class="item-value">%value%</span><button id="delete-item" class="item-button">Delete</button></li>';
            } else if(type === 'exp') {
                template = '<li id="exp-%id%" class="list-item"><span class="item-desc">%desc%</span><span class="item-value">%value%</span><button id="delete-item" class="item-button">Delete</button></li>';
            }
            template = template.replace('%desc%', obj.desc);
            template = template.replace('%value%', obj.value);
            template = template.replace('%id%', obj.id);
            
            if(type === 'inc') {
                elementsDOM.income.insertAdjacentHTML('beforeEnd', template);
            } else if(type === 'exp') {
                elementsDOM.expenses.insertAdjacentHTML('beforeEnd', template);
            }
        },
        removeListItem: (item) => {
            document.getElementById(item).remove();
        },
        clearFields: () => {
            elementsDOM.desc.value = '';
            elementsDOM.value.value = '';
            elementsDOM.desc.focus();
        },
        updateBudget: obj => {
            elementsDOM.totalBudget.textContent = obj.inc - obj.exp;
            elementsDOM.totalIncome.textContent = '+' + obj.inc;
            elementsDOM.totalExpenses.textContent = '-' + obj.exp;
        }
    };
})();

const controller = ((budgetCtrl, UICtrl) => {
    function init() {
        document.querySelector('.list').addEventListener('click', deleteItem);
    }
    const addItem = () => {
        const input = UICtrl.getInput();
        if(input.desc !== '' && !isNaN(input.value) && input.value > 0) {
            const item = budgetCtrl.addItem(input.type, input.desc, input.value);
            UICtrl.addListItem(item, input.type);
            UICtrl.clearFields();
            budgetCtrl.calculateBudget();
            UICtrl.updateBudget(budgetCtrl.getBudget());
            
        } else alert('Fill description and add a number value!');
    }
    const deleteItem = (event) => {
        const item = event.target.parentNode.id;
        if(item) {
            budgetCtrl.removeItem(item);
            UICtrl.removeListItem(item);
            budgetCtrl.calculateBudget();
            UICtrl.updateBudget(budgetCtrl.getBudget());
        }
    }
    return {
        add: () => { addItem(); },
        init: () => { init(); }
    }
    
})(budgetController, UIController);

controller.init();