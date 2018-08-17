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
            data.totals[type] += 1;
            return newItem;
        },
        test: () => data
    }
})();

const UIController = (() => {
    const elementsDOM = {
        type: document.getElementById('add-type'),
        desc: document.getElementById('add-desc'),
        value: document.getElementById('add-value'),
        income: document.getElementById('income'),
        expenses: document.getElementById('expenses')
    }
    return {
        getInput: () => {
            return {
                type: elementsDOM.type.value,
                desc: elementsDOM.desc.value,
                value: parseFloat(elementsDOM.value.value)
            };
        },
        addListItem: obj => {
            let template;
            
            if(obj.type === 'inc') {
                template = '<li><span>%desc%</span><span>%value%</span></li>';
            } else if(obj.type === 'exp') {
                template = '<li><span>%desc%</span><span>%value%</span></li>';
            }
            template = template.replace('%desc%', obj.desc);
            template = template.replace('%value%', obj.value);
            
            if(obj.type === 'inc') {
                elementsDOM.income.insertAdjacentHTML('beforeEnd', template);
            } else if(obj.type === 'exp') {
                elementsDOM.expenses.insertAdjacentHTML('beforeEnd', template);
            }
        },
        clearFields: () => {
            elementsDOM.type.value = 'inc';
            elementsDOM.desc.value = '';
            elementsDOM.value.value = '';
            elementsDOM.desc.focus();
        }
    };
})();

const controller = ((budgetCtrl, UICtrl) => {
    /*const setupEventListeners = function() {
        document.getElementById('add-item').addEventListener('click', addItem);

        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) addItem();
        });
    }*/
    const addItem = () => {
        const input = UICtrl.getInput();
        if(input.desc !== '' && !isNaN(input.value) && input.value > 0) {
            budgetCtrl.addItem(input.type, input.desc, input.value);
            UICtrl.addListItem(input);
            UICtrl.clearFields();
        } else alert('Fill description and add a number value!');
    }
    return {
        /*init: function() {
            setupEventListeners();
        },*/
        add: () => { addItem(); }
    }
    
})(budgetController, UIController);

//controller.init();