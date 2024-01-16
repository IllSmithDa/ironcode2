import { listOfMatches } from "./Matches";

export const parseConcepts = (htmlString: string, elementId: string) => {
  const element = document.getElementById(elementId);
  let newText = htmlString;
  listOfMatches.forEach((item) => {
    if (newText?.indexOf(item.keyword as string) !== -1) {
      const reStatement = new RegExp(`\\b${item.keyword}\\b`, 'gi')
      newText = newText?.replace(reStatement, `<font color="${item.color}">${item.keyword}</font>`) as string;
    }
  })

  newText = newText?.replace(/\$/g, `<font color="#00BFFF">$</font>`) as string;
  newText = newText?.replace(/\<stdbool\.h\>/g, `&#60;${`stdbool.h`}&#62;`) as string;
  newText = newText?.replace(/\<stdio\.h\>/g, `&#60;${`stdio.h`}&#62;`) as string;
  newText = newText?.replace(/\<iostream\>/g, `&#60;${`iostream`}&#62;`) as string;
  newText = newText?.replace(/\<vector\>/g, `&#60;${`vector`}&#62;`) as string;
  newText = newText?.replace(/\<queue\>/g, `&#60;${`queue`}&#62;`) as string;
  newText = newText?.replace(/\<stack\>/g, `&#60;${`stack`}&#62;`) as string;
  newText = newText?.replace(/\<format\>/g, `&#60;${`format`}&#62;`) as string;
  newText = newText?.replace(/\<map\>/g, `&#60;${`map`}&#62;`) as string;
  newText = newText?.replace(/\<string\>/g, `&#60;${`string`}&#62;`) as string;
  newText = newText?.replace(/\<set\>/g, `&#60;${`set`}&#62;`) as string;
  newText = newText?.replace(/\<regex\>/g, `&#60;${`regex`}&#62;`) as string;
  newText = newText?.replace(/\<bits\/stdc++.h\>/g, `&#60;${`bits/stdc++.h`}&#62;`) as string;
  newText = newText?.replace(/\#include/g, `<font color="#00BFFF">${'#include'}</font>`) as string;
  newText = newText?.replace(/Intl/g, `<font color="#00BFFF">Intl</font>`) as string;
  newText = newText?.replace(/int/g, `<font color="#00BFFF">${`int`}</font>`) as string;
  newText = newText?.replace(/Int/g, `<font color="#00BFFF">${`Int`}</font>`) as string;
  newText = newText?.replace(/println!/g, `<font color="#00BFFF">${`println!`}</font>`) as string;
  // comment matching
  let doubleQuotes = newText?.match(/["'][a-zA-Z0-9\s!\{\}\%]*["']/g)
  doubleQuotes?.forEach((stringVal) => {
    var regexp = new RegExp(stringVal, "gi");
    newText = newText?.replace(regexp, `<font color="#E42217">${stringVal}</font>`)
  })
  // newText = newText?.replace(/\/\/ indent to indicate block of code/g, `<font color="#11BB22">// indent to indicate block of code</font>`) as string;
  // newText = newText?.replace(/\/\/ command line/g, `<font color="#11BB22">// command line</font>`) as string;
  newText = newText?.replace(/\(/g, `<font color="#A52A2A">(</font>`) as string;
  newText = newText?.replace(/\)/g, `<font color="#A52A2A">)</font>`) as string;
  newText = newText?.replace(/\[/g, `<font color="#D4A017">[</font>`) as string;
  newText = newText?.replace(/\]/g, `<font color="#D4A017">]</font>`) as string;  

  if (element) element.innerHTML = newText as string;
};