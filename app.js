const budgetController = (function() {
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
        addItem: function(type, desc, val) {
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
        testing: function() {
            return data.items;
        }
    }
})();

const UIController = (function() {
    return {
        getInput: function() {
            return {
                type: document.getElementById('add-type').value,
                desc: document.getElementById('add-desc').value,
                value: document.getElementById('add-value').value
            };
        }
    };
})();

const controller = (function(budgetCtrl, UICtrl) {
    const setupEventListeners = function() {
        document.getElementById('add-item').addEventListener('click', addItem);

        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) addItem();
        });
    }
    
    const addItem = function() {
        const input = UICtrl.getInput();
        budgetCtrl.addItem(input.type, input.desc, input.value);
    }
    
    return {
        init: function() {
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();