/* jshint node: true */
'use strict';

var recast = require("recast");
var types = recast.types;
var namedTypes = types.namedTypes;
var b = recast.types.builders;

/**
 * Checks if node is a conditional for checking the presence of AMD
 *
 * @return {Boolean}
 */
function isAMDTypeOfComparater(node) {
  if (namedTypes.LogicalExpression.check(node.test)) {
    let left = node.test.left;
    if (namedTypes.BinaryExpression.check(left) &&
        namedTypes.UnaryExpression.check(left.left) &&
        left.left.argument.name === "define") {
      return true;
    }
  }
  return false;
}

module.exports = function rewriteAMDFunction(code){
  var ast = recast.parse(code);

  types.visit(ast, {
    visitIfStatement: function(path) {
      var node = path.node;
      if (isAMDTypeOfComparater(node)) {

        var defineFnExpression = b.expressionStatement(
          b.callExpression(
            b.identifier('define'), [
              b.literal("bugsnag"),
              b.arrayExpression([
                b.literal("exports")
              ]),
              b.functionExpression(
                null,
                [
                  b.identifier("exports")
                ],
                b.blockStatement([
                  b.expressionStatement(
                    b.assignmentExpression(
                      '=',
                      b.memberExpression(b.identifier('exports'), b.literal('default'), true),
                      b.identifier('self')
                    )
                  )
                ])
              )
            ]
          )
        );

        return defineFnExpression;
      }else{
        this.traverse(path);
      }
    },
  });

  return recast.print(ast).code;
};
