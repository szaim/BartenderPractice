// Example questions:

// Do ye like yer drinks strong?
// Do ye like it with a salty tang?
// Are ye a lubber who likes it bitter?
// Would ye like a bit of sweetness with yer poison?
// Are ye one for a fruity finish?
// Example ingredients:

// Strong ingredients: Glug of rum, slug of whisky, splash of gin
// Salty ingredients: Olive on a stick, salt-dusted rim, rasher of bacon
// Bitter ingredients: Shake of bitters, splash of tonic, twist of lemon peel
// Sweet ingredients: Sugar cube, spoonful of honey, splash of cola
// Fruity ingredients: Slice of orange, dash of cassis, cherry on top

// 1- constructor for the pantry (flavor, ingredients)
// 2- will asign the flavors with the ingredients [{pro:sdsd},{asd}]
// 3- replace choices string value with the array with ingredients
// 4- construction for questions 
//5- another constructor Bartender that gonna combine the 2 objects

// **************** FLAVORS *****************

var choices = {
    STRONG: "Strong",
    SALTY: "Salty",
    BITTER: "Bitter",
    SWEET: "Sweet",
    FRUITY: "Fruity"

};

function PantryChoice(name) {
    this.name = name;
    //pushes ingredients into section object.
    this.section = [];

}

function Pantry(flavor, ingredients) {
    this.flavor = flavor;
    this.ingredients = ingredients;
}


PantryChoice.prototype.addSection = function(getItem) {
    //pushes items into section array[];
    this.section.push(getItem);
}


//we are replacing choices[property's values] with the ingredients array
PantryChoice.prototype.addFlavors = function() {
    //checks for property in choices
    for (property in choices) {
        //iterates through array's that were pushed into the (PartyChoice) section array
        for (var i = 0; i < this.section.length; i++) {
            if (this.section[i].flavor == choices[property]) {
                choices[property] = this.section[i].ingredients;
            }
        }

    }
    console.log(choices);
}


var bartender = new PantryChoice("bartender");

var getChoice = new Pantry("Strong", ['Glug of rum', 'slug of whisky', 'splash of gin']);
bartender.addSection(getChoice);
var getChoice = new Pantry("Salty", ['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
bartender.addSection(getChoice);
var getChoice = new Pantry("Bitter", ['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
bartender.addSection(getChoice);
var getChoice = new Pantry("Sweet", ['Sugar cube', 'spoonful of honey', 'splash of cola']);
bartender.addSection(getChoice);
var getChoice = new Pantry("Fruity", ['Slice of orange', 'dash of cassis', 'cherry on top']);
bartender.addSection(getChoice);

console.log(bartender);


bartender.addFlavors();

// ************************ QUESTIONS ******************

function Question(questionText, flavor, items) {
    this.questionText = questionText;
    this.items = items;
    this.flavor = flavor;
}

function Barquestions(name) {
    this.name = name;
    this.section = [];
}
Barquestions.prototype.addQuestions = function(getItem) {
    this.section.push(getItem);
}
var customerChoice = new Barquestions("customerChoice");

var questionList = new Question("Do ye like yer drinks strong?", "Strong", choices.STRONG);
customerChoice.addQuestions(questionList);
var questionList = new Question("Do ye like it with a salty tang?", "Salty", choices.SALTY);
customerChoice.addQuestions(questionList);
var questionList = new Question("Are ye a lubber who likes it bitter?", "Bitter", choices.BITTER);
customerChoice.addQuestions(questionList);
var questionList = new Question("Would ye like a bit of sweetness with yer poison?", "Sweet", choices.SWEET);
customerChoice.addQuestions(questionList);
var questionList = new Question("Are ye one for a fruity finish?", "Fruity", choices.FRUITY);
customerChoice.addQuestions(questionList);

console.log(customerChoice);

//************* Appending Questions to the HTML ***********

var falseValues = {
    'Strong': false,
    'Salty': false,
    'Bitter': false,
    'Sweet': false,
    'Fruity': false
}


Barquestions.prototype.givingValues = function() {
    for (property in falseValues) {
        for (var i = 0; i < this.section.length; i++) {
            if (this.section[i].flavor == property) {
                this.section[i][property] = falseValues[property];

            }
        }
    }
    console.log(this.section);
}

customerChoice.givingValues();

//Display Questions to HTML
Barquestions.prototype.addHTML = function() {
    var html = "";
    for (var i = 0; i < this.section.length; i++) {
        html += '<h3>' + this.section[i].questionText + '<input name="' + this.section[i].flavor + '" type="radio" value="true"> Yes <input name="' + this.section[i].flavor + '"type="radio" value="false"> No</h3>';

    }

    $('.question-list').html(html);

}

customerChoice.addHTML();


$(document).ready(function() {

    var drink = {};

    function random() {
        var randomNum = Math.floor(Math.random() * 3);
        return randomNum;
    }

/************DRINK RESULT *******************/

    $('.place-order').click(function(e) {
        e.preventDefault();
        $('.results').empty();
//iterrate though user selected choices
        $('input:checked').each(function() {
            for (var i = 0; i < customerChoice.section.length; i++) {
                for (property in customerChoice.section[i]) {
                    if (this.name == property) {
                        customerChoice.section[i][property] = this.value;
//if true property is pushed into drink object
                        if (customerChoice.section[i][property] == 'true') {
                            drink[property] = customerChoice.section[i].items[random()];
                        }
                    }
                }
            }

        });

        console.log(customerChoice.section);
        console.log(drink);

        for (property in drink) {
            $(".results").append('<li>' + drink[property] + '</li>');
        }

    });

});