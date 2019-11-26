var dicoOp = new Map();
var dicoLatex = new Map();
initDicoOp();
initDicoLatex();

function initDicoOp() {
    dicoOp.set("plus"  , "+");
    dicoOp.set("moins", "-");

    dicoOp.set("�gal"  , "=");
    dicoOp.set("�gale" , "=");
    dicoOp.set("�galent", "=");

    dicoOp.set("diff�rent"  , "ne");
    dicoOp.set("in�gal", "ne");
    dicoOp.set("in�gale", "ne");
    dicoOp.set("in�galent", "ne");

    dicoOp.set("pi", "pi");

    dicoOp.set("multipli�", "times");
    dicoOp.set("multipli�s", "times");
    dicoOp.set("multiplie", "times");
    dicoOp.set("multiplient", "times");

    dicoOp.set("divis�", "div");
    dicoOp.set("divis�s", "div");
    dicoOp.set("divise", "div");
    dicoOp.set("divisent", "div");

    dicoOp.set("factoriel", "!");
    dicoOp.set("factorielle", "!");

    dicoOp.set("parenth�se", "parenthese");
    dicoOp.set("parenth�ses", "parenthese");

    dicoOp.set("ouvert", "open");
    dicoOp.set("ouverts", "open");
    dicoOp.set("ouverte", "open");
    dicoOp.set("ouvertes", "open");
    dicoOp.set("ouvrant", "open");
    dicoOp.set("ouvrante", "open");
    dicoOp.set("ouvrantes", "open");

    dicoOp.set("ferm�", "closed");
    dicoOp.set("ferm�s", "closed");
    dicoOp.set("ferm�e", "closed");
    dicoOp.set("ferm�es", "closed");
    dicoOp.set("fermant", "closed");
    dicoOp.set("fermante", "closed");
    dicoOp.set("fermantes", "closed");
}

function initDicoLatex() {
    dicoLatex.set("+", "+");
    dicoLatex.set("-", "-");

    dicoLatex.set("=", "=");

    dicoLatex.set("ne", "\\ne");

    dicoLatex.set("pi", "\\pi");

    dicoLatex.set("times", "\\times");

    dicoLatex.set("div", "\\div");

    dicoLatex.set("!", "!");

    dicoLatex.set("parenthese", "parenthese");

    dicoLatex.set("open", "open");

    dicoLatex.set("closed", "closed");

}

/**
 * Pour une �quation transcrite (oral � �crit), 
 * formate le string en fonction des op�rateurs contenus dans le dictionnaire 
 * et renvoie une �quation format�e (tableau de string)
 * 
 * @param {string} rawEquation L'�quation � formater
 * @returns {string[]} L'�quation format�e
 */
function format(rawEquation) {
    var rawEquationTab = rawEquation.toLowerCase().split(" ");
    var formatEquation = [];
    for (var i = 0; i < rawEquationTab.length; i++) {
        var equationElem = rawEquationTab[i];
        if (isNaN(equationElem))
            equationElem = dicoOp.get(rawEquationTab[i]);
        if (equationElem != undefined) {
            formatEquation.push(equationElem);
        }
    }
    return formatEquation;
}

/**
 * Pour une �quation format�e (tableau de string),
 * retourne l'�quation �crite en LaTeX
 * 
 * @param {string[]} formatEquation L'�quation format�e
 * @returns {string} L'�quation en Latex
 */
function latex(formatEquation) {
    var latexEquation = "";
    for (var i = 0; i < formatEquation.length; i++) {
        var equationElem = formatEquation[i];
        if (isNaN(equationElem))
            equationElem = dicoLatex.get(formatEquation[i]);
        if (equationElem != undefined) {
            latexEquation += equationElem + " ";
        }
    }
    return latexEquation;
}


// -----------------------------------TESTS-----------------------------------
var equation = "3 plus 4 divis� par 2 diff�rent de 2";
console.log(equation);
console.log(format(equation));
console.log(latex(format(equation)));