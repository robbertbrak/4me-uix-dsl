import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const uixConditionParser = parser;

export const uixConditionLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      // TODO: Based on JS
      styleTags({
        "get set async static": t.modifier,
        "for while do if else switch try catch finally return throw break continue default case": t.controlKeyword,
        "in of await yield void typeof delete instanceof": t.operatorKeyword,
        "let var const using function class extends": t.definitionKeyword,
        "import export from": t.moduleKeyword,
        "with debugger as new": t.keyword,
        TemplateString: t.special(t.string),
        super: t.atom,
        BooleanLiteral: t.bool,
        this: t.self,
        null: t.null,
        Star: t.modifier,
        VariableName: t.variableName,
        "CallExpression/VariableName TaggedTemplateExpression/VariableName": t.function(t.variableName),
        VariableDefinition: t.definition(t.variableName),
        Label: t.labelName,
        PropertyName: t.propertyName,
        PrivatePropertyName: t.special(t.propertyName),
        "CallExpression/MemberExpression/PropertyName": t.function(t.propertyName),
        "FunctionDeclaration/VariableDefinition": t.function(t.definition(t.variableName)),
        "ClassDeclaration/VariableDefinition": t.definition(t.className),
        PropertyDefinition: t.definition(t.propertyName),
        PrivatePropertyDefinition: t.definition(t.special(t.propertyName)),
        UpdateOp: t.updateOperator,
        "LineComment Hashbang": t.lineComment,
        BlockComment: t.blockComment,
        Number: t.number,
        String: t.string,
        Escape: t.escape,
        ArithOp: t.arithmeticOperator,
        LogicOp: t.logicOperator,
        BitOp: t.bitwiseOperator,
        CompareOp: t.compareOperator,
        RegExp: t.regexp,
        Equals: t.definitionOperator,
        Arrow: t.function(t.punctuation),
        ": Spread": t.punctuation,
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        "InterpolationStart InterpolationEnd": t.special(t.brace),
        ".": t.derefOperator,
        ", ;": t.separator,
        "@": t.meta,
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

export function uixCondition() {
  return new LanguageSupport(uixConditionLanguage)
}
