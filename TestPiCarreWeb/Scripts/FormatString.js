var dicoOp = new Map();
var dicoLatex = new Map();
initDicoOp();
initDicoLatex();

function initDicoOp() {
    dicoOp.set("plus"  , "+");
    dicoOp.set("moins", "-");

    dicoOp.set("égal"  , "=");
    dicoOp.set("égale" , "=");
    dicoOp.set("égalent", "=");

    dicoOp.set("différent"  , "ne");
    dicoOp.set("inégal", "ne");
    dicoOp.set("inégale", "ne");
    dicoOp.set("inégalent", "ne");

    dicoOp.set("pi", "pi");

    dicoOp.set("multiplié", "times");
    dicoOp.set("multipliés", "times");
    dicoOp.set("multiplie", "times");
    dicoOp.set("multiplient", "times");

    dicoOp.set("divisé", "div");
    dicoOp.set("divisés", "div");
    dicoOp.set("divise", "div");
    dicoOp.set("divisent", "div");

    dicoOp.set("factoriel", "!");
    dicoOp.set("factorielle", "!");

    dicoOp.set("parenthèse", "parenthese");
    dicoOp.set("parenthèses", "parenthese");

    dicoOp.set("ouvert", "open");
    dicoOp.set("ouverts", "open");
    dicoOp.set("ouverte", "open");
    dicoOp.set("ouvertes", "open");
    dicoOp.set("ouvrant", "open");
    dicoOp.set("ouvrante", "open");
    dicoOp.set("ouvrantes", "open");

    dicoOp.set("fermé", "closed");
    dicoOp.set("fermés", "closed");
    dicoOp.set("fermée", "closed");
    dicoOp.set("fermées", "closed");
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
 * Pour une équation transcrite (oral à écrit), 
 * formate le string en fonction des opérateurs contenus dans le dictionnaire 
 * et renvoie une équation formatée (tableau de string)
 * 
 * @param {string} rawEquation L'équation à formater
 * @returns {string[]} L'équation formatée
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
 * Pour une équation formatée (tableau de string),
 * retourne l'équation écrite en LaTeX
 * 
 * @param {string[]} formatEquation L'équation formatée
 * @returns {string} L'équation en Latex
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
var equation = "3 plus 4 divisé par 2 différent de 2";
console.log(equation);
console.log(format(equation));
console.log(latex(format(equation)));