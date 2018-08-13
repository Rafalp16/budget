const budgetController = (function() {
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
    const addItem = function() {
        const input = UICtrl.getInput();
    }
    
    document.getElementById('add-item').addEventListener('click', addItem);
    
    document.addEventListener('keypress', function(e) {
        if(e.keyCode === 13 || e.which === 13) addItem();
    });
    
})(budgetController, UIController);